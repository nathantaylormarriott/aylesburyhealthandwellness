import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavOverHero } from '../hooks/useNavOverHero';
import { Link } from 'react-router-dom';
import { useHomeSectionNav } from '../hooks/useHomeSectionNav';
import Container from './Container';
import NavProgressiveBlur from './NavProgressiveBlur';
import ShimmerBookNowLink from './ShimmerBookNowLink';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lightNav = useNavOverHero();
  const goToHomeSection = useHomeSectionNav();

  const scrollToSection = (id: string) => {
    goToHomeSection(id);
    setIsMenuOpen(false);
  };

  const linkClass = lightNav
    ? 'text-white/95 hover:text-white transition font-medium'
    : 'text-[#313C38] hover:text-[#83896D] transition font-medium';

  const bookNowClass = lightNav
    ? 'px-6 py-2.5 bg-[#FFFAF1] text-[#313C38] rounded-full hover:bg-white transition-all transform hover:scale-105 hover:shadow-lg font-medium'
    : 'px-6 py-2.5 bg-[#313C38] text-white rounded-full hover:bg-[#4a574f] transition-all transform hover:scale-105 hover:shadow-lg font-medium';

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="relative">
          <NavProgressiveBlur overHero={lightNav} />
          <Container className="relative z-[1]">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link to="/" className="inline-flex shrink-0" aria-label="Aylesbury Health and Wellness home">
                <img
                  src="/images/logos/Nav Bar (Long Logo).svg"
                  alt=""
                  className={`block h-10 w-auto -translate-y-0.5 transition-[filter] duration-300 ${lightNav ? 'brightness-0 invert' : ''}`}
                />
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <button onClick={() => scrollToSection('about')} className={linkClass}>
                About
              </button>
              <button onClick={() => scrollToSection('treatments')} className={linkClass}>
                Treatments
              </button>
              <button onClick={() => scrollToSection('testimonials')} className={linkClass}>
                Testimonials
              </button>
              <button onClick={() => scrollToSection('contact')} className={linkClass}>
                Contact
              </button>
              <ShimmerBookNowLink className={`${bookNowClass} shrink-0`} aria-label="Book Now" />
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden transition-colors duration-300 ${lightNav ? 'text-white' : 'text-[#313C38]'}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          </Container>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mx-8 mb-4 rounded-2xl border border-[#83896D]/20 bg-[#FFFAF1]/95 backdrop-blur-xl shadow-lg">
            <div className="px-4 py-4 space-y-3" data-lenis-prevent>
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
              <ShimmerBookNowLink
                className="block w-full px-6 py-2.5 bg-[#313C38] text-white rounded-full hover:bg-[#4a574f] transition font-medium text-center"
                aria-label="Book Now"
              />
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
