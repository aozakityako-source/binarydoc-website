import { useState } from 'react';
import { Play } from 'lucide-react';
import VideoModal from './VideoModal';

export interface DisplayVideo {
  playerSrc: string;
  cover: string;
  title: string;
  tag: string;
}

export default function VideoCard({ video }: { video: DisplayVideo }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white overflow-hidden shadow-card">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Play: ${video.title}`}
          className="group relative flex items-center justify-center w-full aspect-video overflow-hidden bg-black"
        >
          <img
            src={video.cover}
            alt={video.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-200" />
          <span className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-brand-blue/90 shadow-lg group-hover:scale-110 transition-transform duration-200">
            <Play className="w-7 h-7 text-black" fill="currentColor" />
          </span>
        </button>
        <div className="p-4">
          <span className="inline-block font-mono text-xs text-brand-blue border border-brand-blue/40 px-2 py-0.5 mb-2">
            {video.tag}
          </span>
          <h3 className="text-sm font-semibold text-text-primary">{video.title}</h3>
        </div>
      </div>
      {open && <VideoModal playerSrc={video.playerSrc} title={video.title} onClose={() => setOpen(false)} />}
    </>
  );
}
