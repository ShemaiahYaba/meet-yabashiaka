"use client";

import Image from "next/image";
import type { DisplayProject } from "@/lib/projects";
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
  Pin,
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
import { useProjects } from "@/hooks/useProjects";

interface WorkSectionProps {
  id: string;
}

const ProjectCardSkeleton = () => (
  <div className="flex flex-col overflow-hidden rounded-md border border-border bg-[hsl(var(--card))] animate-pulse">
    <div className="h-40 bg-[hsl(var(--muted))]" />
    <div className="p-4 space-y-3">
      <div className="h-3.5 w-32 rounded bg-[hsl(var(--muted))]" />
      <div className="space-y-1.5">
        <div className="h-2.5 w-full rounded bg-[hsl(var(--muted))]" />
        <div className="h-2.5 w-4/5 rounded bg-[hsl(var(--muted))]" />
        <div className="h-2.5 w-3/5 rounded bg-[hsl(var(--muted))]" />
      </div>
      <div className="flex gap-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-5 w-16 rounded-full bg-[hsl(var(--muted))]" />
        ))}
      </div>
    </div>
  </div>
);

const ProjectCard = ({ project }: { project: DisplayProject }) => (
  <div className="group flex flex-col overflow-hidden rounded-md border border-border bg-[hsl(var(--card))] transition-colors hover:border-[hsl(var(--muted-foreground)_/_0.4)]">
    {/* Image */}
    <div className="relative h-40 w-full overflow-hidden">
      {project.defaultImage ? (
        <Image
          src={project.defaultImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          data-ai-hint={project.dataAiHint}
        />
      ) : (
        <div className="h-full w-full bg-[hsl(var(--muted))] flex items-center justify-center">
          <span className="font-code text-xs text-[hsl(var(--muted-foreground))]">
            no image
          </span>
        </div>
      )}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
      {project.progress < 100 && (
        <div className="absolute bottom-0 left-0 w-full p-2">
          <Progress value={project.progress} className="h-1 bg-white/20" />
          <p className="font-code text-[10px] text-white text-center mt-0.5">
            {project.progress}%
          </p>
        </div>
      )}
    </div>

    {/* Content */}
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-sm font-semibold text-primary hover:underline underline-offset-4 cursor-default mb-1">
        {project.title}
      </h3>
      <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3 flex-grow leading-relaxed line-clamp-3">
        {project.description}
      </p>

      {/* Tech pills */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        {project.tech.slice(0, 4).map((techName) => (
          <div
            key={techName}
            className="flex items-center gap-1 rounded-full border border-border bg-[hsl(var(--muted))] px-2 py-0.5"
          >
            <IconRenderer name={techName} className="h-3 w-3" />
            <span className="text-[10px] text-[hsl(var(--muted-foreground))] capitalize">
              {techName.replace(/js/g, ".js")}
            </span>
          </div>
        ))}
        {project.tech.length > 4 && (
          <span className="text-[10px] text-[hsl(var(--muted-foreground))]">
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      {/* Status & Action row */}
      <div className="flex items-center gap-2.5 pt-3 border-t border-border">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {project.isCollaboration ? (
                <Users className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
              ) : (
                <User className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{project.isCollaboration ? "Collaborative" : "Solo"}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              {project.private ? (
                <Lock className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
              ) : (
                <Unlock className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{project.private ? "Private" : "Public"}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              {project.isCompleted ? (
                <CheckCircle className="h-3.5 w-3.5 text-[hsl(var(--gh-green))]" />
              ) : (
                <Clock className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{project.isCompleted ? "Completed" : "In Progress"}</p>
            </TooltipContent>
          </Tooltip>

          <div className="flex-grow" />

          {project.gallery.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-primary">
                  <Eye className="h-3.5 w-3.5" />
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
          )}

          {project.github && (
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-primary"
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>GitHub</p>
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
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Live Demo</p>
              </TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      </div>
    </div>
  </div>
);

export default function WorkSection({ id }: WorkSectionProps) {
  const { data: projects, isLoading, error } = useProjects();

  return (
    <section id={id}>
      <div className="flex items-center gap-2 mb-4">
        <Pin className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
        <h2 className="text-base font-semibold text-foreground">
          Pinned Repositories
        </h2>
      </div>

      {error && (
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          Could not load projects.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {isLoading
          ? [1, 2, 3, 4].map((i) => <ProjectCardSkeleton key={i} />)
          : (projects ?? []).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
      </div>
    </section>
  );
}
