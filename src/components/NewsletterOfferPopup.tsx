import { FormEvent, useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { subscribeNewsletter } from '../lib/newsletterSubscribe';

const POPUP_DELAY_MS = 10_000;
const SESSION_KEY = 'ahw-newsletter-offer-popup';

type PopupState = 'hidden' | 'open' | 'success';

function readSession(): PopupState {
  if (typeof sessionStorage === 'undefined') return 'hidden';
  const value = sessionStorage.getItem(SESSION_KEY);
  if (value === 'subscribed') return 'success';
  if (value === 'dismissed') return 'hidden';
  return 'hidden';
}

export default function NewsletterOfferPopup() {
  const titleId = useId();
  const emailRef = useRef<HTMLInputElement>(null);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const dismiss = (reason: 'dismissed' | 'subscribed') => {
    sessionStorage.setItem(SESSION_KEY, reason);
    setVisible(false);
  };

  useEffect(() => {
    if (readSession() !== 'hidden') return;

    const timer = window.setTimeout(() => {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      setVisible(true);
    }, POPUP_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss('dismissed');
    };

    window.addEventListener('keydown', onKeyDown);
    const focusTimer = window.setTimeout(() => emailRef.current?.focus(), 120);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [visible]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError(false);

    const form = event.currentTarget;
    const company = (form.elements.namedItem('company') as HTMLInputElement | null)?.value ?? '';
    const result = await subscribeNewsletter(email.trim(), company);

    setLoading(false);
    setMessage(result.message);
    setError(!result.ok);
    if (result.ok) {
      setEmail('');
      window.setTimeout(() => dismiss('subscribed'), 2200);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close offer"
        className="absolute inset-0 bg-[#313C38]/55 backdrop-blur-[2px]"
        onClick={() => dismiss('dismissed')}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-lenis-prevent
        className="newsletter-offer-popup relative w-full max-w-md overflow-hidden rounded-3xl border border-[#FFFAF1]/15 bg-[#83896D] text-[#FFFAF1] shadow-2xl"
      >
        <button
          type="button"
          onClick={() => dismiss('dismissed')}
          className="absolute right-3 top-3 z-[1] inline-flex h-9 w-9 items-center justify-center rounded-full text-[#FFFAF1]/85 transition hover:bg-[#FFFAF1]/15 hover:text-[#FFFAF1]"
          aria-label="Close"
        >
          <X size={20} strokeWidth={1.75} />
        </button>

        <div className="px-6 pb-2 pt-6 sm:px-7 sm:pt-7">
          <h2 id={titleId} className="pr-8 text-balance text-2xl font-semibold leading-tight sm:text-[1.65rem]">
            Sign up for 10% off your first visit
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#FFFAF1]/92 sm:text-base">
            Join our newsletter for clinic news, seasonal treatments, and your welcome discount.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-3 px-6 pb-6 pt-4 sm:px-7 sm:pb-7">
          <input name="company" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

          <div className="flex items-center gap-2 rounded-full border border-[#83896D]/25 bg-white py-1.5 pl-5 pr-1.5 shadow-sm focus-within:border-[#5A6252]">
            <label className="sr-only" htmlFor="newsletter-offer-email">
              Email address
            </label>
            <input
              ref={emailRef}
              id="newsletter-offer-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email address"
              disabled={loading}
              className="min-w-0 flex-1 appearance-none bg-transparent py-2.5 text-base text-[#313C38] outline-none placeholder:text-[#83896D] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#313C38] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#4a574f] disabled:opacity-50"
            >
              {loading ? 'Sending…' : 'Sign up'}
              <ArrowRight size={18} strokeWidth={2} aria-hidden />
            </button>
          </div>

          {message ? (
            <p className={`text-sm ${error ? 'text-[#FFFAF1]/90' : 'text-[#FFFAF1]'}`} role="status">
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
