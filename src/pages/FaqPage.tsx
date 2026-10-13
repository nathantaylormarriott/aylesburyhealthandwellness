import { useEffect } from 'react';
import Faq from '../components/Faq';
import SiteLayout from '../components/SiteLayout';
import { getLenisInstance } from '../lib/lenisScroll';

export default function FaqPage() {
  useEffect(() => {
    document.title = 'FAQ | Aylesbury Health and Wellness';
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <SiteLayout>
      <Faq />
    </SiteLayout>
  );
}
