import { marked } from 'marked';

// Read all article markdown files at build time. Vite inlines these into the bundle
// (content lives in the repo → works on a static host with no backend).
const files = import.meta.glob('/content/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface Article {
  slug: string;
  lang: string;
  title: string;
  date: string;
  tag: string;
  desc: string;
  body: string;
  html: string;
}

// Minimal frontmatter parser: --- \n key: value \n --- \n body
function parse(raw: string): { data: Record<string, string>; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx > 0) data[line.slice(0, idx).trim()] = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
  }
  return { data, body: m[2].trim() };
}

const all: Article[] = Object.entries(files).map(([path, raw]) => {
  const { data, body } = parse(raw);
  return {
    slug: data.slug || path.split('/').pop()!.replace(/\.md$/, ''),
    lang: data.lang || 'zh',
    title: data.title || 'Untitled',
    date: data.date || '',
    tag: data.tag || '',
    desc: data.desc || '',
    body,
    html: marked.parse(body, { async: false }) as string,
  };
});

const byDate = (a: Article, b: Article) => (a.date < b.date ? 1 : -1);

// For the list: prefer articles in the current language, fall back to any language
// for a slug that doesn't have a translation (so the list is never empty).
export function getArticles(lang: string): Article[] {
  const bySlug = new Map<string, Article>();
  for (const a of all) {
    const cur = bySlug.get(a.slug);
    if (!cur || (cur.lang !== lang && a.lang === lang)) bySlug.set(a.slug, a);
  }
  return [...bySlug.values()].sort(byDate);
}

export function getArticle(slug: string, lang: string): Article | undefined {
  const match = all.filter((a) => a.slug === slug);
  return match.find((a) => a.lang === lang) ?? match[0];
}
