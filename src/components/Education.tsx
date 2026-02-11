import React, { useEffect, useRef } from 'react';
import { GraduationCap, Calendar } from 'lucide-react';

interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  score: string;
}

const education: Education[] = [
  {
    id: 1,
    degree: "B.Tech Computer Science",
    institution: "SRM Institute of Science and Technology",
    period: "2023 - 2027 (Expected)",
    score: "CGPA: 8.7"
  },
  {
    id: 2,
    degree: "Class XII - Karnataka Board (PCMCS)",
    institution: "Chinmaya College of Science and Commerce, Hubli",
    period: "2021 - 2023",
    score: "Percentage: 86.7%"
  },
  {
    id: 3,
    degree: "High School",
    institution: "Sri Sathya Sai Loka Seva Vidya Kendra",
    period: "2019 - 2021",
    score: "Score: 86%"
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

    // Observe individual education cards for staggered animation
    const educationCards = document.querySelectorAll('.education-card');
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get the card index for staggered delay
            const cardIndex = parseInt(entry.target.getAttribute('data-index') || '0');
            setTimeout(() => {
              entry.target.classList.add('animate-slide-up');
            }, cardIndex * 150); // Stagger by 150ms
          }
        });
      },
      { threshold: 0.3 }
    );

    educationCards.forEach((card) => {
      cardObserver.observe(card);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      educationCards.forEach((card) => {
        cardObserver.unobserve(card);
      });
    };
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 opacity-0"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          <span className="relative inline-block">
            Education
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 transform origin-left"></span>
          </span>
        </h2>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {education.map((edu, index) => (
              <div
                key={edu.id}
                data-index={index}
                className="education-card scroll-animate bg-slate-800 rounded-lg p-5 shadow-md border border-slate-700 hover:shadow-lg transition-all duration-300 text-center"
              >
                <GraduationCap size={28} className="mx-auto mb-3 text-blue-400" />
                <h3 className="text-base font-bold text-white mb-1">{edu.degree}</h3>
                <p className="text-sm text-blue-400 mb-2">{edu.institution}</p>
                <div className="flex items-center justify-center text-slate-400 text-xs mb-3">
                  <Calendar size={12} className="mr-1" />
                  {edu.period}
                </div>
                <span className="inline-block px-3 py-1 bg-blue-900/60 text-blue-300 text-sm font-semibold rounded-full">{edu.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;