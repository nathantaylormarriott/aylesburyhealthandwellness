import type { ComponentPropsWithoutRef } from 'react';

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
    <a href={href} className={`inline-flex items-center justify-center ${className}`.trim()} {...rest}>
      {children}
    </a>
  );
}
