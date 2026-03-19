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

const SkillBar = ({ skill }: { skill: Skill }) => {
  const iconKey = skill.name
    .toLowerCase()
    .replace(/ \/ /g, "")
    .replace(/\./g, "")
    .replace(/ /g, "");

  return (
    <div className="group flex items-center gap-3">
      {/* Icon */}
      <div className="w-6 flex-shrink-0 flex justify-center">
        <IconRenderer name={iconKey} className="h-4 w-4" enableGlow={false} />
      </div>
      {/* Name */}
      <span className="w-24 flex-shrink-0 text-sm text-foreground truncate">
        {skill.name}
      </span>
      {/* Bar */}
      <div className="flex-1 h-2 rounded-full bg-[hsl(var(--muted))] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${skill.proficiency}%`,
            backgroundColor: "hsl(var(--gh-green))",
          }}
        />
      </div>
      {/* Percentage */}
      <span className="font-code text-xs text-[hsl(var(--muted-foreground))] w-10 text-right">
        {skill.proficiency}%
      </span>
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
      <div className="rounded-md border border-border bg-[hsl(var(--card))] p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Languages & Frameworks
        </h3>
        <div className="space-y-3">
          {skills.map((skill) => (
            <SkillBar key={skill.name} skill={skill} />
          ))}
        </div>
      </div>

      {/* Concepts & Methodologies */}
      {buzzwords.length > 0 && (
        <div className="rounded-md border border-border bg-[hsl(var(--card))] p-5 mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Concepts & Methodologies
          </h3>
          <div className="space-y-3">
            {buzzwords.map((skill) => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
