import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', target: '#home' },
  { label: 'Skills', target: '#skills' },
  { label: 'Projects', target: '#projects' },
  { label: 'Experience', target: '#experience' },
  { label: 'Education', target: '#education' },
  { label: 'Contact', target: '#contact' },
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
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-sm shadow-lg shadow-slate-900/20' : 'bg-transparent'
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
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.target}
                    className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${activeSection === item.target.substring(1)
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

          {/* HK Avatar */}
          <div className="hidden md:block">
            <a
              href="https://drive.google.com/file/d/1xP4q23bT9r-APigaa04NLpBbysmoCRR_/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-md hover:scale-110 transition-transform duration-300 border-2 border-blue-400"
              title="Harshit Kulkarni – View Resume"
            >
              HK
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

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] bg-slate-900/95 backdrop-blur-md shadow-2xl transition-transform duration-300 ease-in-out transform z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="px-4 py-6 h-full overflow-y-auto">
          <ul className="flex flex-col space-y-2">
            {navItems.map((item, index) => (
              <li
                key={item.label}
                style={{
                  animation: isOpen ? `slideIn 0.3s ease-out ${index * 0.05}s both` : 'none'
                }}
              >
                <a
                  href={item.target}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${activeSection === item.target.substring(1)
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-slate-800 hover:text-blue-400'
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

          {/* Mobile Resume Link */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <a
              href="https://drive.google.com/file/d/1xP4q23bT9r-APigaa04NLpBbysmoCRR_/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 rounded-lg text-center bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              View Resume
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;