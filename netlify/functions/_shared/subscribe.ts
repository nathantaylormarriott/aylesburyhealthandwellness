import { createHash } from 'node:crypto';

type Input = {
  email?: unknown;
  phone?: unknown;
  name?: unknown;
  consent?: unknown;
  company?: unknown;
  apiKey?: string;
  listId?: string;
};

export type SubscribeResult = {
  ok: boolean;
  status: number;
  message: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function addNewsletterSubscriber(input: Input): Promise<SubscribeResult> {
  if (typeof input.company === 'string' && input.company.trim()) {
    return { ok: true, status: 200, message: 'Thanks. Please check your inbox to confirm.' };
  }

  if (input.consent !== true) {
    return { ok: false, status: 400, message: 'Please confirm you want to hear from us.' };
  }

  const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
  if (!EMAIL.test(email)) {
    return { ok: false, status: 400, message: 'Enter a valid email address.' };
  }

  const phone = typeof input.phone === 'string' ? input.phone.trim() : '';
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const mergeFields: Record<string, string> = {};
  if (name) {
    const [first, ...rest] = name.split(/\s+/);
    mergeFields.FNAME = first;
    if (rest.length) mergeFields.LNAME = rest.join(' ');
    mergeFields.MMERGE10 = name;
  }
  if (phone) mergeFields.PHONE = phone;

  const apiKey = input.apiKey?.trim();
  const listId = input.listId?.trim();
  const dc = apiKey?.split('-').pop();
  if (!apiKey || !listId || !dc) {
    return { ok: false, status: 500, message: 'Newsletter signup is not configured yet.' };
  }

  const hash = createHash('md5').update(email).digest('hex');
  const response = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members/${hash}`, {
    method: 'PUT',
    headers: {
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: email,
      status_if_new: 'pending',
      ...(Object.keys(mergeFields).length ? { merge_fields: mergeFields } : {}),
    }),
  });

  if (response.ok) {
    const data = (await response.json()) as { status?: string };
    if (data.status === 'subscribed') {
      return { ok: true, status: 200, message: 'You are already on the list.' };
    }
    return { ok: true, status: 200, message: 'Thanks. Please check your inbox to confirm.' };
  }

  const error = (await response.json().catch(() => null)) as { title?: string } | null;
  console.error('Mailchimp subscribe failed', response.status, error?.title ?? 'unknown');
  if (error?.title === 'Member Exists') {
    return { ok: true, status: 200, message: 'You are already on the list.' };
  }
  if (error?.title === 'Forgotten Email Not Subscribed' || error?.title === 'Member In Compliance State') {
    return {
      ok: false,
      status: 400,
      message: 'This address was unsubscribed before. Contact the clinic if you would like to rejoin.',
    };
  }

  return { ok: false, status: 502, message: 'We could not add you just now. Please try again shortly.' };
}
