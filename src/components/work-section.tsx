import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  dataAiHint: string;
  tech: string[];
}

interface WorkSectionProps {
  id: string;
  projects: Project[];
}

export default function WorkSection({ id, projects }: WorkSectionProps) {
  return (
    <section id={id} className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">My Work</h2>
          <p className="mt-4 text-lg text-muted-foreground">A selection of projects I'm proud of.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <a href={project.link} key={project.title} target="_blank" rel="noopener noreferrer" className="group block">
              <Card className="overflow-hidden h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={project.dataAiHint}
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
