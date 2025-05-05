import React, { useEffect, useRef } from 'react';
import { GraduationCap, Calendar } from 'lucide-react';

interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  score: string;
  details?: string[];
}

const education: Education[] = [
  {
    id: 1,
    degree: "B.Tech Computer Science",
    institution: "SRM Institute of Science and Technology",
    period: "2023 - 2027 (Expected)",
    score: "CGPA: 8.6",
    details: [
      "Specializing in Computer Science and Engineering",
      "Active participation in tech clubs and events",
      "Relevant coursework: Data Structures, Algorithms, Database Management, Web Development"
    ]
  },
  {
    id: 2,
    degree: "Pre-University",
    institution: "Chinmaya PU College of Science & Commerce",
    period: "2021 - 2023",
    score: "Score: 89.6%",
    details: [
      "Science stream with Computer Science",
      "Participated in various inter-college competitions"
    ]
  },
  {
    id: 3,
    degree: "High School",
    institution: "Sri Sathya Sai Loka Seva Vidya Kendra",
    period: "2019 - 2021",
    score: "Score: 86%",
    details: [
      "Developed foundational knowledge in science and mathematics",
      "Participated in extracurricular activities"
    ]
  }
];

const Education: React.FC = () => {
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
      id="education" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 opacity-0"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          <span className="relative inline-block">
            Education
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 transform origin-left"></span>
          </span>
        </h2>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {education.map((edu) => (
              <div 
                key={edu.id}
                className="bg-slate-800 rounded-lg overflow-hidden shadow-md border border-slate-700 hover:shadow-lg transition-all duration-300 h-full flex"
              >
                <div className="flex flex-col md:flex-row items-stretch flex-1">
                  <div className="bg-blue-900 text-blue-400 p-6 flex flex-col justify-center items-center md:w-1/4 h-full">
                    <GraduationCap size={48} className="mb-2" />
                    <div className="text-center font-medium">{edu.score}</div>
                  </div>
                  
                  <div className="p-6 md:w-3/4">
                    <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                    <p className="text-lg text-blue-400">{edu.institution}</p>
                    
                    <div className="flex items-center text-slate-600 text-sm my-3">
                      <Calendar size={16} className="mr-1" />
                      {edu.period}
                    </div>
                    
                    {edu.details && (
                      <ul className="space-y-2 text-slate-300 mt-4">
                        {edu.details.map((detail, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mt-[0.6rem] mr-2"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
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

export default Education;