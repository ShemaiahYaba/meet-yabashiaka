export interface Stat {
  value: number;
  label: string;
}

export interface Education {
  degree: string;
  university: string;
}

export interface Certification {
  name: string;
  issuer: string;
  defaultImage: string;
}

export interface Skill {
  name: string;
  proficiency: number; // This is a percentage value from 0-100
}

export interface Tech {
  name: string;
  icon: string;
}

export interface Project {
  title: string;
  description: string;
  private: boolean;
  defaultImage: string;
  gallery: string[];
  github: string | null;
  url: string | null;
  tech: string[];
  dataAiHint: string;
  isCollaboration: boolean;
  progress: number; // Percentage, 0-100
  isCompleted: boolean;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

interface PortfolioData {
  fullName: string;
  hebrewName: string;
  tagline: string;
  resumeUrl: string;
  stats: Stat[];
  bio: string;
  education: Education;
  certifications: Certification[];
  skills: Skill[];
  buzzwords: Skill[];
  techStack: Tech[];
  workShowcase: Project[];
  socialLinks: SocialLink[];
}

const completedSoloProjects = 4;
const totalCollaborations = 3;

export const portfolioData: PortfolioData = {
  fullName: "Shemaiah",
  hebrewName: "שְׁמַעְיָה",
  tagline: "Backend developer & Music Producer",
  resumeUrl: "/resume.pdf",
  stats: [
    { value: 3, label: "Years of Coding" },
    { value: completedSoloProjects, label: "Solo Projects Completed" },
    { value: totalCollaborations, label: "Collaborations" },
    { value: 550, label: "GitHub Commits" },
  ],
  bio: "I help early-stage startup founders ship reliable, production-ready backends fast by bringing full ownership and zero hand-holding to every sprint, so their product moves forward without the backend becoming the bottleneck.",
  education: {
    degree: "B.Sc. Mathematics",
    university: "Mountain Top University",
  },
  certifications: [
    {
      name: "Ai Career Essentials",
      issuer: "ALX Africa",
      defaultImage: "/images/certifications/AICE.png",
    },
    {
      name: "Engineer Basecamp Backend Program",
      issuer: "The Engineer Network",
      defaultImage: "/images/certifications/ten.png",
    },
  ],
  skills: [
    { name: "JavaScript", proficiency: 80 },
    { name: "TypeScript", proficiency: 90 },
    { name: "Python", proficiency: 70 },
    { name: "PHP", proficiency: 70},
    { name: "SQL", proficiency: 80 },
    { name: "Node.js", proficiency: 80 },
    { name: "Express.js", proficiency: 80 },
    { name: "NestJS", proficiency: 80 },
    { name: "Laravel", proficiency: 80 },
    { name: "Django", proficiency: 80 },
    { name: "Flask", proficiency: 80 },
    { name: "FastAPI", proficiency: 80 },
    { name: "PostgreSQL", proficiency: 80 },
    { name: "MySQL", proficiency: 80 },
    { name: "MongoDB", proficiency: 80 },
    { name: "Redis", proficiency: 80 },
    { name: "Supabase", proficiency: 80 },
    { name: "Docker", proficiency: 80 },
    { name: "Kubernetes", proficiency: 80 },
    { name: "Git", proficiency: 80 },
    { name: "GitHub", proficiency: 80 },
    
    

  ],
  buzzwords: [
    { name: "System Design", proficiency: 75 },
    { name: "API Development", proficiency: 80 },
    { name: "DevOps", proficiency: 80 },
    { name: "CI/CD", proficiency: 80 },
  ],
  techStack: [
    { name: "Node.js", icon: "nodejs" },
    { name: "Python", icon: "python" },
    { name: "Supabase", icon: "supabase" },
  ],
  workShowcase: [
    {
      title: "ResultFlow",
      description:
        "ResultFlow is a smart result management system that helps universities automate marksheet formatting, grading, and result generation.",
      private: true,
      defaultImage: "/images/result-flow/landing.png",
      gallery: [
        "/images/result-flow/landing.png",
        "/images/result-flow/1.png",
        "/images/result-flow/2.png",
        "/images/result-flow/3.png",
        "/images/result-flow/4.png",
        "/images/result-flow/5.png",
      ],
      github: "",
      url: "https://result-flow.vercel.app/",
      tech: ["nextjs", "typescript", "supabase", "vercel"],
      dataAiHint: "smart-result-management-system",
      isCollaboration: true,
      progress: 100,
      isCompleted: true,
    },
    {
      title: "MatrixLAB",
      description:
        "MatrixLAB is a modern educational web app that helps users intuitively explore the behavior of eigenvalues, eigenvectors, and principal components through interactive visualizations in 2D and 3D. Designed for students and educators in linear algebra, data science, and machine learning.",
      private: false,
      defaultImage: "/images/matrixlab/landing.png",
      gallery: [
        "/images/matrixlab/landing.png",
        "/images/matrixlab/1.png",
        "/images/matrixlab/2.png",
        "/images/matrixlab/3.png",
      ],
      github: "https://github.com/ShemaiahYaba/EigenValue_Visualization/",
      url: "https://mlab-inky.vercel.app/",
      tech: [
        "react",
        "tailwindcss",
        "typescript",
        "threejs",
        "flask",
        "vercel",
        "render",
      ],
      dataAiHint: "eigen-value-visualization-platform",
      isCollaboration: false,
      progress: 100,
      isCompleted: true,
    },
    {
      title: "MTU-RapidCare",
      description:
        "MTU-RapidCare is a modern emergency alert and rapid response system for clinics and healthcare environments. Built with Expo, React Native, and Supabase, it enables real-time emergency reporting, device alerts, and seamless communication between staff and responders.",
      private: false,
      defaultImage: "/images/mtu-rapidcare/landing.png",
      gallery: [
        "/images/mtu-rapidcare/landing.png",
        "/images/mtu-rapidcare/1.png",
        "/images/mtu-rapidcare/2.png",
        "/images/mtu-rapidcare/3.png",
      ],
      github: "https://github.com/ShemaiahYaba/clinic-app/",
      url: "*",
      tech: ["reactnative", "typescript", "supabase", "expo"],
      dataAiHint: "eigen-value-visualization-platform",
      isCollaboration: true,
      progress: 100,
      isCompleted: true,
    },
    {
      title: "MTU-Chapel Admin",
      description:
        "MTU-Chapel Admin is a feature-rich dashboard for managing Mountain Top University chapel activities. It streamlines service scheduling, attendance tracking, exeat management, absentee handling, and warning letter generation through an intuitive, efficient interface.",
      private: true,
      defaultImage: "/images/mtu-chapel-admin/landing.png",
      gallery: [
        "/images/mtu-chapel-admin/landing.png",
        "/images/mtu-chapel-admin/1.png",
        "/images/mtu-chapel-admin/2.png",
        "/images/mtu-chapel-admin/3.png",
      ],
      github: "",
      url: "",
      tech: ["nextjs", "shadcn", "typescript", "supabase"],
      dataAiHint: "eigen-value-visualization-platform",
      isCollaboration: true,
      progress: 60,
      isCompleted: false,
    },
   
  ],
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/ShemaiahYaba",
      icon: "github",
      color: "#181717",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/shemaiah-yaba-shiaka",
      icon: "linkedin",
      color: "#0A66C2",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/yabashiaka",
      icon: "instagram",
      color: "#E4405F",
    },
    {
      name: "Telegram",
      url: "https://t.me/yabashiaka",
      icon: "telegram",
      color: "#26A5E4",
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/9039988198",
      icon: "whatsapp",
      color: "#25D366",
    },
    {
      name: "X",
      url: "https://x.com/yabashiaka",
      icon: "x",
      color: "#000000",
    },
    {
      name: "Gmail",
      url: "mailto:shemaiahwambebe@gmail.com",
      icon: "gmail",
      color: "#D14836",
    },
  ],
};
