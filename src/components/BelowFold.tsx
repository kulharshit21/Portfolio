import { useLayoutEffect } from 'react';
import { ScrollTrigger } from '../lib/gsapSetup';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Certifications from './Certifications';
import Education from './Education';
import Publications from './Publications';
import ExtraCurriculars from './ExtraCurriculars';
import References from './References';
import Contact from './Contact';
import Footer from './Footer';
import { SectionDivider } from './SectionDivider';

/** One lazy boundary = one JS chunk after hero; faster than N separate Suspense waits. */
export default function BelowFold() {
  useLayoutEffect(() => {
    ScrollTrigger.refresh();
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      <div className="section-band section-band--even">
        <Skills />
      </div>
      <SectionDivider />
      <div className="section-band section-band--odd">
        <Projects />
      </div>
      <SectionDivider />
      <div className="section-band section-band--even">
        <Experience />
      </div>
      <SectionDivider />
      <div className="section-band section-band--odd">
        <Certifications />
      </div>
      <SectionDivider />
      <div className="section-band section-band--even">
        <Education />
      </div>
      <SectionDivider />
      <div className="section-band section-band--odd">
        <Publications />
      </div>
      <SectionDivider />
      <div className="section-band section-band--even">
        <ExtraCurriculars />
      </div>
      <SectionDivider />
      <div className="section-band section-band--odd">
        <References />
      </div>
      <SectionDivider />
      <div className="section-band section-band--even">
        <Contact />
      </div>
      <SectionDivider />
      <div className="section-band section-band--odd">
        <Footer />
      </div>
    </>
  );
}
