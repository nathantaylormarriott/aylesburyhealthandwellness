import site from '../../seo/site.json';

const FRESHA_BOOKING_BASE =
  'https://www.fresha.com/a/aylesbury-health-and-wellness-limited-aylesbury-185b-aylesbury-road-q24d42ag/booking?menu=true&share=true&pId=2700687&dppub=true';

/** Fresha menu category keys for this location (Link Builder / booking tabs). */
const menuCategoryIdBySlug: Partial<Record<string, string>> = {
  'colonic-hydrotherapy': '5715014',
  'massage-therapy': '5715015',
  'digestive-health': '5715013',
  'professional-footcare': '5715012',
  'ear-care': '5715011',
  'facial-treatments': '5715010',
  counselling: '5715009',
  'health-coaching-nutrition': '5715008',
  'couples-wellness-packages': '5946234',
};

export function getTreatmentBookingUrl(slug: string, serviceBookingUrl?: string): string {
  if (serviceBookingUrl) return serviceBookingUrl;
  const menuCategoryId = menuCategoryIdBySlug[slug];
  if (menuCategoryId) {
    return `${FRESHA_BOOKING_BASE}&menuCategoryId=${menuCategoryId}`;
  }
  return site.bookingUrl;
}
