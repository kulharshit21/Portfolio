import React, { useEffect, useRef } from 'react';

interface Skill {
  name: string;
  level: 'Familiar' | 'Proficient';
  category: 'Languages' | 'Frameworks' | 'Tools' | 'Technical Skills';
}

const skills: Skill[] = [
  { name: 'Python', level: 'Proficient', category: 'Languages' },
  { name: 'Java', level: 'Proficient', category: 'Languages' },
  { name: 'C/C++', level: 'Proficient', category: 'Languages' },
  { name: 'JavaScript', level: 'Proficient', category: 'Languages' },
  { name: 'SQL', level: 'Proficient', category: 'Languages' },
  { name: 'PHP', level: 'Familiar', category: 'Languages' },
  { name: 'React.js', level: 'Proficient', category: 'Frameworks' },
  { name: 'Node.js', level: 'Familiar', category: 'Frameworks' },
  { name: 'TensorFlow', level: 'Proficient', category: 'Frameworks' },
  { name: 'Tailwind CSS', level: 'Proficient', category: 'Frameworks' },
  { name: 'Git / GitHub', level: 'Proficient', category: 'Tools' },
  { name: 'MySQL', level: 'Proficient', category: 'Tools' },
  { name: 'PostgreSQL', level: 'Familiar', category: 'Tools' },
  { name: 'Supabase', level: 'Familiar', category: 'Tools' },
  { name: 'AI/ML Development', level: 'Proficient', category: 'Technical Skills' },
  { name: 'CNN–Transformer CV', level: 'Proficient', category: 'Technical Skills' },
  { name: 'API Integration', level: 'Proficient', category: 'Technical Skills' },
  { name: 'Web Accessibility', level: 'Proficient', category: 'Technical Skills' },
  { name: 'GPU Training', level: 'Proficient', category: 'Technical Skills' },
];

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

        <div className="max-w-7xl mx-auto">
          {/* Technical Skills */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-white">Technical Skills</h3>
            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category}>
                  <h4 className="text-lg font-medium mb-4 text-slate-400">{category}</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {groupedSkills[category].map((skill) => {
                      const labelColor = skill.level === 'Familiar' ? 'text-blue-300' : 'text-green-300';
                      return (
                        <div key={skill.name} className="bg-slate-800 border border-slate-700 rounded-xl shadow-md p-3 flex flex-col items-center text-center gap-2 transition-transform hover:scale-105">
                          <span className="text-sm font-semibold text-white">{skill.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${labelColor} bg-slate-700 border border-slate-600`}>{skill.level}</span>
                        </div>
                      );
                    })}
                  </div>
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