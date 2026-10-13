import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLenisInstance } from '../lib/lenisScroll';

/** Scroll to top on route change (hash-only changes on home are handled separately). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname === '/' && hash) return;

    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
