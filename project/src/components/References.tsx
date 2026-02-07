import React, { useEffect, useRef } from 'react';
import { User, Mail, Phone, Linkedin } from 'lucide-react';

const References: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.1,
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="references" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 opacity-0"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          <span className="relative inline-block">
            References
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 transform origin-left"></span>
          </span>
        </h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                  <User size={48} className="text-blue-600" />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">Dr. Bakkialakshmi V. S</h3>
                  <p className="text-slate-600 mb-4">Assistant Professor, SRM Institute of Science and Technology</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Mail size={18} className="text-blue-600" />
                      <a href="mailto:bakkialv@srmist.edu.in" className="text-blue-600 hover:underline">
                        bakkialv@srmist.edu.in
                      </a>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Phone size={18} className="text-blue-600" />
                      <a href="tel:+919791141943" className="text-blue-600 hover:underline">
                        +91 979-114-1943
                      </a>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Linkedin size={18} className="text-blue-600" />
                      <a href="https://www.linkedin.com/in/bakkialakshmivs/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        LinkedIn
                      </a>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-slate-600 italic">
                      "Academic Mentor"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                  <User size={48} className="text-blue-600" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">Dr. Jesline D</h3>
                  <p className="text-slate-600 mb-4">Assistant Professor, SRM Institute of Science and Technology</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Mail size={18} className="text-blue-600" />
                      <a href="mailto:jeslined@srmist.edu.in" className="text-blue-600 hover:underline">
                        jeslined@srmist.edu.in
                      </a>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Phone size={18} className="text-blue-600" />
                      <a href="tel:+919962567780" className="text-blue-600 hover:underline">
                        +91 99625 67780
                      </a>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-slate-600 italic">
                      "Academic Mentor"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default References;