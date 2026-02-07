import React, { useEffect, useRef } from 'react';

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
    title: "GramHealth AI – Multimodal Healthcare Assistant",
    description: "AI-powered PWA for preliminary medical assessment via text, voice, image & video with multilingual support, offline functionality, and WCAG-compliant accessibility. Built during Google DeepMind × Kaggle Hackathon.",
    technologies: ["React", "TypeScript", "Gemini AI", "PWA"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
    githubLink: "https://github.com/kulharshit21/GramHealthAi"
  },
  {
    id: 2,
    title: "LunarSense-3",
    description: "GPU-accelerated ML pipeline processing Chandrayaan-3 thermal and seismic data; achieved >60% precision in lunar hazard routing, deployed via Docker for GIS integration.",
    technologies: ["Python", "TensorFlow", "PyTorch", "GIS"],
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=80",
    githubLink: "https://github.com/kulharshit21/LunarSense"
  },
  {
    id: 3,
    title: "Attendance Management System",
    description: "Full-stack attendance system with role-based dashboards, automated email alerts, and MySQL backend; reduced manual effort by ~60%.",
    technologies: ["PHP", "HTML/CSS", "MySQL"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    githubLink: "https://github.com/kulharshit21"
  },
  {
    id: 4,
    title: "Unity Digital Twin – Warehouse Management",
    description: "Automated warehouse logistics with a rover + robotic arm using Unity and IoT hardware; improved operational efficiency by ~50%.",
    technologies: ["Unity", "IoT", "C#", "Robotics"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQyg-9Jm-eF_V9qTheQCbadOQYwbzhUxp3rA&s",
    githubLink: "#" // TODO: paste your GitHub link here
  },
  {
    id: 5,
    title: "QuickLink – URL Shortener with Analytics",
    description: "REST API that converts long URLs into short links with Redis caching for fast redirects (<50ms), click tracking, QR code generation, API key auth, real-time analytics dashboard (clicks by country/device/date), and Docker deployment.",
    technologies: ["Spring Boot", "MySQL", "Redis", "Docker"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    githubLink: "https://github.com/kulharshit21/quicklink-url-shortener"
  },
  {
    id: 6,
    title: "ResearchGPT – Local RAG for Academic Papers",
    description: "Fully local RAG system answering questions about 50,000+ AI/ML papers from arXiv using Mistral 7B (4-bit quantized), ChromaDB vector database, and Sentence-BERT embeddings. 100% private, no external API calls.",
    technologies: ["Python", "Mistral 7B", "ChromaDB", "Streamlit"],
    image: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=600&q=80",
    githubLink: "https://github.com/kulharshit21/RAG-System"
  }
];

const Projects: React.FC = () => {
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

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map(project => (
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
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;