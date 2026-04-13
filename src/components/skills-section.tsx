"use client";

import React from "react";
import type { Skill, Tech } from "@/data/portfolio-data";
import { IconRenderer } from "@/components/icon-renderer";

interface SkillsSectionProps {
  id: string;
  skills: Skill[];
  buzzwords: Skill[];
  techStack: Tech[];
}

const SkillCard = ({ skill }: { skill: Skill }) => {
  const iconKey = skill.name
    .toLowerCase()
    .replace(/ \/ /g, "")
    .replace(/\./g, "")
    .replace(/ /g, "");

  return (
    <div className="group rounded-md border border-border/50 bg-[hsl(var(--card))] p-3 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[hsl(var(--gh-green))]/50 hover:bg-[hsl(var(--muted))]/35">
      <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-sm bg-[hsl(var(--muted))]/40">
        <IconRenderer
          name={iconKey}
          className="h-4 w-4 transition-transform duration-300 group-hover:scale-105"
          enableGlow={false}
        />
      </div>
      <p className="text-xs font-medium text-foreground/95">{skill.name}</p>
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
    <section id={id}>
      {/* Featured Tech Stack */}
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-base font-semibold text-foreground">Tech Stack</h2>
        <div className="flex items-center gap-3 ml-3">
          {techStack.slice(0, 4).map((tech) => (
            <div key={tech.name} className="group/tech">
              <IconRenderer
                name={tech.icon}
                className="h-6 w-6 transition-transform duration-300 group-hover/tech:scale-110"
                enableGlow={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Languages & Frameworks */}
      <div className="rounded-md border border-border/60 bg-[hsl(var(--card))] p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Languages & Frameworks
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>

      {/* Concepts & Methodologies */}
      {buzzwords.length > 0 && (
        <div className="rounded-md border border-border/60 bg-[hsl(var(--card))] p-5 mt-4 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Concepts & Methodologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {buzzwords.map((skill) => (
              <span
                key={skill.name}
                className="inline-flex items-center rounded-md border border-border/40 bg-[hsl(var(--muted))]/60 px-3 py-1.5 text-xs font-medium text-foreground/90 shadow-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
