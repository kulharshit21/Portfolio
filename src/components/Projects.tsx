import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { CardHoverGlow } from './aceternity/CardHoverGlow';
import { motionEase, sectionShell, sectionTitleMargin, viewportOnce } from '../lib/utils';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubLink: string;
  period: string;
  typeBadges: { emoji: string; label: string }[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'ByteWatch – Real-Time Fraud Detection Platform',
    description:
      'Real-time fraud detection using streaming pipelines + ML. Built fraud scoring APIs, engineered transactional features, XGBoost prediction, MLflow model tracking.',
    technologies: [
      'Python',
      'XGBoost',
      'Kafka',
      'Bytewax',
      'MLflow',
      'PostgreSQL',
      'Redis',
      'FastAPI',
      'Docker',
    ],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    githubLink: 'https://github.com/kulharshit21/bytewatch-fraud-platform',
    typeBadges: [
      { emoji: '🤖', label: 'AI/ML' },
    ],
  },
  {
    id: 2,
    title: 'HybridDR-Net – Diabetic Retinopathy Grading',
    description:
      'Deep learning model for multi-stage diabetic retinopathy grading using retinal fundus images. Medical image classification with cross-domain performance improvement.',
    technologies: [
      'Python',
      'PyTorch',
      'OpenCV',
      'Deep Learning',
      'Computer Vision',
    ],
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
    githubLink: 'https://github.com/kulharshit21/Research-Project-HybridDR-Net-',
    typeBadges: [{ emoji: '🤖', label: 'AI/ML' }],
  },
  {
    id: 3,
    title: 'Autonomous KYC – AI-Powered Identity Verification',
    description:
      'AI KYC system with OCR, face match, liveness detection, and risk scoring. Auto-classifies as approve / reject / manual review.',
    technologies: [
      'FastAPI',
      'OpenCV',
      'OCR',
      'Face Verification',
      'Liveness Detection',
      'React',
      'Node.js',
    ],
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
    githubLink: 'https://github.com/kulharshit21/autonomous-kyc',
    typeBadges: [
      { emoji: '🤖', label: 'AI/ML' },
      { emoji: '🌐', label: 'Full-Stack' },
    ],
  },
  {
    id: 4,
    title: 'CareLedger – Multi-Role Healthcare Records Platform',
    description:
      'Multi-role healthcare platform for patients, doctors, hospitals, pharmacies, labs, caregivers, admins. Includes prescriptions, consent workflows, role-based access.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Tailwind CSS',
    ],
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
    githubLink: 'https://github.com/kulharshit21/SEPM-CareLedger',
    typeBadges: [{ emoji: '🌐', label: 'Full-Stack' }],
  },
];

function projectGithubHref(link: string): string {
  if (link.startsWith('http://') || link.startsWith('https://')) return link;
  return `https://github.com/kulharshit21/${link}`;
}

const Projects: React.FC = () => {
  return (
    <section id="projects" className={sectionShell}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className={sectionTitleMargin}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: motionEase }}
        >
          <h2 className="font-display text-3xl font-normal md:text-4xl">
            <span className="relative inline-block">
              Projects
              <span className="absolute bottom-0 left-0 h-1 w-full origin-left bg-accent-2" />
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.65,
                ease: motionEase,
                delay: index * 0.05,
              }}
            >
              <CardHoverGlow className="flex h-full min-h-[200px] flex-col">
                <div className="relative h-44 flex-shrink-0 overflow-hidden md:h-48">
                  <img
                    src={project.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent" />
                  <div className="absolute left-3 top-3 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-1.5">
                    {project.typeBadges.map((b) => (
                      <span
                        key={`${b.emoji}-${b.label}`}
                        className="rounded-full border border-border/80 bg-bg/85 px-2.5 py-1 font-mono text-[11px] font-medium text-foreground shadow-sm backdrop-blur-sm md:text-xs"
                      >
                        {b.emoji} {b.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-1 font-mono text-[11px] text-accent-2 md:text-xs">
                    {project.period}
                  </p>
                  <h3 className="mb-2 font-display text-lg font-normal leading-snug text-foreground md:text-xl">
                    {project.title}
                  </h3>
                  <p className="mb-4 flex-1 font-dm text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border/60 bg-border/40 px-2 py-1 font-mono text-xs text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <motion.a
                      href={projectGithubHref(project.githubLink)}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-accent-2"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </motion.a>
                  </div>
                </div>
              </CardHoverGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
