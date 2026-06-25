import { Link } from 'react-router';
import { useLanguage } from '@/hooks/useLanguage';
import { siteConfig } from '@/config/site';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
      />
      <div className="absolute inset-0 bg-black/[0.65]" />

      <div className="relative z-10 text-center px-4 hero-stagger">
        <span className="inline-block font-extrabold text-3xl md:text-[40px] tracking-[0.2em] uppercase text-brand-blue mb-6">
          {siteConfig.tagline}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
          {t.hero_title}
        </h1>
        <p className="text-lg md:text-2xl text-white/80 mb-10 max-w-xl mx-auto">
          {t.hero_subtitle}
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/cases"
            className="px-8 py-3 bg-brand-blue text-black text-lg md:text-xl font-bold transition-all duration-300 hover:opacity-90"
          >
            {t.hero_cta_cases}
          </Link>
          <Link
            to="/firmware"
            className="px-8 py-3 border border-white/60 text-white text-lg md:text-xl font-bold transition-all duration-300 hover:bg-white hover:text-black"
          >
            {t.hero_cta_firmware}
          </Link>
        </div>
      </div>
    </section>
  );
}
