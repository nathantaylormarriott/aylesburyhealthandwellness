import { isAllowedTikTokVideoUrl, proxyTikTokVideo } from './_shared/tiktokMedia';

export default async (req: Request) => {
  const url = new URL(req.url).searchParams.get('url');
  if (!url || !isAllowedTikTokVideoUrl(url)) {
    return new Response('Invalid video URL', { status: 400 });
  }

  if (req.method === 'HEAD') {
    const response = await proxyTikTokVideo(url);
    return new Response(null, { status: response.status, headers: response.headers });
  }

  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  return proxyTikTokVideo(url);
};

export const config = {
  path: '/api/tiktok-media',
};
