import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Education from './Education';
import Publications from './Publications';
import Certifications from './Certifications';
import ExtraCurriculars from './ExtraCurriculars';
import References from './References';
import Contact from './Contact';
import Footer from './Footer';

/** One lazy boundary = one JS chunk after hero; faster than N separate Suspense waits. */
export default function BelowFold() {
  return (
    <>
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Publications />
      <Certifications />
      <ExtraCurriculars />
      <References />
      <Contact />
      <Footer />
    </>
  );
}
