
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
    { name: "JavaScript / TypeScript", proficiency: 95 },
    { name: "React / Next.js", proficiency: 90 },
    { name: "Node.js / Express", proficiency: 85 },
    { name: "Python / Django", proficiency: 80 },
    { name: "Databases (SQL/NoSQL)", proficiency: 88 },
    { name: "Cloud & DevOps", proficiency: 75 },
    { name: "System Design", proficiency: 85 },
    { name: "API Development", proficiency: 92 },
  ],
  techStack: [
    { name: "Node.js", icon: "nodejs" },
    { name: "Python", icon: "python" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "Docker", icon: "docker" },
    { name: "React", icon: "react"},
    { name: "Firebase", icon: "firebase"},
    { name: "TensorFlow", icon: "tensorflow"},
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
      tech: ["python", "flask", "postgresql"],
      dataAiHint: "academic repository"
    },
    {
      title: "Clinic App",
      description: "Volunteer project for student clinic appointments.",
      private: true,
      defaultImage: "https://placehold.co/600x400/eeeeee/31343C",
       gallery: [
        "https://placehold.co/1280x720/eeeeee/31343C",
      ],
      github: null,
      url: null,
      tech: ["react", "firebase"],
      dataAiHint: "clinic app"
    },
    {
      title: "Data Visualization Dashboard",
      description: "A real-time analytics dashboard using D3.js and WebSockets.",
      private: false,
      defaultImage: "https://placehold.co/600x400/31343C/eeeeee",
      gallery: [
        "https://placehold.co/1280x720/31343C/eeeeee",
      ],
      github: "https://github.com/ShemaiahYaba",
      url: "#",
      tech: ["react", "d3js", "nodejs"],
      dataAiHint: "analytics dashboard"
    },
    {
      title: "AI-Powered Chatbot",
      description: "A customer service chatbot using NLP and machine learning.",
      private: false,
      defaultImage: "https://placehold.co/600x400/ffffff/000000",
      gallery: [
        "https://placehold.co/1280x720/ffffff/000000",
      ],
      github: "https://github.com/ShemaiahYaba",
      url: "#",
      tech: ["python", "tensorflow", "flask"],
      dataAiHint: "robot chatbot"
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
