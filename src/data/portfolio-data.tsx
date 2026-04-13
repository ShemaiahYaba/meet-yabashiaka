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
  proficiency: number; // percentage 0-100
}

export interface Tech {
  name: string;
  icon: string;
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
  yearsOfCoding: number;
  bio: string;
  education: Education;
  certifications: Certification[];
  skills: Skill[];
  buzzwords: Skill[];
  techStack: Tech[];
  socialLinks: SocialLink[];
}

export const portfolioData: PortfolioData = {
  fullName: "Shemaiah",
  hebrewName: "שְׁמַעְיָה",
  tagline: "Backend Engineer | DevOps Engineer | Music Producer",
  resumeUrl: "/resume.pdf",
  yearsOfCoding: 3,
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
    { name: "PHP", proficiency: 70 },
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
    { name: "NestJS", icon: "nestjs" },
    { name: "Typescript", icon: "typescript" },
    { name: "Supabase", icon: "supabase" },
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
