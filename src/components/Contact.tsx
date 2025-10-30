import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Car, MessageCircle, Navigation } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/xovqqgep', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.number,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
          _subject: 'New Contact Form Submission - Aylesbury Health & Wellness',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', number: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 hidden lg:block"
        style={{ backgroundImage: 'url(/images/landscape.webp)' }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 lg:hidden"
        style={{ backgroundImage: 'url(/images/landscape%20blurred.webp)' }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#313C38] mb-6">
            Find Us
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="h-[450px] rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2464.0!2d-0.7816111!3d51.8332222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTHCsDQ5JzU5LjUiTiAwwrA0Nic1My43Ilc!5e0!3m2!1sen!2suk!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Aylesbury Health and Wellness Location"
              ></iframe>
            </div>
            <a
              href="https://www.google.com/maps/place/51%C2%B049'59.6%22N+0%C2%B046'53.8%22W/@51.8332222,-0.7816111,950m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d51.8332222!4d-0.7816111?entry=ttu&g_ep=EgoyMDI1MTAyNy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-6 py-3 bg-[#83896D] text-white rounded-lg hover:bg-[#6B7A5B] transition-all transform hover:scale-105 hover:shadow-lg font-medium flex items-center justify-center gap-2"
            >
              <Navigation size={20} />
              Get Directions
            </a>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#83896D] text-white rounded-full flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#313C38] mb-1">Location</h3>
                  <p className="text-[#313C38]">
                    185b Aylesbury Rd, Bierton<br />
                    Aylesbury HP22 5DW
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#83896D] text-white rounded-full flex items-center justify-center">
                  <Car size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#313C38] mb-1">Parking</h3>
                  <p className="text-[#313C38]">
                    Free parking available on-site
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#83896D] text-white rounded-full flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#313C38] mb-1">Phone</h3>
                  <a href="tel:07379987766" className="text-[#313C38] hover:text-[#83896D] transition">
                    07379 987766
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#83896D] text-white rounded-full flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#313C38] mb-1">Email</h3>
                  <a href="mailto:info@aylesburyhealthandwellness.co.uk" className="text-[#313C38] hover:text-[#83896D] transition">
                    info@aylesburyhealthandwellness.co.uk
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#83896D] text-white rounded-full flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#313C38] mb-1">WhatsApp</h3>
                  <a href="https://api.whatsapp.com/send?phone=447379987766&text=Hello%20Aylesbury%20Health%20%26%20Wellness%2C%20%0A%0A" target="_blank" rel="noopener noreferrer" className="text-[#313C38] hover:text-[#83896D] transition">
                    Message us on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#83896D] text-white rounded-full flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#313C38] mb-1">Location</h3>
                  <p className="text-[#313C38]">
                    The Old Chapel, Bierton<br />
                    Aylesbury
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#313C38] mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white border-2 border-[#83896D] rounded-lg focus:border-[#83896D] outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="number" className="block text-sm font-medium text-[#313C38] mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="number"
                  required
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  className="w-full px-4 py-3 bg-white border-2 border-[#83896D] rounded-lg focus:border-[#83896D] outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#313C38] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white border-2 border-[#83896D] rounded-lg focus:border-[#83896D] outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#313C38] mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white border-2 border-[#83896D] rounded-lg focus:border-[#83896D] outline-none transition resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-[#D97706] text-white rounded-lg hover:bg-[#B45309] transition-all transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 font-medium"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send size={20} />
              </button>

              {submitStatus === 'success' && (
                <p className="text-green-600 text-center">
                  Thank you! We'll be in touch soon.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600 text-center">
                  Something went wrong. Please try again or contact us directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
