import Hero from './components/Hero';
import About from './components/About';
import Testimonials from './components/Testimonials';
import MidCTA from './components/MidCTA';
import FeaturedHomes from './components/FeaturedHomes';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Hero />
      <About />
      <Testimonials />
      <MidCTA />
      <FeaturedHomes />
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default App;
