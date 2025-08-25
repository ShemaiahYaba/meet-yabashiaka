
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
    { name: "Certified JavaScript Developer", issuer: "Tech Institute" },
    { name: "Advanced Node.js", issuer: "Coder Academy" },
  ],
  skills: [
    {name: "HTML", proficiency: 95},
    { name: "CSS", proficiency: 95 },
    { name: "JavaScript", proficiency: 85 },
    { name: "TypeScript", proficiency: 80 },
    { name: "React", proficiency: 80 },
    { name: "Next.js", proficiency: 80 },
    { name: "Node.js", proficiency: 85 },
    { name: "Python", proficiency: 60 },
    { name: "Supabase", proficiency: 20 },
    {name: "TailwindCSS", proficiency: 60},
    { name: "Vercel", proficiency: 20 },
  ],
  buzzwords: [
    { name: "System Design", proficiency: 65 },
    { name: "API Development", proficiency: 50 },
    { name: "DevOps", proficiency: 45 },
    { name: "Microservices", proficiency: 40 },
    { name: "Cloud Architecture", proficiency: 35 },
    { name: "Scalability", proficiency: 50 },
  ],
  techStack: [
    { name: "Next.js", icon: "nextjs" },
    { name: "Supabase", icon: "supabase" },
    { name: "Vercel", icon: "vercel" },
  ],
  workShowcase: [
    {
      title: "ResultFlow",
      description: "ResultFlow is a smart result management system that helps universities automate marksheet formatting, grading, and result generation.",
      private: true,
      defaultImage: "https://placehold.co/600x400/000000/ffffff",
      gallery: [
        "https://placehold.co/1280x720/000000/ffffff",
        "https://placehold.co/1280x720/111111/eeeeee",
        "https://placehold.co/1280x720/222222/dddddd"
      ],
      github: "https://github.com/ShemaiahYaba/result-flow/",
      url: "#",
      tech: ["react", "typescript", "supabase"],
      dataAiHint: "academic repository"
    },
   
  ],
  socialLinks: [
    { name: "GitHub", url: "https://github.com/ShemaiahYaba", icon: "github" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/shemaiah-yaba-shiaka", icon: "linkedin" },
    { name: "Instagram", url: "https://instagram.com/yabashiaka", icon: "instagram" },
    { name: "Telegram", url: "https://t.me/yabashiaka", icon: "telegram" },
    { name: "WhatsApp", url: "https://wa.me/9039988198", icon: "whatsapp" },
  ],
};
