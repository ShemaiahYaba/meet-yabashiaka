"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import type { SocialLink } from "@/data/portfolio-data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconRenderer } from "./icon-renderer";

interface HeaderProps {
  resumeUrl: string;
  socialLinks: SocialLink[];
}

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#work" },
  { name: "Music", href: "/music" },
  { name: "Contact", href: "#contact" },
];

export default function Header({ resumeUrl, socialLinks }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderSocialLinks = () => (
    <div className="flex items-center gap-3">
      <TooltipProvider>
        {socialLinks.map((link) => (
          <Tooltip key={link.name}>
            <TooltipTrigger asChild>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
              >
                <IconRenderer name={link.icon} className="h-[18px] w-[18px]" />
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
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${isScrolled ? "border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80" : "border-border bg-background"}`}
    >
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="text-lg font-semibold text-foreground hover:text-[hsl(var(--muted-foreground))] transition-colors"
        >
          Shemaiah<span className="text-primary">.</span>
        </Link>
        <nav className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          {renderSocialLinks()}
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-border text-foreground hover:bg-[hsl(var(--muted))] hover:border-[hsl(var(--muted-foreground))]"
          >
            <a href={resumeUrl} download>
              <Download className="mr-2 h-4 w-4" />
              Resume
            </a>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-[hsl(var(--muted))]"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] border-l border-border bg-[hsl(var(--card))]"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <Link
                    href="/"
                    className="text-lg font-semibold text-foreground"
                  >
                    Shemaiah<span className="text-primary">.</span>
                  </Link>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-[hsl(var(--muted-foreground))] hover:text-foreground"
                    >
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                </div>
                <nav className="mt-8 flex flex-col gap-5">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <Link
                        href={link.href}
                        className="text-base font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:text-foreground"
                      >
                        {link.name}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto space-y-6 pb-8">
                  <div className="flex items-center justify-center gap-6">
                    {renderSocialLinks()}
                  </div>
                  <Button
                    asChild
                    className="w-full bg-[hsl(var(--muted))] text-foreground hover:bg-[hsl(var(--border))] border border-border"
                  >
                    <a href={resumeUrl} download>
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
