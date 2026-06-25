import { Youtube, MonitorPlay, BookOpen, Music2 } from 'lucide-react';
import { siteConfig } from '@/config/site';

const socials = [
  {
    key: 'bilibili',
    href: siteConfig.bilibiliSpace,
    Icon: MonitorPlay,
    label: 'Bilibili',
    iconClass: 'text-[#FB7299]',
    hoverClass: 'hover:bg-[#FB7299] hover:shadow-[0_8px_24px_rgba(251,114,153,0.35)]',
  },
  {
    key: 'youtube',
    href: siteConfig.youtube,
    Icon: Youtube,
    label: 'YouTube',
    iconClass: 'text-[#FF0000]',
    hoverClass: 'hover:bg-[#FF0000] hover:shadow-[0_8px_24px_rgba(255,0,0,0.35)]',
  },
  {
    key: 'xiaohongshu',
    href: siteConfig.xiaohongshu,
    Icon: BookOpen,
    label: '小红书',
    iconClass: 'text-[#FF2442]',
    hoverClass: 'hover:bg-[#FF2442] hover:shadow-[0_8px_24px_rgba(255,36,66,0.35)]',
  },
  {
    key: 'douyin',
    href: siteConfig.douyin,
    Icon: Music2,
    label: '抖音',
    iconClass: 'text-gray-900',
    hoverClass:
      'hover:bg-gradient-to-br hover:from-[#25F4EE] hover:to-[#FE2C55] hover:shadow-[0_8px_24px_rgba(37,244,238,0.35)]',
  },
];

export default function SocialSection() {
  return (
    <section className="py-[50px] bg-white border-t border-border-light">
      <div className="container-main">
        <div className="flex items-center justify-center gap-5">
          {socials.map(({ key, href, Icon, label, iconClass, hoverClass }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={[
                'group relative flex items-center justify-center w-14 h-14 rounded-full',
                'border border-border-light bg-white',
                'transition-all duration-300 ease-out',
                'hover:scale-110 hover:-translate-y-1 hover:border-transparent',
                hoverClass,
              ].join(' ')}
            >
              <Icon
                className={[
                  'w-5 h-5 transition-all duration-300',
                  'group-hover:text-white group-hover:scale-110',
                  iconClass,
                ].join(' ')}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
