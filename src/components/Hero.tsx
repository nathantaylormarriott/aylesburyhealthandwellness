import { useEffect, useRef } from 'react';

const accreditations = [
  { name: 'BACP', src: '/images/accreditations/BACP_accreditation carousel copy.png', height: 'h-16 md:h-24', margin: '-mb-1' },
  { name: 'CNHC', src: '/images/accreditations/CNHC_accreditation carousel copy.png', height: 'h-12 md:h-16', margin: '' },
  { name: 'HCPC', src: '/images/accreditations/HCPC_accreditation carousel copy.png', height: 'h-12 md:h-16', margin: '' },
  { name: 'RICTAT', src: '/images/accreditations/RICTAT_accreditation carousel copy.png', height: 'h-12 md:h-16', margin: '' },
  { name: 'SMAE', src: '/images/accreditations/SMAE_accreditation carousel copy.png', height: 'h-14 md:h-20', margin: '-mb-2' },
];

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    <section className="relative min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pt-0 sm:pb-0">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/heroimageblurred.webp)' }}
      />
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 w-full flex-1 flex items-center justify-center py-8">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
            Expert care for your body, mind, and wellbeing.
          </h1>

          <p className="text-lg sm:text-2xl text-white mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            We believe true health comes from balancing physical and emotional wellbeing.
            Our clinic is a safe, inclusive space where everyone is welcome.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">
            <button
              onClick={() => scrollToSection('treatments')}
              className="group relative px-8 py-3 sm:px-10 sm:py-5 backdrop-blur-md bg-white/10 text-white border-2 border-white rounded-xl hover:bg-white hover:text-[#313C38] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-base sm:text-lg font-semibold w-full sm:w-auto overflow-hidden"
            >
              <span className="relative z-10">View Treatments</span>
            </button>
            <a
              href="https://api.whatsapp.com/send?phone=447379987766&text=Hello%20Aylesbury%20Health%20%26%20Wellness%2C%20%0A%0A"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-3 sm:px-10 sm:py-5 backdrop-blur-md bg-white/10 text-white border-2 border-white rounded-xl hover:bg-white hover:text-[#313C38] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-base sm:text-lg font-semibold w-full sm:w-auto overflow-hidden"
            >
              <span className="relative z-10">Get In Touch</span>
            </a>
            <a
              href="https://www.fresha.com/book-now/aylesbury-health-and-wellness-limited-y3lpx75w/services?lid=2792378&share=true&pId=2700687"
              className="group relative px-8 py-3 sm:px-10 sm:py-5 bg-[#D97706] text-white border-2 border-[#D97706] rounded-xl hover:bg-[#B45309] hover:border-[#B45309] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-base sm:text-lg font-semibold w-full sm:w-auto overflow-hidden"
              aria-label="Book Now"
            >
              <span className="relative z-10">Book Now</span>
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full py-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm text-white/90 mb-4 font-medium drop-shadow-md">Certified by:</p>
          <div className="relative overflow-hidden" style={{
            maskImage: 'linear-gradient(to right, transparent, black 128px, black calc(100% - 128px), transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 128px, black calc(100% - 128px), transparent)'
          }}>
            <div
              ref={scrollRef}
              className="flex gap-12 md:gap-16 py-4 overflow-x-hidden"
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
      </div>
    </section>
  );
}
