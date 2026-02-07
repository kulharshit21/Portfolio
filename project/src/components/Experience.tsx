import React, { useEffect, useRef } from 'react';
import { Calendar, MapPin, Award } from 'lucide-react';

interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  achievements?: string[];
}

const experiences: Experience[] = [
  {
    id: 1,
    role: "Intern",
    company: "Teachnook",
    location: "Remote",
    period: "Jul 2024 - Aug 2024",
    description: [
      "Built a website in collaboration with RhynoEv",
      "Hands-on experience and skill enhancement in web development"
    ]
  },
  {
    id: 2,
    role: "Hands-on Training",
    company: "Praya Labs",
    location: "SRM Institute of Science and Technology",
    period: "Oct 2024",
    description: [
      "Training in Digital Twin Technology",
      "Unity + IoT integration"
    ],
    achievements: [
      "3rd position in performance"
    ]
  }
];

const Experience: React.FC = () => {
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
      id="experience" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 opacity-0"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          <span className="relative inline-block">
            Experience
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 transform origin-left"></span>
          </span>
        </h2>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map((exp) => (
              <div 
                key={exp.id}
                className="bg-slate-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-700"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <div className="flex items-center text-blue-600 text-sm font-medium my-2 sm:my-0">
                    <Calendar size={16} className="mr-1" />
                    {exp.period}
                  </div>
                </div>
                
                <p className="text-lg font-semibold text-blue-400 mt-1">{exp.company}</p>
                
                <div className="flex items-center text-slate-600 text-sm mt-1 mb-4">
                  <MapPin size={16} className="mr-1" />
                  {exp.location}
                </div>
                
                <ul className="space-y-2 text-slate-300">
                  {exp.description.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mt-[0.6rem] mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                
                {exp.achievements && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-green-600 font-medium mb-2">
                      <Award size={18} className="mr-2" />
                      Achievements
                    </div>
                    <ul className="space-y-2 text-green-300">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-600 mt-[0.6rem] mr-2"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;