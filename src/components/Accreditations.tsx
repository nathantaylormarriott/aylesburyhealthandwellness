import { useEffect, useRef } from 'react';

const accreditations = [
  { name: 'BACP', src: '/images/accreditations/BACP_accreditation carousel.png' },
  { name: 'CNHC', src: '/images/accreditations/CNHC_accreditation carousel.png' },
  { name: 'HCPC', src: '/images/accreditations/HCPC_accreditation carousel.png' },
  { name: 'RICTAT', src: '/images/accreditations/RICTAT_accreditation carousel.png' },
  { name: 'SMAE', src: '/images/accreditations/SMAE_accreditation carousel.png' },
];

export default function Accreditations() {
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm text-[#83896D] mb-4 font-medium">Certified by:</p>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

          <div
            ref={scrollRef}
            className="flex gap-12 md:gap-16 py-8 overflow-x-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            {[...accreditations, ...accreditations, ...accreditations].map((accreditation, index) => (
              <div
                key={`${accreditation.name}-${index}`}
                className="flex-shrink-0"
              >
                <img
                  src={accreditation.src}
                  alt={accreditation.name}
                  className="h-12 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
