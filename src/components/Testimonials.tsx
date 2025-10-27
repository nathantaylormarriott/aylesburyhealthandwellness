import { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "This service is exceptionally good for patients wishing to get their feet in good condition prior to lower limb surgery. They may well continue to benefit from further treatments after surgical recovery time.",
    author: "Mr M G Matthews FRCS",
    title: "Consultant Orthopaedic Surgeon"
  },
  {
    text: "I have worked with the staff of Bucks and wellness for many years and I thoroughly recommended them.",
    author: "Mr M El Guindi",
    title: "Consultant Orthopaedic Surgeon"
  },
  {
    text: "I have had the pleasure of knowing and working alongside Beth and Anita for several years. Both of them are incredibly trustworthy, professional and lovely people. I fully endorse them. Your feet are in good hands!",
    author: "Mr Ahmad Malik FRCS (Tr & Orth) Dip Med Sport",
    title: "Consultant Trauma & Orthopaedic Surgeon, The London Foot and Ankle Clinic"
  },
  {
    text: "I suffered with sciatica and it got to the point where painkillers stopped working, I received 2 treatments and I was dancing the next day. I've been pain free ever since.",
    author: "Mr M Kuzas",
    title: "Patient"
  },
  {
    text: "I suffered with Gout, the pain was terrible and was effecting my daily life and I kept taking time off work. I was recommended the treatment and since then my feet and legs are good as new. Very friendly, professional and knowledgeable, highly recommend. Thank you for helping me and giving me my life back.",
    author: "Mr D Ayres",
    title: "Patient"
  },
  {
    text: "I have known Anita for a good few years, I recommend them for the management of any foot conditions my patients may have. They are a highly professional and trustworthy team.",
    author: "Mr Shibu Krishnan",
    title: "MBBS, MS, MRCS (T&O) Dip, Sports Consultant Orthopaedic Surgeon (Hip and Knee)"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFFAF1]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#313C38] mb-6">
            Testimonials
          </h2>
          <p className="text-lg text-[#83896D]">
            Trusted by patients and medical professionals alike
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 min-h-[320px] flex flex-col justify-center">
            <Quote className="text-[#83896D] mb-6" size={48} />

            <div className="transition-opacity duration-500">
              <p className="text-lg md:text-xl text-[#313C38] leading-relaxed mb-6 italic">
                "{testimonials[currentIndex].text}"
              </p>

              <div className="border-t border-[#83896D] pt-6">
                <p className="font-bold text-[#313C38] text-lg">
                  {testimonials[currentIndex].author}
                </p>
                <p className="text-[#83896D]">
                  {testimonials[currentIndex].title}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-[#313C38] w-8'
                    : 'bg-[#83896D] hover:bg-[#313C38]'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
