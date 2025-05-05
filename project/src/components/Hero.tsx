import React, { useEffect, useRef } from 'react';
import { ArrowDown, Globe, Mail, Phone } from 'lucide-react';
import HarshitPhoto from '../Harshit Photo.jpg';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Simple fade-in animation on load, no side sliding
    const timer = setTimeout(() => {
      if (sectionRef.current) {
        const elements = sectionRef.current.querySelectorAll('.reveal-item');
        elements.forEach((el, index) => {
          setTimeout(() => {
            (el as HTMLElement).style.opacity = '1';
          }, index * 200);
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('skills');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center md:text-left">
            <div className="reveal-item opacity-0 transition-opacity duration-1000 ease-out mb-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Hi, I'm <span className="text-blue-400">Harshit Kulkarni</span>
              </h1>
            </div>
            <div className="reveal-item opacity-0 transition-opacity duration-1000 ease-out mb-8">
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                A Computer Science Student | Developer | Innovator
              </p>
            </div>
            <div className="reveal-item opacity-0 transition-opacity duration-1000 ease-out flex flex-wrap gap-4 justify-center">
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md hover:scale-105 transform"
              >
                Get in Touch
              </button>
              <a 
                href="https://drive.google.com/file/d/1NFqGDFQNtQEijkbCRinhaH43nEIfVvNs/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-blue-400 border border-blue-400 rounded-md hover:bg-blue-900/50 transition-all duration-300 hover:scale-105 transform"
              >
                Download Resume
              </a>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="mx-auto md:mx-0 w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <img src={HarshitPhoto} alt="Harshit Kulkarni" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* About Section */}
        <div className="mt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800/50 rounded-xl p-8 backdrop-blur-sm reveal-item opacity-0 transition-opacity duration-1000 ease-out">
            <h2 className="text-2xl font-bold text-center mb-6 text-white">
              <span className="relative inline-block">
                About Me
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 transform origin-left"></span>
              </span>
            </h2>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-300 mb-4">
                  Passionate Computer Science student with a proven track record in research, innovation, and hands-on development. Experienced in leading and collaborating on impactful projects, including published research and patent-pending technology. Adept at leveraging modern IT, programming, and teamwork to solve real-world problems. Eager to drive progress in technology through creativity, analytical thinking, and a commitment to excellence.
                </p>
                
                <div className="space-y-2 text-gray-300 mt-6">
                  <div className="flex items-center gap-2">
                    <Globe size={18} className="text-blue-400" />
                    <span>Chennai, Tamil Nadu 603203</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-blue-400" />
                    <a href="mailto:kulharshit21@gmail.com" className="text-blue-400 hover:underline">
                      kulharshit21@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-blue-400" />
                    <a href="tel:+918310381878" className="text-blue-400 hover:underline">
                      +91 8310381878
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4 pt-4">
                <a
                  href="https://github.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center transition-transform hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center transition-transform hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a
                  href="https://www.researchgate.net/profile/Harshit-Kulkarni-4" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center transition-transform hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.586 0c-2.183 0-4.226 1.6-4.226 5.337 0 1.7.362 2.808 1.088 3.562.485.483 1.18.703 2.115.703 1.63 0 2.83-1.146 3.578-2.1l.19-.296-.946-.946-.177.304c-.466.774-1.15 1.384-1.702 1.384-.292 0-.457-.143-.58-.291-.4-.483-.596-1.415-.596-2.32 0-2.336.887-3.387 2.256-3.387.792 0 1.402.236 1.775.825.26.416.293.965.293 1.24 0 .132-.007.252-.01.344l-.16.601h1.742v-1.5c0-1.099-.458-2.012-1.282-2.563C20.39.238 19.416 0 18.584 0h1.002zM4.164 4.997c-2.724 0-4.164 1.433-4.164 4.325 0 2.537 1.234 4.328 3.16 4.328.755 0 1.738-.428 2.435-1.268v.998h1.574V4.997H4.164zm11.768 0c-.802 0-1.436.371-1.918 1.144V4.997h-1.72v8.653h1.72v-4.4c0-.962.601-2.337 1.404-2.337.185 0 .358.046.52.153.364.21.536.613.536 1.28v5.304h1.657V8.21c0-2.113-1.042-3.213-2.2-3.213zM4.59 6.424h1.433c.185 1.262.822 3.084 2.121 4.628l.922.994.922-.994c1.299-1.294 1.936-3.116 2.121-4.628H13.5c-.256 1.674-1.226 3.805-2.698 5.248l2.51 3.072h-1.881l-1.581-1.912-1.548 1.912H6.421l2.51-3.072c-1.471-1.444-2.442-3.574-2.698-5.248h-1.26l-0.383-.1z"/>
                  </svg>
                </a>
                <a
                  href="https://scholar.google.com/citations?user=vNAKXr8AAAAJ&hl=en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center transition-transform hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div 
        className="absolute bottom-8 left-0 right-0 flex justify-center cursor-pointer hover:opacity-80 transition-opacity"
        onClick={scrollToNextSection}
      >
        <div className="reveal-item opacity-0 transition-opacity duration-1000 ease-out animate-float">
          <ArrowDown size={28} className="text-blue-400" />
        </div>
      </div>

      {/* Background Elements - Decorative Shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full opacity-10 mix-blend-screen blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-indigo-500 rounded-full opacity-10 mix-blend-screen blur-xl"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-500 rounded-full opacity-10 mix-blend-screen blur-xl"></div>
    </section>
  );
};

export default Hero;