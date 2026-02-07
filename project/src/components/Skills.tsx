import React, { useEffect, useRef } from 'react';

interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate';
  category: 'Languages' | 'Frameworks' | 'Tools' | 'Other';
}

const skills: Skill[] = [
  { name: 'Python', level: 'Beginner', category: 'Languages' },
  { name: 'Java', level: 'Intermediate', category: 'Languages' },
  { name: 'C', level: 'Intermediate', category: 'Languages' },
  { name: 'C++', level: 'Intermediate', category: 'Languages' },
  { name: 'HTML', level: 'Intermediate', category: 'Languages' },
  { name: 'JavaScript', level: 'Intermediate', category: 'Languages' },
  { name: 'React.js', level: 'Beginner', category: 'Frameworks' },
  { name: 'Node.js', level: 'Beginner', category: 'Frameworks' },
  { name: 'Tailwind', level: 'Intermediate', category: 'Frameworks' },
  { name: 'Figma', level: 'Beginner', category: 'Tools' },
  { name: 'IoT', level: 'Beginner', category: 'Other' },
  { name: 'Linux', level: 'Intermediate', category: 'Other' },
];

const languages = ['English', 'Hindi', 'Kannada'];

const Skills: React.FC = () => {
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

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.keys(groupedSkills);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 opacity-0"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          <span className="relative inline-block">
            Skills
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 transform origin-left"></span>
          </span>
        </h2>

        <div className="max-w-4xl mx-auto">
          {/* Technical Skills */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-white">Technical Skills</h3>
            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category}>
                  <h4 className="text-lg font-medium mb-4 text-slate-400">{category}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {groupedSkills[category].map((skill) => {
                      const progress = skill.level === 'Beginner' ? 50 : 85;
                      const barColor = skill.level === 'Beginner' ? 'bg-blue-500' : 'bg-green-500';
                      const labelColor = skill.level === 'Beginner' ? 'text-blue-300' : 'text-green-300';
                      return (
                        <div key={skill.name} className="bg-slate-800 border border-slate-700 rounded-xl shadow-md p-4 flex flex-col justify-between min-h-[100px] transition-transform hover:scale-105">
                          <div className="flex flex-col gap-2 mb-3">
                            <span className="text-lg font-semibold text-white">{skill.name}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${labelColor} bg-slate-700 border border-slate-600 w-max`}>{skill.level}</span>
                          </div>
                          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mt-auto">
                            <div className={`h-full ${barColor} rounded-full transition-all duration-700`} style={{ width: `${progress}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Languages</h3>
            <div className="flex flex-wrap gap-3">
              {languages.map((language) => (
                <div 
                  key={language}
                  className="bg-slate-800 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-blue-400 border border-slate-700"
                >
                  {language}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;