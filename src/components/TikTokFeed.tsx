import { useEffect, useRef, useState } from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { useMarqueeMotion } from '../hooks/useMarqueeMotion';
import ClinicNewsSignup from './ClinicNewsSignup';
import Reveal from './Reveal';

export const TIKTOK_PROFILE_URL = 'https://www.tiktok.com/@aylesbury.health.w';
const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/aylesburyhealthandwellness/';
const FACEBOOK_PROFILE_URL = 'https://www.facebook.com/701577316368186';

const socialButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-full bg-[#313C38] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#4a574f] sm:px-6';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
      />
    </svg>
  );
}

type TikTokVideo = {
  id: string;
  url: string;
  title: string;
  thumbnail?: string;
  playUrl?: string;
};

type FeedResponse = {
  videos: TikTokVideo[];
  profileUrl?: string;
};

function TikTokAutoplayVideo({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const playMuted = () => {
      video.muted = true;
      void video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting && entry.intersectionRatio > 0.12);
        if (visible) playMuted();
        else video.pause();
      },
      { threshold: [0, 0.12, 0.4] },
    );
    observer.observe(video);
    video.addEventListener('canplay', playMuted);

    return () => {
      observer.disconnect();
      video.removeEventListener('canplay', playMuted);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      loop
      muted
      playsInline
      disablePictureInPicture
      controls={false}
      preload="metadata"
      className="pointer-events-none h-full w-full object-cover"
    />
  );
}

function TikTokCard({ video }: { video: TikTokVideo }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noreferrer"
      aria-label={video.title || 'Open TikTok video'}
      className="tiktok-card relative block aspect-[9/16] overflow-hidden rounded-3xl border border-[#83896D]/20 bg-[#313C38]"
    >
      {video.playUrl ? (
        <TikTokAutoplayVideo src={video.playUrl} poster={video.thumbnail} />
      ) : video.thumbnail ? (
        <img src={video.thumbnail} alt="" className="h-full w-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
      ) : (
        <span className="flex h-full items-end p-4 text-sm text-[#FFFAF1]">@aylesbury.health.w</span>
      )}
    </a>
  );
}

export default function TikTokFeed() {
  const [videos, setVideos] = useState<TikTokVideo[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'empty'>('loading');
  const mobileMarquee = useMarqueeMotion({ durationMs: 32_000, direction: 'left' });
  const desktopMarquee = useMarqueeMotion({ durationMs: 48_000, direction: 'left' });

  useEffect(() => {
    let cancelled = false;
    fetch('/api/tiktok-videos')
      .then((response) => {
        if (!response.ok) throw new Error('feed');
        return response.json() as Promise<FeedResponse>;
      })
      .then((data) => {
        if (cancelled) return;
        const next = (data.videos ?? []).slice(0, 12);
        setVideos(next);
        setStatus(next.length > 0 ? 'ready' : 'empty');
      })
      .catch(() => {
        if (!cancelled) setStatus('empty');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const loop = [...videos, ...videos];

  return (
    <section id="tiktok" className="overflow-x-hidden bg-[#FFFAF1] pt-[120px] pb-[120px]">
      <Reveal className="mx-auto mb-20 flex max-w-3xl flex-col items-center px-8 text-center">
        <header>
          <h2 className="mb-0 text-balance text-4xl font-semibold leading-none text-[#313C38] sm:text-5xl md:text-6xl lg:text-[4rem]">
            From the clinic
          </h2>
          <p className="mt-1 text-balance text-lg leading-snug text-[#83896D] md:text-xl">
            Treatment glimpses, clinic life, and wellbeing notes from Aylesbury Health &amp; Wellness
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href={TIKTOK_PROFILE_URL} target="_blank" rel="noopener noreferrer" className={socialButtonClass}>
              <TikTokIcon className="h-[1.125rem] w-[1.125rem] shrink-0" />
              TikTok
            </a>
            <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noopener noreferrer" className={socialButtonClass}>
              <Instagram className="h-[1.125rem] w-[1.125rem] shrink-0" strokeWidth={2} />
              Instagram
            </a>
            <a href={FACEBOOK_PROFILE_URL} target="_blank" rel="noopener noreferrer" className={socialButtonClass}>
              <Facebook className="h-[1.125rem] w-[1.125rem] shrink-0" strokeWidth={2} />
              Facebook
            </a>
          </div>
        </header>
      </Reveal>

      {status === 'loading' && (
        <Reveal>
        <div className="flex gap-4 overflow-hidden px-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="aspect-[9/16] w-[11rem] shrink-0 animate-pulse rounded-3xl bg-[#83896D]/15 md:w-[14rem]" />
          ))}
        </div>
        </Reveal>
      )}

      {status === 'ready' && (
        <Reveal>
        <>
          <div ref={mobileMarquee.viewportRef} className="marquee-viewport px-8 md:hidden">
            <div ref={mobileMarquee.trackRef} className="marquee-track flex w-max items-stretch gap-4">
              {loop.map((video, index) => (
                <div key={`m-${video.id}-${index}`} className="marquee-slot w-[11.5rem] shrink-0">
                  <TikTokCard video={video} />
                </div>
              ))}
            </div>
          </div>
          <div ref={desktopMarquee.viewportRef} className="marquee-viewport hidden px-8 md:block">
            <div ref={desktopMarquee.trackRef} className="marquee-track flex w-max items-stretch gap-4">
              {loop.map((video, index) => (
                <div key={`d-${video.id}-${index}`} className="marquee-slot w-[13.5rem] shrink-0 lg:w-[15rem]">
                  <TikTokCard video={video} />
                </div>
              ))}
            </div>
          </div>
        </>
        </Reveal>
      )}

      {status === 'empty' && (
        <Reveal>
        <div className="mx-8 rounded-3xl border border-[#83896D]/20 bg-white px-6 py-10 text-[#83896D]">
          <p>Clips are taking a moment to load.</p>
          <a href={TIKTOK_PROFILE_URL} target="_blank" rel="noreferrer" className="mt-4 inline-flex font-medium text-[#313C38] underline-offset-4 hover:underline">
            Watch on TikTok
          </a>
        </div>
        </Reveal>
      )}

      <ClinicNewsSignup className="mt-20 md:mt-28" />
    </section>
  );
}
