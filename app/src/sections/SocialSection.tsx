import { Youtube, MonitorPlay, BookOpen, Music2 } from 'lucide-react';
import { siteConfig } from '@/config/site';

const socials = [
  { key: 'bilibili', href: siteConfig.bilibiliSpace, Icon: MonitorPlay, label: 'Bilibili' },
  { key: 'youtube', href: siteConfig.youtube, Icon: Youtube, label: 'YouTube' },
  { key: 'xiaohongshu', href: siteConfig.xiaohongshu, Icon: BookOpen, label: '小红书' },
  ...(siteConfig.douyin ? [{ key: 'douyin', href: siteConfig.douyin, Icon: Music2, label: '抖音' }] : []),
];

export default function SocialSection() {
  return (
    <section className="py-[50px] bg-white border-t border-border-light">
      <div className="container-main">
        <div className="flex items-center justify-center gap-4">
          {socials.map(({ key, href, Icon, label }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-14 h-14 rounded-full border border-border-light flex items-center justify-center text-text-secondary hover:text-brand-blue hover:border-brand-blue transition-all duration-300"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
