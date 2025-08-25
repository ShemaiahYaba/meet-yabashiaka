
'use client';

import type { Skill, Tech } from '@/data/portfolio-data';
import { IconRenderer } from '@/components/icon-renderer';

interface SkillsSectionProps {
  id: string;
  skills: Skill[];
  techStack: Tech[];
}

const ScrollingSkillsMarquee = ({ skills }: { skills: Skill[] }) => {
  const extendedSkills = [...skills, ...skills, ...skills, ...skills]; 

  return (
    <div className="relative w-full overflow-hidden py-12">
        <div className="flex animate-scroll-x">
            {extendedSkills.map((skill, index) => (
            <div key={`${skill.name}-${index}`} className="relative flex-shrink-0 w-64 h-24 flex flex-col items-center justify-center p-4 mx-4 bg-card rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute bottom-0 left-0 w-full h-full rounded-lg bg-primary/5 -z-10" style={{ height: `${skill.proficiency}%` }}/>
                <p className="text-lg font-semibold text-center z-10">{skill.name}</p>
            </div>
            ))}
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
