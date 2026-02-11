import { useEffect, useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
// About section is embedded in Hero
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import OngoingProjects from './components/OngoingProjects';
import ExtraCurriculars from './components/ExtraCurriculars';
import References from './components/References';
import Contact from './components/Contact';
import Footer from './components/Footer';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Harshit Kulkarni | Computer Science Student";
    // Force scroll to top on mount
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Simulate loading for assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="font-sans bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white relative">
      <ScrollProgress />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="stars"></div>
        <div className="twinkle"></div>
      </div>
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <OngoingProjects />
        <ExtraCurriculars />
        <References />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
