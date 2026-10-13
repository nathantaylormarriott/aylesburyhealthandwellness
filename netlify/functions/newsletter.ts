import { addNewsletterSubscriber } from './_shared/subscribe';

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return Response.json({ ok: false, message: 'Method not allowed' }, { status: 405 });
  }

  let body: { email?: unknown; consent?: unknown; company?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, message: 'Enter a valid email address.' }, { status: 400 });
  }

  const result = await addNewsletterSubscriber({
    email: body.email,
    consent: body.consent,
    company: body.company,
    apiKey: Netlify.env.get('MAILCHIMP_API_KEY'),
    listId: Netlify.env.get('MAILCHIMP_AUDIENCE_ID'),
  });

  return Response.json({ ok: result.ok, message: result.message }, { status: result.status });
};

export const config = {
  path: '/api/newsletter',
  method: 'POST',
};
