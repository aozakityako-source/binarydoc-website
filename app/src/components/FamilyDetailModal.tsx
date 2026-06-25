import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Loader2, ChevronRight } from 'lucide-react';
import type { FirmwareFamily } from '@/data/firmware';

interface KeyFile {
  path: string;
  size: number;
}
interface SnapDonor {
  name: string;
  keyFiles: KeyFile[];
  keyCount: number;
  otherCount: number;
  totalBytes: number;
}
type Snapshot = Record<string, { donors: SnapDonor[] }>;

// Module-level cache: fetch the snapshot once, reuse across modal opens.
let snapPromise: Promise<Snapshot> | null = null;
function loadSnapshot(): Promise<Snapshot> {
  if (!snapPromise) snapPromise = fetch('/firmware-snapshot.json').then((r) => r.json());
  return snapPromise;
}

function formatBytes(b: number): string {
  if (!b) return '0 B';
  const u = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(Math.floor(Math.log(b) / Math.log(1024)), u.length - 1);
  return `${(b / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${u[i]}`;
}

export default function FamilyDetailModal({
  family,
  onClose,
}: {
  family: FirmwareFamily;
  onClose: () => void;
}) {
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [snapError, setSnapError] = useState(false);
  const [query, setQuery] = useState('');
  const [openDonor, setOpenDonor] = useState<string | null>(null);

  const load = useCallback(() => {
    setSnapError(false);
    loadSnapshot()
      .then((s) => setSnap(s))
      .catch(() => setSnapError(true));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const snapFam = snap?.[family.familyCode];
  const needle = query.trim().toLowerCase();
  const donors = (snapFam?.donors ?? []).filter((d) => !needle || d.name.toLowerCase().includes(needle));

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={family.familyCode}
    >
      <div
        className="relative bg-[#0a0a0a] border border-white/15 w-full max-w-3xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-4 border-b border-white/10">
          <div className="min-w-0">
            <div className="font-mono text-base text-brand-blue">{family.familyCode}</div>
            <div className="text-xs text-white/50 mt-1">
              {family.manufacturer} · {family.arch} · {family.donorCount} donors · {family.fileCount} files ·{' '}
              {formatBytes(family.totalBytes)}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="shrink-0 ml-3 text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 border-b border-white/10">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="筛选 donor 名…"
            className="w-full px-3 py-2 bg-white/5 border border-white/15 text-sm font-mono text-white placeholder:text-white/30 focus:outline-none focus:border-brand-blue"
          />
        </div>

        <div className="overflow-y-auto p-3">
          {snapError ? (
            <div className="text-center py-10">
              <p className="text-white/60 text-sm mb-4">文件清单加载失败</p>
              <button
                type="button"
                onClick={() => {
                  setSnapError(false);
                  snapPromise = null;
                  setSnap(null);
                  load();
                }}
                className="px-4 py-2 text-sm font-mono border border-white/30 text-white/80 hover:border-brand-blue hover:text-brand-blue transition-colors"
              >
                重试
              </button>
            </div>
          ) : !snap ? (
            <div className="flex items-center gap-2 text-white/50 text-sm py-8 justify-center">
              <Loader2 className="w-4 h-4 animate-spin" /> 加载文件清单…
            </div>
          ) : donors.length === 0 ? (
            <div className="text-white/40 text-sm py-8 text-center">无匹配 donor</div>
          ) : (
            <ul className="space-y-1">
              {donors.map((d) => {
                const open = openDonor === d.name;
                return (
                  <li key={d.name} className="border border-white/10">
                    <button
                      type="button"
                      onClick={() => setOpenDonor(open ? null : d.name)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-white/5"
                    >
                      <ChevronRight
                        className={`w-4 h-4 text-white/40 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`}
                      />
                      <span className="font-mono text-xs text-white/90 break-all flex-1">{d.name}</span>
                      <span className="text-xs text-white/40 shrink-0">
                        {d.keyCount} key · {d.otherCount} more · {formatBytes(d.totalBytes)}
                      </span>
                    </button>
                    {open && (
                      <ul className="px-3 pb-3 pl-9 space-y-0.5">
                        {d.keyFiles.map((f) => (
                          <li key={f.path} className="flex items-center gap-2 text-xs">
                            <span className="font-mono text-white/70 break-all flex-1">{f.path}</span>
                            <span className="text-white/35 shrink-0">{formatBytes(f.size)}</span>
                          </li>
                        ))}
                        {d.otherCount > 0 && (
                          <li className="text-xs text-white/30 italic">
                            + {d.otherCount} 个 SA 模块/数据文件未显示
                          </li>
                        )}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
