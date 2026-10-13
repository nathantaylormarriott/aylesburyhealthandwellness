import { Apple, Droplets, Ear, Footprints, Hand, Heart, HeartHandshake, MessageCircle, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import site from '../../seo/site.json';
import { getTreatmentBookingUrl } from '../lib/treatmentBooking';
import Container from './Container';
import Reveal from './Reveal';
import TreatmentCard from './TreatmentCard';

const icons: Record<string, ReactNode> = {
  'colonic-hydrotherapy': <Droplets size={28} />,
  'massage-therapy': <Hand size={28} />,
  'digestive-health': <Heart size={28} />,
  'professional-footcare': <Footprints size={28} />,
  'ear-care': <Ear size={28} />,
  'facial-treatments': <Sparkles size={28} />,
  counselling: <MessageCircle size={28} />,
  'health-coaching-nutrition': <Apple size={28} />,
  'couples-wellness-packages': <HeartHandshake size={28} />,
};

const images: Record<string, { src: string; alt: string; position?: string }> = {
  'colonic-hydrotherapy': {
    src: '/images/treatments/colonic-hydrotherapy.webp',
    alt: 'Clear water moving over dark stone',
  },
  'massage-therapy': {
    src: '/images/treatments/massage-therapy.webp',
    alt: 'Hands giving a massage across a person’s back',
    position: 'object-[center_40%]',
  },
  'digestive-health': {
    src: '/images/treatments/digestive-health.webp',
    alt: 'Hands resting gently over the abdomen',
  },
  'professional-footcare': {
    src: '/images/treatments/professional-footcare.webp',
    alt: 'A practitioner holding a foot during treatment',
    position: 'object-[center_35%]',
  },
  'ear-care': {
    src: '/images/treatments/ear-care.webp',
    alt: 'Close view of an ear in soft light',
    position: 'object-[center_42%]',
  },
  'facial-treatments': {
    src: '/images/treatments/facial-treatments.webp',
    alt: 'A facial mask being applied in a treatment room',
    position: 'object-[center_30%]',
  },
  counselling: {
    src: '/images/treatments/counselling.webp',
    alt: 'Two people seated together in conversation',
    position: 'object-[center_30%]',
  },
  'health-coaching-nutrition': {
    src: '/images/treatments/health-coaching-nutrition.webp',
    alt: 'A close view of fresh raspberries',
  },
  'couples-wellness-packages': {
    src: '/images/treatments/couples-wellness-packages.webp',
    alt: 'Hands held together in a calm, close gesture',
  },
};

export default function Treatments() {
  return (
    <section id="treatments" className="bg-[#313C38] pb-[120px]">
      <Container className="pt-[120px]">
        <Reveal className="mb-20 max-w-3xl text-left">
          <header>
            <h2 className="mb-0 text-balance text-4xl font-semibold leading-none text-white sm:text-5xl md:text-6xl lg:text-[4rem]">
              Treatments in Aylesbury
            </h2>
            <p className="mt-1 text-balance text-lg leading-snug text-white/85 md:text-xl">
              Colonic hydrotherapy, massage, diabetic footcare, ear microsuction, facials,
              counselling and nutrition at The Old Chapel in Bierton, near Aylesbury.
            </p>
          </header>
        </Reveal>

        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
          {site.services.map((treatment, index) => (
            <Reveal
              key={treatment.slug}
              delayMs={index * 110}
              className="treatment-stack-item h-full min-h-0 [&>*]:h-full"
              zIndex={index + 1}
            >
              <TreatmentCard
                id={treatment.slug}
                title={treatment.title}
                description={treatment.description}
                priceFrom={treatment.priceFrom}
                treatments={treatment.items}
                emphasis={'emphasis' in treatment ? treatment.emphasis : undefined}
                icon={icons[treatment.slug]}
                image={images[treatment.slug].src}
                imageAlt={images[treatment.slug].alt}
                imagePosition={images[treatment.slug].position}
                href={getTreatmentBookingUrl(
                  treatment.slug,
                  'bookingUrl' in treatment ? (treatment.bookingUrl as string | undefined) : undefined,
                )}
              />
            </Reveal>
          ))}
          <Reveal
            delayMs={site.services.length * 110}
            zIndex={site.services.length + 1}
            className="treatment-stack-item h-full min-h-0 [&>*]:h-full"
          >
            <TreatmentCard
              id="couples-wellness-packages"
              title="Couples Treatments & Wellness Packages"
              description="Tailored joint sessions for two in Aylesbury, combining relaxation, rejuvenation, and balance."
              treatments={[
                'Couples massage and spa sessions',
                'Custom wellness packages for two',
                'Contact us to plan your visit together',
              ]}
              icon={icons['couples-wellness-packages']}
              image={images['couples-wellness-packages'].src}
              imageAlt={images['couples-wellness-packages'].alt}
              href={getTreatmentBookingUrl('couples-wellness-packages')}
            />
          </Reveal>
          <div
            id="treatments-stack-end"
            className="pointer-events-none h-px w-full shrink-0 md:hidden"
            aria-hidden
          />
        </div>
      </Container>
    </section>
  );
}
