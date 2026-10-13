import { useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useHomeSectionNav } from '../hooks/useHomeSectionNav';
import Container from './Container';
import Reveal from './Reveal';

function FooterWordmarkLine({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const fit = () => {
      el.style.fontSize = '100px';
      const available = parent.clientWidth;
      const natural = el.scrollWidth;
      if (!available || !natural) return;
      el.style.fontSize = `${(available / natural) * 100}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [text]);

  return (
    <p ref={ref} className="footer-wordmark-line">
      {text}
    </p>
  );
}

export default function Footer() {
  const goToHomeSection = useHomeSectionNav();

  return (
    <footer className="site-footer-reveal text-[#FFFAF1]">
      <Container className="relative z-[1] pt-12 pb-0">
        <div className="mb-8 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <Reveal className="lg:max-w-xs lg:shrink-0">
          <div>
            <img
              src="/images/logos/Nav Bar (Long Logo).svg"
              alt="Aylesbury Health and Wellness"
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-[#FFFAF1] opacity-90">
              Expert-led care for your body, mind, and wellbeing.
            </p>
          </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-12 lg:w-[min(100%,52rem)] lg:shrink-0 lg:gap-16">
          <Reveal>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="tel:07379987766" className="flex items-center gap-2 text-[#FFFAF1] hover:text-[#83896D] transition">
                <Phone size={18} />
                <span>07379 987766</span>
              </a>
              <a href="tel:01296926045" className="flex items-center gap-2 text-[#FFFAF1] hover:text-[#83896D] transition">
                <Phone size={18} />
                <span>01296 926045</span>
              </a>
              <a href="mailto:info@aylesburyhealthandwellness.co.uk" className="flex items-center gap-2 text-[#FFFAF1] hover:text-[#83896D] transition">
                <Mail size={18} />
                <span>Email Us</span>
              </a>
              <a href="https://api.whatsapp.com/send?phone=447379987766&text=Hello%20Aylesbury%20Health%20%26%20Wellness%2C%20%0A%0A" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#FFFAF1] hover:text-[#83896D] transition">
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>
              <div className="flex items-start gap-2 text-[#FFFAF1]">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>The Old Chapel, Bierton, Aylesbury</span>
              </div>
            </div>
          </div>
          </Reveal>

          <Reveal>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => goToHomeSection('about')}
                className="block text-left text-[#FFFAF1] hover:text-[#83896D] transition"
              >
                About Us
              </button>
              <button
                type="button"
                onClick={() => goToHomeSection('treatments')}
                className="block text-left text-[#FFFAF1] hover:text-[#83896D] transition"
              >
                Treatments
              </button>
              <button
                type="button"
                onClick={() => goToHomeSection('testimonials')}
                className="block text-left text-[#FFFAF1] hover:text-[#83896D] transition"
              >
                Testimonials
              </button>
              <Link to="/faq" className="block text-[#FFFAF1] hover:text-[#83896D] transition">
                FAQ
              </Link>
              <button
                type="button"
                onClick={() => goToHomeSection('contact')}
                className="block text-left text-[#FFFAF1] hover:text-[#83896D] transition"
              >
                Contact
              </button>
            </div>
          </div>
          </Reveal>

          <Reveal>
          <div>
            <h4 className="text-lg font-semibold mb-4">Website by:</h4>
            <a
              href="https://www.taylor-marriott.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-80 transition-opacity"
            >
              <img
                src="/taylor-marriott-logo.png"
                alt="Taylor-Marriott"
                className="block h-12 md:h-14 w-auto"
              />
            </a>
            <a
              href={`https://api.whatsapp.com/send?phone=447831798112&text=${encodeURIComponent(
                'Hey I was on the Aylesbury Health and Wellness website and was interested in getting a website of my own...',
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-cta mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
            >
              Let&apos;s build yours
              <ArrowRight className="relative z-[1] h-3.5 w-3.5 animate-arrow-nudge" />
            </a>
          </div>
          </Reveal>
          </div>
        </div>

        <div className="footer-wordmark-slot" aria-hidden>
          <FooterWordmarkLine text="AYLESBURY HEALTH & WELLNESS" />
        </div>
      </Container>
    </footer>
  );
}
