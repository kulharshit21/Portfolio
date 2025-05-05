import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-slate-900 text-white py-12 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Harshit<span className="text-blue-400">.</span>
              </h2>
              <p className="mt-2 text-slate-400 max-w-xs">
                Computer Science Student | Developer | Innovator
              </p>
              
              <div className="flex space-x-4 mt-6">
                <a
                  href="https://github.com/kulharshit21" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/harshit-kulkarni-4a6554276" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://www.researchgate.net/profile/Harshit-Kulkarni-4" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-300"
                  aria-label="ResearchGate Profile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.586 0c-2.183 0-4.226 1.6-4.226 5.337 0 1.7.362 2.808 1.088 3.562.485.483 1.18.703 2.115.703 1.63 0 2.83-1.146 3.578-2.1l.19-.296-.946-.946-.177.304c-.466.774-1.15 1.384-1.702 1.384-.292 0-.457-.143-.58-.291-.4-.483-.596-1.415-.596-2.32 0-2.336.887-3.387 2.256-3.387.792 0 1.402.236 1.775.825.26.416.293.965.293 1.24 0 .132-.007.252-.01.344l-.16.601h1.742v-1.5c0-1.099-.458-2.012-1.282-2.563C20.39.238 19.416 0 18.584 0h1.002zM4.164 4.997c-2.724 0-4.164 1.433-4.164 4.325 0 2.537 1.234 4.328 3.16 4.328.755 0 1.738-.428 2.435-1.268v.998h1.574V4.997H4.164zm11.768 0c-.802 0-1.436.371-1.918 1.144V4.997h-1.72v8.653h1.72v-4.4c0-.962.601-2.337 1.404-2.337.185 0 .358.046.52.153.364.21.536.613.536 1.28v5.304h1.657V8.21c0-2.113-1.042-3.213-2.2-3.213zM4.59 6.424h1.433c.185 1.262.822 3.084 2.121 4.628l.922.994.922-.994c1.299-1.294 1.936-3.116 2.121-4.628H13.5c-.256 1.674-1.226 3.805-2.698 5.248l2.51 3.072h-1.881l-1.581-1.912-1.548 1.912H6.421l2.51-3.072c-1.471-1.444-2.442-3.574-2.698-5.248h-1.26l-0.383-.1z"/>
                  </svg>
                </a>
                <a
                  href="https://scholar.google.com/citations?user=vNAKXr8AAAAJ&hl=en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-300"
                  aria-label="Google Scholar Profile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#about" 
                    className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      const aboutSection = document.getElementById('about');
                      if (aboutSection) {
                        aboutSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <span className="mr-2">•</span> About
                  </a>
                </li>
                <li>
                  <a 
                    href="#skills" 
                    className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      const skillsSection = document.getElementById('skills');
                      if (skillsSection) {
                        skillsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <span className="mr-2">•</span> Skills
                  </a>
                </li>
                <li>
                  <a 
                    href="#projects" 
                    className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      const projectsSection = document.getElementById('projects');
                      if (projectsSection) {
                        projectsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <span className="mr-2">•</span> Projects
                  </a>
                </li>
                <li>
                  <a 
                    href="#education" 
                    className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      const educationSection = document.getElementById('education');
                      if (educationSection) {
                        educationSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <span className="mr-2">•</span> Education
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-slate-800 p-2 rounded-md mr-3">
                    <MapPin size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-300">Location</h4>
                    <p className="text-slate-400 text-sm">Chennai, Tamil Nadu 603203</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-slate-800 p-2 rounded-md mr-3">
                    <Mail size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-300">Email</h4>
                    <a 
                      href="mailto:kulharshit21@gmail.com"
                      className="text-slate-400 text-sm hover:text-white transition-colors duration-300"
                    >
                      kulharshit21@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-slate-800 p-2 rounded-md mr-3">
                    <Phone size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-300">Phone</h4>
                    <a 
                      href="tel:+918310381878"
                      className="text-slate-400 text-sm hover:text-white transition-colors duration-300"
                    >
                      +91 8310381878
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Harshit Kulkarni. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;