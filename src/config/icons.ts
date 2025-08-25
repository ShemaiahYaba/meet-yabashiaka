
import type { FC } from 'react';
import GithubIcon from "@/components/icons/github";
import LinkedinIcon from "@/components/icons/linkedin";
import TelegramIcon from "@/components/icons/telegram";
import WhatsappIcon from "@/components/icons/whatsapp";
import { 

  SiD3Dotjs,
  
} from 'react-icons/si';
import { 
  JavaScript, 
  TypeScript, 
  NodeJs, 
  Python, 
  Tensorflow,
  Supabase,
  TailwindCSS,
  HTML5,
  CSS3,
  VercelDark,
  Docker,
  PostgreSQL,
  React,
  NextJs,
  Firebase,
} from 'developer-icons';
import MspaceIcon from '@/components/icons/mspace';
import InstagramIcon from '@/components/icons/instagram';
import type { IconProps } from '@/components/icons/icon-props';

export type IconConfig = {
  component: FC<IconProps>;
  color: string;
};

/**
 * Icon Configuration Hub
 * 
 * This central configuration maps icon names to their React components and official brand colors.
 * Each icon entry contains:
 * - component: The React component that renders the icon
 * - color: The official brand color (hex format) used for hover states and glow effects
 * 
 * Brand Color Guidelines:
 * - Single-color icons use their primary brand color
 * - Multi-color icons (like Python) use their most prominent color
 * - Gradients are approximated with the dominant color
 * 
 * Adding New Icons:
 * 1. Import the icon component at the top of this file
 * 2. Add an entry with the icon key (lowercase, no spaces/dots)
 * 3. Specify the official brand color
 * 4. The icon can then be referenced in portfolio-data.tsx
 */
export const icons: Record<string, IconConfig> = {
  // Social Media Icons
  github: { component: GithubIcon, color: "#181717" },
  linkedin: { component: LinkedinIcon, color: "#0A66C2" },
  instagram: { component: InstagramIcon, color: "#E4405F" },
  telegram: { component: TelegramIcon, color: "#26A5E4" },
  whatsapp: { component: WhatsappIcon, color: "#25D366" },
  
  // Programming Languages & Frameworks (Developer Icons - High Quality)
  html: { component: HTML5, color: "#3776AB" }, // Python blue
  css: { component: CSS3, color: "#3776AB" }, // Python blue
  python: { component: Python, color: "#3776AB" }, // Python blue
  javascript: { component: JavaScript, color: "#F7DF1E" }, // JavaScript yellow
  typescript: { component: TypeScript, color: "#3178C6" }, // TypeScript blue
  nodejs: { component: NodeJs, color: "#68A063" }, // Node.js green
  
  // React Ecosystem (React Icons for consistency)
  react: { component: React, color: "#61DAFB" }, // React cyan
  nextjs: { component: NextJs, color: "#000000" }, // Next.js black
  
  // Backend & Databases
  postgresql: { component: PostgreSQL, color: "#4169E1" }, // PostgreSQL blue
  
  // DevOps & Tools
  docker: { component: Docker, color: "#2496ED" }, // Docker blue
  
  // Cloud & Services
  firebase: { component: Firebase, color: "#FFCA28" }, // Firebase yellow
  
  // Data & Analytics
  d3js: { component: SiD3Dotjs, color: "#F9A03C" }, // D3.js orange
  tensorflow: { component: Tensorflow, color: "#FF6F00" }, // TensorFlow orange

  supabase: { component: Supabase, color: "#10B981" }, // Supabase green

  tailwindcss: { component: TailwindCSS, color: "#10B981" }, // Tailwind CSS green

  vercel: { component: VercelDark, color: "#10B981" }, // Vercel green
};
