
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
  proficiency: number;
}

export interface Tech {
  name: string;
  color: string;
}

export interface Project {
  title: string;
  description: string;
  private: boolean;
  image: string;
  github: string | null;
  url: string | null;
  tech: string[];
  dataAiHint: string;
}

export interface SocialLink {
  name: string;
  url: string;
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
    { value: 7, label: "Projects Completed" },
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
    { name: "JavaScript / TypeScript", proficiency: 5 },
    { name: "React / Next.js", proficiency: 5 },
    { name: "Node.js / Express", proficiency: 4 },
    { name: "Python / Django", proficiency: 4 },
    { name: "Databases (SQL/NoSQL)", proficiency: 4 },
    { name: "Cloud & DevOps", proficiency: 3 },
  ],
  techStack: [
    { name: "Node.js", color: "#68A063" },
    { name: "Python", color: "#3776AB" },
    { name: "PostgreSQL", color: "#4169E1" },
    { name: "Docker", color: "#2496ED" },
  ],
  workShowcase: [
    {
      title: "Academic Repository",
      description: "Repository for academic materials built with Flask and PostgreSQL.",
      private: false,
      image: "https://placehold.co/600x400/000000/ffffff",
      github: "https://github.com/ShemaiahYaba",
      url: "#",
      tech: ["Flask", "PostgreSQL", "Next.js"],
      dataAiHint: "academic repository"
    },
    {
      title: "Clinic App",
      description: "Volunteer project for student clinic appointments.",
      private: true,
      image: "https://placehold.co/600x400/eeeeee/31343C",
      github: null,
      url: null,
      tech: ["React Native", "Firebase"],
      dataAiHint: "clinic app"
    },
    {
      title: "Data Visualization Dashboard",
      description: "A real-time analytics dashboard using D3.js and WebSockets.",
      private: false,
      image: "https://placehold.co/600x400/31343C/eeeeee",
      github: "https://github.com/ShemaiahYaba",
      url: "#",
      tech: ["React", "D3.js", "Node.js"],
      dataAiHint: "analytics dashboard"
    },
    {
      title: "AI-Powered Chatbot",
      description: "A customer service chatbot using NLP and machine learning.",
      private: false,
      image: "https://placehold.co/600x400/ffffff/000000",
      github: "https://github.com/ShemaiahYaba",
      url: "#",
      tech: ["Python", "TensorFlow", "Flask"],
      dataAiHint: "robot chatbot"
    },
  ],
  socialLinks: [
    { name: "GitHub", url: "https://github.com/ShemaiahYaba", color: "#181717" },
    { name: "LinkedIn", url: "www.linkedin.com/in/shemaiah-yaba-shiaka", color: "#0A66C2" },
    { name: "Instagram", url: "https://instagram.com/yabashiaka", color: "#E4405F" },
    { name: "Telegram", url: "https://t.me/yabashiaka", color: "#24A1DE" },
    { name: "WhatsApp", url: "https://wa.me/9039988198", color: "#25D366" },
  ],
};
