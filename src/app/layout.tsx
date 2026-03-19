import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import Providers from "@/app/providers";

export const metadata: Metadata = {
  title: "Shemaiah's Digital Canvas",
  description: "The personal portfolio of Shemaiah, a passionate developer.",
  keywords: [
    "full-stack developer",
    "backend developer",
    "frontend developer",
    "music producer",
    "portfolio",
    "react",
    "nextjs",
    "typescript",
  ],
  icons: {
    icon: "/Mspace.svg",
    shortcut: "/Mspace.svg",
    apple: "/Mspace.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark !scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-body text-foreground antialiased",
        )}
      >
        <Providers>
          {children}
          <Analytics />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
