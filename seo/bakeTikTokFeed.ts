import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { Plugin } from 'vite';
import { getTikTokVideos, type TikTokVideo } from '../netlify/functions/_shared/tiktokFeed';
import { isAllowedTikTokVideoUrl, proxyTikTokVideo } from '../netlify/functions/_shared/tiktokMedia';

const PROFILE_URL = 'https://www.tiktok.com/@aylesbury.health.w';
const MAX_BYTES = 28 * 1024 * 1024;

const fetchHeaders = {
  Referer: 'https://www.tiktok.com/',
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
};

function playTarget(playUrl?: string) {
  if (!playUrl) return null;
  try {
    return new URL(playUrl, 'https://local.invalid').searchParams.get('url');
  } catch {
    return null;
  }
}

async function saveResponse(response: Response, dest: string) {
  if (!response.ok) return false;
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 1000 || bytes.length > MAX_BYTES) return false;
  await writeFile(dest, bytes);
  return true;
}

async function downloadThumbnail(url: string, dest: string) {
  const response = await fetch(url, { headers: fetchHeaders });
  return saveResponse(response, dest);
}

async function downloadPlayable(video: TikTokVideo, dir: string): Promise<TikTokVideo> {
  const next: TikTokVideo = { ...video, playUrl: undefined, thumbnail: undefined };
  const target = playTarget(video.playUrl);

  if (target && isAllowedTikTokVideoUrl(target)) {
    const upstream = await proxyTikTokVideo(target);
    const saved = await saveResponse(upstream, path.join(dir, `${video.id}.mp4`));
    if (saved) next.playUrl = `/tiktok/${video.id}.mp4`;
  }

  if (video.thumbnail) {
    const saved = await downloadThumbnail(video.thumbnail, path.join(dir, `${video.id}.jpg`));
    if (saved) next.thumbnail = `/tiktok/${video.id}.jpg`;
  }

  return next;
}

/** Production is a static cPanel deploy, so copy playable clips into dist at build time. */
export function bakeTikTokFeedPlugin(): Plugin {
  let outDir = path.resolve('dist');

  return {
    name: 'bake-tiktok-feed',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.build.outDir);
    },
    async closeBundle() {
      const dir = path.join(outDir, 'tiktok');
      await mkdir(dir, { recursive: true });

      let source: TikTokVideo[] = [];
      try {
        source = await getTikTokVideos();
      } catch (error) {
        console.warn('[tiktok] feed fetch failed', error);
      }

      const videos: TikTokVideo[] = [];
      for (const video of source.slice(0, 12)) {
        try {
          const baked = await downloadPlayable(video, dir);
          if (baked.playUrl || baked.thumbnail) videos.push(baked);
        } catch (error) {
          console.warn(`[tiktok] skipped ${video.id}`, error);
        }
      }

      await writeFile(
        path.join(dir, 'feed.json'),
        JSON.stringify({
          videos,
          profileUrl: PROFILE_URL,
          updatedAt: new Date().toISOString(),
        }),
      );

      console.log(`[tiktok] baked ${videos.length} clips into dist/tiktok`);
    },
  };
}
