// Fetches the channel's latest videos from the public YouTube RSS feed and
// merges any new ones into src/data/videos.ts (youtubeVideos). Wired to
// `prebuild` so the English /cases list stays fresh on each deploy — no API
// key. Silently no-ops if the network is unavailable (keeps existing data,
// build still succeeds).
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CHANNEL_ID = 'UCvv0Iuc6lTJ2qr621MxGLjA';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const VIDEO_TS = join(__dirname, '..', 'src', 'data', 'videos.ts');

function decodeXml(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function tag(title) {
  const t = title.toLowerCase();
  if (/seagate/.test(t)) return 'Seagate';
  if (/western digital|\bwd\b/.test(t)) return 'Western Digital';
  if (/samsung/.test(t)) return 'Samsung';
  if (/toshiba/.test(t)) return 'Toshiba';
  if (/head.?swap|open.?drive|head replac|开盘|磁头/.test(t)) return 'Head Swap';
  if (/ssd|solid.?state|nvme|固态/.test(t)) return 'SSD';
  if (/helium|氦/.test(t)) return 'Helium HDD';
  if (/raid|array|阵列/.test(t)) return 'RAID';
  if (/\bnas\b/.test(t)) return 'NAS';
  if (/firmware|hdd password|unlock|固件|密码/.test(t)) return 'Firmware';
  if (/翻新|refurb|618|选购|避坑|review|锐评/.test(t)) return 'Buying Guide';
  if (/识别|recogn|not detect|weird sound|异响|怪声/.test(t)) return 'Diagnostics';
  return 'Data Recovery';
}

function parseRss(xml) {
  const out = [];
  const re = /<entry>([\s\S]*?)<\/entry>/g;
  let m;
  while ((m = re.exec(xml))) {
    const id = m[1].match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = m[1].match(/<title>([^<]*)<\/title>/)?.[1];
    if (id && title) out.push({ id, title: decodeXml(title) });
  }
  return out;
}

async function main() {
  let rss;
  try {
    const r = await fetch(RSS_URL, { signal: AbortSignal.timeout(8000) });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    rss = parseRss(await r.text());
  } catch (e) {
    console.log(`[sync-youtube] RSS unavailable (${e.message}) — keeping existing youtubeVideos.`);
    return;
  }
  if (rss.length === 0) {
    console.log('[sync-youtube] RSS returned no entries — keeping existing.');
    return;
  }

  const cur = readFileSync(VIDEO_TS, 'utf8');
  const blockRe = /(\/\/ YouTube videos[\s\S]*?export const youtubeVideos: YoutubeEntry\[\] = \[)([\s\S]*?)(\];)/;
  const bm = cur.match(blockRe);
  if (!bm) {
    console.log('[sync-youtube] youtubeVideos block not found — skipping.');
    return;
  }
  const existingIds = new Set([...bm[2].matchAll(/"id":"([^"]+)"/g)].map((x) => x[1]));
  const fresh = rss.filter((e) => !existingIds.has(e.id));
  if (fresh.length === 0) {
    console.log(`[sync-youtube] RSS ${rss.length} fetched, 0 new — up to date.`);
    return;
  }
  const existingLines = bm[2]
    .trim()
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const freshLines = fresh.map((e) =>
    JSON.stringify({
      id: e.id,
      cover: `https://i.ytimg.com/vi/${e.id}/hqdefault.jpg`,
      tag: tag(e.title),
      title: e.title,
    }),
  );
  const merged = [...freshLines, ...existingLines].map((l) => '  ' + l + ',').join('\n');
  writeFileSync(VIDEO_TS, cur.replace(bm[0], `${bm[1]}\n${merged}\n${bm[3]}`));
  console.log(
    `[sync-youtube] RSS ${rss.length} fetched, ${fresh.length} new — prepended. (e.g. "${fresh[0].title.slice(0, 30)}")`,
  );
}

main();
