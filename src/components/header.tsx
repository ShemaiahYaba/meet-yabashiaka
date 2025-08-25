
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Download, Github, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import type { SocialLink } from '@/data/portfolio-data';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface HeaderProps {
  resumeUrl: string;
  socialLinks: SocialLink[];
}

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Work', href: '#work' },
  { name: 'Contact', href: '#contact' },
];

const socialIconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram: Instagram,
  Telegram: ({ className }) => <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.306.306 0 0 1 .133.325c-.14.693-1.01 4.54-1.252 5.617-.11.488-.328.62-.572.63-.44.02-1.002-.28-1.558-.57-1.112-.58-1.748-.94-2.822-1.52-1.328-.716-.684-1.03.224-1.635.488-.34 8.71-5.41 8.71-5.41s.294-.18.294-.488c0-.292-.293-.33-.293-.33s-9.14 5.71-9.14 5.71-1.02.6-1.02.6c-.34.2-.6.3-.9.3-.3 0-.6-.1-.9-.3-.3-.2-.6-.4-.9-.6-.3-.2-.6-.4-.9-.6s-.46-.38-.46-.38c-.3-.2-.4-.6-.2-1 .2-.4 1.8-6.9 1.8-6.9s.3-.9 1-1.2c.7-.3 1.5-.1 1.5-.1z"/></svg>,
  WhatsApp: ({ className }) => <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12.04 2.16C6.58 2.16 2.16 6.58 2.16 12.04c0 1.8.48 3.49 1.34 4.95L2.15 22l5.12-1.33c1.4.84 3.04 1.32 4.77 1.32h.01c5.46 0 9.88-4.42 9.88-9.88 0-5.46-4.42-9.88-9.88-9.88zM17.43 15.9c-.21.36-.83.69-1.13.73-.3.04-.69.04-1.06-.05-.36-.09-1.06-.39-2.02-1.34-1.25-1.21-2.08-2.7-2.31-3.14-.24-.44-.01-.69.2-1.01s.44-.51.65-.77c.21-.26.28-.44.2-.69s-.23-.62-.32-.83c-.09-.21-.18-.23-.28-.23s-.28-.02-.4-.02c-.12 0-.31.05-.47.23-.16.18-.6.58-.81 1.03-.21.44-.32.93-.32 1.45 0 .51.13.98.28 1.4s.58 1.25 1.33 2.01c.96.96 1.95 1.63 3.12 2.1.84.33 1.51.44 2.01.55.5.11 1.05.1 1.45-.08.4-.18.98-.53 1.18-.83.2-.3.2-.55.13-.73-.07-.18-.28-.28-.4-.36z"/></svg>,
};

export default function Header({ resumeUrl, socialLinks }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderSocialLinks = () => (
    <div className="flex items-center gap-4">
      <TooltipProvider>
        {socialLinks.map((link) => {
           const Icon = socialIconMap[link.name];
           if (!Icon) return null;
           return (
            <Tooltip key={link.name}>
              <TooltipTrigger asChild>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors duration-300 hover:text-[var(--social-color)]"
                  style={{ '--social-color': link.color } as React.CSSProperties}
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{link.name}</span>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.name}</p>
              </TooltipContent>
            </Tooltip>
           )
        })}
      </TooltipProvider>
    </div>
  );

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60' : 'bg-background'}`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-xl font-bold">
          Shemaiah<span className="text-primary">.</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          {renderSocialLinks()}
          <Button asChild variant="outline" size="sm">
            <a href={resumeUrl} download>
              <Download className="mr-2 h-4 w-4" />
              Resume
            </a>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link href="/" className="text-xl font-bold">
                    Shemaiah<span className="text-primary">.</span>
                  </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                     </Button>
                  </SheetClose>
                </div>
                <nav className="mt-8 flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.name}>
                        <Link href={link.href} className="text-lg font-medium text-foreground transition-colors hover:text-primary">
                        {link.name}
                        </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto space-y-6 pb-8">
                  <div className="flex items-center justify-center gap-6">
                     {renderSocialLinks()}
                  </div>
                  <Button asChild className="w-full">
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
