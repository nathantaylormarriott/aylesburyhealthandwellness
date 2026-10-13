import { FormEvent, useEffect, useRef, useState } from 'react';
import type Lenis from 'lenis';
import { ArrowRight } from 'lucide-react';
import { getLenisInstance } from '../lib/lenisScroll';
import { submitNetlifyForm } from '../lib/netlifyForm';
import Container from './Container';

const HERO_PARALLAX_FACTOR = 0.22;
/** Scroll distance (× viewport height) before hero foreground is fully faded. */
const HERO_FADE_VIEWPORT_FACTOR = 0.68;
const HERO_FADE_MAX_BLUR_PX = 8;
/** Certs start fading after this fraction of the hero fade scroll range. */
const CERTS_FADE_SCROLL_DELAY = 0.28;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function fadeAmount(scrollProgress: number, start: number, span: number) {
  const t = (scrollProgress - start) / span;
  return easeOutCubic(Math.max(0, Math.min(1, t)));
}

function applyScrollFade(
  el: HTMLElement,
  amount: number,
  maxBlurPx: number,
  reduceMotion: boolean,
) {
  const opacity = 1 - amount;
  el.style.opacity = String(opacity);
  el.style.pointerEvents = opacity < 0.12 ? 'none' : '';
  if (reduceMotion) {
    el.style.filter = 'none';
  } else {
    el.style.filter = amount > 0 ? `blur(${amount * maxBlurPx}px)` : 'none';
  }
}

const accreditations = [
  { name: 'BACP', src: '/images/accreditations/BACP_accreditation carousel copy.png', height: 'h-10 md:h-14', margin: '-mb-0.5' },
  { name: 'CNHC', src: '/images/accreditations/CNHC_accreditation carousel copy.png', height: 'h-8 md:h-11', margin: '' },
  { name: 'HCPC', src: '/images/accreditations/HCPC_accreditation carousel copy.png', height: 'h-8 md:h-11', margin: '' },
  { name: 'RICTAT', src: '/images/accreditations/RICTAT_accreditation carousel copy.png', height: 'h-8 md:h-11', margin: '' },
  { name: 'SMAE', src: '/images/accreditations/SMAE_accreditation carousel copy.png', height: 'h-9 md:h-12', margin: '-mb-1' },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [offerStatus, setOfferStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [offerMessage, setOfferMessage] = useState('');
  const parallaxRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLFormElement>(null);
  const offerBlurRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const layer = parallaxRef.current;
    const copy = copyRef.current;
    const offer = offerRef.current;
    const offerBlur = offerBlurRef.current;
    const certs = certsRef.current;
    if (!hero) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateOnScroll = () => {
      const rect = hero.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      const fadeDistance = Math.max(window.innerHeight * HERO_FADE_VIEWPORT_FACTOR, 1);
      const scrollProgress = Math.min(scrolled / fadeDistance, 1);

      if (copy) {
        const copyFade = fadeAmount(scrollProgress, 0, 0.92);
        applyScrollFade(copy, copyFade, HERO_FADE_MAX_BLUR_PX, reduceMotion);
      }
      if (offer) {
        const offerFade = fadeAmount(scrollProgress, 0, 0.92);
        const remain = 1 - offerFade;
        offer.style.setProperty('--offer-fade', String(offerFade));
        offer.style.pointerEvents = remain < 0.12 ? 'none' : '';
        if (offerBlur) {
          const blurPx = reduceMotion ? (remain > 0.5 ? 28 : 0) : remain * 28;
          const filter = `blur(${blurPx.toFixed(2)}px) saturate(1.5)`;
          offerBlur.style.backdropFilter = filter;
          offerBlur.style.setProperty('-webkit-backdrop-filter', filter);
          offerBlur.style.backgroundColor = `rgba(255, 250, 241, ${0.22 * remain})`;
          offerBlur.style.borderColor = `rgba(255, 250, 241, ${0.5 * remain})`;
          offerBlur.style.boxShadow = `0 10px 15px -3px rgb(0 0 0 / ${0.1 * remain}), 0 4px 6px -4px rgb(0 0 0 / ${0.1 * remain})`;
        }
      }
      if (certs) {
        const certsFade = fadeAmount(scrollProgress, CERTS_FADE_SCROLL_DELAY, 0.95);
        applyScrollFade(certs, certsFade, HERO_FADE_MAX_BLUR_PX * 0.65, reduceMotion);
      }

      if (layer && !reduceMotion) {
        const travel = Math.min(scrolled, hero.offsetHeight);
        const y = travel * HERO_PARALLAX_FACTOR;
        layer.style.transform = `translate3d(0, ${y}px, 0)`;
      }
    };

    const onLenisScroll = (_lenis: Lenis) => updateOnScroll();

    const lenis = getLenisInstance();
    if (lenis) {
      lenis.on('scroll', onLenisScroll);
      updateOnScroll();
      return () => lenis.off('scroll', onLenisScroll);
    }

    window.addEventListener('scroll', updateOnScroll, { passive: true });
    updateOnScroll();
    return () => window.removeEventListener('scroll', updateOnScroll);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollAmount += scrollSpeed;
      if (scrollContainer) {
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft = scrollAmount;
        }
      }
    };

    const intervalId = setInterval(scroll, 20);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section
      id="site-hero"
      ref={heroRef}
      className="relative flex min-h-[100svh] flex-col bg-[#313C38] pt-[4.5rem] pb-0"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div
          ref={parallaxRef}
          className="absolute inset-x-0 -top-[6%] h-[112%] bg-cover bg-center bg-no-repeat will-change-transform"
          style={{ backgroundImage: 'url(/images/heroimageblurred.webp)' }}
        />
      </div>
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            'linear-gradient(to right, rgba(32, 26, 22, 0.48) 0%, rgba(32, 26, 22, 0.24) 38%, rgba(32, 26, 22, 0.05) 68%, transparent 100%)',
        }}
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
      <Container className="flex min-h-0 flex-1 items-center justify-start py-4 md:py-10">
        <div className="w-full max-w-3xl shrink-0 text-left">
          <div ref={copyRef} className="will-change-[opacity,filter]">
          <h1 className="mb-5 text-balance text-4xl font-semibold leading-tight text-white drop-shadow-lg sm:text-5xl md:mb-6 md:text-6xl lg:text-[4rem] lg:leading-[1.05]">
            Expert care for your body, mind, and wellbeing.
          </h1>

          <p className="mb-3 max-w-3xl text-pretty text-base leading-relaxed text-white/95 drop-shadow-md sm:text-lg md:mb-4 md:text-xl">
            Our clinic is a safe, inclusive space where everyone is welcome.
          </p>
          </div>

          <form
            ref={offerRef}
            name="newsletter"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="w-full max-w-xl"
            onSubmit={async (event: FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setOfferStatus('loading');
              setOfferMessage('');
              const company = (event.currentTarget.elements.namedItem('company') as HTMLInputElement | null)?.value ?? '';
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
                setOfferStatus(data.ok ? 'success' : 'error');
                setOfferMessage(
                  data.ok
                    ? 'Check your inbox for 10% off.'
                    : data.message || 'Something went wrong. Please try again.',
                );
                if (data.ok) setEmail('');
              } catch {
                setOfferStatus('error');
                setOfferMessage('Something went wrong. Please try again.');
              }
            }}
          >
            <input type="hidden" name="form-name" value="newsletter" />
            <label className="sr-only" htmlFor="hero-company">
              Company
            </label>
            <input
              id="hero-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />
            <div className="hero-offer-pill relative rounded-full">
              <div ref={offerBlurRef} className="hero-offer-pill-blur" aria-hidden />
              <div className="hero-offer-fade relative flex items-center gap-2 py-1.5 pl-5 pr-1.5">
              <label htmlFor="hero-offer-email" className="sr-only">
                Sign up to our newsletter for 10% off your first visit
              </label>
              <input
                id="hero-offer-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Sign up to our newsletter for 10% off your first visit"
                className="hero-offer-email min-w-0 flex-1 appearance-none bg-transparent text-xs font-medium text-white outline-none placeholder:font-medium placeholder:text-white/95 sm:text-sm"
              />
              <button
                type="submit"
                disabled={offerStatus === 'loading'}
                aria-label="Sign up to our newsletter for 10% off your first visit"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFFAF1] text-[#313C38] shadow-sm transition hover:bg-white disabled:opacity-60"
              >
                <ArrowRight size={18} strokeWidth={2} />
              </button>
              </div>
            </div>
            {offerMessage ? (
              <p className="hero-offer-fade mt-2 text-sm text-white" role="status">
                {offerMessage}
              </p>
            ) : null}
          </form>
        </div>
      </Container>

      <Container className="shrink-0 pb-4 pt-2">
        <div
          ref={certsRef}
          className="mx-auto w-full max-w-xl sm:max-w-2xl md:max-w-3xl will-change-[opacity,filter]"
        >
          <p className="text-center text-xs text-white/90 mb-2 font-medium drop-shadow-md">Certified by:</p>
          <div
            className="relative overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)',
            }}
          >
            <div
              ref={scrollRef}
              className="flex gap-8 md:gap-10 py-1 overflow-x-hidden"
              style={{ scrollBehavior: 'auto' }}
            >
              {[...accreditations, ...accreditations, ...accreditations].map((accreditation, index) => (
                <div
                  key={`${accreditation.name}-${index}`}
                  className="flex-shrink-0 flex items-center"
                >
                  <img
                    src={accreditation.src}
                    alt={accreditation.name}
                    className={`${accreditation.height} ${accreditation.margin} w-auto object-contain opacity-90 hover:opacity-100 transition-opacity`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
      </div>
    </section>
  );
}
