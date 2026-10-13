import { addNewsletterSubscriber } from './_shared/subscribe';

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return Response.json({ ok: false, message: 'Method not allowed' }, { status: 405 });
  }

  let body: { email?: unknown; phone?: unknown; name?: unknown; message?: unknown; company?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, message: 'Please check the form and try again.' }, { status: 400 });
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (!name || !phone || !message) {
    return Response.json({ ok: false, message: 'Please complete every field.' }, { status: 400 });
  }

  const result = await addNewsletterSubscriber({
    email: body.email,
    phone,
    name,
    consent: true,
    company: body.company,
    apiKey: Netlify.env.get('MAILCHIMP_API_KEY'),
    listId: Netlify.env.get('MAILCHIMP_AUDIENCE_ID'),
  });

  return Response.json({ ok: result.ok, message: result.message }, { status: result.status });
};

export const config = {
  path: '/api/contact',
  method: 'POST',
};
