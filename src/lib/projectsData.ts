/** Projects section — ids 1–4 legacy; 5–6 added 2026. */

export type PortfolioProjectTypeBadge = { emoji: string; label: string };

export type PortfolioProjectCaseStudy = {
  problem: string;
  role: string;
  stack: string;
  result: string;
};

export type PortfolioProject = {
  id: number;
  title: string;
  description: string;
  /** One-line impact / metric for the card. */
  outcome: string;
  technologies: string[];
  image: string;
  githubLink: string;
  period?: string;
  typeBadges: PortfolioProjectTypeBadge[];
  /** Expandable “case study” blurbs for selected projects. */
  caseStudy?: PortfolioProjectCaseStudy;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: 'ByteWatch – Real-Time Fraud Detection Platform',
    description:
      'Real-time fraud detection using streaming pipelines + ML. Built fraud scoring APIs, engineered transactional features, XGBoost prediction, MLflow model tracking.',
    outcome: 'Fraud scoring APIs + streaming features with MLflow-tracked models',
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
    typeBadges: [{ emoji: '🤖', label: 'AI/ML' }],
    caseStudy: {
      problem:
        'Need low-latency scoring on transactional streams with traceable model versions for audits.',
      role: 'Pipeline design, feature engineering, FastAPI scoring service, MLflow integration.',
      stack: 'Python, Kafka, Bytewax, XGBoost, Redis, PostgreSQL, Docker.',
      result:
        'End-to-end streaming path with persisted scores and experiment tracking suitable for iterative model upgrades.',
    },
  },
  {
    id: 2,
    title: 'HybridDR-Net – Diabetic Retinopathy Grading',
    description:
      'Deep learning model for multi-stage diabetic retinopathy grading using retinal fundus images. Medical image classification with cross-domain performance improvement.',
    outcome: 'Multi-stage DR grading with stronger cross-domain generalization',
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
    outcome: 'Automated triage: approve / reject / manual review with risk scoring',
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
    outcome: 'Seven-role workflows with prescriptions, consent, and RBAC',
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
  {
    id: 5,
    title: 'FinSight RAG – Financial Document Intelligence',
    description:
      'RAG chatbot for financial documents with XGBoost fraud scoring and RAGAS evaluation pipeline. Supports document Q&A with retrieval accuracy metrics (faithfulness, relevance).',
    outcome: 'Document Q&A with RAGAS faithfulness + relevance tracking',
    technologies: [
      'Python',
      'LangChain',
      'ChromaDB',
      'FastAPI',
      'XGBoost',
      'RAGAS',
    ],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    githubLink: 'https://github.com/kulharshit21/finsight-rag',
    period: '2026',
    typeBadges: [
      { emoji: '🤖', label: 'AI/ML' },
      { emoji: '🔗', label: 'RAG' },
    ],
    caseStudy: {
      problem:
        'Financial analysts need grounded answers from long PDFs with measurable retrieval quality—not generic chat.',
      role: 'RAG stack design, Chroma retrieval, FastAPI surface, RAGAS eval loop, fraud score integration.',
      stack: 'Python, LangChain, ChromaDB, FastAPI, XGBoost, RAGAS.',
      result:
        'Repeatable eval pipeline for faithfulness/relevance alongside conversational Q&A over documents.',
    },
  },
  {
    id: 6,
    title: 'Self-Pruning MLP-Mixer – Neural Network Compression',
    description:
      'Custom self-pruning MLP-Mixer where every Linear layer uses a learnable sigmoid gate. Trained with CE + λ·Σσ(g) loss — model prunes itself during training. Achieved 83.86% accuracy on CIFAR-10 with up to 128× weight compression. Submitted for Tredence AI Engineering Internship 2026 case study.',
    outcome: '83.86% on CIFAR-10 · up to 128× weight compression',
    technologies: [
      'Python',
      'PyTorch',
      'Deep Learning',
      'MLP-Mixer',
      'Model Compression',
      'CIFAR-10',
    ],
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
    githubLink:
      'https://github.com/kulharshit21/self-pruning-prunable-mixer-cifar10',
    period: '2026',
    typeBadges: [
      { emoji: '🤖', label: 'AI/ML' },
      { emoji: '🔬', label: 'Research' },
    ],
    caseStudy: {
      problem:
        'Compress large MLP-Mixer blocks without hand-tuned pruning schedules—let gates learn what to drop during training.',
      role: 'Architecture + loss design (CE + λ·Σσ(g)), CIFAR-10 training, compression reporting.',
      stack: 'Python, PyTorch, custom gated Linear layers.',
      result:
        '83.86% accuracy with aggressive sparsity; documented for internship case study submission.',
    },
  },
];