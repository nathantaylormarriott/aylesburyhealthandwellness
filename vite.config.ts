import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { addNewsletterSubscriber } from './netlify/functions/_shared/subscribe';
import { getTikTokVideos } from './netlify/functions/_shared/tiktokFeed';
import { isAllowedTikTokVideoUrl, proxyTikTokVideo } from './netlify/functions/_shared/tiktokMedia';
import { bakeTikTokFeedPlugin } from './seo/bakeTikTokFeed';
import { seoPlugin } from './seo/renderSeo';

function newsletterDevPlugin(): Plugin {
  return {
    name: 'newsletter-dev',
    configureServer(server) {
      server.middlewares.use('/__forms.html', (req, res, next) => {
        if (req.method !== 'POST') {
          next();
          return;
        }
        res.statusCode = 200;
        res.end('ok');
      });

      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, message: 'Method not allowed' }));
          return;
        }

        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(Buffer.from(chunk));
        let body: { email?: unknown; phone?: unknown; name?: unknown; message?: unknown; company?: unknown } = {};
        try {
          body = JSON.parse(Buffer.concat(chunks).toString() || '{}');
        } catch {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, message: 'Please check the form and try again.' }));
          return;
        }

        const message = typeof body.message === 'string' ? body.message.trim() : '';
        const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
        const name = typeof body.name === 'string' ? body.name.trim() : '';
        if (!name || !phone || !message) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, message: 'Please complete every field.' }));
          return;
        }

        const env = loadEnv(server.config.mode, process.cwd(), '');
        const result = await addNewsletterSubscriber({
          email: body.email,
          phone,
          name,
          consent: true,
          company: body.company,
          apiKey: env.MAILCHIMP_API_KEY,
          listId: env.MAILCHIMP_AUDIENCE_ID,
        });
        res.statusCode = result.status;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: result.ok, message: result.message }));
      });

      server.middlewares.use('/api/newsletter', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, message: 'Method not allowed' }));
          return;
        }

        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(Buffer.from(chunk));
        let body: { email?: unknown; consent?: unknown; company?: unknown } = {};
        try {
          body = JSON.parse(Buffer.concat(chunks).toString() || '{}');
        } catch {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, message: 'Enter a valid email address.' }));
          return;
        }

        const env = loadEnv(server.config.mode, process.cwd(), '');
        const result = await addNewsletterSubscriber({
          email: body.email,
          consent: body.consent,
          company: body.company,
          apiKey: env.MAILCHIMP_API_KEY,
          listId: env.MAILCHIMP_AUDIENCE_ID,
        });
        res.statusCode = result.status;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: result.ok, message: result.message }));
      });

      server.middlewares.use('/api/tiktok-videos', async (_req, res) => {
        try {
          const env = loadEnv(server.config.mode, process.cwd(), '');
          const videos = await getTikTokVideos(env.TIKTOK_RSS_FEED || undefined);
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              videos,
              profileUrl: 'https://www.tiktok.com/@aylesbury.health.w',
              updatedAt: new Date().toISOString(),
            }),
          );
        } catch {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ videos: [], profileUrl: 'https://www.tiktok.com/@aylesbury.health.w' }));
        }
      });

      server.middlewares.use('/api/tiktok-media', async (req, res) => {
        try {
          const requestUrl = new URL(req.url ?? '', 'http://localhost');
          const target = requestUrl.searchParams.get('url');
          if (!target || !isAllowedTikTokVideoUrl(target)) {
            res.statusCode = 400;
            res.end('Invalid video URL');
            return;
          }
          const upstream = await proxyTikTokVideo(target);
          res.statusCode = upstream.status;
          upstream.headers.forEach((value, key) => {
            res.setHeader(key, value);
          });
          res.end(Buffer.from(await upstream.arrayBuffer()));
        } catch {
          res.statusCode = 502;
          res.end('Video unavailable');
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), seoPlugin(), newsletterDevPlugin(), bakeTikTokFeedPlugin()],
  server: {
    host: true,
    strictPort: true,
    port: 5173,
  },
});
