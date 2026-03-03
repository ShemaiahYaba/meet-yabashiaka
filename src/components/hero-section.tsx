import { AnimatedStatCard } from "./animated-stat-card";
import Link from "next/link";

interface Stat {
  value: number;
  label: string;
}

interface HeroSectionProps {
  name: string;
  hebrewName: string;
  tagline: string;
  stats: Stat[];
}

const GitHubDotGrid = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="dot-grid"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="1"
            cy="1"
            r="0.8"
            fill="hsl(var(--border))"
            opacity="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-grid)" />
    </svg>
    {/* Radial glow effect — GitHub-style blue/purple gradient orb */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_hsl(212_92%_58%_/_0.12)_0%,_hsl(260_60%_50%_/_0.06)_40%,_transparent_70%)]" />
    <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background" />
  </div>
);

export default function HeroSection({
  name,
  hebrewName,
  tagline,
  stats,
}: HeroSectionProps) {
  const taglineParts = tagline.split("&");
  const developerPart = taglineParts[0] ? taglineParts[0].trim() + " &" : "";
  const producerPart = taglineParts[1] ? taglineParts[1].trim() : "";

  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      <GitHubDotGrid />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4">
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
              {name}
              <span className="text-primary">.</span>
            </h1>
            <p className="font-code text-base text-[hsl(var(--muted-foreground))] mt-2">
              {hebrewName}
            </p>
          </div>
          <p className="mx-auto max-w-2xl text-lg text-[hsl(var(--muted-foreground))] md:text-xl">
            {developerPart}{" "}
            {producerPart && (
              <Link
                href="/music"
                className="text-primary underline-offset-4 hover:underline"
              >
                {producerPart}
              </Link>
            )}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat) => (
            <AnimatedStatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
