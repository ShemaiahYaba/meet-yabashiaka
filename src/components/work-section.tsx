
'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Project } from '@/data/portfolio-data';
import { Github, ExternalLink, Eye, Lock, Unlock } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { IconRenderer } from '@/components/icon-renderer';

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
            <Card key={project.title} className="group overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
              <div className="relative h-60 w-full">
                <Image
                  src={project.defaultImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  data-ai-hint={project.dataAiHint}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-4 mb-4">
                  {project.tech.map((techName) => (
                    <IconRenderer key={techName} name={techName} className="h-6 w-6"/>
                  ))}
                </div>
                <div className="mt-auto flex items-center gap-4 pt-4 border-t border-border">
                  {project.private ? (
                    <Lock className="h-5 w-5 text-muted-foreground" title="Private Project" />
                  ) : (
                    <Unlock className="h-5 w-5 text-muted-foreground" title="Public Project" />
                  )}
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
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-primary"
                      title="GitHub Repository"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </a>
                  )}
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-primary"
                      title="Live Demo"
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span className="sr-only">External Link</span>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
