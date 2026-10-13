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
    ? 'text-white/95 hover:text-white transition-colors duration-300 font-medium'
    : 'text-[#313C38] hover:text-[#83896D] transition-colors duration-300 font-medium';

  const bookNowClass = 'px-6 py-2.5 rounded-full font-medium shadow-sm';
  const menuLinks = [
    { id: 'about', label: 'About' },
    { id: 'treatments', label: 'Treatments' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="site-nav-load fixed top-0 left-0 right-0 z-50">
        <div className="relative">
          <NavProgressiveBlur overHero={lightNav} />
          <Container className="relative z-[1]">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link to="/" className="inline-flex shrink-0" aria-label="Aylesbury Health and Wellness home">
                <img
                  src="/images/logos/Nav Bar (Long Logo).svg"
                  alt=""
                  className={`block h-10 w-auto -translate-y-0.5 transition-[filter,opacity] duration-300 ease-out ${lightNav ? 'brightness-0 invert' : ''}`}
                />
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {menuLinks.map((item) => (
                <button key={item.id} onClick={() => scrollToSection(item.id)} className={linkClass}>
                  {item.label}
                </button>
              ))}
              <ShimmerBookNowLink className={`${bookNowClass} shrink-0`} aria-label="Book Now" />
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 md:hidden ${
                lightNav
                  ? 'bg-[#FFFAF1]/16 text-white'
                  : 'bg-[#313C38]/8 text-[#313C38]'
              }`}
            >
              {isMenuOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
            </button>
          </div>
          </Container>
        </div>

        {isMenuOpen && (
          <div className="px-4 pb-4 md:hidden">
            <div
              className="mobile-nav-panel overflow-hidden rounded-3xl border border-[#83896D]/15 bg-[#FFFAF1] shadow-[0_22px_40px_-28px_rgba(49,60,56,0.55)]"
              data-lenis-prevent
            >
              <div className="flex flex-col gap-1 p-2">
                {menuLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="rounded-2xl px-4 py-3.5 text-left text-lg font-medium tracking-[-0.04em] text-[#313C38] transition-colors hover:bg-[#83896D]/10 active:bg-[#83896D]/16"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="px-2 pb-2 pt-2">
                  <ShimmerBookNowLink
                    className="book-now-cta-still w-full rounded-full px-6 py-3.5 text-base font-medium"
                    aria-label="Book Now"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
