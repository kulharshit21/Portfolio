import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-6 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Copyright - Centered */}
          <p className="text-slate-400 text-sm text-center mb-4">
            &copy; {new Date().getFullYear()} Harshit Kulkarni. All rights reserved.
          </p>

          {/* Social Links - Centered */}
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://github.com/kulharshit21"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/harshit-kulkarni-4a6554276"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://www.researchgate.net/profile/Harshit-Kulkarni-4"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all duration-300"
              aria-label="ResearchGate Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.586 0c-2.183 0-4.226 1.6-4.226 5.337 0 1.7.362 2.808 1.088 3.562.485.483 1.18.703 2.115.703 1.63 0 2.83-1.146 3.578-2.1l.19-.296-.946-.946-.177.304c-.466.774-1.15 1.384-1.702 1.384-.292 0-.457-.143-.58-.291-.4-.483-.596-1.415-.596-2.32 0-2.336.887-3.387 2.256-3.387.792 0 1.402.236 1.775.825.26.416.293.965.293 1.24 0 .132-.007.252-.01.344l-.16.601h1.742v-1.5c0-1.099-.458-2.012-1.282-2.563C20.39.238 19.416 0 18.584 0h1.002zM4.164 4.997c-2.724 0-4.164 1.433-4.164 4.325 0 2.537 1.234 4.328 3.16 4.328.755 0 1.738-.428 2.435-1.268v.998h1.574V4.997H4.164zm11.768 0c-.802 0-1.436.371-1.918 1.144V4.997h-1.72v8.653h1.72v-4.4c0-.962.601-2.337 1.404-2.337.185 0 .358.046.52.153.364.21.536.613.536 1.28v5.304h1.657V8.21c0-2.113-1.042-3.213-2.2-3.213zM4.59 6.424h1.433c.185 1.262.822 3.084 2.121 4.628l.922.994.922-.994c1.299-1.294 1.936-3.116 2.121-4.628H13.5c-.256 1.674-1.226 3.805-2.698 5.248l2.51 3.072h-1.881l-1.581-1.912-1.548 1.912H6.421l2.51-3.072c-1.471-1.444-2.442-3.574-2.698-5.248h-1.26l-0.383-.1z" />
              </svg>
            </a>
            <a
              href="https://scholar.google.com/citations?user=vNAKXr8AAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all duration-300"
              aria-label="Google Scholar Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;