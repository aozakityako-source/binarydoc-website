import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { siteConfig } from '@/config/site';
import Logo from '@/components/Logo';

const navItems = [
  { key: 'nav_home', href: '/' },
  { key: 'nav_cases', href: '/cases' },
  { key: 'nav_firmware', href: '/firmware' },
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
          <Logo className="w-8 h-8" />
          <span className="text-2xl font-bold tracking-tight">{siteConfig.brandName[lang]}</span>
        </Link>

        {/* Center nav */}
        <div className="hidden min-[900px]:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 bg-white/10 rounded-full px-2 py-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.key}
                to={item.href}
                className={`px-4 py-2 text-base rounded-full transition-all duration-300 ${
                  isActive ? 'bg-white text-black font-semibold' : 'text-white/70 hover:text-white hover:bg-white/10 font-medium'
                }`}
              >
                {t[item.key as keyof typeof t]}
              </Link>
            );
          })}
        </div>

        {/* Right — auth + language */}
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden sm:inline-block px-4 py-2 border border-white/40 text-white text-base font-mono font-medium transition-all duration-300 hover:bg-white hover:text-black"
          >
            {t.nav_login}
          </Link>
          <Link
            to="/signup"
            className="hidden sm:inline-block px-4 py-2 bg-brand-blue text-black text-base font-semibold font-mono transition-all duration-300 hover:opacity-90"
          >
            {t.nav_signup}
          </Link>
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-white/70 text-sm hover:text-white transition-colors duration-300 px-2 py-1 rounded-full hover:bg-white/10 font-mono font-medium"
            aria-label="Switch language"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase text-sm font-semibold">{lang}</span>
          </button>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className="min-[900px]:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-white/10 z-50">
        <div className="flex items-center justify-around h-14">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-all duration-300 text-sm font-mono font-medium ${
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
