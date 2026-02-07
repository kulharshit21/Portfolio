import React, { useEffect, useRef } from 'react';
import { LightbulbIcon, Clock } from 'lucide-react';

interface OngoingProject {
  id: number;
  title: string;
  description: string;
  status: string;
  progress?: number;
}

const ongoingProjects: OngoingProject[] = [
  {
    id: 1,
    title: "DigiSaver – Digital Medical Records Platform",
    description: "A DigiLocker-style medical app that securely stores prescriptions, hospital visit records, and reports using unique Patient IDs and Doctor IDs — enabling instant access to complete health history across providers.",
    status: "In Development",
    progress: 45
  },
  {
    id: 2,
    title: "Diabetic Retinopathy Detection & Classification",
    description: "Building a prediction-cum-classification model on 120,000+ retinal images to detect and grade diabetic retinopathy stages using deep learning pipelines with GPU-accelerated training.",
    status: "Research In Progress",
    progress: 35
  }
];

const OngoingProjects: React.FC = () => {
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
      id="ongoing-projects" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 opacity-0"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          <span className="relative inline-block">
            Ongoing Projects
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 transform origin-left"></span>
          </span>
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ongoingProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-slate-700 flex flex-col justify-between"
              >
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-900 p-3 rounded-full mr-4">
                        <LightbulbIcon size={24} className="text-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    </div>
                    <p className="text-slate-300 mb-6">{project.description}</p>
                  </div>
                  <div className="flex items-center text-sm font-medium text-blue-400 mt-auto">
                    <Clock size={16} className="mr-2" />
                    <span>{project.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OngoingProjects;