import { Star } from 'lucide-react';
import { useMarqueeMotion } from '../hooks/useMarqueeMotion';
import Reveal from './Reveal';

type TestimonialTone = 'green-light' | 'green-mid' | 'green-olive' | 'green-dark';

const testimonialToneStyles: Record<
  TestimonialTone,
  { card: string; quote: string; divider: string; author: string; role: string }
> = {
  'green-light': {
    card: 'bg-[#B2BCA4] text-[#313C38]',
    quote: 'text-[#313C38]',
    divider: 'border-[#313C38]/15',
    author: 'text-[#313C38]',
    role: 'text-[#313C38]/75',
  },
  'green-mid': {
    card: 'bg-[#83896D] text-[#FFFAF1]',
    quote: 'text-[#FFFAF1]',
    divider: 'border-[#FFFAF1]/20',
    author: 'text-[#FFFAF1]',
    role: 'text-[#FFFAF1]/80',
  },
  'green-olive': {
    card: 'bg-[#6B7A5B] text-[#FFFAF1]',
    quote: 'text-[#FFFAF1]',
    divider: 'border-[#FFFAF1]/20',
    author: 'text-[#FFFAF1]',
    role: 'text-[#FFFAF1]/80',
  },
  'green-dark': {
    card: 'bg-[#5A6252] text-[#FFFAF1]',
    quote: 'text-[#FFFAF1]',
    divider: 'border-[#FFFAF1]/20',
    author: 'text-[#FFFAF1]',
    role: 'text-[#FFFAF1]/80',
  },
};

/** Scattered greens — not light-to-dark order. */
const testimonialTones: TestimonialTone[] = [
  'green-dark',
  'green-light',
  'green-olive',
  'green-mid',
  'green-olive',
  'green-dark',
];

/** Verbatim 5★ quotes from public Google reviews ([listing](https://exa.ai/library/place/8ys3tvn3tcw)). */
const googleReviews = [
  {
    text:
      'Visited for the second time for specialist massage. Anita was fantastic and the setting is beautiful and extremely peaceful. The clinic is spotlessly clean and the treatments were great, so lucky to have this in our village will definitely be returning soon.',
    author: 'Jennifer Baldwin',
  },
  {
    text:
      'Friendly helpful people. Everything was explained to put mind at ease and nothing was rushed. Highly recommended',
    author: 'C Hughes',
  },
  {
    text:
      'Absolutely wonderful Reiki session! The practitioner has such a calming presence, and the whole experience felt healing and restorative. I went in feeling overwhelmed and left feeling peaceful, lighter, and more centered. The space is beautiful and soothing too. If you’re considering Reiki, I can’t recommend this enough!',
    author: 'Damian Rose',
  },
  {
    text:
      'Such a lovely and relaxing place to have your treatments. Feel more comfortable now than I went in. Will be back again. Thanks again for an amazing service.',
    author: 'Hayley Hunt',
  },
  {
    text:
      'I have had a number of reiki sessions with Darren Baker which have been very relaxing and enjoyable, especially if it’s been a stressful week. Darren makes you feel at ease which makes it enjoyable. The location is also really great as it’s peaceful and all helps in terms of relaxing. I would highly recommend Darren.',
    author: 'John C',
  },
  {
    text:
      'I had a massage and microderbrasion facial with Anita and it was amazing!! Extremely friendly ladies, easy to find and great value for money. I would highly recommend and will be back!',
    author: 'Georgia Eccles',
  },
  {
    text:
      'I visited this new wellness centre for my birthday this week, it was recommended to me by a friend who’d visited soon after it opened. It was brilliant and Jodie was amazing and it’s one of the best massages I’ve ever had. Great competitive prices (and does blue light discount which is a massive plus for me!) I will definitely be a regular customer. Well worth a visit!',
    author: 'Beccy Pearce',
  },
  {
    text:
      'this place creates a relaxing environment. very well looked after..and guess what!u can use your blue light card with a good discount. highly recommended.',
    author: 'Rechel Ravena',
  },
];

const testimonials = [
  {
    text: 'This service is exceptionally good for patients wishing to get their feet in good condition prior to lower limb surgery. They may well continue to benefit from further treatments after surgical recovery time.',
    author: 'Mr M G Matthews FRCS',
    title: 'Consultant Orthopaedic Surgeon',
  },
  {
    text: 'I have worked with the staff of Aylesbury and Bucks Health & Wellness for many years and I thoroughly recommended them.',
    author: 'Mr M El Guindi',
    title: 'Consultant Orthopaedic Surgeon',
  },
  {
    text: 'I have had the pleasure of knowing and working alongside Beth and Anita for several years. Both of them are incredibly trustworthy, professional and lovely people. I fully endorse them. Your feet are in good hands!',
    author: 'Mr Ahmad Malik FRCS (Tr & Orth) Dip Med Sport',
    title: '',
  },
  {
    text: 'I suffered with Gout, the pain was terrible and was effecting my daily life and I kept taking time off work. I was recommended the treatment and since then my feet and legs are good as new. Very friendly, professional and knowledgeable, highly recommended.',
    author: 'Mr D Ayres',
    title: '',
  },
  {
    text: 'I have known Anita and Beth for a good few years, I recommend them for the management of any foot conditions my patients may have. They are a highly professional and trustworthy team.',
    author: 'Mr Shibu Krishnan',
    title: 'Consultant Orthopaedic Surgeon',
  },
  {
    text: 'I would highly recommend Anita and Beth for professional foot health services. They are professional and able to manage a wide range of foot care. They are diligent and skilled, I have always had positive feedback from patients I have referred to them.',
    author: 'Ms Sally Feeney',
    title: 'Consultant Podiatric Surgeon',
  },
];

function GoldStarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, index) => (
        <Star key={index} className="size-[1.05rem] fill-[#F4B400] stroke-none" aria-hidden />
      ))}
    </div>
  );
}

function TestimonialCard({
  text,
  author,
  title,
  tone,
}: (typeof testimonials)[number] & { tone: TestimonialTone }) {
  const styles = testimonialToneStyles[tone];
  return (
    <article className={`testimonial-note flex h-full w-full flex-col justify-between rounded-3xl p-6 md:p-7 ${styles.card}`}>
      <p className={`text-base leading-relaxed line-clamp-5 ${styles.quote}`}>{text}</p>
      <div className={`mt-6 border-t pt-4 ${styles.divider}`}>
        <p className={`font-semibold ${styles.author}`}>{author}</p>
        {title ? <p className={`mt-1 text-sm leading-snug line-clamp-2 ${styles.role}`}>{title}</p> : null}
      </div>
    </article>
  );
}

type GoogleReviewItem = { text: string; author: string };

function GoogleReviewCard({ text, author, tone }: GoogleReviewItem & { tone: TestimonialTone }) {
  const styles = testimonialToneStyles[tone];
  return (
    <article className={`testimonial-note flex h-full w-full flex-col justify-between rounded-3xl p-6 md:p-7 ${styles.card}`}>
      <p className={`text-base leading-relaxed line-clamp-5 ${styles.quote}`}>{text}</p>
      <div className={`mt-6 border-t pt-4 ${styles.divider}`}>
        <GoldStarRating />
        {author ? <p className={`mt-2 font-semibold ${styles.author}`}>{author}</p> : null}
      </div>
    </article>
  );
}

type MarqueeItem = { text: string; author: string; title: string };

function TestimonialMarquee({
  items,
  tones,
  direction,
  mobileDurationMs,
  desktopDurationMs,
  className = '',
}: {
  items: MarqueeItem[];
  tones: TestimonialTone[];
  direction: 'left' | 'right';
  mobileDurationMs: number;
  desktopDurationMs: number;
  className?: string;
}) {
  const loop = [...items, ...items];
  const mobileMarquee = useMarqueeMotion({ durationMs: mobileDurationMs, direction });
  const desktopMarquee = useMarqueeMotion({ durationMs: desktopDurationMs, direction });

  return (
    <>
      <div ref={mobileMarquee.viewportRef} className={`marquee-viewport px-8 md:hidden ${className}`}>
        <div ref={mobileMarquee.trackRef} className="marquee-track flex w-max items-stretch gap-4">
          {loop.map((item, index) => (
            <div key={`m-${index}-${item.text.slice(0, 24)}`} className="marquee-slot flex w-[min(78vw,20rem)] shrink-0">
              <TestimonialCard {...item} tone={tones[index % items.length]} />
            </div>
          ))}
        </div>
      </div>

      <div ref={desktopMarquee.viewportRef} className={`marquee-viewport hidden px-8 md:block ${className}`}>
        <div ref={desktopMarquee.trackRef} className="marquee-track flex w-max items-stretch gap-4">
          {loop.map((item, index) => (
            <div key={`d-${index}-${item.text.slice(0, 24)}`} className="marquee-slot flex w-[22rem] shrink-0 lg:w-[26rem]">
              <TestimonialCard {...item} tone={tones[index % items.length]} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function GoogleReviewMarquee({
  items,
  tones,
  direction,
  mobileDurationMs,
  desktopDurationMs,
  className = '',
}: {
  items: GoogleReviewItem[];
  tones: TestimonialTone[];
  direction: 'left' | 'right';
  mobileDurationMs: number;
  desktopDurationMs: number;
  className?: string;
}) {
  const loop = [...items, ...items];
  const mobileMarquee = useMarqueeMotion({ durationMs: mobileDurationMs, direction });
  const desktopMarquee = useMarqueeMotion({ durationMs: desktopDurationMs, direction });

  return (
    <>
      <div ref={mobileMarquee.viewportRef} className={`marquee-viewport px-8 md:hidden ${className}`}>
        <div ref={mobileMarquee.trackRef} className="marquee-track flex w-max items-stretch gap-4">
          {loop.map((item, index) => (
            <div key={`gm-${index}-${item.text.slice(0, 24)}`} className="marquee-slot flex w-[min(78vw,20rem)] shrink-0">
              <GoogleReviewCard {...item} tone={tones[index % items.length]} />
            </div>
          ))}
        </div>
      </div>

      <div ref={desktopMarquee.viewportRef} className={`marquee-viewport hidden px-8 md:block ${className}`}>
        <div ref={desktopMarquee.trackRef} className="marquee-track flex w-max items-stretch gap-4">
          {loop.map((item, index) => (
            <div key={`gd-${index}-${item.text.slice(0, 24)}`} className="marquee-slot flex w-[22rem] shrink-0 lg:w-[26rem]">
              <GoogleReviewCard {...item} tone={tones[index % items.length]} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const googleReviewTones: TestimonialTone[] = [
  'green-mid',
  'green-dark',
  'green-light',
  'green-olive',
  'green-light',
  'green-mid',
  'green-olive',
  'green-dark',
  'green-mid',
  'green-light',
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="overflow-x-hidden bg-[#FFFAF1] pt-[120px] pb-[120px]">
      <Reveal className="mb-20 ml-auto flex max-w-3xl flex-col items-end px-8 text-right">
        <header>
          <h2 className="mb-0 max-w-4xl text-balance text-4xl font-semibold leading-none text-[#313C38] sm:text-5xl md:text-6xl lg:text-[4rem]">
            Testimonials
          </h2>
          <p className="mt-1 max-w-xl text-balance text-lg leading-snug text-[#83896D] md:text-xl">
            Trusted by patients and medical professionals alike
          </p>
        </header>
      </Reveal>

      <Reveal>
        <TestimonialMarquee
          items={testimonials}
          tones={testimonialTones}
          direction="right"
          mobileDurationMs={48_000}
          desktopDurationMs={72_000}
        />
      </Reveal>

      <Reveal className="mt-6">
        <GoogleReviewMarquee
          items={googleReviews}
          tones={googleReviewTones}
          direction="left"
          mobileDurationMs={52_000}
          desktopDurationMs={78_000}
        />
      </Reveal>
    </section>
  );
}
