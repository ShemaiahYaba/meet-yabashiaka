"use client";

import { Button } from "@/components/ui/button";
import { Download, GraduationCap, Award, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import type { SocialLink } from "@/data/portfolio-data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconRenderer } from "./icon-renderer";
import { useStats } from "@/hooks/useStats";

interface Education {
  degree: string;
  university: string;
}

interface Certification {
  name: string;
  issuer: string;
  defaultImage: string;
}

interface ProfileSidebarProps {
  bio: string;
  education: Education;
  certifications: Certification[];
  yearsOfCoding: number;
  socialLinks: SocialLink[];
  resumeUrl: string;
}

export default function ProfileSidebar({
  bio,
  education,
  certifications,
  yearsOfCoding,
  socialLinks,
  resumeUrl,
}: ProfileSidebarProps) {
  const { data: dynamicStats } = useStats();

  const stats = [
    { label: "Years of Coding", value: yearsOfCoding },
    {
      label: "Solo Projects Completed",
      value: dynamicStats?.soloProjects ?? "—",
    },
    { label: "Collaborations", value: dynamicStats?.collaborations ?? "—" },
    { label: "GitHub Commits", value: dynamicStats?.githubCommits ?? "—" },
  ];
  return (
    <aside className="space-y-6">
      {/* Bio */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-2">About</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
          {bio}
        </p>
      </div>

      {/* Stats */}
      <div className="space-y-2">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <span className="text-sm text-[hsl(var(--muted-foreground))]">
              {stat.label}
            </span>
            <span className="font-code text-sm font-semibold text-foreground">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-border/60" />

      {/* Education */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <h3 className="text-sm font-semibold text-foreground">Education</h3>
        </div>
        <p className="text-sm text-foreground">{education.degree}</p>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          {education.university}
        </p>
      </div>

      {/* Certifications */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Award className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <h3 className="text-sm font-semibold text-foreground">
            Certifications
          </h3>
        </div>
        {certifications.map((cert) => {
          const imageSrc = cert.defaultImage || null;
          return (
            <div
              key={cert.name}
              className="flex items-center justify-between mb-2"
            >
              <div>
                <p className="text-sm text-foreground">{cert.name}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  {cert.issuer}
                </p>
              </div>
              {imageSrc && (
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-primary">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View Certificate</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl p-0 border border-border bg-[hsl(var(--card))]">
                    <DialogTitle className="sr-only">
                      {cert.name} certificate
                    </DialogTitle>
                    <div className="relative aspect-video">
                      <Image
                        src={imageSrc}
                        alt={`Certificate for ${cert.name}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-border/60" />

      {/* Social Links */}
      <div className="flex items-center gap-3 flex-wrap">
        <TooltipProvider>
          {socialLinks.map((link) => (
            <Tooltip key={link.name}>
              <TooltipTrigger asChild>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-foreground"
                >
                  <IconRenderer
                    name={link.icon}
                    className="h-[18px] w-[18px]"
                  />
                  <span className="sr-only">{link.name}</span>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>

      {/* Resume download */}
      <Button
        asChild
        variant="outline"
        size="sm"
        className="w-full border-border/60 shadow-sm text-foreground hover:bg-[hsl(var(--muted))] hover:border-[hsl(var(--muted-foreground))]"
      >
        <a href={resumeUrl} download>
          <Download className="mr-2 h-4 w-4" />
          Download Resume
        </a>
      </Button>
    </aside>
  );
}
