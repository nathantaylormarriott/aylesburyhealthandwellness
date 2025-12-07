import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#FFFAF1]/70 border-b border-[#83896D]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <img
              src="/images/logos/Nav Bar (Long Logo).svg"
              alt="Aylesbury Health and Wellness"
              className="h-10 w-auto"
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('about')} className="text-[#313C38] hover:text-[#83896D] transition font-medium">
              About
            </button>
            <button onClick={() => scrollToSection('treatments')} className="text-[#313C38] hover:text-[#83896D] transition font-medium">
              Treatments
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-[#313C38] hover:text-[#83896D] transition font-medium">
              Testimonials
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-[#313C38] hover:text-[#83896D] transition font-medium">
              Contact
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://api.whatsapp.com/send?phone=447379987766&text=Hello%20Aylesbury%20Health%20%26%20Wellness%2C%20%0A%0A"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-[#83896D] text-white rounded-lg hover:bg-[#6B7A5B] transition-all transform hover:scale-105 hover:shadow-lg font-medium"
            >
              Get In Touch
            </a>
            <a
              href="https://www.fresha.com/book-now/aylesbury-health-and-wellness-limited-y3lpx75w/services?lid=2792378&share=true&pId=2700687"
              className="px-6 py-2.5 bg-[#D97706] text-white rounded-lg hover:bg-[#B45309] transition-all transform hover:scale-105 hover:shadow-lg font-medium"
              aria-label="Book Now"
            >
              Book Now
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#313C38]"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden backdrop-blur-md bg-[#FFFAF1]/90 border-t border-[#83896D]/20">
          <div className="px-4 py-4 space-y-3">
            <button onClick={() => scrollToSection('about')} className="block w-full text-left text-[#313C38] hover:text-[#83896D] py-2 font-medium">
              About
            </button>
            <button onClick={() => scrollToSection('treatments')} className="block w-full text-left text-[#313C38] hover:text-[#83896D] py-2 font-medium">
              Treatments
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left text-[#313C38] hover:text-[#83896D] py-2 font-medium">
              Testimonials
            </button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-[#313C38] hover:text-[#83896D] py-2 font-medium">
              Contact
            </button>
            <a
              href="https://api.whatsapp.com/send?phone=447379987766&text=Hello%20Aylesbury%20Health%20%26%20Wellness%2C%20%0A%0A"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-2.5 bg-[#83896D] text-white rounded-lg hover:bg-[#6B7A5B] transition text-center font-medium"
            >
              Get In Touch
            </a>
            <div className="relative">
              <a
                href="https://www.fresha.com/book-now/aylesbury-health-and-wellness-limited-y3lpx75w/services?lid=2792378&share=true&pId=2700687"
                className="block w-full px-6 py-2.5 bg-[#D97706] text-white rounded-lg hover:bg-[#B45309] transition font-medium relative z-10 text-center"
                aria-label="Book Now"
              >
                Book Now
              </a>
              <svg className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none">
                <rect
                  x="2"
                  y="2"
                  width="calc(100% - 4px)"
                  height="calc(100% - 4px)"
                  rx="10"
                  fill="none"
                  stroke="#C2410C"
                  strokeWidth="3"
                  strokeDasharray="400"
                  strokeDashoffset="400"
                  className="animate-draw-border"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}