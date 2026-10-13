import { useState, type ReactNode } from 'react';
import { Mail, Phone, Send, Car, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Container from './Container';
import Reveal from './Reveal';
import { submitNetlifyForm } from '../lib/netlifyForm';

const contactFacts: {
  title: string;
  icon: LucideIcon;
  tone: 'light' | 'mid' | 'dark' | 'charcoal';
  body: ReactNode;
}[] = [
  {
    title: 'Parking',
    icon: Car,
    tone: 'mid',
    body: <p>Free parking available on-site</p>,
  },
  {
    title: 'Phone',
    icon: Phone,
    tone: 'dark',
    body: (
      <div className="space-y-1">
        <a href="tel:07379987766" className="block hover:underline">
          07379 987766
        </a>
        <a href="tel:01296926045" className="block hover:underline">
          01296 926045
        </a>
      </div>
    ),
  },
  {
    title: 'Email',
    icon: Mail,
    tone: 'light',
    body: (
      <a href="mailto:info@aylesburyhealthandwellness.co.uk" className="break-all hover:underline">
        info@aylesburyhealthandwellness.co.uk
      </a>
    ),
  },
  {
    title: 'WhatsApp',
    icon: MessageCircle,
    tone: 'charcoal',
    body: (
      <a
        href="https://api.whatsapp.com/send?phone=447379987766&text=Hello%20Aylesbury%20Health%20%26%20Wellness%2C%20%0A%0A"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Message us on WhatsApp
      </a>
    ),
  },
];

const factTone: Record<(typeof contactFacts)[number]['tone'], string> = {
  light: 'bg-[#B2BCA4] text-[#313C38]',
  mid: 'bg-[#83896D] text-[#FFFAF1]',
  dark: 'bg-[#5A6252] text-[#FFFAF1]',
  charcoal: 'bg-[#313C38] text-[#FFFAF1]',
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const company = (form.elements.namedItem('company') as HTMLInputElement | null)?.value ?? '';

    try {
      const [saved, listed] = await Promise.all([
        submitNetlifyForm('contact', {
          name: formData.name,
          phone: formData.number,
          email: formData.email,
          message: formData.message,
          'bot-field': company,
        }),
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.number,
            email: formData.email,
            message: formData.message,
            company,
          }),
        }),
      ]);
      const listedData = (await listed.json().catch(() => null)) as { ok?: boolean } | null;

      if (saved && listed.ok && listedData?.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', number: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    'w-full rounded-2xl border border-[#83896D]/25 bg-[#FFFAF1] px-4 py-3 text-[#313C38] outline-none transition focus:border-[#5A6252]';

  return (
    <section id="contact" className="bg-[#FFFAF1] pt-[120px] pb-[120px]">
      <Container>
        <Reveal className="mb-20 max-w-3xl text-left">
          <header>
            <h2 className="mb-0 text-balance text-4xl font-semibold leading-none text-[#313C38] sm:text-5xl md:text-6xl lg:text-[4rem]">
              Find us
            </h2>
            <p className="mt-1 text-balance text-lg leading-snug text-[#83896D] md:text-xl">
              The Old Chapel in Bierton, near Aylesbury.
            </p>
          </header>
        </Reveal>

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
            <Reveal className="h-full lg:col-span-5">
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="flex h-full flex-col gap-4 rounded-3xl border border-[#83896D]/15 bg-white p-6 md:p-7"
              >
            <input type="hidden" name="form-name" value="contact" />
            <label className="hidden" htmlFor="contact-company">
              Company
              <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </label>
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#313C38]">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="number" className="mb-1.5 block text-sm font-medium text-[#313C38]">
                Phone
              </label>
              <input
                type="tel"
                id="number"
                name="phone"
                required
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#313C38]">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[#313C38]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                data-lenis-prevent
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`${fieldClass} resize-none`}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#313C38] px-6 py-3 font-medium text-white transition hover:bg-[#4a574f] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send message'}
              <Send size={18} strokeWidth={1.75} />
            </button>
            {submitStatus === 'success' ? (
              <p className="text-sm text-[#313C38]" role="status">
                Thank you. We’ll be in touch soon.
              </p>
            ) : null}
            {submitStatus === 'error' ? (
              <p className="text-sm text-[#8B5A4A]" role="status">
                Something went wrong. Please try again or contact us directly.
              </p>
            ) : null}
              </form>
            </Reveal>

            <Reveal className="h-full lg:col-span-7 [&>*]:h-full">
              <div
                className="flex h-full min-h-[22rem] flex-col overflow-hidden rounded-3xl border border-[#83896D]/15 md:min-h-0"
              >
                <div className="relative min-h-[14rem] flex-1">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2464.0!2d-0.7816111!3d51.8332222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTHCsDQ5JzU5LjUiTiAwwrA0Nic1My43Ilc!5e0!3m2!1sen!2suk!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Aylesbury Health and Wellness Location"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="flex shrink-0 flex-col gap-4 bg-[#83896D] px-6 py-5 text-[#FFFAF1] sm:flex-row sm:items-center sm:justify-between md:px-7 md:py-6">
                  <div className="min-w-0 text-left">
                    <h3 className="text-lg font-semibold leading-snug md:text-xl">Location</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#FFFAF1]/92 md:text-base">
                      The Old Chapel, 185b Aylesbury Rd
                      <br />
                      Bierton, Aylesbury HP22 5DW
                    </p>
                  </div>
                  <a
                    href="https://www.google.com/maps/place/51%C2%B049'59.6%22N+0%C2%B046'53.8%22W/@51.8332222,-0.7816111,950m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d51.8332222!4d-0.7816111?entry=ttu&g_ep=EgoyMDI1MTAyNy4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit shrink-0 items-center justify-center rounded-full bg-[#313C38] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#4a574f]"
                  >
                    Get directions
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactFacts.map((fact) => {
              const Icon = fact.icon;
              return (
                <Reveal key={fact.title} className="h-full [&>*]:h-full">
                  <article
                    className={`flex h-full min-h-[9.5rem] flex-col justify-between rounded-3xl p-5 md:p-6 ${factTone[fact.tone]}`}
                  >
                    <div
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${
                        fact.tone === 'light' ? 'bg-[#313C38]/12' : 'bg-white/15'
                      }`}
                    >
                      <Icon size={18} strokeWidth={1.75} />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold leading-snug md:text-xl">{fact.title}</h3>
                      <div className="mt-1.5 text-sm leading-relaxed opacity-90 md:text-base">{fact.body}</div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
