import { useEffect, useState } from 'react';

/** True while #site-hero intersects the fixed nav band. */
export function useNavOverHero() {
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const hero = document.getElementById('site-hero');
    if (!hero) {
      setOverHero(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return overHero;
}
