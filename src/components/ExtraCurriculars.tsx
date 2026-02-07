import React, { useEffect, useRef } from 'react';
import { Trophy, Users, CheckCircle } from 'lucide-react';

const ExtraCurriculars: React.FC = () => {
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
      id="extra-curriculars" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 opacity-0"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          <span className="relative inline-block">
            Extra-Curricular Activities
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 transform origin-left"></span>
          </span>
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sports */}
            <div className="bg-slate-800 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-700 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-900 rounded-full">
                  <Trophy size={32} className="text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Sports</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center justify-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Badminton
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Cricket
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Chess
                </li>
              </ul>
              <p className="mt-4 text-slate-400">
                Active participation in college sports events and tournaments.
              </p>
            </div>

            {/* Clubs & Organizations */}
            <div className="bg-slate-800 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-700 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-900 rounded-full">
                  <Users size={32} className="text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Clubs & Organizations</h3>
              <p className="text-slate-400 mb-4">
                ISTE Student Chapter Member
              </p>
              <div className="space-y-2 text-slate-300">
                <p>
                  Active participation in technical events and workshops.
                </p>
                <p>
                  Networking and learning from industry professionals.
                </p>
              </div>
            </div>

            {/* Interests */}
            <div className="bg-slate-800 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-700 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-900 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M12 2L4 10l2 2 6-6 6 6 2-2-8-8z"></path>
                    <path d="M4 22V14"></path>
                    <path d="M20 22V14"></path>
                    <path d="M12 14v8"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Interests</h3>
              <p className="text-slate-400 mb-4">
                Interest in team-based strategic activities
              </p>
              <div className="space-y-2 text-slate-300">
                <p>
                  Collaborative problem-solving and strategic planning.
                </p>
                <p>
                  Enjoying the challenges of team coordination and execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtraCurriculars;