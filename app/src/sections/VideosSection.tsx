import { useLanguage } from '@/hooks/useLanguage';
import { videos, youtubeVideos } from '@/data/videos';
import VideoCard from '@/components/VideoCard';

export default function VideosSection() {
  const { t, lang } = useLanguage();

  // Chinese → Bilibili, English → YouTube (same channel, cross-posted).
  const list =
    lang === 'en'
      ? youtubeVideos.map((v) => ({
          playerSrc: `https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`,
          cover: v.cover,
          title: v.title,
          tag: v.tag,
        }))
      : videos.map((v) => ({
          playerSrc: `https://player.bilibili.com/player.html?bvid=${v.bvid}&autoplay=1&high_quality=1&aswide=1`,
          cover: v.cover,
          title: v.title[lang],
          tag: v.tag[lang],
        }));

  return (
    <section id="cases" className="py-[50px] bg-bg-light border-t border-border-light">
      <div className="container-main">
        <h2 className="text-2xl md:text-4xl font-normal text-text-primary text-center mb-4">
          {t.cases_title}
        </h2>
        <p className="text-sm text-text-secondary text-center mb-10 max-w-[600px] mx-auto">
          {t.cases_subtitle}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((v, i) => (
            <VideoCard key={i} video={v} />
          ))}
        </div>
      </div>
    </section>
  );
}
