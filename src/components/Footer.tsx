import { useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import site from '../../seo/site.json';
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

          <div className="grid w-full grid-cols-3 gap-4 sm:gap-12 lg:w-[min(100%,52rem)] lg:shrink-0 lg:gap-16">
          <Reveal>
          <div>
            <h4 className="mb-2 text-sm font-semibold md:mb-4 md:text-lg">Contact</h4>
            <div className="space-y-2 md:space-y-3">
              <a href="tel:07379987766" className="flex items-center gap-1.5 text-xs text-[#FFFAF1] transition hover:text-[#83896D] md:gap-2 md:text-base">
                <Phone className="shrink-0 md:h-[18px] md:w-[18px]" size={16} />
                <span>07379 987766</span>
              </a>
              <a href="tel:01296926045" className="flex items-center gap-1.5 text-xs text-[#FFFAF1] transition hover:text-[#83896D] md:gap-2 md:text-base">
                <Phone className="shrink-0 md:h-[18px] md:w-[18px]" size={16} />
                <span>01296 926045</span>
              </a>
              <a href="mailto:info@aylesburyhealthandwellness.co.uk" className="flex items-center gap-1.5 text-xs text-[#FFFAF1] transition hover:text-[#83896D] md:gap-2 md:text-base">
                <Mail className="shrink-0 md:h-[18px] md:w-[18px]" size={16} />
                <span>Email Us</span>
              </a>
              <a href="https://api.whatsapp.com/send?phone=447379987766&text=Hello%20Aylesbury%20Health%20%26%20Wellness%2C%20%0A%0A" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-[#FFFAF1] transition hover:text-[#83896D] md:gap-2 md:text-base">
                <MessageCircle className="shrink-0 md:h-[18px] md:w-[18px]" size={16} />
                <span>WhatsApp</span>
              </a>
              <div className="flex items-start gap-1.5 text-xs text-[#FFFAF1] md:gap-2 md:text-base">
                <MapPin className="mt-0.5 shrink-0 md:mt-1 md:h-[18px] md:w-[18px]" size={16} />
                <span>{site.address.postalCode}</span>
              </div>
            </div>
          </div>
          </Reveal>

          <Reveal>
          <div>
            <h4 className="mb-2 text-sm font-semibold md:mb-4 md:text-lg">Quick Links</h4>
            <div className="space-y-1.5 md:space-y-2">
              <button
                type="button"
                onClick={() => goToHomeSection('about')}
                className="block text-left text-xs text-[#FFFAF1] transition hover:text-[#83896D] md:text-base"
              >
                About Us
              </button>
              <button
                type="button"
                onClick={() => goToHomeSection('treatments')}
                className="block text-left text-xs text-[#FFFAF1] transition hover:text-[#83896D] md:text-base"
              >
                Treatments
              </button>
              <button
                type="button"
                onClick={() => goToHomeSection('testimonials')}
                className="block text-left text-xs text-[#FFFAF1] transition hover:text-[#83896D] md:text-base"
              >
                Testimonials
              </button>
              <Link to="/faq" className="block text-xs text-[#FFFAF1] transition hover:text-[#83896D] md:text-base">
                FAQ
              </Link>
              <button
                type="button"
                onClick={() => goToHomeSection('contact')}
                className="block text-left text-xs text-[#FFFAF1] transition hover:text-[#83896D] md:text-base"
              >
                Contact
              </button>
            </div>
          </div>
          </Reveal>

          <Reveal>
          <div>
            <h4 className="mb-2 text-sm font-semibold md:mb-4 md:text-lg">Website by:</h4>
            <a
              href="https://www.taylor-marriott.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-opacity hover:opacity-80"
            >
              <img
                src="/taylor-marriott-logo.png"
                alt="Taylor-Marriott"
                className="block h-9 w-auto md:h-14"
              />
            </a>
            <a
              href={`https://api.whatsapp.com/send?phone=447831798112&text=${encodeURIComponent(
                'Hey I was on the Aylesbury Health and Wellness website and was interested in getting a website of my own...',
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-cta mt-2 inline-flex max-w-full items-center justify-center gap-1.5 rounded-full border border-white/35 bg-white/10 px-2.5 py-1.5 text-[10px] font-semibold leading-tight text-white transition-colors hover:bg-white/20 md:mt-4 md:gap-2 md:px-4 md:py-2 md:text-xs"
            >
              Let&apos;s build yours
              <ArrowRight className="relative z-[1] h-3.5 w-3.5 animate-arrow-nudge" />
            </a>
          </div>
          </Reveal>
          </div>
        </div>

        <div className="footer-wordmark-slot hidden md:block" aria-hidden>
          <FooterWordmarkLine text="AYLESBURY HEALTH & WELLNESS" />
        </div>
      </Container>
    </footer>
  );
}
