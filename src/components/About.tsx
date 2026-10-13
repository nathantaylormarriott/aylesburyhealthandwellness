import { useEffect, useRef } from 'react';
import { Heart, Users, Award, Clock, MapPin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type Lenis from 'lenis';
import site from '../../seo/site.json';
import { getLenisInstance } from '../lib/lenisScroll';
import Container from './Container';
import Reveal from './Reveal';

const tileLandscape = 'lg:col-span-2 lg:row-span-2 lg:min-h-0';
const tilePortrait = 'lg:col-span-2 lg:row-span-3 lg:min-h-0';
const tileFact = 'h-full lg:col-span-2 lg:row-span-2 min-h-0';

const photos = {
  feature: {
    src: '/images/clinic/about-feature.png',
    alt: 'Calm treatment room with massage table, soft lighting, and professional furnishings at Aylesbury Health and Wellness',
    span: tileLandscape,
    portrait: false,
  },
  courtyard: {
    src: '/images/clinic/gallery-courtyard-dusk.png',
    alt: 'Courtyard at Aylesbury Health and Wellness with warm lighting at dusk',
    span: tilePortrait,
    portrait: true,
  },
  oak: {
    src: '/images/clinic/gallery-oak-room.png',
    alt: 'The Oak Room — professional treatment space with certificates and clinical equipment',
    span: tilePortrait,
    portrait: true,
  },
  dual: {
    src: '/images/clinic/gallery-dual-treatment.png',
    alt: 'Spa treatment space with two massage tables',
    span: tilePortrait,
    portrait: true,
  },
  exterior: {
    src: '/images/clinic/gallery-exterior.png',
    alt: 'Aylesbury Health and Wellness exterior signage at the clinic',
    span: tilePortrait,
    portrait: true,
  },
  wellness: {
    src: '/images/clinic/gallery-wellness-room.png',
    alt: 'Wellness treatment room with professional equipment',
    span: tilePortrait,
    portrait: true,
  },
  room: {
    src: '/images/clinic/room.webp',
    alt: 'Bright treatment room with adjustable table, professional equipment, and oak cabinetry at Aylesbury Health and Wellness',
    span: tileLandscape,
    portrait: false,
  },
} as const;

type ValueTone = 'green-light' | 'green-mid' | 'green-olive' | 'green-dark';

const valueToneStyles: Record<
  ValueTone,
  { card: string; icon: string; body: string }
> = {
  'green-light': {
    card: 'bg-[#B2BCA4] text-[#313C38]',
    icon: 'text-[#313C38]/45',
    body: 'text-[#313C38]/90',
  },
  'green-mid': {
    card: 'bg-[#83896D] text-[#FFFAF1]',
    icon: 'text-[#FFFAF1]/45',
    body: 'text-[#FFFAF1]/92',
  },
  'green-olive': {
    card: 'bg-[#6B7A5B] text-[#FFFAF1]',
    icon: 'text-[#FFFAF1]/45',
    body: 'text-[#FFFAF1]/92',
  },
  'green-dark': {
    card: 'bg-[#5A6252] text-[#FFFAF1]',
    icon: 'text-[#FFFAF1]/45',
    body: 'text-[#FFFAF1]/92',
  },
};

const values: { title: string; body: string; icon: LucideIcon; span: string; tone: ValueTone }[] = [
  {
    title: 'Compassionate Care',
    body: 'Expert treatments delivered with empathy and understanding',
    icon: Heart,
    span: tileFact,
    tone: 'green-dark',
  },
  {
    title: 'Inclusive Space',
    body: 'Everyone is welcome in our safe and supportive environment',
    icon: Users,
    span: tileFact,
    tone: 'green-light',
  },
  {
    title: 'Professional Excellence',
    body: 'Registered practitioners with NHS and private sector experience',
    icon: Award,
    span: tileFact,
    tone: 'green-olive',
  },
];

function Photo({
  src,
  alt,
  portrait = true,
  eager = false,
}: {
  src: string;
  alt: string;
  portrait?: boolean;
  eager?: boolean;
}) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-3xl ${
        portrait ? 'aspect-[3/4] sm:aspect-[4/5] lg:aspect-auto' : 'aspect-[4/3] lg:aspect-auto'
      }`}
    >
      <img
        src={src}
        alt={alt}
        data-about-parallax
        className="about-parallax-photo"
        loading={eager ? 'eager' : 'lazy'}
      />
    </div>
  );
}

function ValueCard({ title, body, icon: Icon, tone }: Omit<(typeof values)[number], 'span'>) {
  const styles = valueToneStyles[tone];
  return (
    <article className={`flex h-full flex-col justify-between rounded-3xl p-4 sm:p-6 md:p-7 ${styles.card}`}>
      <Icon className={`h-8 w-8 shrink-0 sm:h-14 sm:w-14 md:h-16 md:w-16 ${styles.icon}`} strokeWidth={1.35} aria-hidden />
      <div className="mt-4 sm:mt-5">
        <h3 className="text-base font-semibold leading-snug sm:text-xl md:text-2xl">{title}</h3>
        <p className={`mt-1.5 text-sm leading-snug sm:mt-2 sm:text-base sm:leading-relaxed md:text-lg ${styles.body}`}>{body}</p>
      </div>
    </article>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const photos = [...section.querySelectorAll<HTMLImageElement>('[data-about-parallax]')];

    const update = () => {
      const viewH = window.innerHeight;
      for (const photo of photos) {
        const frame = photo.parentElement;
        if (!frame) continue;
        const rect = frame.getBoundingClientRect();
        if (rect.bottom < -40 || rect.top > viewH + 40) continue;
        const travel = rect.height * 0.045;
        const progress = (rect.top + rect.height / 2 - viewH / 2) / (viewH * 0.9);
        const shift = Math.max(-1, Math.min(1, progress)) * travel;
        photo.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
      }
    };

    const onLenisScroll = (_lenis: Lenis) => update();
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.on('scroll', onLenisScroll);
      update();
      return () => lenis.off('scroll', onLenisScroll);
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-[#FFFAF1] pt-[120px] pb-0">
      <Container>
        <Reveal className="mx-auto mb-20 max-w-3xl text-center">
          <header>
            <h2 className="mb-0 text-balance text-4xl font-semibold leading-none text-[#313C38] sm:text-5xl md:text-6xl lg:text-[4rem]">
              About our clinic
            </h2>
            <p className="mt-1 text-balance text-lg leading-snug text-[#83896D] md:text-xl">
              We believe true health comes from balancing physical and emotional wellbeing.
            </p>
          </header>
        </Reveal>

        <div className="about-bento grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-6 lg:auto-rows-[168px] [&>*]:min-h-0 [&>*]:h-full">
          <Reveal
            className={`${tilePortrait} about-founder col-span-2 relative aspect-[5/6] w-full sm:aspect-[4/5] lg:aspect-auto lg:h-full`}
          >
          <article
            className="relative h-full w-full overflow-hidden rounded-3xl border border-[#83896D]/15"
          >
            <img
              src="/images/clinic/anitta-stollery-portrait.webp"
              alt="Anita Stollery, Founder of Aylesbury Health and Wellness"
              width={1075}
              height={1344}
              data-about-parallax
              className="about-parallax-photo object-[center_18%]"
              loading="eager"
            />
            <div className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-14 sm:px-4 sm:pb-4 sm:pt-20 md:px-5 md:pb-5">
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden
                style={{
                  background:
                    'linear-gradient(to top, rgba(20, 24, 22, 0.78) 0%, rgba(20, 24, 22, 0.42) 55%, transparent 100%)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  maskImage: 'linear-gradient(to top, black 0%, black 42%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to top, black 0%, black 42%, transparent 100%)',
                }}
              />
              <div className="relative">
                <h3 className="text-lg font-semibold leading-none text-[#FFFAF1] sm:text-2xl md:text-3xl">Anita Stollery</h3>
                <p className="mt-0 text-sm font-medium leading-snug text-[#FFFAF1]/85 sm:text-base md:text-lg">Founder</p>
                <p className="mt-2 text-xs leading-snug text-[#FFFAF1]/90 sm:mt-3 md:hidden">
                  NHS and private Lead Practitioner, founder of our inclusive clinic at The Old Chapel in Bierton.
                </p>
                <p className="mt-2 hidden text-xs leading-snug text-[#FFFAF1]/90 sm:mt-3 sm:text-sm sm:leading-relaxed md:block md:text-base">
                  NHS and private-sector Lead Practitioner who founded our inclusive clinic at The Old Chapel in
                  Bierton, where expert holistic and clinical care come together.
                </p>
              </div>
            </div>
          </article>
          </Reveal>

          <Reveal className={photos.feature.span}>
            <Photo src={photos.feature.src} alt={photos.feature.alt} portrait={photos.feature.portrait} eager />
          </Reveal>
          <Reveal className={values[0].span}>
            <ValueCard {...values[0]} />
          </Reveal>

          <Reveal className={photos.courtyard.span}>
            <Photo src={photos.courtyard.src} alt={photos.courtyard.alt} portrait={photos.courtyard.portrait} />
          </Reveal>
          <Reveal className={values[1].span}>
            <ValueCard {...values[1]} />
          </Reveal>
          <Reveal className={photos.oak.span}>
            <Photo src={photos.oak.src} alt={photos.oak.alt} portrait={photos.oak.portrait} />
          </Reveal>
          <Reveal className={values[2].span}>
            <ValueCard {...values[2]} />
          </Reveal>

          <Reveal className={photos.dual.span}>
            <Photo src={photos.dual.src} alt={photos.dual.alt} portrait={photos.dual.portrait} />
          </Reveal>
          <Reveal className={tileFact}>
          <article
            className="flex h-full flex-col justify-between rounded-3xl bg-[#313C38] p-4 text-[#FFFAF1] sm:p-6 md:p-7"
          >
            <Clock className="h-8 w-8 shrink-0 text-[#FFFAF1]/45 sm:h-14 sm:w-14 md:h-16 md:w-16" strokeWidth={1.35} aria-hidden />
            <div className="mt-4 sm:mt-5">
              <h3 className="text-base font-semibold leading-snug sm:text-xl md:text-2xl">Opening Times</h3>
              <div className="mt-1.5 space-y-0.5 text-sm leading-snug text-[#FFFAF1]/92 sm:mt-2 sm:text-base sm:leading-relaxed md:text-lg">
                <p>Mon - Thurs: 09:00 - 19:00</p>
                <p>Fri & Sat: 09:00 - 20:00</p>
                <p>Sun: 10:00 - 17:00</p>
              </div>
            </div>
          </article>
          </Reveal>
          <Reveal className={photos.exterior.span}>
            <Photo src={photos.exterior.src} alt={photos.exterior.alt} portrait={photos.exterior.portrait} />
          </Reveal>
          <Reveal className={photos.wellness.span}>
            <Photo src={photos.wellness.src} alt={photos.wellness.alt} portrait={photos.wellness.portrait} />
          </Reveal>
          <Reveal className={`${tilePortrait} about-areas col-span-2`}>
          <article
            id="areas"
            className="flex h-full flex-col justify-between rounded-3xl bg-[#313C38] p-3.5 text-[#FFFAF1] sm:p-6 md:p-7"
          >
            <MapPin className="h-7 w-7 shrink-0 text-[#FFFAF1]/45 sm:h-14 sm:w-14 md:h-16 md:w-16" strokeWidth={1.35} aria-hidden />
            <div className="mt-3 flex flex-col gap-2 sm:mt-5 sm:gap-3">
              <div>
                <h3 className="text-base font-semibold leading-snug sm:text-xl md:text-2xl">A clinic for Aylesbury</h3>
                <p className="mt-1.5 text-xs leading-snug text-[#FFFAF1]/92 sm:mt-2 sm:text-base sm:leading-relaxed md:text-lg">
                  The Old Chapel in Bierton, for the surrounding villages too.
                </p>
              </div>
              <p className="text-xs leading-snug text-[#FFFAF1]/92 sm:text-base sm:leading-relaxed md:text-lg">
                People travel to us from across Buckinghamshire for colonic hydrotherapy, massage, diabetic footcare,
                ear wax removal, facials, counselling and nutrition support.
              </p>
              <p className="text-[11px] leading-snug text-[#FFFAF1]/80 sm:text-sm sm:leading-relaxed md:text-base">{site.areas.join(' · ')}</p>
            </div>
          </article>
          </Reveal>

          <Reveal className={`${photos.room.span} col-span-2 sm:col-span-1 lg:col-span-2`}>
            <Photo src={photos.room.src} alt={photos.room.alt} portrait={photos.room.portrait} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
