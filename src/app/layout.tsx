import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";

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
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body text-foreground antialiased"
        )}
      >
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
