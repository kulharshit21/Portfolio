import React from 'react';
import { motion } from 'framer-motion';
import { cn, motionEase, sectionShell, sectionTitleMargin, viewportOnce } from '../lib/utils';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  verifyUrl: string;
  badgeUrl: string;
  logoSrc: string;
  logoAlt: string;
}

const certifications: Certification[] = [
  {
    id: 1,
    title: 'AWS Certified Developer – Associate',
    issuer: 'Amazon Web Services',
    date: 'May 2026',
    verifyUrl:
      'https://aws.amazon.com/certification/certified-developer-associate/',
    badgeUrl:
      'https://www.credly.com/badges/82e100c6-7e1c-4989-895b-3a6cc60d2acb/public_url',
    logoSrc:
      'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    logoAlt: 'Amazon Web Services',
  },
  {
    id: 2,
    title: 'MongoDB Associate Developer – Python',
    issuer: 'MongoDB',
    date: 'May 2026',
    verifyUrl:
      'https://learn.mongodb.com/pages/mongodb-associate-developer-exam',
    badgeUrl:
      'https://www.credly.com/badges/98dd8b6e-9d5a-41eb-8f20-adfdbdef1522/public_url',
    logoSrc: '/logos/mongodb.svg',
    logoAlt: 'MongoDB',
  },
  {
    id: 3,
    title: 'SAP Certified – SAP Generative AI Developer',
    issuer: 'SAP',
    date: 'Mar 2026',
    verifyUrl:
      'https://learning.sap.com/certifications/sap-certified-associate-sap-generative-ai-developer',
    badgeUrl:
      'https://www.credly.com/badges/7d4e1808-ca11-4c19-9a4a-e7a9644aed8e/public_url',
    logoSrc:
      'https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg',
    logoAlt: 'SAP',
  },
  {
    id: 4,
    title: 'AWS Academy Graduate – Cloud Architecting',
    issuer: 'Amazon Web Services',
    date: 'Apr 2026',
    verifyUrl:
      'https://www.credly.com/org/amazon-web-services/badge/aws-academy-graduate-cloud-architecting-training-ba',
    badgeUrl:
      'https://www.credly.com/badges/edf91b6d-525e-495b-a6ce-e37cde72b8bf/public_url',
    logoSrc:
      'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    logoAlt: 'Amazon Web Services',
  },
];

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className={sectionShell}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className={cn(
            sectionTitleMargin,
            'text-center font-display text-3xl font-normal md:text-4xl'
          )}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: motionEase }}
        >
          <span className="relative inline-block">
            Certificates & Training
            <span className="absolute bottom-0 left-0 h-1 w-full origin-left bg-accent-2" />
          </span>
        </motion.h2>

        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {certifications.map((cert, index) => (
              <motion.article
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.55,
                  ease: motionEase,
                  delay: index * 0.04,
                }}
                className="flex flex-col rounded-xl border border-border bg-surface p-5 shadow-md"
              >
                <div className="mb-4 flex items-center gap-3 border-b border-border/80 pb-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-bg/60 p-2">
                    <img
                      src={cert.logoSrc}
                      alt={cert.logoAlt}
                      className="h-full w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="font-dm text-xs font-medium uppercase tracking-wide text-muted">
                    {cert.issuer}
                  </p>
                </div>
                <h3 className="mb-2 font-display text-base font-normal leading-snug text-foreground md:text-lg">
                  {cert.title}
                </h3>
                <p className="mb-4 font-dm text-sm text-muted">{cert.date}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <motion.a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-accent-2/50 bg-accent-2/10 px-3 py-2 font-mono text-xs font-medium text-accent-2"
                  >
                    Verify ↗
                  </motion.a>
                  <motion.a
                    href={cert.badgeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-border/30 px-3 py-2 font-mono text-xs font-medium text-foreground"
                  >
                    Badge ↗
                  </motion.a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
