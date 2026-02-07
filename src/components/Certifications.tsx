import React, { useEffect, useRef, useState } from 'react';
import { Award, ExternalLink, X } from 'lucide-react';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

// Modal component for certificate viewing
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificatePath: string;
  title: string;
}

const CertificateModal: React.FC<ModalProps> = ({ isOpen, onClose, certificatePath, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-75 transition-opacity" onClick={onClose}></div>
      <div className="relative w-11/12 max-w-3xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden z-10">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-auto" style={{ maxHeight: 'calc(90vh - 90px)' }}>
          <img 
            src={certificatePath} 
            alt={`${title} Certificate`}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

const certifications: Certification[] = [
  {
    id: 1,
    title: "Programming in Java",
    issuer: "NPTEL (IITs & IISc)",
    date: "2024",
    link: "#"
  },
  {
    id: 2,
    title: "Introduction to Database Systems",
    issuer: "NPTEL (IITs & IISc)",
    date: "2024",
    link: "#"
  },
  {
    id: 3,
    title: "Python Programming",
    issuer: "NPTEL",
    date: "August 2023",
    link: "#"
  },
  {
    id: 4,
    title: "C Programming",
    issuer: "Udemy",
    date: "December 2023",
    link: "#"
  },
  {
    id: 5,
    title: "C++ Programming",
    issuer: "EdX",
    date: "March 2024",
    link: "#"
  },
  {
    id: 6,
    title: "HTML & Web Development",
    issuer: "freeCodeCamp",
    date: "May 2024",
    link: "#"
  },
  {
    id: 7,
    title: "IEEE ICCCNT 2024 – Wind Farm Digital Twin Publication",
    issuer: "IEEE",
    date: "June 2024"
  },
  {
    id: 8,
    title: "WeHack National Level Hackathon",
    issuer: "WeHack",
    date: "February 2024"
  },
  {
    id: 9,
    title: "Digital Twin Workshop (3rd Place)",
    issuer: "Praya Labs, SRM IST",
    date: "October 2024"
  },
  {
    id: 10,
    title: "Advanced Programming Practices",
    issuer: "NPTEL",
    date: "July 2024",
    link: "#"
  }
];

const Certifications: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState({ path: '', title: '' });

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

  const openCertificateModal = (certId: number, title: string) => {
    // In a real scenario, you would have actual paths to the certificates
    // For now, we'll use a placeholder image
    const certificatePath = `/path/to/certificate-${certId}.jpg`;
    setSelectedCertificate({ path: certificatePath, title });
    setModalOpen(true);
  };

  return (
    <section 
      id="certifications" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white opacity-0"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          <span className="relative inline-block">
            Certificates & Training
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 transform origin-left"></span>
          </span>
        </h2>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {certifications.map(cert => (
              <div 
                key={cert.id}
                className="bg-slate-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-700 flex flex-col"
              >
                <div className="flex items-start mb-3">
                  <div className="bg-blue-900 p-1.5 rounded-md mr-3">
                    <Award size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{cert.title}</h3>
                    <p className="text-xs text-slate-300">{cert.issuer}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-auto">{cert.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CertificateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        certificatePath={selectedCertificate.path}
        title={selectedCertificate.title}
      />
    </section>
  );
};

export default Certifications;