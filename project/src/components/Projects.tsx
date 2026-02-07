import React, { useEffect, useRef, useState } from 'react';
import rhynoevImg from '../rhynoev.jpg';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubLink?: string;
  demoLink?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Attendance Management System with Email Alerts",
    description: "A web-based system for tracking student attendance and sending automated email alerts for absentees. Features include real-time attendance marking, reporting, and customizable alert templates.",
    technologies: ["PHP", "XAMPP", "MySQL"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Gesture and Voice-Controlled Interface System",
    description: "An innovative interface system controlled by hand gestures and voice commands, enhancing accessibility for users with disabilities. Utilizes computer vision and speech recognition for seamless interaction.",
    technologies: ["Python", "OpenCV", "TensorFlow"],
    image: "https://www.embedded.com/wp-content/uploads/sites/2/2022/08/2208adi-gesture_1.jpg"
  },
  {
    id: 3,
    title: "Responsive webpage for RhynoEv",
    description: "A fully responsive and visually appealing website developed for RhynoEv, featuring product showcases, contact forms, and interactive UI elements. Built with modern web technologies.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: rhynoevImg
  },
  {
    id: 4,
    title: "Music Jamming Platform",
    description: "A real-time platform for musicians to collaborate, jam, and create music together online. Includes live audio streaming, chat, and session recording features.",
    technologies: ["React", "Node.js", "WebRTC"],
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Weather Harmony Concept Website",
    description: "A concept website that displays weather information with dynamic visual and audio elements, providing an immersive user experience. Integrates weather APIs for real-time data.",
    technologies: ["JavaScript", "HTML5", "CSS3", "APIs"],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    title: "Budget Tracking System",
    description: "A simple yet effective system for tracking personal or business expenses, generating reports, and visualizing spending patterns. Features user authentication and data export.",
    technologies: ["HTML", "CSS"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    title: "Basic Stock Market Prediction Tool",
    description: "A tool for predicting stock market trends using historical data and machine learning algorithms. Provides visualizations and prediction accuracy metrics.",
    technologies: ["Python", "Streamlit"],
    image: "https://s3.tradingview.com/b/bRiibqrx_mid.png"
  },
  {
    id: 8,
    title: "Digital Twin Tech for Wind Energy",
    description: "A digital twin technology for wind energy systems, enabling real-time monitoring, simulation, and optimization. Featured in a published research paper.",
    technologies: ["Unity", "IoT", "Azure"],
    image: "https://www.softeq.com/hubfs/Blog/digital-twins-renewable-energy-3-use-cases-hero.png"
  },
  {
    id: 9,
    title: "Warehouse Management System with Digital Twin",
    description: "Developed a comprehensive warehouse management system using 3D modeling in Unity, integrated with IoT for real-time operations and rover/robot arm control.",
    technologies: ["Unity", "IoT", "C#", "Robotics"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQyg-9Jm-eF_V9qTheQCbadOQYwbzhUxp3rA&s"
  }
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const pages: Project[][] = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(projects.slice(i * itemsPerPage, i * itemsPerPage + itemsPerPage));
  }

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
      id="projects" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white opacity-0"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          <span className="relative inline-block">
            Projects
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 transform origin-left"></span>
          </span>
        </h2>

        <div className="max-w-6xl mx-auto overflow-hidden">
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentPage * 100}%)` }}>
            {pages.map((page, pageIndex) => (
              <div key={pageIndex} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 flex-shrink-0 w-full">
                {page.map(project => (
                  <div 
                    key={project.id}
                    className="bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-slate-700 group transform hover:scale-105 hover:rotate-1"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 text-white w-full">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.technologies.map((tech, index) => (
                              <span 
                                key={index}
                                className="px-3 py-1 bg-blue-500 rounded-md text-sm font-bold text-white shadow-lg"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-bold mb-1 text-white">{project.title}</h3>
                      <p className="text-sm text-slate-300">{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => setCurrentPage(prev => prev - 1)}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >Previous</button>
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >Next</button>
        </div>
      </div>
    </section>
  );
};

export default Projects;