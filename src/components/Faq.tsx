import site from '../../seo/site.json';
import Container from './Container';
import Reveal from './Reveal';

export default function Faq() {
  return (
    <section id="faq" className="bg-white pt-[120px] pb-[120px]">
      <Container>
        <Reveal className="mx-auto mb-10 max-w-3xl text-left md:mb-12">
          <header>
            <h2 className="mb-0 text-balance text-4xl font-semibold leading-none text-[#313C38] sm:text-5xl md:text-6xl lg:text-[4rem]">
              Questions about the clinic
            </h2>
            <p className="mt-1 text-balance text-lg leading-snug text-[#83896D] md:text-xl">
              Practical answers for people looking for care in Aylesbury and nearby villages.
            </p>
          </header>
        </Reveal>

        <div className="mx-auto max-w-3xl space-y-3">
          {site.faqs.map((faq) => (
            <Reveal key={faq.q}>
              <details className="group rounded-2xl border border-[#83896D]/25 bg-[#FFFAF1] px-5 py-4">
                <summary className="flex cursor-pointer list-none justify-between gap-4 font-semibold text-[#313C38]">
                  {faq.q}
                  <span className="text-[#83896D] transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-[#313C38]">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
