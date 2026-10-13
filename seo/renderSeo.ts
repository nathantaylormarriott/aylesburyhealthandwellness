import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import site from './site.json';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function esc(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function jsonLd() {
  const page = `${site.url}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${page}#website`,
        url: page,
        name: site.name,
        description: site.description,
        inLanguage: 'en-GB',
        publisher: { '@id': `${page}#clinic` },
      },
      {
        '@type': 'MedicalClinic',
        '@id': `${page}#clinic`,
        name: site.name,
        legalName: site.legalName,
        alternateName: ['Aylesbury Health & Wellness', site.legalName],
        description: site.description,
        url: page,
        image: `${page}images/clinic/about-feature.png`,
        telephone: site.phones,
        email: site.email,
        priceRange: '££',
        currenciesAccepted: 'GBP',
        paymentAccepted: 'Cash, Card',
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address.street,
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: site.geo.lat,
          longitude: site.geo.lng,
        },
        hasMap: 'https://www.google.com/maps/search/?api=1&query=51.8332222,-0.7816111',
        openingHoursSpecification: site.hours.map((block) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: block.days,
          opens: block.opens,
          closes: block.closes,
        })),
        areaServed: site.areas.map((name) => ({ '@type': 'Place', name })),
        availableService: site.services.map((service) => ({
          '@type': 'MedicalProcedure',
          name: `${service.title} in Aylesbury`,
          description: service.description,
          url: `${page}#${service.slug}`,
        })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Treatments at Aylesbury Health and Wellness',
          itemListElement: site.services.map((service) => ({
            '@type': 'Offer',
            name: service.title,
            description: service.description,
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'GBP',
              description: service.priceFrom,
            },
            url: `${page}#${service.slug}`,
            areaServed: 'Aylesbury',
          })),
        },
        sameAs: site.sameAs,
        isAcceptingNewPatients: true,
      },
      {
        '@type': 'FAQPage',
        '@id': `${page}#faq`,
        mainEntity: site.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    ],
  };
}

export function staticHtml() {
  const services = site.services
    .map(
      (service) => `<section id="seo-${service.slug}">
        <h2>${esc(service.title)} in Aylesbury</h2>
        <p>${esc(service.description)} ${esc(service.priceFrom)}.</p>
        <ul>${service.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
      </section>`,
    )
    .join('');

  const faqs = site.faqs
    .map((faq) => `<details><summary>${esc(faq.q)}</summary><p>${esc(faq.a)}</p></details>`)
    .join('');

  return `<article id="seo-static">
    <h1>${esc(site.name)} — clinic in Bierton, Aylesbury</h1>
    <p>${esc(site.description)}</p>
    <p>Address: ${esc(site.address.street)}, ${esc(site.address.locality)}, ${esc(site.address.region)} ${esc(site.address.postalCode)}. Phone: ${esc(site.phoneDisplay.join(' or '))}. Email: ${esc(site.email)}.</p>
    <p>Patients visit from ${esc(site.areas.join(', '))}.</p>
    <p><a href="${esc(site.bookingUrl)}">Book an appointment</a></p>
    ${services}
    <h2>Common questions</h2>
    ${faqs}
  </article>`;
}

export function llmsTxt() {
  const services = site.services
    .map(
      (service) =>
        `## ${service.title}\n${service.description}\nPrice: ${service.priceFrom}\nIncludes: ${service.items.join('; ')}\n`,
    )
    .join('\n');

  const faqs = site.faqs.map((faq) => `### ${faq.q}\n${faq.a}\n`).join('\n');

  return `# ${site.name}

> ${site.description}

Clinic in Bierton, Aylesbury, Buckinghamshire (HP22). Registered practitioners offering clinical and complementary care. Free on-site parking. New patients welcome.

- Website: ${site.url}
- Book: ${site.bookingUrl}
- Email: ${site.email}
- Phone: ${site.phoneDisplay.join(', ')}
- Address: ${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}
- Areas: ${site.areas.join(', ')}
- Hours: Mon–Thu 09:00–19:00, Fri–Sat 09:00–20:00, Sun 10:00–17:00

${services}
## Questions
${faqs}
`;
}

export function writePublicSeoFiles() {
  const body = llmsTxt();
  writeFileSync(resolve(root, 'public/llms.txt'), body);
  writeFileSync(resolve(root, 'public/llms-full.txt'), body);
}

export function seoPlugin() {
  const script = `<script type="application/ld+json">${JSON.stringify(jsonLd())}</script>`;
  const article = staticHtml();
  writePublicSeoFiles();

  return {
    name: 'local-seo',
    transformIndexHtml(html: string) {
      return html.replace('<!--SEO_JSONLD-->', script).replace('<!--SEO_STATIC-->', article);
    },
  };
}
