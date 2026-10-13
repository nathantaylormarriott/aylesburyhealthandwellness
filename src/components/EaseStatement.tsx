import { useEffect, useRef, useState } from 'react';
import Container from './Container';

const lines = ['You deserve to feel at ease.', 'We’re here to help you get there.'];

export default function EaseStatement() {
  const ref = useRef<HTMLElement>(null);
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
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let wordIndex = 0;

  return (
    <section
      ref={ref}
      className="bg-[#FFFAF1] pt-40 pb-40 md:pt-52 md:pb-52 lg:pt-64 lg:pb-64 xl:pt-72 xl:pb-72"
    >
      <Container>
        <p className="ease-statement-copy mx-auto text-center text-[clamp(2.5rem,6.2vw,6.75rem)] font-semibold leading-[1.02] text-[#313C38]">
          {lines.map((line) => (
            <span key={line} className="block sm:whitespace-nowrap">
              {line.split(' ').map((word) => {
                const delay = wordIndex * 165;
                wordIndex += 1;
                return (
                  <span key={`${line}-${word}-${delay}`}>
                    <span
                      className={shown ? 'statement-word statement-word-in' : 'statement-word'}
                      style={shown ? { transitionDelay: `${delay}ms` } : undefined}
                    >
                      {word}
                    </span>{' '}
                  </span>
                );
              })}
            </span>
          ))}
        </p>
      </Container>
    </section>
  );
}
