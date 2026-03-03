"use client";

import React from "react";
import type { Skill, Tech } from "@/data/portfolio-data";
import { IconRenderer } from "@/components/icon-renderer";
import { icons } from "@/config/icons";

interface SkillsSectionProps {
  id: string;
  skills: Skill[];
  buzzwords: Skill[];
  techStack: Tech[];
}

const ScrollingSkillsMarquee = ({ skills }: { skills: Skill[] }) => {
  const extendedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <div className="relative w-full overflow-hidden py-12">
      <div className="flex animate-scroll-x hover:[animation-play-state:paused]">
        {extendedSkills.map((skill, index) => {
          const iconKey = skill.name
            .toLowerCase()
            .replace(/ \/ /g, "")
            .replace(/\./g, "")
            .replace(/ /g, "");
          const hasIcon = Object.keys(icons).includes(iconKey);

          return (
            <div
              key={`${skill.name}-${index}`}
              className="group/item relative flex-shrink-0 w-40 h-48 flex flex-col items-center justify-center p-4 mx-3 rounded-md border border-border bg-[hsl(var(--card))] transition-colors hover:border-[hsl(var(--muted-foreground)_/_0.5)]"
              onMouseEnter={(e) => {
                const scrollContainer = e.currentTarget.closest(
                  ".animate-scroll-x",
                ) as HTMLElement;
                if (scrollContainer) {
                  scrollContainer.style.animationPlayState = "paused";
                }
              }}
              onMouseLeave={(e) => {
                const scrollContainer = e.currentTarget.closest(
                  ".animate-scroll-x",
                ) as HTMLElement;
                if (scrollContainer) {
                  scrollContainer.style.animationPlayState = "running";
                }
              }}
            >
              {/* Progress Bar Background (Bottom-to-Top Fill) */}
              <div
                className="absolute bottom-0 left-0 w-full rounded-b-md transition-all duration-500 ease-out group-hover/item:opacity-100 opacity-0 -z-10"
                style={{
                  height: `${skill.proficiency}%`,
                  backgroundColor: hasIcon
                    ? `${icons[iconKey]?.color}15`
                    : "hsl(var(--primary)/0.08)",
                }}
              />

              {/* Content Container */}
              <div className="flex flex-col items-center justify-center gap-3 text-center relative z-10 w-full">
                {/* Icon */}
                {hasIcon && (
                  <div
                    className="transition-all duration-300 ease-out group-hover/item:scale-110"
                    style={
                      {
                        "--brand-color":
                          icons[iconKey]?.color || "hsl(var(--primary))",
                      } as React.CSSProperties
                    }
                  >
                    <div className="transition-colors duration-300 text-[hsl(var(--muted-foreground))] group-hover/item:text-[var(--brand-color)]">
                      <IconRenderer
                        name={iconKey}
                        className="h-10 w-10"
                        enableGlow={false}
                      />
                    </div>
                  </div>
                )}

                {/* Skill Name Label */}
                <p className="text-sm font-medium text-foreground">
                  {skill.name}
                </p>

                {/* Percentage on hover */}
                <div className="opacity-0 transition-all duration-300 ease-out group-hover/item:opacity-100">
                  <span
                    className="font-code text-lg font-bold"
                    style={{
                      color: hasIcon
                        ? icons[iconKey]?.color
                        : "hsl(var(--primary))",
                    }}
                  >
                    {skill.proficiency}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Buzzword Cloud - Scrolls in opposite direction
const ScrollingBuzzwordMarquee = ({ buzzwords }: { buzzwords: Skill[] }) => {
  const extendedBuzzwords = [
    ...buzzwords,
    ...buzzwords,
    ...buzzwords,
    ...buzzwords,
  ];

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="flex animate-scroll-x-reverse hover:[animation-play-state:paused]">
        {extendedBuzzwords.map((buzzword, index) => {
          const iconKey = buzzword.name
            .toLowerCase()
            .replace(/ \/ /g, "")
            .replace(/\./g, "")
            .replace(/ /g, "");
          const hasIcon = Object.keys(icons).includes(iconKey);

          return (
            <div
              key={`${buzzword.name}-${index}`}
              className="group/item relative flex-shrink-0 w-40 h-48 flex flex-col items-center justify-center p-4 mx-3 rounded-md border border-border bg-[hsl(var(--card))] transition-colors hover:border-[hsl(var(--muted-foreground)_/_0.5)]"
              onMouseEnter={(e) => {
                const scrollContainer = e.currentTarget.closest(
                  ".animate-scroll-x-reverse",
                ) as HTMLElement;
                if (scrollContainer) {
                  scrollContainer.style.animationPlayState = "paused";
                }
              }}
              onMouseLeave={(e) => {
                const scrollContainer = e.currentTarget.closest(
                  ".animate-scroll-x-reverse",
                ) as HTMLElement;
                if (scrollContainer) {
                  scrollContainer.style.animationPlayState = "running";
                }
              }}
            >
              {/* Progress Bar Background */}
              <div
                className="absolute bottom-0 left-0 w-full rounded-b-md transition-all duration-500 ease-out group-hover/item:opacity-100 opacity-0 -z-10"
                style={{
                  height: `${buzzword.proficiency}%`,
                  backgroundColor: hasIcon
                    ? `${icons[iconKey]?.color}15`
                    : "hsl(var(--primary)/0.08)",
                }}
              />

              {/* Content Container */}
              <div className="flex flex-col items-center justify-center gap-3 text-center relative z-10 w-full">
                {/* Icon */}
                {hasIcon ? (
                  <div
                    className="transition-all duration-300 ease-out group-hover/item:scale-110"
                    style={
                      {
                        "--brand-color":
                          icons[iconKey]?.color || "hsl(var(--primary))",
                      } as React.CSSProperties
                    }
                  >
                    <div className="transition-colors duration-300 text-[hsl(var(--muted-foreground))] group-hover/item:text-[var(--brand-color)]">
                      <IconRenderer
                        name={iconKey}
                        className="h-10 w-10"
                        enableGlow={false}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-full border border-border bg-[hsl(var(--muted))] flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">
                      {buzzword.name.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Buzzword Name Label */}
                <p className="text-sm font-medium text-foreground">
                  {buzzword.name}
                </p>

                {/* Percentage on hover */}
                <div className="opacity-0 transition-all duration-300 ease-out group-hover/item:opacity-100">
                  <span
                    className="font-code text-lg font-bold"
                    style={{
                      color: hasIcon
                        ? icons[iconKey]?.color
                        : "hsl(var(--primary))",
                    }}
                  >
                    {buzzword.proficiency}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function SkillsSection({
  id,
  skills,
  buzzwords,
  techStack,
}: SkillsSectionProps) {
  return (
    <section id={id} className="border-t border-border py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Skills & Technologies
          </h2>
          <p className="mt-4 text-base text-[hsl(var(--muted-foreground))]">
            My technical expertise and the tools I love to use.
          </p>

          {/* Featured Tech Stack Row */}
          <div className="mt-8 flex justify-center items-center gap-8">
            {techStack.slice(0, 4).map((tech) => (
              <div key={tech.name} className="group/tech">
                <IconRenderer
                  name={tech.icon}
                  className="h-12 w-12 transition-all duration-300 group-hover/tech:scale-110"
                  enableGlow={true}
                />
              </div>
            ))}
          </div>
        </div>

        <ScrollingSkillsMarquee skills={skills} />

        {/* Buzzwords Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-center mb-6 text-[hsl(var(--muted-foreground))]">
            Concepts & Methodologies
          </h3>
          <ScrollingBuzzwordMarquee buzzwords={buzzwords} />
        </div>
      </div>
    </section>
  );
}
