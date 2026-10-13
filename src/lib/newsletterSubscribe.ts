import { submitNetlifyForm } from './netlifyForm';

export type NewsletterSubscribeResult = {
  ok: boolean;
  message: string;
};

export async function subscribeNewsletter(email: string, company = ''): Promise<NewsletterSubscribeResult> {
  try {
    const [saved, response] = await Promise.all([
      submitNetlifyForm('newsletter', { email, 'bot-field': company }),
      fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent: true, company }),
      }),
    ]);
    if (!saved) {
      return { ok: false, message: 'Something went wrong. Please try again.' };
    }
    const data = (await response.json()) as { ok?: boolean; message?: string };
    return {
      ok: Boolean(data.ok),
      message: data.ok
        ? 'Thanks — check your inbox to confirm your 10% off.'
        : data.message || 'Something went wrong. Please try again.',
    };
  } catch {
    return { ok: false, message: 'Something went wrong. Please try again.' };
  }
}
