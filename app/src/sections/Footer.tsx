import { useLanguage } from '@/hooks/useLanguage';
import { siteConfig } from '@/config/site';

export default function Footer() {
  const { lang } = useLanguage();
  const year = 2026;

  return (
    <footer className="bg-bg-footer font-mono">
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
