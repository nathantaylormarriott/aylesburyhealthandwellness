import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import About from '../components/About';
import EaseStatement from '../components/EaseStatement';
import Contact from '../components/Contact';
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import TikTokFeed from '../components/TikTokFeed';
import Treatments from '../components/Treatments';
import SiteLayout from '../components/SiteLayout';
import { scrollToSection } from '../lib/lenisScroll';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const id = location.hash.replace(/^#/, '');
    if (!id) return;
    const timer = window.setTimeout(() => scrollToSection(id), 80);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return (
    <SiteLayout>
      <Hero />
      <About />
      <EaseStatement />
      <Treatments />
      <Testimonials />
      <Contact />
      <TikTokFeed />
    </SiteLayout>
  );
}
