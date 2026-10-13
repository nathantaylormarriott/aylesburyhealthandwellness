import { useEffect, useRef, useState, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export default function Reveal({ children, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stateClass = shown ? 'reveal reveal-in' : 'reveal';

  return (
    <div ref={ref} className={className ? `${stateClass} ${className}` : stateClass}>
      {children}
    </div>
  );
}
