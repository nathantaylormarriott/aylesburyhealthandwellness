import { Heart, Users, Award, Clock } from 'lucide-react';

const clinicGallery = [
  {
    src: '/images/clinic/gallery-courtyard-dusk.png',
    alt: 'Courtyard at Aylesbury Health and Wellness with warm lighting at dusk',
  },
  {
    src: '/images/clinic/gallery-treatment-suite.png',
    alt: 'Calm treatment room with massage table and soft lighting',
  },
  {
    src: '/images/clinic/gallery-dual-treatment.png',
    alt: 'Spa treatment space with two massage tables',
  },
  {
    src: '/images/clinic/gallery-exterior.png',
    alt: 'Aylesbury Health and Wellness exterior signage at the clinic',
  },
  {
    src: '/images/clinic/gallery-wellness-room.png',
    alt: 'Wellness treatment room with professional equipment',
  },
] as const;

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFFAF1]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-[#313C38] mb-6 text-center">
            About Us
          </h2>
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center">
              <div className="flex-1 md:max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col justify-center">
                <p className="text-lg text-[#313C38] leading-relaxed mb-4">
                  We believe true health comes from balancing physical and emotional wellbeing.
                  Our Lead Practitioner and Founder, who has had a long career in both the NHS and
                  private sector, created a safe, inclusive space where everyone is welcome.
                </p>
                <p className="text-lg text-[#313C38] leading-relaxed">
                  Our registered team offers clinical, holistic, and complementary treatments with
                  expertise and compassion, all within the beautiful grounds of the Old Chapel in Bierton.
                </p>
              </div>
              <div className="w-full md:w-96 flex-shrink-0 rounded-xl overflow-hidden shadow-xl min-h-[280px] md:min-h-0">
                <img
                  src="/images/clinic/about-feature.png"
                  alt="Calm treatment room with massage table, soft lighting, and professional furnishings at Aylesbury Health and Wellness"
                  className="w-full h-full min-h-[280px] md:min-h-[320px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 md:mt-20">
          <h3 className="text-2xl md:text-3xl font-bold text-[#313C38] text-center mb-8">
            Our clinic
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {clinicGallery.map(({ src, alt }) => (
              <div
                key={src}
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg group"
              >
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center gap-8 md:grid md:grid-cols-4 md:gap-8 mt-8 md:mt-16 max-w-7xl mx-auto">
          <div className="text-center group md:block">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-[#83896D] to-[#6B7A5B] text-white rounded-full mb-2 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Heart size={20} strokeWidth={2} className="md:w-9 md:h-9" />
            </div>
            <h3 className="text-sm md:text-2xl font-bold text-[#313C38] md:mb-4">
              Compassionate Care
            </h3>
            <p className="hidden md:block text-[#83896D] text-lg leading-relaxed">
              Expert treatments delivered with empathy and understanding
            </p>
          </div>

          <div className="text-center group md:block">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-[#83896D] to-[#6B7A5B] text-white rounded-full mb-2 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Users size={20} strokeWidth={2} className="md:w-9 md:h-9" />
            </div>
            <h3 className="text-sm md:text-2xl font-bold text-[#313C38] md:mb-4">
              Inclusive Space
            </h3>
            <p className="hidden md:block text-[#83896D] text-lg leading-relaxed">
              Everyone is welcome in our safe and supportive environment
            </p>
          </div>

          <div className="text-center group md:block">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-[#83896D] to-[#6B7A5B] text-white rounded-full mb-2 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Award size={20} strokeWidth={2} className="md:w-9 md:h-9" />
            </div>
            <h3 className="text-sm md:text-2xl font-bold text-[#313C38] md:mb-4">
              Professional Excellence
            </h3>
            <p className="hidden md:block text-[#83896D] text-lg leading-relaxed">
              Registered practitioners with NHS and private sector experience
            </p>
          </div>

          <div className="text-center group md:block">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-[#83896D] to-[#6B7A5B] text-white rounded-full mb-2 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Clock size={20} strokeWidth={2} className="md:w-9 md:h-9" />
            </div>
            <h3 className="text-sm md:text-2xl font-bold text-[#313C38] md:mb-4">
              Opening Times
            </h3>
            <div className="hidden md:block text-[#83896D] text-base leading-relaxed space-y-1">
              <p>Mon - Thurs: 09:00 - 19:00</p>
              <p>Fri & Sat: 09:00 - 20:00</p>
              <p>Sun: 10:00 - 17:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
