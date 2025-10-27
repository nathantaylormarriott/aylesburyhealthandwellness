import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Treatments from './components/Treatments';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Social from './components/Social';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Treatments />
      <Testimonials />
      <Contact />
      <Social />
      <Footer />
    </div>
  );
}

export default App;
