
'use client';

import type { Skill, Tech } from '@/data/portfolio-data';
import { IconRenderer } from '@/components/icon-renderer';
import { icons } from '@/config/icons';

interface SkillsSectionProps {
  id: string;
  skills: Skill[];
  techStack: Tech[];
}

/**
 * @fileoverview SkillsSection Component
 * 
 * @description
 * This component renders the "Skills & Technologies" section of the portfolio. It is divided into two main parts:
 * 1. A featured Tech Stack row displaying the first four technologies from the techStack prop.
 * 2. A continuously scrolling horizontal marquee (icon cloud) of core skills from the skills prop.
 * 
 * Visual Behavior & Animations:
 * - Tech Stack Icons: Displayed in a clean row. On hover, they transition from white to their official brand color with a subtle glow effect, as defined in the central icon hub.
 * - Core Skills Marquee: An infinite horizontal scrolling list of skill "boxes". Each box contains an icon and its name.
 *   - Default State: Icons are white, and a semi-transparent background indicates the skill proficiency level.
 *   - Hover State: When a user hovers over a skill box:
 *     - The icon transitions to its official brand color.
 *     - The background progress indicator animates from the bottom to its full height.
 *     - A percentage value, representing the skill proficiency, fades in with a subtle neon glow.
 *     - The entire box gets a subtle lift and glow effect.
 * 
 * Customization:
 * - Adding/Removing Icons: To add a new skill or tech icon, it must first be defined in `/src/config/icons.ts`. Once added, it can be referenced by name in `/src/data/portfolio-data.tsx`.
 * - Animation & Styling: Hover effects, progress bar colors, and neon text glow are controlled via Tailwind CSS classes within this component. The `transition-all`, `duration-300`, and `group-hover` utility classes are key to the animations. The neon effect is achieved with a combination of `drop-shadow` and text color.
 * - Marquee Speed: The scrolling speed is controlled by the `animation-duration` property of the `animate-scroll-x` CSS animation defined in `/src/app/globals.css`.
 */
const ScrollingSkillsMarquee = ({ skills }: { skills: Skill[] }) => {
  // The list is duplicated to create a seamless infinite scroll effect.
  const extendedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <div className="relative w-full overflow-hidden py-12 group">
      <div className="flex animate-scroll-x group-hover:[animation-play-state:paused]">
        {extendedSkills.map((skill, index) => {
           // Map skill name to a key usable by the icon configuration.
           // e.g., "Node.js" -> "nodejs", "System Design" -> "systemdesign"
           const iconKey = skill.name.toLowerCase().replace(/ \/ /g, '').replace(/\./g, '').replace(/ /g, '');
           const hasIcon = Object.keys(icons).includes(iconKey);

           return (
            <div
              key={`${skill.name}-${index}`}
              className="group/item relative flex-shrink-0 w-40 h-48 flex flex-col items-center justify-center p-4 mx-4 bg-card rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              {/* 
                Progress Bar Background:
                - This div acts as the container for the progress animation.
                - `group-hover/item:h-full` makes it expand to full height on hover.
                - The proficiency value from JSON (`skill.proficiency`) sets the initial height.
              */}
              <div
                className="absolute bottom-0 left-0 w-full rounded-lg bg-primary/10 -z-10 transition-all duration-500 ease-in-out group-hover/item:h-full group-hover/item:bg-primary/20"
                style={{ height: `${skill.proficiency}%` }}
              />

              {/* 
                Animated Vertical Bar:
                - This div creates the bottom-to-top fill effect on hover.
                - It's hidden by default (`scale-y-0`) and animates to full height (`group-hover/item:scale-y-100`).
                - The `transform-origin-bottom` ensures the scaling starts from the bottom.
              */}
              <div 
                className="absolute bottom-0 left-0 w-full h-full bg-primary/20 -z-10 rounded-lg transform scale-y-0 origin-bottom transition-transform duration-500 ease-in-out group-hover/item:scale-y-100"
                style={{ '--tw-scale-y': '1' }} // Use a placeholder to be overridden by group-hover
              ></div>
              
              <div className="z-10 flex flex-col items-center justify-center gap-4 text-center">
                {hasIcon && (
                    <IconRenderer name={iconKey} className="h-10 w-10" enableGlow={true} />
                )}
                <p className="text-sm font-semibold text-foreground">{skill.name}</p>
              </div>

               {/* 
                Proficiency Percentage Text:
                - This text is invisible by default (`opacity-0`).
                - On hover, it fades in (`group-hover/item:opacity-100`) after a slight delay (`delay-300`).
                - The "neon glow" is created using Tailwind's `drop-shadow` filter with the primary color.
              */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 delay-300 group-hover/item:opacity-100">
                <p className="text-4xl font-bold text-primary drop-shadow-[0_0_5px_hsl(var(--primary))]">
                  {skill.proficiency}%
                </p>
              </div>
            </div>
           )
        })}
      </div>
    </div>
  );
};

export default function SkillsSection({ id, skills, techStack }: SkillsSectionProps) {
  return (
    <section id={id} className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Skills & Technologies</h2>
          <p className="mt-4 text-lg text-muted-foreground">My technical expertise and the tools I love to use.</p>
          
          {/*
            Featured Tech Stack Row:
            - Renders the first 4 icons from the `techStack` array.
            - `IconRenderer` is reused here, pulling configuration from the central hub.
            - Hover effects (color, glow) are handled within the IconRenderer and its CSS.
          */}
          <div className="mt-8 flex justify-center items-center gap-8">
            {techStack.slice(0, 4).map((tech) => (
                <IconRenderer key={tech.name} name={tech.icon} className="h-12 w-12" enableGlow={true} />
            ))}
          </div>
        </div>

        <ScrollingSkillsMarquee skills={skills} />
      </div>
    </section>
  );
}
