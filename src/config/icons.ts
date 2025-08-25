
import type { FC } from 'react';
import GithubIcon from "@/components/icons/github";
import LinkedinIcon from "@/components/icons/linkedin";
import TelegramIcon from "@/components/icons/telegram";
import WhatsappIcon from "@/components/icons/whatsapp";
import { 
  SiD3Dotjs,
  SiExpo,
} from 'react-icons/si';
import { TbBrandReactNative } from "react-icons/tb";
import { 
  JavaScript, 
  TypeScript, 
  NodeJs, 
  Python, 
  Supabase,
  TailwindCSS,
  HTML5,
  CSS3,
  VercelDark,
  React,
  NextJs,
  Firebase,
  Render,
  ThreeJsDark,
  FlaskDark,
} from 'developer-icons';
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
  html: { component: HTML5, color: "#DAA520" }, // Python orange
  css: { component: CSS3, color: "#1E90FF" }, // Python blue
  python: { component: Python, color: "#3776AB" }, // Python blue
  javascript: { component: JavaScript, color: "#F0DB4F" }, // JavaScript yellow
  typescript: { component: TypeScript, color: "#257acc" }, // TypeScript blue
  nodejs: { component: NodeJs, color: "#2EA255" }, // Node.js green
  
  // React Ecosystem (React Icons for consistency)
  react: { component: React, color: "#00B0FF" }, // React cyan
  nextjs: { component: NextJs, color: "#000000" }, // Next.js black
  
  // Cloud & Services
  firebase: { component: Firebase, color: "#FFCA28" }, // Firebase yellow
  
  // Data & Analytics
  d3js: { component: SiD3Dotjs, color: "#1E90FF" }, // D3.js blue

  supabase: { component: Supabase, color: "#10B981" }, // Supabase green

  tailwindcss: { component: TailwindCSS, color: "#06B6D4" }, // Tailwind CSS blue

  vercel: { component: VercelDark, color: "#000000" }, // Vercel black
  render: { component: Render, color: "#000000" }, // Render black
  threejs: { component: ThreeJsDark, color: "#E67E22" }, // Three.js orange
  flask: { component: FlaskDark, color: "#000000" }, // Flask black
  reactnative: { component: TbBrandReactNative, color: "#62D4E3" }, // React Native blue
  expo: { component: SiExpo, color: "#00000" }, // Expo BLACK
};
