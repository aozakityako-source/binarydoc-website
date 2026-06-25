import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function VideoModal({
  playerSrc,
  title,
  onClose,
}: {
  playerSrc: string;
  title: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative w-full max-w-[1100px] aspect-video shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={playerSrc}
          title={title}
          className="absolute inset-0 w-full h-full"
          scrolling="no"
          frameBorder="0"
          allowFullScreen
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭"
          className="absolute -top-3 -right-3 flex items-center justify-center w-9 h-9 rounded-full bg-white text-black shadow-lg hover:bg-brand-blue hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>,
    document.body,
  );
}
