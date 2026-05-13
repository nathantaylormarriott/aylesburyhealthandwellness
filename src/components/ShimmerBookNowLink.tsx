import type { ComponentPropsWithoutRef } from 'react';

export const FRESHA_BOOK_URL =
  'https://www.fresha.com/book-now/aylesbury-health-and-wellness-limited-y3lpx75w/services?lid=2792378&share=true&pId=2700687';

type Props = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  href?: string;
};

/**
 * Book Now link with a periodic light sweep (same idea as the-big-green-tent SupportFab shimmer).
 */
export default function ShimmerBookNowLink({
  className = '',
  children = 'Book Now',
  href = FRESHA_BOOK_URL,
  ...rest
}: Props) {
  return (
    <a href={href} className={`relative isolate inline-flex items-center justify-center overflow-hidden ${className}`} {...rest}>
      <span className="relative z-10">{children}</span>
      <span
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit]"
        aria-hidden
      >
        <span className="absolute inset-y-0 left-0 block w-[min(55%,14rem)] -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent motion-reduce:animate-none motion-reduce:opacity-0 animate-book-now-shimmer" />
      </span>
    </a>
  );
}
