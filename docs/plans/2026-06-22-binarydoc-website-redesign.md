# BinaryDoc 网站改造 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the HddSurgery firmware-database clone (in `Kimi_Agent_网站复制分析/app/`) into the personal-brand data-recovery site 「二进制的老王 / BinaryDoc」 — Phase 1 static, deployable.

**Architecture:** Preserve the existing stack (React 19 + TS + Vite 7 + Tailwind 3.4 + react-router 7 + custom i18n Context). Centralize brand/contact into a new `src/config/site.ts` (DRY). Rewrite `translations.ts` to drop all HddSurgery copy, auth, and paywall assumptions. Apply Technical/Industrial design tokens (mono font + signal cyan + sharp corners). Add two new features: a firmware catalog auto-generated from `N:/硬盘固件/UserDataFile` (117 family codes), and a Bilibili video grid on `/cases`.

**Tech Stack:** React 19.2, TypeScript 5.9, Vite 7.2, Tailwind 3.4.19, react-router 7, lucide-react, @fontsource (Open Sans + new JetBrains Mono), Node `--test` (built-in) for the firmware script test.

**Hard constraint:** NEVER touch `Kimi_Agent_网站复制分析.zip`. All edits stay inside the unzipped `app/` folder.

**Verification approach (read me):** This is a static visual rebrand — most changes are copy/CSS/component markup, where unit tests would be tautological (asserting string literals). So per-task verification = `npx tsc -b` (catches broken imports/types) **+** the running dev server via preview tools (`preview_screenshot` / `preview_snapshot` / `preview_inspect`) to confirm the visual result. The dev server is already running as preview `kimi-clone` on port 5173 with HMR — after each edit, Vite auto-reloads; just re-screenshot. The **one** piece with real logic — the firmware-parsing script — gets a real unit test (`node --test`).

**Repo conventions:** Commit messages follow `type(scope): desc` (e.g. `feat(binarydoc): ...`). Quote all paths (spaces + Chinese chars). Stage specific files only (the `N:/VIBE CODING` repo has many unrelated changes — never `git add -A`).

**Working dir for all `npx`/`node`/preview commands:** `N:/VIBE CODING/01-Projects/Website Design/Kimi_Agent_网站复制分析/app` (the dev server `cd`s here via the launch.json config; for CLI commands, `cd` there first).

---

## File Map

**Create:**
- `app/src/config/site.ts` — brand name, tagline, contact (email/phone/address), social URLs. Single source of truth the user edits.
- `app/src/components/Logo.tsx` — hard-drive-platter SVG mark + wordmark.
- `app/src/data/firmware.ts` — AUTO-GENERATED catalog (117 families). Do not hand-edit.
- `app/src/data/videos.ts` — curated Bilibili video entries (user fills BV ids).
- `app/src/sections/FirmwareSection.tsx` — dark, family-level firmware catalog.
- `app/src/components/VideoCard.tsx` — Bilibili iframe embed card.
- `app/scripts/gen-firmware.mjs` — catalog generator.
- `app/scripts/gen-firmware.test.mjs` — unit test for the generator.

**Modify:**
- `app/src/i18n/translations.ts` — full rewrite (drop HddSurgery/auth/paywall copy).
- `app/src/sections/Footer.tsx`, `SocialSection.tsx`, `ContactSection.tsx` — use `site.ts`, drop HddSurgery links.
- `app/src/sections/DisclaimerSection.tsx` — slim to 4 points, no paywall, no hddsurgery.com links.
- `app/tailwind.config.js` — `brand-blue` → signal cyan, add `font.mono`.
- `app/src/index.css` — import JetBrains Mono, add mono utility.
- `app/src/sections/Navbar.tsx` — new logo, remove login/signup buttons.
- `app/src/sections/HeroSection.tsx` — content CTAs (no auth), tokens.
- `app/src/sections/StepsSection.tsx` — drop login step.
- `app/src/sections/ManufacturerSection.tsx` — real 3 manufacturers.
- `app/src/sections/SearchSection.tsx` — mono placeholder, cyan focus.
- `app/src/pages/HomePage.tsx` — add FirmwareSection.
- `app/src/pages/CasesPage.tsx` — render video grid instead of old CasesSection.
- `app/package.json` — add `@fontsource/jetBrains-mono`, gen/test scripts; drop unused deps.

**Delete (cleanup, Task 12):**
- `app/src/pages/Home.tsx` (dead Vite template), `app/src/sections/ToolsSection.tsx` (unused), `app/src/components/ui/` (unused shadcn), unused deps in `package.json`.

---

## Task 1: Create `site.ts` brand/contact config

**Files:**
- Create: `app/src/config/site.ts`

- [ ] **Step 1: Create the config file**

```ts
// Single source of truth for brand identity + contact info.
// EDIT YOUR REAL CONTACT HERE. Placeholders are marked TODO.
export const siteConfig = {
  brandName: { en: 'BinaryDoc', zh: '二进制的老王' },
  tagline: '// data recovery',

  // TODO: replace with your real contact channels
  email: 'hello@binarydoc.cn',
  phone: '',                       // optional — leave '' to hide
  address: { en: '', zh: '' },     // optional — leave '' to hide

  // Social — Bilibili only for Phase 1 (user's real channel)
  bilibiliSpace: 'https://space.bilibili.com/18731657',

  // Quark root — filled in Phase 2 when free/paid model is decided
  quarkRoot: '',
} as const;

export type SiteConfig = typeof siteConfig;
```

- [ ] **Step 2: Typecheck**

Run: `cd "N:/VIBE CODING/01-Projects/Website Design/Kimi_Agent_网站复制分析/app" && npx tsc -b`
Expected: exits 0 (no errors). New file has no importers yet, so nothing to break.

- [ ] **Step 3: Commit**

```bash
cd "N:/VIBE CODING/01-Projects/Website Design/Kimi_Agent_网站复制分析"
git add "app/src/config/site.ts"
git commit -m "feat(binarydoc): add site.ts brand/contact config"
```

---

## Task 2: Rewrite `translations.ts` (remove ALL HddSurgery text)

This single file is the biggest concentration of HddSurgery copy (footer address/email, StorageDoctor mentions, 1-EUR-PayPal paywall, HDDS tools). Rewriting it removes most visible HddSurgery text in one shot.

**Files:**
- Modify: `app/src/i18n/translations.ts` (full rewrite)

- [ ] **Step 1: Replace the entire file contents**

```ts
export const translations = {
  en: {
    // Navbar
    nav_home: 'Home',
    nav_cases: 'Cases',
    nav_articles: 'Tech Articles',
    nav_contact: 'Contact',
    nav_firmware: 'Firmware',

    // Hero
    hero_title: 'Data Recovery, Down to the Binary',
    hero_subtitle: 'Firmware library, recovery cases, and field notes from a specialist.',
    hero_cta_cases: 'View Cases',
    hero_cta_firmware: 'Browse Firmware',

    // Steps
    steps_title: 'Find firmware in three steps',
    step_1: 'Pick manufacturer & family',
    step_2: 'Locate the firmware family',
    step_3: 'Get the donor link',

    // Search
    search_placeholder: 'family code · model · donor',

    // Manufacturer
    manufacturer_title: 'Browse by manufacturer',

    // Firmware
    firmware_title: 'Firmware Library',
    firmware_subtitle: 'Family-level donor resources, parsed live from the local archive.',
    firmware_donors: 'donors',
    firmware_get_link: 'Get link',

    // Cases (video grid)
    cases_title: 'Recovery Cases',
    cases_subtitle: 'Selected walkthroughs from the channel.',

    // Disclaimer (slimmed — no paywall)
    disclaimer_title: 'Firmware Library Disclaimer',
    disclaimer_li1_a: 'Firmware in this library is intended strictly for professional data recovery, not for the general public. These files are ',
    disclaimer_li1_b: 'not firmware updates',
    disclaimer_li1_c: '. Only qualified specialists should handle them. Improper use may cause permanent drive damage and total data loss.',
    disclaimer_li2: 'You use these files entirely at your own risk. Recovery success cannot be guaranteed by firmware alone.',
    disclaimer_li3: 'You are responsible for determining compatibility with your drives and tools, and for protecting your backups. BinaryDoc is not liable for any damage arising from use or modification of these files.',
    disclaimer_li4: 'BinaryDoc does not guarantee the quality or function of donor files, as they are extracted from patient drives during real recovery work.',

    // Articles
    articles_title: 'Tech Articles',

    // Contact
    contact_subtitle: 'Reach out for data recovery or technical inquiries.',
    contact_quick_msg: 'Quick Message',
    contact_name_ph: 'Your Name',
    contact_email_ph: 'Email Address',
    contact_msg_ph: 'Describe your data recovery needs...',
    contact_send: 'Send Message',
  },
  zh: {
    nav_home: '首页',
    nav_cases: '案例',
    nav_articles: '技术文章',
    nav_contact: '联系我们',
    nav_firmware: '固件库',

    hero_title: '数据恢复，直抵二进制',
    hero_subtitle: '固件库、实战案例，与一线数据恢复笔记。',
    hero_cta_cases: '查看案例',
    hero_cta_firmware: '浏览固件库',

    steps_title: '三步找到固件',
    step_1: '选厂商与家族',
    step_2: '定位固件家族',
    step_3: '获取 donor 链接',

    search_placeholder: '家族代号 · 型号 · donor',

    manufacturer_title: '按厂商浏览',

    firmware_title: '固件库',
    firmware_subtitle: '家族级 donor 资源，从本地存档实时解析。',
    firmware_donors: '个 donor',
    firmware_get_link: '获取链接',

    cases_title: '数据恢复案例',
    cases_subtitle: '来自频道的精选实战。',

    disclaimer_title: '固件库免责声明',
    disclaimer_li1_a: '本库固件严格用于专业数据恢复，不面向普通公众。这些文件',
    disclaimer_li1_b: '不是固件更新',
    disclaimer_li1_c: '，仅限合格专家操作。误用可能导致硬盘永久损坏与数据全部丢失。',
    disclaimer_li2: '使用这些文件的风险由使用者自行承担。仅凭固件无法保证恢复成功。',
    disclaimer_li3: '你有责任判断文件与硬盘及工具的兼容性，并保护好备份。BinaryDoc 对因使用或修改这些文件造成的任何损害不承担责任。',
    disclaimer_li4: 'BinaryDoc 不保证 donor 文件的质量与功能，因为它们提取自真实恢复中的患者盘。',

    articles_title: '技术文章',

    contact_subtitle: '如有数据恢复需求或技术咨询，请随时联系。',
    contact_quick_msg: '快速留言',
    contact_name_ph: '您的姓名',
    contact_email_ph: '电子邮箱',
    contact_msg_ph: '请描述您的数据恢复需求...',
    contact_send: '发送消息',
  },
} as const;

export type Language = 'en' | 'zh';
export type Translations = Record<string, string>;
```

> Note: removed keys (`nav_login`, `nav_signup`, `hero_login`, `hero_signup`, `footer_*`, `tools_*`, `case_stat_*`, disclaimer `li5/li6/li7`). Because `Translations = Record<string,string>`, accessing a removed key returns `undefined` (renders empty) rather than crashing — so the transient state until Tasks 3–8 update the components is safe (some buttons render empty text briefly). HMR means you'll see it update live.

- [ ] **Step 2: Typecheck**

Run: `cd "N:/VIBE CODING/01-Projects/Website Design/Kimi_Agent_网站复制分析/app" && npx tsc -b`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
cd "N:/VIBE CODING/01-Projects/Website Design/Kimi_Agent_网站复制分析"
git add "app/src/i18n/translations.ts"
git commit -m "feat(binarydoc): rewrite translations — drop HddSurgery/auth/paywall copy"
```

---

## Task 3: De-brand Footer + SocialSection + ContactSection

All three repeat HddSurgery contact/social info. Route them through `site.ts` and the new translations.

**Files:**
- Modify: `app/src/sections/Footer.tsx`
- Modify: `app/src/sections/SocialSection.tsx`
- Modify: `app/src/sections/ContactSection.tsx`

- [ ] **Step 1: Rewrite `Footer.tsx`**

```tsx
import { Youtube } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { siteConfig } from '@/config/site';

export default function Footer() {
  const { lang } = useLanguage();
  const year = 2026;

  return (
    <footer className="bg-bg-footer font-mono">
      <div className="py-8 border-b border-border-light">
        <div className="container-main flex items-center justify-center gap-3">
          <a
            href={siteConfig.bilibiliSpace}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bilibili"
            className="text-text-secondary hover:text-brand-blue transition-colors duration-300"
          >
            <Youtube className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="py-6">
        <div className="container-main flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-secondary">
          {siteConfig.address[lang] && <span>{siteConfig.address[lang]}</span>}
          {siteConfig.phone && <span>{siteConfig.phone}</span>}
          <span>{siteConfig.email}</span>
        </div>
      </div>

      <div className="py-4 border-t border-border-light">
        <div className="container-main flex flex-col sm:flex-row items-center justify-between text-xs text-text-secondary">
          <span className="tracking-tight">{siteConfig.brandName[lang]}</span>
          <span className="mt-2 sm:mt-0">{year} © {siteConfig.brandName.en} · {siteConfig.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Rewrite `SocialSection.tsx` (Bilibili only)**

```tsx
import { Youtube } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function SocialSection() {
  return (
    <section className="py-[50px] bg-white border-t border-border-light">
      <div className="container-main">
        <div className="flex items-center justify-center gap-4">
          <a
            href={siteConfig.bilibiliSpace}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bilibili"
            className="w-14 h-14 rounded-full border border-border-light flex items-center justify-center text-text-secondary hover:text-brand-blue hover:border-brand-blue transition-all duration-300"
          >
            <Youtube className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Rewrite `ContactSection.tsx`**

```tsx
import { Mail, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { siteConfig } from '@/config/site';

export default function ContactSection() {
  const { lang, t } = useLanguage();
  const isZh = lang === 'zh';

  return (
    <section id="contact" className="py-[50px] bg-bg-light border-t border-border-light">
      <div className="container-main max-w-[900px]">
        <h2 className="text-2xl md:text-[28px] font-normal text-text-primary text-center mb-4">
          {t.nav_contact}
        </h2>
        <p className="text-sm text-text-secondary text-center mb-10">{t.contact_subtitle}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-4 bg-white p-4 shadow-card">
            <div className="w-10 h-10 bg-bg-light flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-brand-blue" />
            </div>
            <span className="text-sm text-text-primary font-mono">{siteConfig.email}</span>
          </div>
        </div>

        <div className="bg-white p-6 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-brand-blue" />
            <h3 className="text-base font-semibold text-text-primary">{t.contact_quick_msg}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder={t.contact_name_ph}
              className="px-4 py-3 border border-border-light text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:border-brand-blue transition-colors duration-300" />
            <input type="email" placeholder={t.contact_email_ph}
              className="px-4 py-3 border border-border-light text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:border-brand-blue transition-colors duration-300" />
            <textarea rows={3} placeholder={t.contact_msg_ph}
              className="sm:col-span-2 px-4 py-3 border border-border-light text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:border-brand-blue transition-colors duration-300 resize-none" />
            <button className="sm:col-span-2 px-6 py-3 bg-brand-blue text-white text-sm font-medium hover:opacity-90 transition-colors duration-300">
              {t.contact_send}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify**

Run: `cd "N:/VIBE CODING/01-Projects/Website Design/Kimi_Agent_网站复制分析/app" && npx tsc -b` → expect 0.
Then preview: navigate to `/contact`, `preview_snapshot` — confirm no `HddSurgery` / `hddsurgery.com` / `+381` / Belgrade / Smilesoft / Helpdisc text remains.

- [ ] **Step 5: Commit**

```bash
cd "N:/VIBE CODING/01-Projects/Website Design/Kimi_Agent_网站复制分析"
git add "app/src/sections/Footer.tsx" "app/src/sections/SocialSection.tsx" "app/src/sections/ContactSection.tsx"
git commit -m "feat(binarydoc): de-brand footer/social/contact via site.ts"
```

---

## Task 4: Rewrite `DisclaimerSection.tsx` (slim, no paywall, no HDDS links)

The old component hardcodes `hddsurgery.com` blog/contact links and renders 7 points including the PayPal paywall. Replace with 4 clean points reading the new `disclaimer_li1..li4` keys.

**Files:**
- Modify: `app/src/sections/DisclaimerSection.tsx`

- [ ] **Step 1: Rewrite the component**

```tsx
import { useLanguage } from '@/hooks/useLanguage';

export default function DisclaimerSection() {
  const { t } = useLanguage();

  return (
    <section className="py-[50px] bg-bg-light">
      <div className="container-main max-w-[900px]">
        <h2 className="text-2xl md:text-[28px] font-normal text-text-primary text-center mb-10">
          {t.disclaimer_title}
        </h2>
        <ul className="space-y-4 text-sm text-text-primary leading-relaxed list-disc pl-5">
          <li>
            {t.disclaimer_li1_a}
            <strong className="text-brand-blue">{t.disclaimer_li1_b}</strong>
            {t.disclaimer_li1_c}
          </li>
          <li>{t.disclaimer_li2}</li>
          <li>{t.disclaimer_li3}</li>
          <li>{t.disclaimer_li4}</li>
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc -b` → 0.
Preview home page, `preview_snapshot` → confirm disclaimer shows 4 points, no `StorageDoctor`, no `1 EUR`, no `PayPal`, no `hddsurgery.com`.

- [ ] **Step 3: Commit**

```bash
git add "app/src/sections/DisclaimerSection.tsx"
git commit -m "feat(binarydoc): slim disclaimer, drop paywall + HDDS links"
```

---

## Task 5: Apply Technical/Industrial design tokens

Foundation for all visual work below: add a monospace font (JetBrains Mono), swap Office blue for signal cyan, keep `--radius: 0` (sharp corners).

**Files:**
- Modify: `app/package.json` (add `@fontsource/jetbrains-mono`)
- Modify: `app/src/index.css` (import mono font, mono base style)
- Modify: `app/tailwind.config.js` (`brand-blue` → cyan, add `font.mono`)

- [ ] **Step 1: Install the mono font**

Run:
```bash
cd "N:/VIBE CODING/01-Projects/Website Design/Kimi_Agent_网站复制分析/app"
npm install @fontsource/jetbrains-mono --registry=https://registry.npmmirror.com
```
Expected: adds `@fontsource/jetbrains-mono` to `dependencies`. (Network note: this project uses the npmmirror registry; the earlier full reinstall already used it successfully.)

- [ ] **Step 2: Edit `src/index.css` — add the mono import**

Replace the top of the file (the two Open Sans imports) with:

```css
@import '@fontsource/open-sans/400.css';
@import '@fontsource/open-sans/600.css';
@import '@fontsource/jetbrains-mono/400.css';
@import '@fontsource/jetbrains-mono/600.css';
```

Leave the rest of `index.css` (`@tailwind` directives, `:root`, `body`, `.container-main`) unchanged.

- [ ] **Step 3: Edit `tailwind.config.js` — color + font**

In the `theme.extend.colors` block, change:
```js
        'brand-blue': '#5B9BD5',
```
to:
```js
        'brand-blue': '#22D3EE',
```

In the `theme.extend.fontFamily` block, change:
```js
      fontFamily: {
        sans: ['"Open Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
```
to:
```js
      fontFamily: {
        sans: ['"Open Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SFMono-Regular"', 'Consolas', 'monospace'],
      },
```

Leave `--radius: 0px` in `index.css` untouched (sharp corners are core to the industrial look).

- [ ] **Step 4: Verify**

Run: `npx tsc -b` → 0.
Preview home, `preview_inspect` on the navbar logo or any `brand-blue` element → confirm computed color is `rgb(34, 211, 238)` (#22D3EE). `preview_screenshot` → buttons/links now cyan instead of Office blue.

- [ ] **Step 5: Commit**

```bash
git add "app/package.json" "app/package-lock.json" "app/src/index.css" "app/tailwind.config.js"
git commit -m "style(binarydoc): signal cyan + JetBrains Mono tokens"
```

---

## Task 6: Logo component + Navbar (remove auth buttons)

**Files:**
- Create: `app/src/components/Logo.tsx`
- Modify: `app/src/sections/Navbar.tsx`

- [ ] **Step 1: Create `Logo.tsx`** (hard-drive-platter mark — concentric rings + spindle + read head, monochrome `currentColor` so it inherits text color)

```tsx
export default function Logo({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      {/* platter */}
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      {/* spindle */}
      <circle cx="16" cy="16" r="2" fill="currentColor" />
      {/* read head arm */}
      <path d="M22 6 L17 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="20.5" y="4.5" width="5" height="3" fill="currentColor" />
    </svg>
  );
}
```

- [ ] **Step 2: Rewrite `Navbar.tsx`** — swap Disc3 → Logo, wordmark from `site.ts`, drop Login/Signup, add a Firmware link

```tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { siteConfig } from '@/config/site';
import Logo from '@/components/Logo';

const navItems = [
  { key: 'nav_home', href: '/' },
  { key: 'nav_cases', href: '/cases' },
  { key: 'nav_firmware', href: '/#firmware' },
  { key: 'nav_articles', href: '/articles' },
  { key: 'nav_contact', href: '/contact' },
];

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const dark =
    scrolled && location.pathname === '/'
      ? 'bg-[#0a0a0a]/95 backdrop-blur-sm shadow-md'
      : location.pathname !== '/'
      ? 'bg-[#0a0a0a]/95 backdrop-blur-sm shadow-md'
      : 'bg-transparent';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${dark}`}>
      <div className="container-main flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white shrink-0">
          <Logo className="w-7 h-7 text-brand-blue" />
          <span className="text-xl font-mono font-semibold tracking-tight">{siteConfig.brandName[lang]}</span>
        </Link>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 bg-white/10 rounded-full px-2 py-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname + location.hash === item.href);
            return (
              <Link
                key={item.key}
                to={item.href}
                className={`px-4 py-1.5 text-sm rounded-full transition-all duration-300 ${
                  isActive ? 'bg-white text-black font-medium' : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {t[item.key as keyof typeof t]}
              </Link>
            );
          })}
        </div>

        {/* Right — language only (auth removed) */}
        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 text-white/70 text-sm hover:text-white transition-colors duration-300 px-2 py-1 rounded-full hover:bg-white/10 font-mono"
          aria-label="Switch language"
        >
          <Globe className="w-4 h-4" />
          <span className="uppercase text-xs font-medium">{lang}</span>
        </button>
      </div>

      {/* Mobile bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-white/10 z-50">
        <div className="flex items-center justify-around h-14">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-all duration-300 text-xs font-mono ${
                location.pathname === item.href ? 'text-brand-blue' : 'text-white/50'
              }`}
            >
              {t[item.key as keyof typeof t]}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

> Navbar bg changed from `#1a1a1a` to `#0a0a0a` (deeper black, more "terminal"). Wordmark now mono. Login/Signup gone; a `Firmware` nav item added.

- [ ] **Step 3: Verify**

Run: `npx tsc -b` → 0.
Preview home, `preview_snapshot` → confirm: logo is the platter SVG (not the vinyl Disc3), wordmark shows `二进制的老王` (zh) with mono font, no `登录`/`注册` buttons, `固件库` nav item present. `preview_inspect` on the logo → `currentColor` resolves to cyan.

- [ ] **Step 4: Commit**

```bash
git add "app/src/components/Logo.tsx" "app/src/sections/Navbar.tsx"
git commit -m "feat(binarydoc): platter logo + mono navbar, drop auth buttons"
```

---

## Task 7: Rework `HeroSection.tsx`

Replace auth CTAs with content CTAs (View Cases / Browse Firmware), apply mono accents.

**Files:**
- Modify: `app/src/sections/HeroSection.tsx`

- [ ] **Step 1: Rewrite the component**

```tsx
import { Link } from 'react-router';
import { useLanguage } from '@/hooks/useLanguage';
import { siteConfig } from '@/config/site';

export default function HeroSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
      />
      <div className="absolute inset-0 bg-black/[0.65]" />

      <div className="relative z-10 text-center px-4">
        <span className="inline-block font-mono text-xs tracking-[0.2em] uppercase text-brand-blue mb-4">
          {siteConfig.tagline}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-[42px] font-semibold text-white mb-4 leading-tight">
          {t.hero_title}
        </h1>
        <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-xl mx-auto">
          {t.hero_subtitle}
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/cases"
            className="px-8 py-3 bg-brand-blue text-black text-base font-medium font-mono transition-all duration-300 hover:opacity-90"
          >
            {t.hero_cta_cases}
          </Link>
          <Link
            to="/#firmware"
            className="px-8 py-3 border border-white/60 text-white text-base font-mono transition-all duration-300 hover:bg-white hover:text-black"
          >
            {t.hero_cta_firmware}
          </Link>
        </div>
      </div>
    </section>
  );
}
```

> Changes: overlay darkened 0.55→0.65; tagline eyebrow in mono cyan; login/signup → View Cases (solid cyan) + Browse Firmware (outline); buttons use mono.

- [ ] **Step 2: Verify**

Run: `npx tsc -b` → 0.
Preview home, `preview_snapshot` → confirm: mono cyan tagline `// data recovery` above title, two CTAs `查看案例` / `浏览固件库`, no `登录`/`注册`.

- [ ] **Step 3: Commit**

```bash
git add "app/src/sections/HeroSection.tsx"
git commit -m "feat(binarydoc): hero with content CTAs + mono tagline"
```

---

## Task 8: Rework Steps + Manufacturer + Search

Steps drop the login step. Manufacturer shows the real 3 brands (Seagate/WDC/Samsung) linking to `/#firmware`. Search gets a mono placeholder + cyan focus.

**Files:**
- Modify: `app/src/sections/StepsSection.tsx`
- Modify: `app/src/sections/ManufacturerSection.tsx`
- Modify: `app/src/sections/SearchSection.tsx`

- [ ] **Step 1: Rewrite `StepsSection.tsx`**

```tsx
import { Database, Search, Link2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export default function StepsSection() {
  const { t } = useLanguage();
  const steps = [
    { icon: Database, label: t.step_1 },
    { icon: Search, label: t.step_2 },
    { icon: Link2, label: t.step_3 },
  ];

  return (
    <section className="py-[50px] bg-bg-light">
      <div className="container-main">
        <h2 className="text-2xl md:text-[28px] font-normal text-text-primary text-center mb-12 font-mono tracking-tight">
          {t.steps_title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-[800px] mx-auto">
          {steps.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center text-center">
              <span className="font-mono text-xs text-brand-blue mb-2">0{i + 1}</span>
              <step.icon className="w-12 h-12 text-text-secondary mb-4" strokeWidth={1.5} />
              <span className="text-sm text-text-primary">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite `ManufacturerSection.tsx`** (real 3 brands; link to firmware section)

```tsx
import { HardDrive } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '@/hooks/useLanguage';

const manufacturers = ['Seagate', 'WDC', 'Samsung'];

export default function ManufacturerSection() {
  const { t } = useLanguage();

  return (
    <section className="py-[50px] bg-white border-t border-border-light">
      <div className="container-main text-center">
        <h2 className="text-xl md:text-2xl font-normal text-text-primary mb-8 font-mono tracking-tight">
          {t.manufacturer_title}
        </h2>
        <div className="grid grid-cols-3 gap-4 max-w-[500px] mx-auto">
          {manufacturers.map((name) => (
            <Link
              key={name}
              to="/#firmware"
              className="inline-flex items-center justify-center gap-2 text-base font-mono text-brand-blue hover:underline transition-all duration-300 py-2 whitespace-nowrap"
            >
              <HardDrive className="w-4 h-4 text-text-secondary" />
              {name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Edit `SearchSection.tsx`** — mono placeholder text (the string is already in translations; just add `font-mono` + cyan focus ring)

In `SearchSection.tsx`, change the `<input>` className to include `font-mono` and change `focus:border-brand-blue` to also add a subtle ring: replace the input element with:

```tsx
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t.search_placeholder}
            className="flex-1 px-4 py-3 border border-border-light text-sm text-text-primary font-mono placeholder:text-gray-400 focus:outline-none focus:border-brand-blue transition-colors duration-300"
          />
```

and the button to:
```tsx
          <button
            className="px-4 py-3 border border-l-0 border-border-light text-text-secondary hover:text-brand-blue hover:border-brand-blue transition-all duration-300"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
```

(Only `font-mono` is added to the input; the rest is unchanged.)

- [ ] **Step 4: Verify**

Run: `npx tsc -b` → 0.
Preview home, `preview_snapshot` → confirm: steps show `01/02/03` mono numerals + new labels (no `登录或注册`); manufacturer row shows exactly `Seagate / WDC / Samsung` (3, not 6); search placeholder is mono.

- [ ] **Step 5: Commit**

```bash
git add "app/src/sections/StepsSection.tsx" "app/src/sections/ManufacturerSection.tsx" "app/src/sections/SearchSection.tsx"
git commit -m "feat(binarydoc): steps (no login) + real 3 manufacturers + mono search"
```

---

## Task 9: Firmware catalog generator + test (TDD)

Real logic: walk `N:/硬盘固件/UserDataFile` two levels deep, parse manufacturer/arch from the top folder name via a lookup, count donors per family. TDD with a temp-dir fixture.

**Files:**
- Create: `app/scripts/gen-firmware.mjs`
- Create: `app/scripts/gen-firmware.test.mjs`
- Modify: `app/package.json` (add `gen:firmware` + `test` scripts)

- [ ] **Step 1: Write the failing test first**

`app/scripts/gen-firmware.test.mjs`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseFirmware } from './gen-firmware.mjs';

test('parses families with manufacturer + donor count', () => {
  const root = mkdtempSync(join(tmpdir(), 'fw-'));
  // two donors under Bacall-59
  mkdirSync(join(root, 'Seagate F3 Arch', 'Bacall-59', 'donor1'), { recursive: true });
  mkdirSync(join(root, 'Seagate F3 Arch', 'Bacall-59', 'donor2'), { recursive: true });
  mkdirSync(join(root, 'Seagate F3 Arch', 'Bogart-4F', 'donor1'), { recursive: true });
  mkdirSync(join(root, 'WDC Marvell', 'Apollo'), { recursive: true });

  const fams = parseFirmware(root);

  assert.equal(fams.length, 3);
  const bacall = fams.find((f) => f.familyCode === 'Bacall-59');
  assert.equal(bacall.manufacturer, 'Seagate');
  assert.equal(bacall.arch, 'F3 Arch');
  assert.equal(bacall.donorCount, 2);
  const apollo = fams.find((f) => f.familyCode === 'Apollo');
  assert.equal(apollo.manufacturer, 'WDC');
  assert.equal(apollo.arch, 'Marvell');
  // sorted by manufacturer then familyCode
  assert.equal(fams[0].manufacturer, 'Seagate');

  rmSync(root, { recursive: true, force: true });
});
```

- [ ] **Step 2: Run the test — verify it fails**

Run:
```bash
cd "N:/VIBE CODING/01-Projects/Website Design/Kimi_Agent_网站复制分析/app"
node --test scripts/gen-firmware.test.mjs
```
Expected: FAIL — `Cannot find module .../gen-firmware.mjs` (file doesn't exist yet).

- [ ] **Step 3: Write the generator**

`app/scripts/gen-firmware.mjs`:

```js
import { readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Top-folder name → { manufacturer (display), arch }
const manufacturerMap = {
  'Seagate F3 Arch': { manufacturer: 'Seagate', arch: 'F3 Arch' },
  'WDC Marvell': { manufacturer: 'WDC', arch: 'Marvell' },
  'Sumsung HDD': { manufacturer: 'Samsung', arch: 'HDD' }, // folder is misspelled; display fixed
};

function listDirs(dir) {
  try {
    return readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory());
  } catch {
    return [];
  }
}

export function parseFirmware(root) {
  const families = [];
  for (const top of listDirs(root)) {
    const meta = manufacturerMap[top.name];
    if (!meta) continue;
    for (const fam of listDirs(join(root, top.name))) {
      families.push({
        manufacturer: meta.manufacturer,
        arch: meta.arch,
        familyCode: fam.name,
        donorCount: listDirs(join(root, top.name, fam.name)).length,
        quarkUrl: '',
        quarkPwd: '',
      });
    }
  }
  families.sort(
    (a, b) => a.manufacturer.localeCompare(b.manufacturer) || a.familyCode.localeCompare(b.familyCode)
  );
  return families;
}

// CLI entry — only when run directly, not when imported by the test
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const root = process.env.FIRMWARE_ROOT || 'N:/硬盘固件/UserDataFile';
  const outPath = process.env.FIRMWARE_OUT || join(__dirname, '..', 'src', 'data', 'firmware.ts');
  const families = parseFirmware(root);

  const byMfr = {};
  for (const f of families) byMfr[f.manufacturer] = (byMfr[f.manufacturer] || 0) + 1;

  const body = `// AUTO-GENERATED by scripts/gen-firmware.mjs — do not edit by hand.
// Regenerate: npm run gen:firmware   (override source with FIRMWARE_ROOT)
export interface FirmwareFamily {
  manufacturer: string;
  arch: string;
  familyCode: string;
  donorCount: number;
  quarkUrl: string;
  quarkPwd: string;
}

export const firmwareFamilies: FirmwareFamily[] = ${JSON.stringify(families, null, 2)};

export const firmwareStats = {
  total: ${families.length},
  byManufacturer: ${JSON.stringify(byMfr, null, 2)},
};
`;
  writeFileSync(outPath, body);
  console.log(`Generated ${families.length} families → ${outPath}`);
}
```

- [ ] **Step 4: Run the test — verify it passes**

Run: `node --test scripts/gen-firmware.test.mjs`
Expected: PASS (3 families, Bacall-59 donorCount=2, sorted Seagate first).

- [ ] **Step 5: Generate the real catalog**

Run: `npm run gen:firmware` (after adding the script in step 6) — or directly:
```bash
node scripts/gen-firmware.mjs
```
Expected: `Generated 117 families → .../src/data/firmware.ts`. Verify the file exists and contains `"Seagate"`, `"WDC"`, `"Samsung"`, family codes like `"Bacall-59"`, `"Apollo"`.

- [ ] **Step 6: Add npm scripts**

In `app/package.json`, replace the `"scripts"` block with:
```json
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "gen:firmware": "node scripts/gen-firmware.mjs",
    "test": "node --test scripts/gen-firmware.test.mjs"
  },
```

- [ ] **Step 7: Verify + commit**

Run: `npx tsc -b` → 0 (the generated `firmware.ts` is plain TS, type-checks clean).
```bash
git add "app/scripts/" "app/src/data/firmware.ts" "app/package.json" "app/package-lock.json"
git commit -m "feat(binarydoc): firmware catalog generator + 117-family catalog"
```

---

## Task 10: `FirmwareSection.tsx` (dark) + wire into HomePage

Dark section rendering families grouped by manufacturer, family codes in mono cyan, donor counts. This is the "terminal/lab" dark section that gives visual rhythm.

**Files:**
- Create: `app/src/sections/FirmwareSection.tsx`
- Modify: `app/src/pages/HomePage.tsx`

- [ ] **Step 1: Create `FirmwareSection.tsx`**

```tsx
import { useMemo, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { firmwareFamilies, firmwareStats } from '@/data/firmware';

const ORDER = ['Seagate', 'WDC', 'Samsung'];

export default function FirmwareSection() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<string>('All');
  const [q, setQ] = useState('');

  const manufacturers = useMemo(
    () => ['All', ...ORDER.filter((m) => firmwareStats.byManufacturer[m])],
    []
  );

  const visible = useMemo(() => {
    return firmwareFamilies.filter((f) => {
      const matchMfr = filter === 'All' || f.manufacturer === filter;
      const matchQ = !q || f.familyCode.toLowerCase().includes(q.toLowerCase());
      return matchMfr && matchQ;
    });
  }, [filter, q]);

  return (
    <section id="firmware" className="py-[60px] bg-[#0a0a0a] text-white">
      <div className="container-main">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-4">
          <div>
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-blue">
              {firmwareStats.total} families
            </span>
            <h2 className="text-2xl md:text-[28px] font-normal mt-2 font-mono tracking-tight">
              {t.firmware_title}
            </h2>
            <p className="text-sm text-white/60 mt-2">{t.firmware_subtitle}</p>
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.search_placeholder}
            className="px-3 py-2 bg-white/5 border border-white/15 text-sm font-mono text-white placeholder:text-white/30 focus:outline-none focus:border-brand-blue transition-colors duration-300 w-full sm:w-64"
          />
        </div>

        {/* manufacturer filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {manufacturers.map((m) => (
            <button
              key={m}
              onClick={() => setFilter(m)}
              className={`px-3 py-1 text-xs font-mono border transition-colors duration-200 ${
                filter === m
                  ? 'border-brand-blue text-brand-blue bg-brand-blue/10'
                  : 'border-white/15 text-white/60 hover:text-white hover:border-white/40'
              }`}
            >
              {m === 'All' ? 'All' : `${m} · ${firmwareStats.byManufacturer[m] || 0}`}
            </button>
          ))}
        </div>

        {/* family grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-white/10">
          {visible.map((f) => (
            <div key={`${f.manufacturer}-${f.familyCode}`} className="bg-[#0a0a0a] p-4 hover:bg-white/5 transition-colors duration-200">
              <div className="font-mono text-sm text-brand-blue">{f.familyCode}</div>
              <div className="text-xs text-white/40 mt-1">
                {f.manufacturer} · {f.arch}
              </div>
              <div className="text-xs text-white/60 mt-2">
                {f.donorCount} {t.firmware_donors}
              </div>
              <button
                disabled={!f.quarkUrl}
                className="mt-3 text-xs font-mono text-white/50 hover:text-brand-blue disabled:opacity-30 disabled:hover:text-white/50 transition-colors duration-200"
              >
                {t.firmware_get_link} →
              </button>
            </div>
          ))}
        </div>
        {visible.length === 0 && (
          <p className="text-center text-white/40 text-sm py-12 font-mono">no match</p>
        )}
      </div>
    </section>
  );
}
```

> The "Get link" button is `disabled` until `quarkUrl` is populated (Phase 2). That keeps the free/paid decision model-agnostic — the UI works now and just unlocks later.

- [ ] **Step 2: Wire into `HomePage.tsx`**

```tsx
import HeroSection from '@/sections/HeroSection';
import StepsSection from '@/sections/StepsSection';
import SearchSection from '@/sections/SearchSection';
import ManufacturerSection from '@/sections/ManufacturerSection';
import FirmwareSection from '@/sections/FirmwareSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StepsSection />
      <SearchSection />
      <ManufacturerSection />
      <FirmwareSection />
    </>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc -b` → 0.
Preview home, scroll to firmware section, `preview_screenshot` → confirm: dark `#0a0a0a` band appears after the white manufacturer section, shows `117 families` eyebrow, family codes in cyan mono (e.g. `Bacall-59`, `Apollo`), filter chips `All / Seagate · 54 / WDC · 61 / Samsung · 2`, search filters live. `preview_inspect` on a family code → color `rgb(34,211,238)`, fontFamily includes `JetBrains Mono`.

- [ ] **Step 4: Commit**

```bash
git add "app/src/sections/FirmwareSection.tsx" "app/src/pages/HomePage.tsx"
git commit -m "feat(binarydoc): dark firmware catalog section (117 families)"
```

---

## Task 11: Bilibili video grid on `/cases`

Replace the fake sample cases with a real Bilibili-embed grid driven by `videos.ts`. **User action required:** fill in real BV ids (the structure ships with placeholder entries you swap).

**Files:**
- Create: `app/src/data/videos.ts`
- Create: `app/src/components/VideoCard.tsx`
- Create: `app/src/sections/VideosSection.tsx`
- Modify: `app/src/pages/CasesPage.tsx`
- Delete: `app/src/sections/CasesSection.tsx` (replaced)

- [ ] **Step 1: Create `videos.ts`** (user-editable; placeholder BV ids marked)

```ts
// Curated Bilibili videos for the /cases grid.
// TO ADD A VIDEO: copy a block, paste the BV id from the video URL
//   (e.g. https://www.bilibili.com/video/BV1xx411c7mD  →  bvid: 'BV1xx411c7mD')
//   and fill zh/en title + a short tag.
export interface VideoEntry {
  bvid: string;
  tag: { zh: string; en: string };
  title: { zh: string; en: string };
}

export const videos: VideoEntry[] = [
  {
    bvid: 'BV1xx411c7mD', // TODO: replace with your real video
    tag: { zh: 'WD SMR', en: 'WD SMR' },
    title: { zh: '示例标题 — 替换为你的视频', en: 'Sample title — replace with your video' },
  },
  {
    bvid: 'BV1xx411c7mD', // TODO
    tag: { zh: 'Seagate F3', en: 'Seagate F3' },
    title: { zh: '示例标题', en: 'Sample title' },
  },
  {
    bvid: 'BV1xx411c7mD', // TODO
    tag: { zh: '开盘换磁头', en: 'Head Swap' },
    title: { zh: '示例标题', en: 'Sample title' },
  },
];
```

- [ ] **Step 2: Create `VideoCard.tsx`** (Bilibili official embed player)

```tsx
import { useState } from 'react';
import type { VideoEntry } from '@/data/videos';
import { useLanguage } from '@/hooks/useLanguage';

export default function VideoCard({ video }: { video: VideoEntry }) {
  const { lang, t } = useLanguage();
  const [ready, setReady] = useState(false);
  const src = `https://player.bilibili.com/player.html?bvid=${video.bvid}&autoplay=0&high_quality=1&aswide=1`;

  return (
    <div className="bg-white overflow-hidden shadow-card">
      <div className="relative aspect-video bg-black">
        {!ready && (
          <button
            onClick={() => setReady(true)}
            className="absolute inset-0 flex items-center justify-center text-white/70 font-mono text-sm hover:text-brand-blue transition-colors duration-200"
          >
            ▶ load player
          </button>
        )}
        {ready && (
          <iframe
            src={src}
            title={video.title[lang]}
            className="w-full h-full"
            scrolling="no"
            border="0"
            frameBorder="0"
            allowFullScreen
          />
        )}
      </div>
      <div className="p-4">
        <span className="inline-block font-mono text-xs text-brand-blue border border-brand-blue/40 px-2 py-0.5 mb-2">
          {video.tag[lang]}
        </span>
        <h3 className="text-sm font-semibold text-text-primary">{video.title[lang]}</h3>
      </div>
    </div>
  );
}
```

> Lazy-load: the iframe only mounts after the user clicks "▶ load player" — avoids loading 3+ Bilibili players on page open (performance + the embed only initializes on user gesture).

- [ ] **Step 3: Create `VideosSection.tsx`**

```tsx
import { useLanguage } from '@/hooks/useLanguage';
import { videos } from '@/data/videos';
import VideoCard from '@/components/VideoCard';

export default function VideosSection() {
  const { t } = useLanguage();

  return (
    <section id="cases" className="py-[50px] bg-bg-light border-t border-border-light">
      <div className="container-main">
        <h2 className="text-2xl md:text-[28px] font-normal text-text-primary text-center mb-4 font-mono tracking-tight">
          {t.cases_title}
        </h2>
        <p className="text-sm text-text-secondary text-center mb-10 max-w-[600px] mx-auto">
          {t.cases_subtitle}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((v) => (
            <VideoCard key={v.bvid + v.title.zh} video={v} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Rewire `CasesPage.tsx` + delete old `CasesSection.tsx`**

`app/src/pages/CasesPage.tsx`:
```tsx
import VideosSection from '@/sections/VideosSection';

export default function CasesPage() {
  return <VideosSection />;
}
```

Then delete the old file:
```bash
rm "N:/VIBE CODING/01-Projects/Website Design/Kimi_Agent_网站复制分析/app/src/sections/CasesSection.tsx"
```

- [ ] **Step 5: Verify**

Run: `npx tsc -b` → 0.
Preview `/cases`, `preview_snapshot` → confirm: 3 video cards, each with a `▶ load player` button, mono cyan tags. Click one via `preview_click`, `preview_snapshot` → iframe loads. (Real playback needs your BV ids; placeholder just shows the player shell.)

- [ ] **Step 6: Commit**

```bash
git add "app/src/data/videos.ts" "app/src/components/VideoCard.tsx" "app/src/sections/VideosSection.tsx" "app/src/pages/CasesPage.tsx" "app/src/sections/CasesSection.tsx"
git commit -m "feat(binarydoc): Bilibili video grid on /cases (replaces fake cases)"
```

---

## Task 12: Cleanup dead code + unused deps + final verify

**Files:**
- Delete: `app/src/pages/Home.tsx`, `app/src/sections/ToolsSection.tsx`, `app/src/components/ui/` (whole dir)
- Modify: `app/package.json` (drop unused deps)

- [ ] **Step 1: Verify `ToolsSection` and `Home.tsx` are unused**

```bash
cd "N:/VIBE CODING/01-Projects/Website Design/Kimi_Agent_网站复制分析/app"
grep -rn "ToolsSection\|pages/Home\b\|from './Home'" src/ 2>/dev/null
```
Expected: no matches (both are dead). If any match appears, stop and wire/remove the reference first.

- [ ] **Step 2: Delete dead files**

```bash
rm "app/src/pages/Home.tsx"
rm "app/src/sections/ToolsSection.tsx"
rm -rf "app/src/components/ui"
```

- [ ] **Step 3: Remove unused dependencies**

The `@radix-ui/*` packages, `recharts`, `zod`, `react-hook-form`, `@hookform/resolvers`, `cmdk`, `date-fns`, `react-day-picker`, `react-resizable-panels`, `embla-carousel-react`, `input-otp`, `next-themes`, `sonner`, `vaul`, `class-variance-authority`, `tailwind-merge`, `tw-animate-css`, `kimi-plugin-inspect-react` were all pulled in by the unused shadcn `ui/` folder (now deleted) or are otherwise unreferenced.

First, confirm none are imported by remaining code:
```bash
grep -rln "from '@radix-ui\|from 'recharts'\|from 'zod'\|from 'react-hook-form'\|from 'cmdk'\|from 'date-fns'\|from 'react-day-picker'\|from 'react-resizable-panels'\|from 'embla-carousel-react'\|from 'input-otp'\|from 'next-themes'\|from 'sonner'\|from 'vaul'\|from 'class-variance-authority'\|from 'tailwind-merge'\|@hookform/resolvers'" src/ 2>/dev/null
```
Expected: no matches. If any file still imports one, stop and resolve it (keep that dep).

Then remove them:
```bash
cd "N:/VIBE CODING/01-Projects/Website Design/Kimi_Agent_网站复制分析/app"
npm uninstall @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip recharts zod react-hook-form @hookform/resolvers cmdk date-fns react-day-picker react-resizable-panels embla-carousel-react input-otp next-themes sonner vaul class-variance-authority tailwind-merge tw-animate-css --registry=https://registry.npmmirror.com
```
Also remove the Kimi dev plugin (already gone from vite.config.ts):
```bash
npm uninstall -D kimi-plugin-inspect-react --registry=https://registry.npmmirror.com
```
Keep: `@babel/types` (Vite dep), `@fontsource/open-sans`, `@fontsource/jetbrains-mono`, `clsx`, `lucide-react`, `react`, `react-dom`, `react-router`, `tailwindcss-animate` (used by tailwind.config plugins), and all dev tooling.

- [ ] **Step 4: Reinstall to lockfile + verify it still builds**

```bash
npm install --registry=https://registry.npmmirror.com
npx tsc -b && npm run build
```
Expected: `tsc -b` exits 0; `vite build` produces `dist/` with no errors.

- [ ] **Step 5: Full visual sweep**

For each route, `preview_screenshot` + scan for any remaining `HddSurgery` / `StorageDoctor` / `hddsurgery.com` / `Smilesoft` / `Helpdisc` / `+381` / `Belgrade` / `PayPal` text:
- `/` (home) — hero, steps, manufacturer, dark firmware section
- `/cases` — video grid
- `/articles` — article list (generic, no HDDS text expected)
- `/contact` — contact form + email from `site.ts`

If any HDDS string survives, grep for it (`grep -rni "hddsurgery\|storagedoctor\|smilesoft\|helpdisc" src/`) and fix at the source.

- [ ] **Step 6: Commit**

```bash
git add -A "app/src/pages/Home.tsx" "app/src/sections/ToolsSection.tsx" "app/src/components/ui" "app/package.json" "app/package-lock.json"
git commit -m "chore(binarydoc): remove dead code (Home.tsx, ToolsSection, ui/) + unused deps"
```
(Using `git add -A` scoped to specific paths only — stage the deletions and the two lockfiles.)

---

## Spec coverage notes (self-review)

- All 4 Technical/Industrial levers covered: mono font (T5), signal cyan (T5), platter logo (T6), dark firmware section (T10).
- De-HddSurgery covered across translations (T2), footer-area sections (T3,T4), Navbar/Hero/Steps (T6,T7,T8).
- Firmware catalog (real 117 families, model-agnostic) → T9,T10. Video grid (Bilibili, manual) → T11.
- **Deliberate Phase-1 simplification** (not gaps to fix now): the spec's homepage IA listed "精选视频预览(3-4 条) + 服务介绍". This plan puts the full video grid on `/cases` (not a home teaser) and treats `/contact` as the services entry. Rationale: avoid duplicating the video component on home before the user has supplied real BV ids; a 3-card home teaser is trivial to add once `/cases` is validated. Flag to user after v1 renders — easy follow-up task if wanted.

## Definition of Done (Phase 1)

- [ ] Zero `HddSurgery` / `StorageDoctor` / `hddsurgery.com` / `Smilesoft` / `Helpdisc` / `+381` / `Belgrade` / `PayPal` text anywhere in `app/src/` or the rendered site.
- [ ] Site runs: `npx tsc -b` exits 0, `npm run build` succeeds, dev server serves all 4 routes.
- [ ] Visual: signal-cyan accents, JetBrains Mono on codes/labels/tags/wordmark, sharp corners, dark firmware section.
- [ ] Firmware catalog shows 117 families from the real archive, filterable.
- [ ] `/cases` renders the Bilibili video grid (placeholder BV ids until user supplies real ones).
- [ ] `site.ts` is the one place to edit real contact info; `videos.ts` is the one place to add videos.
- [ ] `npm test` passes (firmware generator).

## Deferred to Phase 2

- Real Quark download links (populate `quarkUrl`/`quarkPwd` in generated catalog or a side file; free/paid model decision).
- Auth / login / signup.
- Backend (dynamic catalog, download counting).
- YouTube source for videos.
