import { useEffect, useRef, useState, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger entrance after the element enters view (ms). */
  delayMs?: number;
  zIndex?: number;
};

export default function Reveal({ children, className = '', delayMs = 0, zIndex }: RevealProps) {
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

  const delayStyle: { transitionDelay?: string; zIndex?: number } = {};
  if (shown && delayMs > 0) delayStyle.transitionDelay = `${delayMs}ms`;
  if (zIndex != null) delayStyle.zIndex = zIndex;

  return (
    <div
      ref={ref}
      className={className ? `${stateClass} ${className}` : stateClass}
      style={Object.keys(delayStyle).length ? delayStyle : undefined}
    >
      {children}
    </div>
  );
}
