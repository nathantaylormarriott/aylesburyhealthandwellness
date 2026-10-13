import { getTikTokVideos } from './_shared/tiktokFeed';

const TIKTOK_PROFILE_URL = 'https://www.tiktok.com/@aylesbury.health.w';

type CacheEntry = { at: number; body: string };

const CACHE_MS = 15 * 60 * 1000;
let memoryCache: CacheEntry | null = null;

export default async () => {
  const now = Date.now();
  if (memoryCache && now - memoryCache.at < CACHE_MS) {
    return new Response(memoryCache.body, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=900, stale-while-revalidate=3600',
      },
    });
  }

  const videos = await getTikTokVideos(Netlify.env.get('TIKTOK_RSS_FEED') ?? undefined);
  const payload = JSON.stringify({
    videos,
    profileUrl: TIKTOK_PROFILE_URL,
    updatedAt: new Date().toISOString(),
  });

  memoryCache = { at: now, body: payload };

  return new Response(payload, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=900, stale-while-revalidate=3600',
    },
  });
};

export const config = {
  path: '/api/tiktok-videos',
};
