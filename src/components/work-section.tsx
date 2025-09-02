
'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Project } from '@/data/portfolio-data';
import { Github, ExternalLink, Eye, Lock, Unlock, Users, User, Clock, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { IconRenderer } from '@/components/icon-renderer';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress";

interface WorkSectionProps {
  id: string;
  projects: Project[];
}

const ProjectCard = ({ project }: { project: Project }) => (
  <Card key={project.title} className="group overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col border-border/80">
    <div className="relative h-60 w-full">
      <Image
        src={project.defaultImage}
        alt={project.title}
        fill
        className="object-cover"
        data-ai-hint={project.dataAiHint}
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
      {/* Progress Bar */}
      {project.progress < 100 && (
        <div className="absolute bottom-0 left-0 w-full p-2">
          <Progress value={project.progress} className="h-2 bg-white/20" />
          <p className="text-xs text-white text-center mt-1">{project.progress}% complete</p>
        </div>
      )}
    </div>
    <CardContent className="p-6 flex flex-col flex-grow bg-card">
      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
      
      {/* Tech Icons with Tooltips */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
        <TooltipProvider>
          {project.tech.map((techName) => (
            <Tooltip key={techName}>
              <TooltipTrigger asChild>
                <div className="transition-all duration-300 hover:scale-110">
                  <IconRenderer name={techName} className="h-6 w-6"/>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="capitalize">{techName.replace(/js/g, '.js')}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
      
      {/* Action & Status Icons */}
      <div className="mt-auto flex items-center gap-4 pt-4 border-t border-border">
        <TooltipProvider>
          {/* Collaboration Status */}
          <Tooltip>
            <TooltipTrigger>
              {project.isCollaboration ? <Users className="h-5 w-5 text-muted-foreground" /> : <User className="h-5 w-5 text-muted-foreground" />}
            </TooltipTrigger>
            <TooltipContent><p>{project.isCollaboration ? 'Collaborative Project' : 'Solo Project'}</p></TooltipContent>
          </Tooltip>

          {/* Privacy Status */}
          <Tooltip>
            <TooltipTrigger>
              {project.private ? <Lock className="h-5 w-5 text-muted-foreground" /> : <Unlock className="h-5 w-5 text-muted-foreground" />}
            </TooltipTrigger>
            <TooltipContent><p>{project.private ? 'Private Project' : 'Public Project'}</p></TooltipContent>
          </Tooltip>
          
          {/* Completion Status */}
          <Tooltip>
            <TooltipTrigger>
              {project.isCompleted ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Clock className="h-5 w-5 text-muted-foreground" />}
            </TooltipTrigger>
            <TooltipContent><p>{project.isCompleted ? 'Completed' : 'In Progress'}</p></TooltipContent>
          </Tooltip>
          
          {/* Spacer */}
          <div className="flex-grow" />

          {/* Gallery */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-primary">
                <Eye className="h-5 w-5" />
                <span className="sr-only">Preview Images</span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0">
               <Carousel className="w-full">
                <CarouselContent>
                  {project.gallery.map((imgSrc, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-video">
                        <Image src={imgSrc} alt={`${project.title} - Image ${index + 1}`} fill className="object-contain" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2"/>
              </Carousel>
            </DialogContent>
          </Dialog>

          {/* Links */}
          {project.github && (
            <Tooltip>
              <TooltipTrigger asChild>
                 <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-primary">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
              </TooltipTrigger>
              <TooltipContent><p>GitHub Repository</p></TooltipContent>
            </Tooltip>
          )}

          {project.url && (
            <Tooltip>
              <TooltipTrigger asChild>
                 <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-primary">
                    <ExternalLink className="h-5 w-5" />
                    <span className="sr-only">External Link</span>
                  </a>
              </TooltipTrigger>
              <TooltipContent><p>Live Demo</p></TooltipContent>
            </Tooltip>
          )}

        </TooltipProvider>
      </div>
    </CardContent>
  </Card>
);

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
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
