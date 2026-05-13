import { Instagram } from 'lucide-react';

export default function Social() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFAF1]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#313C38] mb-4">
          Follow Our Journey
        </h2>
        <p className="text-lg text-[#313C38] mb-8">
          Stay updated with wellness tips, treatment insights, and clinic news
        </p>

        <div className="flex justify-center gap-6">
          <a
            href="https://www.instagram.com/aylesburyhealthandwellness/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            <Instagram size={28} className="text-[#E4405F]" />
            <span className="text-[#313C38] font-semibold">Instagram</span>
          </a>

          <a
            href="https://www.tiktok.com/@ayleshealthandwellness"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
            <span className="text-[#313C38] font-semibold">TikTok</span>
          </a>
        </div>
      </div>
    </section>
  );
}
