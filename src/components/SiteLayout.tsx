import type { ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="site-curtain relative z-10 min-h-screen bg-[#FFFAF1]">
        <Navbar />
        <main id="main-content">{children}</main>
      </div>
      <Footer />
    </>
  );
}
