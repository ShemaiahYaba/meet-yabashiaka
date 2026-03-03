"use client";

import Image from "next/image";
import type { Project } from "@/data/portfolio-data";
import {
  Github,
  ExternalLink,
  Eye,
  Lock,
  Unlock,
  Users,
  User,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IconRenderer } from "@/components/icon-renderer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

interface WorkSectionProps {
  id: string;
  projects: Project[];
}

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="group flex h-full flex-col overflow-hidden rounded-md border border-border bg-[hsl(var(--card))] transition-colors hover:border-[hsl(var(--muted-foreground)_/_0.4)]">
    <div className="relative h-56 w-full overflow-hidden">
      <Image
        src={project.defaultImage}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        data-ai-hint={project.dataAiHint}
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
      {/* Progress Bar */}
      {project.progress < 100 && (
        <div className="absolute bottom-0 left-0 w-full p-2">
          <Progress value={project.progress} className="h-1.5 bg-white/20" />
          <p className="font-code text-xs text-white text-center mt-1">
            {project.progress}% complete
          </p>
        </div>
      )}
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <h3 className="text-lg font-semibold text-primary hover:underline underline-offset-4 cursor-default mb-2">
        {project.title}
      </h3>
      <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4 flex-grow leading-relaxed">
        {project.description}
      </p>

      {/* Tech badges — GitHub language tag style */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {project.tech.map((techName) => (
          <Tooltip key={techName}>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1.5 rounded-full border border-border bg-[hsl(var(--muted))] px-2.5 py-1 transition-colors hover:border-[hsl(var(--muted-foreground)_/_0.5)]">
                <IconRenderer name={techName} className="h-3.5 w-3.5" />
                <span className="text-xs text-[hsl(var(--muted-foreground))] capitalize">
                  {techName.replace(/js/g, ".js")}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="capitalize">{techName.replace(/js/g, ".js")}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Action & Status Icons */}
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        {/* Collaboration Status */}
        <Tooltip>
          <TooltipTrigger>
            {project.isCollaboration ? (
              <Users className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            ) : (
              <User className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {project.isCollaboration
                ? "Collaborative Project"
                : "Solo Project"}
            </p>
          </TooltipContent>
        </Tooltip>

        {/* Privacy Status */}
        <Tooltip>
          <TooltipTrigger>
            {project.private ? (
              <Lock className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            ) : (
              <Unlock className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>{project.private ? "Private Project" : "Public Project"}</p>
          </TooltipContent>
        </Tooltip>

        {/* Completion Status */}
        <Tooltip>
          <TooltipTrigger>
            {project.isCompleted ? (
              <CheckCircle className="h-4 w-4 text-[hsl(var(--gh-green))]" />
            ) : (
              <Clock className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>{project.isCompleted ? "Completed" : "In Progress"}</p>
          </TooltipContent>
        </Tooltip>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Gallery */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-primary">
              <Eye className="h-4 w-4" />
              <span className="sr-only">Preview Images</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0 border border-border bg-[hsl(var(--card))]">
            <Carousel className="w-full">
              <CarouselContent>
                {project.gallery.map((imgSrc, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video">
                      <Image
                        src={imgSrc}
                        alt={`${project.title} - Image ${index + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </DialogContent>
        </Dialog>

        {/* Links */}
        {project.github && (
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-primary"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>GitHub Repository</p>
            </TooltipContent>
          </Tooltip>
        )}

        {project.url && (
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-primary"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">External Link</span>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Live Demo</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  </div>
);

export default function WorkSection({ id, projects }: WorkSectionProps) {
  return (
    <section id={id} className="border-t border-border py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            My Work
          </h2>
          <p className="mt-4 text-base text-[hsl(var(--muted-foreground))]">
            A selection of projects I&apos;m proud of.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <TooltipProvider key={project.title}>
              <ProjectCard project={project} />
            </TooltipProvider>
          ))}
        </div>
      </div>
    </section>
  );
}
