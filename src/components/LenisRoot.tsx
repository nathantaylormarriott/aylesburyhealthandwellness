import Lenis from 'lenis';
import { useEffect, type ReactNode } from 'react';
import { setLenisInstance } from '../lib/lenisScroll';
import 'lenis/dist/lenis.css';

export default function LenisRoot({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    setLenisInstance(lenis);
    lenis.scrollTo(0, { immediate: true });

    return () => {
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return children;
}
