
'use client';

import type { SocialLink } from '@/data/portfolio-data';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { IconRenderer } from './icon-renderer';

interface FooterProps {
  socialLinks: SocialLink[];
}

export default function Footer({ socialLinks }: FooterProps) {
  return (
    <footer className="bg-secondary border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row md:px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Shemaiah. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
        <TooltipProvider>
          {socialLinks.map((link) => (
              <Tooltip key={link.name}>
                <TooltipTrigger asChild>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconRenderer name={link.icon} className="h-5 w-5" />
                    <span className="sr-only">{link.name}</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{link.name}</p>
                </TooltipContent>
              </Tooltip>
             )
          )}
         </TooltipProvider>
        </div>
      </div>
    </footer>
  );
}
