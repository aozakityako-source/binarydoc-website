import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useLanguage } from '@/hooks/useLanguage';
import { firmwareFamilies, firmwareStats, type FirmwareFamily } from '@/data/firmware';
import FamilyDetailModal from '@/components/FamilyDetailModal';

function formatBytes(b: number): string {
  if (!b) return '0 B';
  const u = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(Math.floor(Math.log(b) / Math.log(1024)), u.length - 1);
  return `${(b / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${u[i]}`;
}

const ORDER = ['Seagate', 'Western Digital', 'Samsung', 'Hitachi', 'Toshiba'];

export default function FirmwareSection() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialMfr = searchParams.get('mfr');
  const [filter, setFilter] = useState<string>(initialMfr && ORDER.includes(initialMfr) ? initialMfr : 'All');
  const [q, setQ] = useState(searchParams.get('q') || '');
  const [selected, setSelected] = useState<FirmwareFamily | null>(null);

  const manufacturers = useMemo(() => ['All', ...ORDER], []);

  const visible = useMemo(() => {
    return firmwareFamilies.filter((f) => {
      const matchMfr = filter === 'All' || f.manufacturer === filter;
      const needle = q.toLowerCase();
      const matchQ =
        !q ||
        f.familyCode.toLowerCase().includes(needle) ||
        f.donors.some((d) => d.name.toLowerCase().includes(needle));
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
            <h2 className="text-2xl md:text-4xl font-normal mt-2">
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
            <div
              key={`${f.manufacturer}-${f.familyCode}`}
              onClick={() => setSelected(f)}
              className="bg-[#0a0a0a] p-4 hover:bg-white/5 transition-colors duration-200 cursor-pointer"
            >
              <div className="font-mono text-sm text-brand-blue">{f.familyCode}</div>
              <div className="text-xs text-white/40 mt-1">
                {f.manufacturer} · {f.arch}
              </div>
              <div className="text-xs text-white/60 mt-2">
                {f.donorCount} {t.firmware_donors} · {f.fileCount} files · {formatBytes(f.totalBytes)}
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
        {selected && <FamilyDetailModal family={selected} onClose={() => setSelected(null)} />}
      </div>
    </section>
  );
}
