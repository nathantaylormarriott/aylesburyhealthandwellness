import { useEffect, useState } from 'react';
import { getLenisInstance } from '../lib/lenisScroll';

const NAV_BAND_PX = 80;

/** True when the fixed nav should use the light (hero) theme — white logo, dark blur wash. */
export function useNavOverHero() {
  const [overHero, setOverHero] = useState(true);
  const [overTreatmentsStackMobile, setOverTreatmentsStackMobile] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('site-hero');
    if (!hero) {
      setOverHero(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { threshold: 0, rootMargin: `-${NAV_BAND_PX}px 0px 0px 0px` },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const treatments = document.getElementById('treatments');
    const stackEnd = document.getElementById('treatments-stack-end');
    if (!treatments || !stackEnd) return;

    const mq = window.matchMedia('(max-width: 767px)');

    const evaluateTreatmentsNav = () => {
      if (!mq.matches) {
        setOverTreatmentsStackMobile(false);
        return;
      }

      const sectionRect = treatments.getBoundingClientRect();
      const endRect = stackEnd.getBoundingClientRect();
      const navOverSection = sectionRect.top <= NAV_BAND_PX && sectionRect.bottom > NAV_BAND_PX;
      const pastStickyStack = endRect.top <= NAV_BAND_PX;

      setOverTreatmentsStackMobile(navOverSection && !pastStickyStack);
    };

    evaluateTreatmentsNav();
    mq.addEventListener('change', evaluateTreatmentsNav);

    const lenis = getLenisInstance();
    lenis?.on('scroll', evaluateTreatmentsNav);
    window.addEventListener('scroll', evaluateTreatmentsNav, { passive: true });
    window.addEventListener('resize', evaluateTreatmentsNav);

    return () => {
      mq.removeEventListener('change', evaluateTreatmentsNav);
      lenis?.off('scroll', evaluateTreatmentsNav);
      window.removeEventListener('scroll', evaluateTreatmentsNav);
      window.removeEventListener('resize', evaluateTreatmentsNav);
    };
  }, []);

  return overHero || overTreatmentsStackMobile;
}
