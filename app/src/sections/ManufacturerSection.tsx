import { Link } from 'react-router';
import { useLanguage } from '@/hooks/useLanguage';
import Reveal from '@/components/Reveal';

// manufacturer display name → brand logo (native-aspect, self-hosted).
// showName only for Seagate — its logo is a symbol, the others are wordmarks.
const manufacturers: { name: string; logo: string; showName?: boolean }[] = [
  { name: 'Seagate', logo: '/images/manufacturers/seagate.svg', showName: true },
  { name: 'Western Digital', logo: '/images/manufacturers/westerndigital.png' },
  { name: 'Samsung', logo: '/images/manufacturers/samsung.png' },
  { name: 'Hitachi', logo: '/images/manufacturers/hitachi.png' },
  { name: 'Toshiba', logo: '/images/manufacturers/toshiba.png' },
];

export default function ManufacturerSection() {
  const { t } = useLanguage();

  return (
    <section className="py-[50px] bg-white border-t border-border-light">
      <div className="container-main text-center">
        <Reveal>
          <h2 className="text-2xl font-medium text-text-primary mb-10">{t.manufacturer_title}</h2>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-[900px] mx-auto">
          {manufacturers.map(({ name, logo, showName }, i) => (
            <Reveal key={name} delay={i * 80}>
              <Link
                to={'/firmware?mfr=' + encodeURIComponent(name)}
                aria-label={name}
                className="lift flex w-full flex-row items-center justify-center gap-2 p-5 min-h-[80px] border border-border-light hover:border-brand-blue hover:bg-brand-blue/5 transition-all duration-300"
              >
                <img src={logo} alt={name} className="max-h-14 max-w-[110px] object-contain" />
                {showName && <span className="text-base font-bold text-text-primary">{name}</span>}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
