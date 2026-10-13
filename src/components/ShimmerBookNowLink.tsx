import type { ComponentPropsWithoutRef } from 'react';
import { ArrowRight } from 'lucide-react';

export const FRESHA_BOOK_URL =
  'https://www.fresha.com/book-now/aylesbury-health-and-wellness-limited-y3lpx75w/services?lid=2792378&share=true&pId=2700687';

type Props = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  href?: string;
};

export default function ShimmerBookNowLink({
  className = '',
  children = 'Book Now',
  href = FRESHA_BOOK_URL,
  ...rest
}: Props) {
  return (
    <a
      href={href}
      className={`book-now-cta inline-flex items-center justify-center gap-2 ${className}`.trim()}
      {...rest}
    >
      <span className="relative z-[1]">{children}</span>
      <ArrowRight className="relative z-[1] h-4 w-4 book-now-arrow-nudge" aria-hidden />
    </a>
  );
}
