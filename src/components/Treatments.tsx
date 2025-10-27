import { Droplets, Hand, Heart, Footprints, Ear, Sparkles, MessageCircle, Apple } from 'lucide-react';
import TreatmentCard from './TreatmentCard';

const treatments = [
  {
    title: 'Colonic Hydrotherapy',
    description: 'A gentle, restorative treatment that supports digestive health, reduces bloating, and helps rebalance the body from within.',
    priceFrom: 'From £90',
    icon: <Droplets size={28} />,
    treatments: [
      'Colonic Hydrotherapy Session',
      'Course of Six Treatments',
      'Colonic Hydrotherapy + Swedish Massage',
      'Extended Abdominal & Colon Massage + Colonic',
      'Coffee, Herbal, or Probiotic Enema Add-Ons',
    ],
  },
  {
    title: 'Massage Therapy',
    description: 'Professional massage treatments tailored to ease tension, boost circulation, and promote relaxation and recovery.',
    priceFrom: 'From £40',
    icon: <Hand size={28} />,
    treatments: [
      'Swedish Massage',
      'Deep Tissue Massage',
      'Lymphatic Massage',
      'Pregnancy Massage',
      'Aromatherapy or Hot Stone & Warm Bamboo Massage',
    ],
  },
  {
    title: 'Digestive Health',
    description: 'Targeted therapies to support gut function, reduce discomfort, and help identify food sensitivities.',
    priceFrom: 'From £40',
    icon: <Heart size={28} />,
    treatments: [
      'Food Intolerance Testing',
      'Abdominal & Colon Massage',
      'Digestive Health Consultation',
      'Nutritional Guidance',
      'Gut Support Follow-Up',
    ],
  },
  {
    title: 'Professional Footcare',
    description: 'Clinical, medical-grade foot treatments performed by a qualified Foot Health Practitioner — not a pedicure. Designed to treat common conditions and restore comfort and mobility.',
    priceFrom: 'From £45',
    icon: <Footprints size={28} />,
    emphasis: 'Specialising in diabetic footcare',
    treatments: [
      'Nail Cutting and Callus Removal',
      'Corn and Verruca Treatment',
      'Fungal Nail Management',
      'Therapeutic Foot Massage (for arthritis and plantar fasciitis)',
      'Elim Professional Callus Removal',
    ],
  },
  {
    title: 'Ear Care',
    description: 'Safe, professional ear treatments to maintain clear hearing and comfort using advanced microsuction or irrigation techniques.',
    priceFrom: 'From £20',
    icon: <Ear size={28} />,
    treatments: [
      'Ear Consultation',
      'Ear Microsuction (Bilateral)',
      'Ear Irrigation (Bilateral)',
      'Wax Removal Follow-Up',
      'Preventive Ear Health Advice',
    ],
  },
  {
    title: 'Facial Treatments',
    description: 'Therapeutic facials combining clinical care with relaxation to rejuvenate, restore, and enhance natural radiance.',
    priceFrom: 'From £65',
    icon: <Sparkles size={28} />,
    treatments: [
      'Rejuvenating Facial',
      'Collagen Anti-Ageing Facial',
      'Natural Lift Facial',
      'Oncology Facial',
      'Microdermabrasion or Korean Glass Skin Facial',
    ],
  },
  {
    title: 'Counselling Sessions',
    description: 'Confidential, one-to-one sessions in a supportive environment to explore personal challenges and emotional wellbeing.',
    priceFrom: 'From £65',
    icon: <MessageCircle size={28} />,
    treatments: [
      'Individual Counselling Sessions',
      'Relationship and Couples Counselling',
      'Anxiety and Depression Support',
      'Trauma and PTSD Therapy',
      'Bereavement and Life Transition Support',
    ],
  },
  {
    title: 'Health Coaching & Nutrition',
    description: 'Personalised guidance and lifestyle planning to help you build lasting habits for physical and emotional wellbeing.',
    priceFrom: 'From £50',
    icon: <Apple size={28} />,
    treatments: [
      'Initial Consultation',
      'Nutrition and Lifestyle Coaching',
      'Personalised Wellness Plans',
      'Progress Reviews',
      'Ongoing Health Support',
    ],
  },
];

export default function Treatments() {
  return (
    <section id="treatments" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#83896D] overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-screen pointer-events-none hidden lg:flex items-center justify-end">
        <img
          src="/images/logos/Icon Style Logo.svg"
          alt=""
          className="h-full w-auto opacity-5 object-contain"
          style={{ transform: 'translateX(33%)' }}
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Nourish Body & Mind
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Comprehensive care tailored to support your wellness journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {treatments.map((treatment, index) => (
            <TreatmentCard key={index} {...treatment} />
          ))}
        </div>

        <div className="mt-12 p-8 bg-[#FFFAF1] rounded-xl text-center">
          <h3 className="text-2xl font-bold text-[#313C38] mb-4">
            Couples Treatments & Wellness Packages
          </h3>
          <p className="text-[#313C38] leading-relaxed max-w-3xl mx-auto">
            Tailored joint sessions for two, combining relaxation, rejuvenation, and balance —
            perfect for shared wellness experiences. Contact us to discuss custom packages and
            current offers designed for you and your loved ones.
          </p>
        </div>
      </div>
    </section>
  );
}
