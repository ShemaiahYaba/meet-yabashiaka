
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Skill, Tech } from '@/data/portfolio-data';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SkillsSectionProps {
  id: string;
  skills: Skill[];
  techStack: Tech[];
}

const ProficiencyDisplay = ({ level }: { level: number }) => (
  <div className="flex items-center gap-1.5">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className={`h-2 w-5 rounded-full transition-colors ${i < level ? 'bg-primary' : 'bg-muted'}`}
      />
    ))}
  </div>
);

const NodejsIcon = ({ className }: { className?: string }) => (
  <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M11.998 24L7.33 21.157V2.843L11.998 0l4.668 2.843v18.314L11.998 24zM12 1.337L8.667 3.33v17.34l3.333 1.993 3.333-1.993V3.33L12 1.337z"/></svg>
);
const PythonIcon = ({ className }: { className?: string }) => (
    <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12 24c-1.39-2.182-1.39-4.818 0-7 .992-1.562 2.37-2.5 4-2.5s3.008.938 4 2.5c1.39 2.182 1.39 4.818 0 7-1.393 2.185-3.13 3.33-5 3.33-1.18 0-2.22-.44-3-1.33zm0-11c-1.39 2.182-1.39 4.818 0 7 .992-1.562 2.37-2.5 4 2.5s3.008-.938 4-2.5c1.39-2.182 1.39-4.818 0-7-1.393-2.185-3.13-3.33-5-3.33-1.18 0-2.22.44-3-1.33zM12 0c1.39 2.182 1.39 4.818 0 7-.992 1.562-2.37 2.5-4 2.5S4.992 8.562 4 7C2.61 4.818 2.61 2.182 4 0c1.393-2.185 3.13-3.33 5-3.33 1.18 0 2.22.44 3 1.33zm0 11c1.39-2.182 1.39-4.818 0-7-.992-1.562-2.37-2.5-4-2.5S4.992 2.438 4 4c-1.39 2.182-1.39 4.818 0 7 1.393 2.185 3.13 3.33 5 3.33 1.18 0 2.22-.44 3-1.33z"/></svg>
);
const PostgreSqlIcon = ({ className }: { className?: string }) => (
    <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12.003 24C5.467 24 0 18.623 0 12.003S5.467 0 12.003 0c6.533 0 12 5.377 12 12.003s-5.467 12-12 12zm-1.464-3.557h2.895V9.432h2.51v-2.5H8.02v2.5h2.519v11.011zm3.896-12.87c0-.501.166-.94.498-1.314a2.035 2.035 0 0 1 1.285-.563c.476 0 .895.188 1.259.563.364.373.546.813.546 1.314 0 .5-.182.94-.546 1.314a1.83 1.83 0 0 1-1.26.551c-.476 0-.9-.184-1.284-.55a1.99 1.99 0 0 1-.5-1.315z"/></svg>
);
const DockerIcon = ({ className }: { className?: string }) => (
    <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M23.508.868H.492C.22.868 0 1.087 0 1.36v21.28c0 .272.22.492.492.492h23.016c.272 0 .492-.22.492-.492V1.36c0-.273-.22-.492-.492-.492zM7.22 17.653c-.35 0-.677-.07-.982-.208-.305-.138-.568-.333-.79-.585-.222-.252-.39-.554-.508-.905-.117-.35-.176-.738-.176-1.164V9.66c0-.426.06-.814.177-1.164.118-.35.286-.652.508-.905.222-.252.485-.447.79-.585.305-.138.632-.208.982-.208.35 0 .677.07.982.208.305.138.568.333.79.585.222.252.39.554.508.905.118.35.177.738.177-1.164v5.132c0 .426-.06.814-.177 1.164-.118.35-.286-.652-.508.905-.222.252-.485.447-.79.585-.305-.138-.632-.208-.982-.208zm10.428-1.748c-.628 1.09-1.572 1.635-2.833 1.635-.38 0-.74-.06-1.077-.18-.338-.12-.64-.296-.905-.53-.265-.233-.48-.51-.646-.832-.167-.322-.25-.68-.25-1.076s.083-.754.25-1.077c.166-.322.38-.599.646-.832.265-.233.567-.41.905-.53.337-.12.697-.18 1.077-.18.82 0 1.5.343 2.042 1.03.542.687.813 1.5.813 2.44 0 .93-.28 1.734-.848 2.414zM4.69 4.67h2.89v2.89H4.69zm3.855 0h2.89v2.89h-2.89zm3.855 0h2.89v2.89h-2.89zm3.854 0h2.89v2.89h-2.89z"/></svg>
);

const techIconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  'Node.js': NodejsIcon,
  'Python': PythonIcon,
  'PostgreSQL': PostgreSqlIcon,
  'Docker': DockerIcon,
};


export default function SkillsSection({ id, skills, techStack }: SkillsSectionProps) {
  return (
    <section id={id} className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Skills & Technologies</h2>
          <p className="mt-4 text-lg text-muted-foreground">My technical expertise and the tools I love to use.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
              <CardTitle>Core Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {skills.map((skill) => (
                  <li key={skill.name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="font-medium">{skill.name}</span>
                    <ProficiencyDisplay level={skill.proficiency} />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Tech Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-6 text-center">
                  {techStack.map((tech) => {
                    const Icon = techIconMap[tech.name];
                    if (!Icon) return null;
                    return (
                      <Tooltip key={tech.name}>
                        <TooltipTrigger asChild>
                           <div
                            className="text-muted-foreground transition-all duration-300 transform-gpu hover:-translate-y-1 hover:text-[var(--tech-color)]"
                            style={{ '--tech-color': tech.color } as React.CSSProperties}
                           >
                              <Icon className="h-12 w-12 mx-auto" />
                           </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{tech.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
