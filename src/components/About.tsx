import React, { useEffect, useRef } from 'react';
import { Globe, Mail, Phone } from 'lucide-react';

const About: React.FC = () => {
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
      id="about" 
      ref={sectionRef}
      className="py-24 bg-white opacity-0"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
            <span className="relative inline-block">
              About Me
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 transform origin-left"></span>
            </span>
          </h2>
          
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-8 items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg">
                <img 
                  src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                  alt="Harshit Kulkarni"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Harshit Kulkarni</h3>
                <p className="text-slate-600 mb-4">
                  Pre-final year Computer Science student with hands-on experience building web applications (React, Flask, PHP), working with databases (MySQL, PostgreSQL), and developing ML pipelines. Proven track record in Agile teams, delivering accessible, metric-driven solutions.
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe size={18} className="text-blue-600" />
                    <span className="text-slate-700">Chennai, Tamil Nadu 603203</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-blue-600" />
                    <a href="mailto:hk0534@srmist.edu.in" className="text-blue-600 hover:underline">
                      hk0534@srmist.edu.in
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-blue-600" />
                    <a href="mailto:kulharshit21@gmail.com" className="text-blue-600 hover:underline">
                      kulharshit21@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-blue-600" />
                    <a href="tel:+918310381878" className="text-blue-600 hover:underline">
                      +91 8310381878
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <a
                href="https://github.com/kulharshit21" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center transition-transform hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/harshit-kulkarni-4a6554276?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B2iUQ19MfRwitw9eXkpDF4w%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center transition-transform hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="mailto:kulharshit21@gmail.com" 
                className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center transition-transform hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;