import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', target: '#home' },
  { label: 'About', target: '#about' },
  { label: 'Skills', target: '#skills' },
  { label: 'Projects', target: '#projects' },
  { label: 'Experience', target: '#experience' },
  { label: 'Education', target: '#education' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionId = section.getAttribute('id') || '';

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        setActiveSection(sectionId);
      }
    });

    setScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (target: string) => {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/90 backdrop-blur-sm shadow-lg shadow-slate-900/20' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            <a 
              href="#home" 
              className="text-xl font-bold text-white cursor-pointer hover:text-blue-400 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
            >
              Portfolio<span className="text-blue-400">.</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.target}
                    className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${
                      activeSection === item.target.substring(1)
                        ? 'text-blue-400'
                        : 'text-gray-300 hover:text-blue-400'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.target);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resume Download Button */}
          <div className="hidden md:block">
            <a
              href="https://drive.google.com/file/d/1NFqGDFQNtQEijkbCRinhaH43nEIfVvNs/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-300 hover:text-blue-400 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-16 left-0 right-0 bg-slate-900 shadow-lg transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-4 py-2">
          <ul className="flex flex-col space-y-4 py-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.target}
                  className={`block px-4 py-2 text-base font-medium ${
                    activeSection === item.target.substring(1)
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-blue-400'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.target);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://drive.google.com/file/d/1NFqGDFQNtQEijkbCRinhaH43nEIfVvNs/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;