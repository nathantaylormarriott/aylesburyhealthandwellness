import { Heart, Users, Award, Clock, MapPin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import site from '../../seo/site.json';
import Container from './Container';
import Reveal from './Reveal';

const tileLandscape = 'lg:col-span-2 lg:row-span-2 min-h-[200px] lg:min-h-0';
const tilePortrait = 'lg:col-span-2 lg:row-span-3 min-h-[280px] lg:min-h-0';
const tileFact = 'lg:col-span-2 lg:row-span-2 min-h-0';

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
        className="absolute inset-0 h-full w-full object-cover"
        loading={eager ? 'eager' : 'lazy'}
      />
    </div>
  );
}

function ValueCard({ title, body, icon: Icon, tone }: Omit<(typeof values)[number], 'span'>) {
  const styles = valueToneStyles[tone];
  return (
    <article className={`flex h-full flex-col justify-between rounded-3xl p-6 md:p-7 ${styles.card}`}>
      <Icon className={`h-14 w-14 shrink-0 md:h-16 md:w-16 ${styles.icon}`} strokeWidth={1.35} aria-hidden />
      <div className="mt-5">
        <h3 className="text-xl font-semibold leading-snug md:text-2xl">{title}</h3>
        <p className={`mt-2 text-base leading-relaxed md:text-lg ${styles.body}`}>{body}</p>
      </div>
    </article>
  );
}

export default function About() {
  return (
    <section id="about" className="bg-[#FFFAF1] pt-[120px] pb-[120px]">
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[168px]">
          <Reveal
            className={`${tilePortrait} sm:col-span-2 relative aspect-[4/5] w-full min-h-[280px] lg:aspect-auto lg:min-h-0 lg:h-full`}
          >
          <article
            className="relative h-full w-full overflow-hidden rounded-3xl border border-[#83896D]/15"
          >
            <img
              src="/images/clinic/anitta-stollery-portrait.webp"
              alt="Anita Stollery, Founder of Aylesbury Health and Wellness"
              width={1075}
              height={1344}
              className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
              loading="eager"
            />
            <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-20 md:px-5 md:pb-5">
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
                <h3 className="text-2xl font-semibold leading-none text-[#FFFAF1] md:text-3xl">Anita Stollery</h3>
                <p className="mt-0 text-base font-medium leading-snug text-[#FFFAF1]/85 md:text-lg">Founder</p>
                <p className="mt-3 text-sm leading-relaxed text-[#FFFAF1]/90 md:text-base">
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
            className="flex h-full flex-col justify-between rounded-3xl bg-[#313C38] p-6 text-[#FFFAF1] md:p-7"
          >
            <Clock className="h-14 w-14 shrink-0 text-[#FFFAF1]/45 md:h-16 md:w-16" strokeWidth={1.35} aria-hidden />
            <div className="mt-5">
              <h3 className="text-xl font-semibold leading-snug md:text-2xl">Opening Times</h3>
              <div className="mt-2 space-y-0.5 text-base leading-relaxed text-[#FFFAF1]/92 md:text-lg">
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
          <Reveal className={`${tilePortrait} sm:col-span-2`}>
          <article
            id="areas"
            className="flex h-full flex-col justify-between rounded-3xl bg-[#313C38] p-6 text-[#FFFAF1] md:p-7"
          >
            <MapPin className="h-14 w-14 shrink-0 text-[#FFFAF1]/45 md:h-16 md:w-16" strokeWidth={1.35} aria-hidden />
            <div className="mt-5 flex flex-col gap-3">
              <div>
                <h3 className="text-xl font-semibold leading-snug md:text-2xl">A clinic for Aylesbury</h3>
                <p className="mt-2 text-base leading-relaxed text-[#FFFAF1]/92 md:text-lg">
                  The Old Chapel in Bierton, for the surrounding villages too.
                </p>
              </div>
              <p className="text-base leading-relaxed text-[#FFFAF1]/92 md:text-lg">
                People travel to us from across Buckinghamshire for colonic hydrotherapy, massage, diabetic footcare,
                ear wax removal, facials, counselling and nutrition support.
              </p>
              <p className="text-sm leading-relaxed text-[#FFFAF1]/80 md:text-base">{site.areas.join(' · ')}</p>
            </div>
          </article>
          </Reveal>

          <Reveal className={photos.room.span}>
            <Photo src={photos.room.src} alt={photos.room.alt} portrait={photos.room.portrait} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
