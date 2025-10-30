import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#313C38] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img
              src="/images/logos/Nav Bar (Long Logo).svg"
              alt="Aylesbury Health and Wellness"
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-[#FFFAF1] opacity-90">
              Expert-led care for your body, mind, and wellbeing.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="tel:07379987766" className="flex items-center gap-2 text-[#FFFAF1] hover:text-[#83896D] transition">
                <Phone size={18} />
                <span>07379 987766</span>
              </a>
              <a href="tel:01296926045" className="flex items-center gap-2 text-[#FFFAF1] hover:text-[#83896D] transition">
                <Phone size={18} />
                <span>01296 926045</span>
              </a>
              <a href="mailto:info@aylesburyhealthandwellness.co.uk" className="flex items-center gap-2 text-[#FFFAF1] hover:text-[#83896D] transition">
                <Mail size={18} />
                <span>info@aylesburyhealthandwellness.co.uk</span>
              </a>
              <a href="https://api.whatsapp.com/send?phone=447379987766&text=Hello%20Aylesbury%20Health%20%26%20Wellness%2C%20%0A%0A" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#FFFAF1] hover:text-[#83896D] transition">
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>
              <div className="flex items-start gap-2 text-[#FFFAF1]">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>The Old Chapel, Bierton, Aylesbury</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-[#FFFAF1] hover:text-[#83896D] transition"
              >
                About Us
              </button>
              <button
                onClick={() => document.getElementById('treatments')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-[#FFFAF1] hover:text-[#83896D] transition"
              >
                Treatments
              </button>
              <button
                onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-[#FFFAF1] hover:text-[#83896D] transition"
              >
                Testimonials
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-[#FFFAF1] hover:text-[#83896D] transition"
              >
                Contact
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#83896D] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#FFFAF1] text-sm">
            © {currentYear} Aylesbury Health and Wellness. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <span className="text-[#FFFAF1] text-sm">Marketing by</span>
            <img
              src="/images/logos/AURORA MEDIA footer.svg"
              alt="AURORA Media"
              className="h-5 w-auto brightness-0 invert"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
