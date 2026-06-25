import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { readFileSync, writeFileSync, readdirSync, unlinkSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { marked } from 'marked';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT = join(__dirname, '..', 'content', 'articles');
const SESSION_FILE = join(__dirname, '..', '.admin-sessions.json');
const SESSION_TTL_MS = 1000 * 60 * 60 * 24; // 24h

const PASSWORD = process.env.ADMIN_PASSWORD;
if (!PASSWORD) {
  console.error('\n❌ ADMIN_PASSWORD 环境变量未设置。请运行：');
  console.error('   ADMIN_PASSWORD=your-password npm run admin\n');
  process.exit(1);
}

function loadSessions() {
  try {
    const raw = readFileSync(SESSION_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {}
  return [];
}

function saveSessions(list) {
  writeFileSync(SESSION_FILE, JSON.stringify(list, null, 2));
}

function pruneSessions() {
  const now = Date.now();
  const list = loadSessions().filter((s) => s.expires > now);
  saveSessions(list);
  return new Set(list.map((s) => s.token));
}

let sessions = pruneSessions();
setInterval(() => { sessions = pruneSessions(); }, 1000 * 60 * 10);

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(express.json({ limit: '2mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, standardHeaders: true, legacyHeaders: false }));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

const cookie = (req, name) => {
  const m = (req.headers.cookie || '').match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
  return m ? m[1] : null;
};

const auth = (req, res, next) => {
  const tok = cookie(req, 'admin') || '';
  if (sessions.has(tok)) return next();
  res.status(401).json({ error: 'unauthorized' });
};

function constantTimeCompare(a, b) {
  const ab = Buffer.from(a, 'utf8');
  const bb = Buffer.from(b, 'utf8');
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

// minimal frontmatter parser
function parse(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  return { data, body: m[2].trim() };
}

const NAME_RE = /^[a-z0-9-]+$/i;
const LANG_RE = /^(zh|en)$/;

app.post('/api/login', loginLimiter, (req, res) => {
  if (!constantTimeCompare(req.body?.password || '', PASSWORD)) {
    return res.status(401).json({ error: '密码错误' });
  }
  const tok = randomBytes(32).toString('hex');
  sessions.add(tok);
  const list = loadSessions();
  list.push({ token: tok, expires: Date.now() + SESSION_TTL_MS });
  saveSessions(list);
  res.setHeader('Set-Cookie', `admin=${tok}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`);
  res.json({ ok: true });
});

app.post('/api/logout', (req, res) => {
  const tok = cookie(req, 'admin') || '';
  sessions.delete(tok);
  saveSessions(loadSessions().filter((s) => s.token !== tok));
  res.setHeader('Set-Cookie', 'admin=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
  res.json({ ok: true });
});

app.get('/api/articles', auth, (_req, res) => {
  mkdirSync(CONTENT, { recursive: true });
  const out = readdirSync(CONTENT)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data } = parse(readFileSync(join(CONTENT, f), 'utf8'));
      return {
        slug: data.slug || f.replace(/\.md$/, ''),
        lang: data.lang || 'zh',
        title: data.title || f,
        date: data.date || '',
        tag: data.tag || '',
        desc: data.desc || '',
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  res.json(out);
});

app.get('/api/article/:slug/:lang', auth, (req, res) => {
  const { slug, lang } = req.params;
  if (!NAME_RE.test(slug) || !LANG_RE.test(lang)) return res.status(400).json({ error: 'bad name' });
  try {
    res.json({ raw: readFileSync(join(CONTENT, `${slug}.${lang}.md`), 'utf8') });
  } catch {
    res.status(404).json({ error: 'not found' });
  }
});

app.put('/api/article', auth, (req, res) => {
  const { slug, lang, content } = req.body || {};
  if (!NAME_RE.test(slug) || !LANG_RE.test(lang)) return res.status(400).json({ error: 'bad name' });
  mkdirSync(CONTENT, { recursive: true });
  writeFileSync(join(CONTENT, `${slug}.${lang}.md`), content, 'utf8');
  res.json({ ok: true });
});

app.delete('/api/article/:slug/:lang', auth, (req, res) => {
  const { slug, lang } = req.params;
  if (!NAME_RE.test(slug) || !LANG_RE.test(lang)) return res.status(400).json({ error: 'bad name' });
  try {
    unlinkSync(join(CONTENT, `${slug}.${lang}.md`));
  } catch {}
  res.json({ ok: true });
});

app.post('/api/render', auth, (req, res) => {
  res.json({ html: marked.parse(req.body?.md || '', { async: false }) });
});

app.get(['/', '/admin'], (_req, res) => res.sendFile(join(__dirname, 'admin.html')));

const PORT = process.env.ADMIN_PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n  BinaryDoc Admin → http://localhost:${PORT}`);
  console.log(`  会话文件: ${SESSION_FILE}\n`);
});
