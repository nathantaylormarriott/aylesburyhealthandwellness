import type Lenis from 'lenis';

/** Fixed navbar band (~py-4 + logo) */
export const SCROLL_OFFSET = -80;

let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenisInstance() {
  return lenisInstance;
}

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (!element) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(element, { offset: SCROLL_OFFSET });
    return;
  }

  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

