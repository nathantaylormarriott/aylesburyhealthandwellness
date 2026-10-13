import { FormEvent, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import { submitNetlifyForm } from '../lib/netlifyForm';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ClinicNewsSignup({ className = '' }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    const form = event.currentTarget as HTMLFormElement;
    const company = (form.elements.namedItem('company') as HTMLInputElement | null)?.value ?? '';

    try {
      const [saved, response] = await Promise.all([
        submitNetlifyForm('newsletter', { email, 'bot-field': company }),
        fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, consent: true, company }),
        }),
      ]);
      if (!saved) throw new Error('form');
      const data = (await response.json()) as { ok?: boolean; message?: string };
      setStatus(data.ok ? 'success' : 'error');
      setMessage(
        data.ok ? 'Thanks — check your inbox to confirm.' : data.message || 'Something went wrong. Please try again.',
      );
      if (data.ok) setEmail('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <Reveal
      className={`mx-auto flex w-full max-w-3xl flex-col items-center px-8 text-center ${className}`.trim()}
    >
      <header>
        <h2 className="mb-0 text-balance text-4xl font-semibold leading-none text-[#313C38] sm:text-5xl md:text-6xl lg:text-[4rem]">
          Clinic news
        </h2>
        <p className="mt-1 text-balance text-lg leading-snug text-[#83896D] md:text-xl">
          Offers, seasonal treatments, and wellbeing notes from Aylesbury Health &amp; Wellness
        </p>
      </header>

      <form
        id="newsletter"
        name="newsletter"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={onSubmit}
        className="mt-8 w-full max-w-xl sm:max-w-2xl"
      >
        <input type="hidden" name="form-name" value="newsletter" />
        <label className="sr-only" htmlFor="clinic-news-company">Company</label>
        <input
          id="clinic-news-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden
        />

        <div
          className="flex items-center gap-2 rounded-full border border-[#83896D]/25 bg-white py-1.5 pl-5 pr-1.5 shadow-sm focus-within:border-[#5A6252]"
        >
          <label className="sr-only" htmlFor="clinic-news-email">Your email address</label>
          <input
            id="clinic-news-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email address"
            className="min-w-0 flex-1 appearance-none bg-transparent py-2.5 text-base text-[#313C38] outline-none placeholder:text-[#83896D] sm:text-lg"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#313C38] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#4a574f] disabled:opacity-50 sm:px-6 sm:text-base"
          >
            {status === 'loading' ? 'Sending…' : 'Sign up'}
            <ArrowRight size={18} strokeWidth={2} aria-hidden />
          </button>
        </div>

        {message ? (
          <p
            className={`mt-4 text-base ${status === 'success' ? 'text-[#313C38]' : 'text-[#8B5A4A]'}`}
            role="status"
          >
            {message}
          </p>
        ) : null}
      </form>
    </Reveal>
  );
}
