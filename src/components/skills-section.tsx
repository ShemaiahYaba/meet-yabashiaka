
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Skill, Tech } from '@/data/portfolio-data';
import { IconRenderer } from '@/components/icon-renderer';
import { icons } from '@/config/icons';
import { Progress } from '@/components/ui/progress';

interface SkillsSectionProps {
  id: string;
  skills: Skill[];
  techStack: Tech[];
}

const ScrollingSkillCloud = ({ skills }: { skills: Skill[] }) => {
  const extendedSkills = [...skills, ...skills]; 

  return (
    <div className="relative h-96 overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-card to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 w-full h-1/4 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none" />
      <div className="animate-scroll-y flex flex-col gap-8 py-8">
        {extendedSkills.map((skill, index) => (
          <div key={`${skill.name}-${index}`} className="relative flex flex-col items-center justify-center p-4">
             <Progress value={skill.proficiency} className="absolute w-1/2 h-full -z-10 opacity-10" />
            <p className="text-lg font-semibold text-center">{skill.name}</p>
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Core Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollingSkillCloud skills={skills} />
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <CardTitle>My Tech Stack</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex justify-center items-center gap-8 py-8">
                {techStack.slice(0, 4).map((tech) => {
                  const iconInfo = icons[tech.icon];
                  if (!iconInfo) return null;
                  return (
                    <IconRenderer key={tech.name} name={tech.icon} className="h-16 w-16" />
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
