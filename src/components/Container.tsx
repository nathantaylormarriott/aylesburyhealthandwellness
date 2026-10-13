import type { HTMLAttributes } from 'react';

/** Side inset is twice the nav’s vertical padding (py-4 → 16px, so 32px). */
export default function Container({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`w-full px-8 ${className}`.trim()} {...props} />
  );
}
