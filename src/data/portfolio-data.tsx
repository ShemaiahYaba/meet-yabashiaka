
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
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
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

export const portfolioData: PortfolioData = {
  fullName: "Shemaiah",
  hebrewName: "שְׁמַעְיָה",
  tagline: "Full-Stack Developer & Creative Technologist.",
  resumeUrl: "/Shemaiah-Resume.pdf",
  stats: [
    { value: 8, label: "Projects Completed" },
    { value: 1, label: "Years of Coding" },
    { value: 533, label: "GitHub Commits" },
  ],
  bio: "I’m a backend developer who thrives on solving complex problems and building systems that scale. With a strong foundation in mathematics and self-directed engineering, I design robust APIs and backend architectures that power smooth user experiences. I help startups and teams turn ideas into products — one idea at a time. There’s value even in hidden places ✨",
  education: {
    degree: "B.Sc. Mathematics",
    university: "Mountain Top University",
  },
  certifications: [
    { name: "Ai Career Essentials", issuer: "ALX Africa" },
  ],
  skills: [
    {name: "HTML", proficiency: 90 },
    { name: "CSS", proficiency: 90 },
    {name: "TailwindCSS", proficiency: 80 },
    { name: "JavaScript", proficiency: 80 },
    { name: "TypeScript", proficiency: 65 },
    { name: "React", proficiency: 80 },
    { name: "Next.js", proficiency: 80 },
    { name: "Node.js", proficiency: 55 },
    { name: "Python", proficiency: 60 },
    { name: "Supabase", proficiency: 60 },
    { name: "Vercel", proficiency: 70 },
  ],
  buzzwords: [
    { name: "System Design", proficiency: 75 },
    { name: "API Development", proficiency: 50 },
    { name: "DevOps", proficiency: 45 },
  ],
  techStack: [
    { name: "Next.js", icon: "nextjs" },
    { name: "Supabase", icon: "supabase" },
    { name: "Vercel", icon: "vercel" },
  ],
  workShowcase: [
    {
      title: "Shemaiah.",
      description: "Shemaiah is a modern portfolio website that showcases my skills, projects, and contact information.",
      private: true,
      defaultImage: "/images/shemaiah/landing.png",
      gallery: [
        "/images/shemaiah/landing.png",
        "/images/shemaiah/1.png",
        "/images/shemaiah/2.png",
      ],
      github: "https://github.com/ShemaiahYaba/meet-yabashiaka/",
      url: "https://meet-yabashiaka.vercel.app/",
      tech: ["nextjs","typescript","tailwindcss", "vercel"],
      dataAiHint: "portfolio-website"
    },
    {
      title: "LAMP",
      description: "The Official Website of LAMP - Level up and maximize your potential.",
      private: true,
      defaultImage: "/images/lamp/landing.png",
      gallery: [
        "/images/lamp/landing.png",
        "/images/lamp/1.png",
        "/images/lamp/2.png",
        "/images/lamp/3.png"
      ],
      github: "https://github.com/ShemaiahYaba/lamp-initiative/",
      url: "https://lamp-initiative.vercel.app/",
      tech: ["nextjs","typescript","tailwindcss", "vercel"],
      dataAiHint: "company-website"
    },
    {
      title: "ResultFlow",
      description: "ResultFlow is a smart result management system that helps universities automate marksheet formatting, grading, and result generation.",
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
      github: "https://github.com/ShemaiahYaba/result-flow/",
      url: "https://result-flow.vercel.app/",
      tech: ["nextjs","typescript", "supabase", "vercel"],
      dataAiHint: "smart-result-management-system"
    },
    {
      title: "MatrixLAB",
      description: "MatrixLAB is a modern educational web app that helps users intuitively explore the behavior of eigenvalues, eigenvectors, and principal components through interactive visualizations in 2D and 3D. Designed for students and educators in linear algebra, data science, and machine learning.",
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
      tech: ["react","typescript", "tailwindcss","threejs", "flask", "vercel", "render"],
      dataAiHint: "eigen-value-visualization-platform"
    },
    // {
    //   title: "MTU-RapidCare",
    //   description: "MTU-RapidCare is a modern emergency alert and rapid response system for clinics and healthcare environments. Built with Expo, React Native, and Supabase, it enables real-time emergency reporting, device alerts, and seamless communication between staff and responders.",
    //   private: false,
    //   defaultImage: "/images/mtu-rapidcare/landing.png",
    //   gallery: [
    //     "/images/mtu-rapidcare/landing.png",
    //     "/images/mtu-rapidcare/1.png",
    //     "/images/mtu-rapidcare/2.png",
    //     "/images/mtu-rapidcare/3.png",
    //   ],
    //   github: "https://github.com/ShemaiahYaba/clinic-app/",
    //   url: "https://mlab-inky.vercel.app/",
    //   tech: ["reactnative", "expo","supabase", "typescript"],
    //   dataAiHint: "eigen-value-visualization-platform"
    // },
    
   
  ],
  socialLinks: [
    { name: "GitHub", url: "https://github.com/ShemaiahYaba", icon: "github" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/shemaiah-yaba-shiaka", icon: "linkedin" },
    { name: "Instagram", url: "https://instagram.com/yabashiaka", icon: "instagram" },
    { name: "Telegram", url: "https://t.me/yabashiaka", icon: "telegram" },
    { name: "WhatsApp", url: "https://wa.me/9039988198", icon: "whatsapp" },
  ],
};
