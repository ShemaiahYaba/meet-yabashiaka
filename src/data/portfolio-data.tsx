import type { ReactNode } from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';

interface Stat {
  value: number;
  label: string;
}

interface Education {
  degree: string;
  university: string;
}

interface Certification {
  name: string;
  issuer: string;
}

interface Skill {
  name: string;
  proficiency: number;
}

export interface Tech {
  name: string;
  color: string;
}

interface Project {
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  dataAiHint: string;
  tech: string[];
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
    { value: 15, label: "Projects Completed" },
    { value: 5, label: "Years of Coding" },
    { value: 1200, label: "GitHub Commits" },
  ],
  bio: "A passionate and detail-oriented Full-Stack Developer with a knack for building elegant and efficient solutions. I thrive on turning complex problems into simple, beautiful, and intuitive designs. When I'm not coding, you can find me exploring new technologies or contributing to open-source projects.",
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
    { title: "E-commerce Platform", description: "A full-featured e-commerce site with Next.js and Stripe.", link: "#", imageUrl: "https://placehold.co/600x400/000000/ffffff", dataAiHint: "ecommerce website", tech: ["Next.js", "Stripe", "PostgreSQL"], },
    { title: "Data Visualization Dashboard", description: "A real-time analytics dashboard using D3.js and WebSockets.", link: "#", imageUrl: "https://placehold.co/600x400/eeeeee/31343C", dataAiHint: "analytics chart", tech: ["React", "D3.js", "Node.js"], },
    { title: "Mobile Task Manager", description: "A cross-platform productivity app built with React Native.", link: "#", imageUrl: "https://placehold.co/600x400/31343C/eeeeee", dataAiHint: "mobile app", tech: ["React Native", "Firebase"], },
    { title: "AI-Powered Chatbot", description: "A customer service chatbot using NLP and machine learning.", link: "#", imageUrl: "https://placehold.co/600x400/ffffff/000000", dataAiHint: "robot chat", tech: ["Python", "TensorFlow", "Flask"], },
  ],
  socialLinks: [
    { name: "GitHub", url: "https://github.com", color: "#181717" },
    { name: "LinkedIn", url: "https://linkedin.com", color: "#0A66C2" },
    { name: "Instagram", url: "https://instagram.com", color: "#E4405F" },
    { name: "Telegram", url: "https://telegram.org", color: "#24A1DE" },
    { name: "WhatsApp", url: "https://whatsapp.com", color: "#25D366" },
  ],
};
