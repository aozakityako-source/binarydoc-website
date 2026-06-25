import { Youtube, MonitorPlay, BookOpen, Music2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { siteConfig } from '@/config/site';

const socials = [
  { key: 'bilibili', href: siteConfig.bilibiliSpace, Icon: MonitorPlay, label: 'Bilibili' },
  { key: 'youtube', href: siteConfig.youtube, Icon: Youtube, label: 'YouTube' },
  { key: 'xiaohongshu', href: siteConfig.xiaohongshu, Icon: BookOpen, label: '小红书' },
  ...(siteConfig.douyin ? [{ key: 'douyin', href: siteConfig.douyin, Icon: Music2, label: '抖音' }] : []),
];

export default function Footer() {
  const { lang } = useLanguage();
  const year = 2026;

  return (
    <footer className="bg-bg-footer font-mono">
      <div className="py-8 border-b border-border-light">
        <div className="container-main flex items-center justify-center gap-3">
          {socials.map(({ key, href, Icon, label }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-secondary hover:text-brand-blue transition-colors duration-300"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
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
