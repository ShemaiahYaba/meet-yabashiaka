
'use client';

import React from 'react';
import type { Skill, Tech } from '@/data/portfolio-data';
import { IconRenderer } from '@/components/icon-renderer';
import { icons } from '@/config/icons';

interface SkillsSectionProps {
  id: string;
  skills: Skill[];
  buzzwords: Skill[];
  techStack: Tech[];
}

/**
 * @fileoverview Global Hover State SkillsSection with Synchronized Animations
 * 
 * @description
 * This component implements a global hover system where hovering anywhere on a skill box
 * triggers synchronized animations for icon, percentage, and progress bar.
 * 
 * ## Global Hover Behavior:
 * - **Single hover state**: Hovering anywhere on the box triggers all animations
 * - **No individual icon hover**: IconRenderer has no separate hover states
 * - **Synchronized timing**: Icon nudge, brand color, percentage, and progress bar animate together
 * 
 * ## Animation Storyboard (Box Hover Trigger):
 * 
 * ### Default State:
 * - Icon: Centered, white color
 * - Percentage: Hidden
 * - Progress Bar: Hidden/0% fill
 * 
 * ### Hover Animation (0.3s duration, ease-out):
 * 1. **Icon nudges left** 12px from center position
 * 2. **Brand color reveal** - icon transitions to official color simultaneously
 * 3. **Percentage appears** immediately to right of icon, hollow neon style
 * 4. **Progress bar fills** bottom-to-top behind icon (0.6s duration)
 * 5. **All synchronized** - no separate delays between elements
 * 
 * ## Layout Structure:
 * ```
 * Default:    [  Icon  ]     ← Centered
 * Hover:   [Icon] [85%] ███  ← Left nudge + percentage + progress
 *            ↑      ↑    ↑
 *         brand   neon  fills
 *         color  outline up
 * ```
 * 
 * ## Scrolling Behavior:
 * - **Pause trigger**: Hover anywhere on skill box container
 * - **Resume**: Automatic on hover out
 * - **Non-tracking**: Mouse position elsewhere doesn't affect scrolling
 * 
 * ## Icon Sources & Brand Colors:
 * - **Official icons**: External verified libraries (React Icons, etc.)
 * - **Brand color mapping**: Centralized in `/src/config/icons.ts`
 * - **Fallback system**: Mspace.svg for non-standard tech/buzzwords
 * 
 * ## Brand Color Mapping:
 * ```typescript
 * // Verified brand colors in /src/config/icons.ts
 * react: { component: ReactIcon, color: "#61DAFB" }        // React cyan
 * nodejs: { component: NodejsIcon, color: "#68A063" }      // Node.js green  
 * python: { component: PythonIcon, color: "#3776AB" }      // Python blue
 * systemdesign: { component: MspaceIcon, color: "#6366F1" } // Custom purple
 * ```
 * 
 * ## Animation Details:
 * 
 * ### Icon Nudge:
 * - **Distance**: 12px left from center
 * - **Timing**: 0.3s ease-out
 * - **Brand color**: Simultaneous with nudge
 * 
 * ### Hollow Neon Percentage:
 * - **Style**: Multiple text-shadow layers for outline effect
 * - **Color**: Matches icon's brand color
 * - **Position**: Right of icon, same horizontal line
 * - **Timing**: Appears immediately with icon nudge
 * 
 * ### Progress Bar:
 * - **Fill direction**: Bottom-to-top behind icon
 * - **Color**: Brand color with opacity
 * - **Duration**: 0.6s synchronized with other elements
 * - **Z-index**: Behind icon and percentage
 * 
 * ## Performance Optimizations:
 * - Hardware-accelerated transforms (transform-gpu)
 * - CSS-only animations for 60fps performance
 * - Efficient opacity layering: Icon > Percentage > Progress Bar
 * - Responsive design with mobile optimization
 * 
 * ## Adding/Modifying Icons:
 * 
 * ### Standard Technologies:
 * 1. Use external verified icon libraries
 * 2. Add to `/src/config/icons.ts` with official brand color
 * 3. Reference by key in `/src/data/portfolio-data.tsx`
 * 
 * ### Non-standard Tech/Buzzwords:
 * - Automatically uses Mspace.svg fallback
 * - Custom themed colors applied
 * - No additional setup required
 * 
 * @example
 * ```tsx
 * <SkillsSection 
 *   id="skills" 
 *   skills={portfolioData.skills} 
 *   techStack={portfolioData.techStack} 
 * />
 * ```
 */
const ScrollingSkillsMarquee = ({ skills }: { skills: Skill[] }) => {
  // The list is duplicated to create a seamless infinite scroll effect.
  const extendedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <div className="relative w-full overflow-hidden py-12">
      <div className="flex animate-scroll-x hover:[animation-play-state:paused]">
        {extendedSkills.map((skill, index) => {
           // Map skill name to a key usable by the icon configuration.
           // e.g., "Node.js" -> "nodejs", "System Design" -> "systemdesign"
           const iconKey = skill.name.toLowerCase().replace(/ \/ /g, '').replace(/\./g, '').replace(/ /g, '');
           const hasIcon = Object.keys(icons).includes(iconKey);

           return (
            <div
              key={`${skill.name}-${index}`}
              className="group/item relative flex-shrink-0 w-40 h-48 flex flex-col items-center justify-center p-4 mx-4 bg-card rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:shadow-primary/20"
              onMouseEnter={(e) => {
                // Global hover state: Pause scrolling when hovering anywhere on this box
                const scrollContainer = e.currentTarget.closest('.animate-scroll-x') as HTMLElement;
                if (scrollContainer) {
                  scrollContainer.style.animationPlayState = 'paused';
                }
              }}
              onMouseLeave={(e) => {
                // Resume scrolling when leaving this box
                const scrollContainer = e.currentTarget.closest('.animate-scroll-x') as HTMLElement;
                if (scrollContainer) {
                  scrollContainer.style.animationPlayState = 'running';
                }
              }}
            >
              
              {/* Progress Bar Background (Bottom-to-Top Fill) */}
              <div 
                className="absolute bottom-0 left-0 w-full rounded-lg transition-all duration-500 ease-out group-hover/item:opacity-100 opacity-0 -z-10"
                style={{
                  height: `${skill.proficiency}%`,
                  backgroundColor: hasIcon ? `${icons[iconKey]?.color}20` : 'hsl(var(--primary)/0.1)'
                }}
              />
              
              {/* Content Container - Simple centered layout */}
              <div className="flex flex-col items-center justify-center gap-3 text-center relative z-10 w-full">
                
                {/* Icon - Simple centered with brand color on hover */}
                {hasIcon && (
                  <div 
                    className="transition-all duration-300 ease-out group-hover/item:scale-110"
                    style={{
                      '--brand-color': icons[iconKey]?.color || 'hsl(var(--primary))',
                    } as React.CSSProperties}
                  >
                    <div className="transition-colors duration-300 group-hover/item:text-[var(--brand-color)]">
                      <IconRenderer 
                        name={iconKey} 
                        className="h-10 w-10" 
                        enableGlow={false} 
                      />
                    </div>
                  </div>
                )}
                
                {/* Skill Name Label */}
                <p className="text-sm font-semibold text-foreground transition-colors duration-300 group-hover/item:text-primary">
                  {skill.name}
                </p>
                
                {/* Simple Percentage - Appears below name on hover */}
                <div className="opacity-0 transition-all duration-300 ease-out group-hover/item:opacity-100">
                  <span 
                    className="text-lg font-bold"
                    style={{
                      color: hasIcon ? icons[iconKey]?.color : 'hsl(var(--primary))'
                    }}
                  >
                    {skill.proficiency}%
                  </span>
                </div>
              </div>
            </div>
           )
        })}
      </div>
    </div>
  );
};

// Buzzword Cloud - Scrolls in opposite direction
const ScrollingBuzzwordMarquee = ({ buzzwords }: { buzzwords: Skill[] }) => {
  // The list is duplicated to create a seamless infinite scroll effect.
  const extendedBuzzwords = [...buzzwords, ...buzzwords, ...buzzwords, ...buzzwords];

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="flex animate-scroll-x-reverse hover:[animation-play-state:paused]">
        {extendedBuzzwords.map((buzzword, index) => {
           // Map buzzword name to a key usable by the icon configuration.
           // e.g., "System Design" -> "systemdesign", "API Development" -> "apidevelopment"
           const iconKey = buzzword.name.toLowerCase().replace(/ \/ /g, '').replace(/\./g, '').replace(/ /g, '');
           const hasIcon = Object.keys(icons).includes(iconKey);

           return (
            <div
              key={`${buzzword.name}-${index}`}
              className="group/item relative flex-shrink-0 w-40 h-48 flex flex-col items-center justify-center p-4 mx-4 bg-card rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:shadow-primary/20"
              onMouseEnter={(e) => {
                // Global hover state: Pause scrolling when hovering anywhere on this box
                const scrollContainer = e.currentTarget.closest('.animate-scroll-x-reverse') as HTMLElement;
                if (scrollContainer) {
                  scrollContainer.style.animationPlayState = 'paused';
                }
              }}
              onMouseLeave={(e) => {
                // Resume scrolling when leaving this box
                const scrollContainer = e.currentTarget.closest('.animate-scroll-x-reverse') as HTMLElement;
                if (scrollContainer) {
                  scrollContainer.style.animationPlayState = 'running';
                }
              }}
            >
              
              {/* Progress Bar Background (Bottom-to-Top Fill) */}
              <div 
                className="absolute bottom-0 left-0 w-full rounded-lg transition-all duration-500 ease-out group-hover/item:opacity-100 opacity-0 -z-10"
                style={{
                  height: `${buzzword.proficiency}%`,
                  backgroundColor: hasIcon ? `${icons[iconKey]?.color}20` : 'hsl(var(--primary)/0.1)'
                }}
              />
              
              {/* Content Container - Simple centered layout */}
              <div className="flex flex-col items-center justify-center gap-3 text-center relative z-10 w-full">
                
                {/* Icon - Simple centered with brand color on hover */}
                {hasIcon ? (
                  <div 
                    className="transition-all duration-300 ease-out group-hover/item:scale-110"
                    style={{
                      '--brand-color': icons[iconKey]?.color || 'hsl(var(--primary))',
                    } as React.CSSProperties}
                  >
                    <div className="transition-colors duration-300 group-hover/item:text-[var(--brand-color)]">
                      <IconRenderer 
                        name={iconKey} 
                        className="h-10 w-10" 
                        enableGlow={false} 
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{buzzword.name.charAt(0)}</span>
                  </div>
                )}
                
                {/* Buzzword Name Label */}
                <p className="text-sm font-semibold text-foreground transition-colors duration-300 group-hover/item:text-primary">
                  {buzzword.name}
                </p>
                
                {/* Simple Percentage - Appears below name on hover */}
                <div className="opacity-0 transition-all duration-300 ease-out group-hover/item:opacity-100">
                  <span 
                    className="text-lg font-bold"
                    style={{
                      color: hasIcon ? icons[iconKey]?.color : 'hsl(var(--primary))'
                    }}
                  >
                    {buzzword.proficiency}%
                  </span>
                </div>
              </div>
            </div>
           )
        })}
      </div>
    </div>
  );
};

export default function SkillsSection({ id, skills, buzzwords, techStack }: SkillsSectionProps) {
  return (
    <section id={id} className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Skills & Technologies</h2>
          <p className="mt-4 text-lg text-muted-foreground">My technical expertise and the tools I love to use.</p>
          
          {/*
            Featured Tech Stack Row:
            - Renders the first 4 icons from the `techStack` array
            - Icons nudge left on hover with brand color reveals
            - Consistent behavior with marquee for unified experience
          */}
          <div className="mt-8 flex justify-center items-center gap-8">
            {techStack.slice(0, 4).map((tech) => (
                <div key={tech.name} className="group/tech">
                  <IconRenderer 
                    name={tech.icon} 
                    className="h-12 w-12 transition-all duration-300 group-hover/tech:-translate-x-1 group-hover/tech:scale-110" 
                    enableGlow={true} 
                  />
                </div>
            ))}
          </div>
        </div>

        <ScrollingSkillsMarquee skills={skills} />
        
        {/* Buzzwords Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-center mb-6 text-muted-foreground">Concepts & Methodologies</h3>
          <ScrollingBuzzwordMarquee buzzwords={buzzwords} />
        </div>
      </div>
    </section>
  );
}
