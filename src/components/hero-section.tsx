
import { AnimatedStatCard } from './animated-stat-card';

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

const SubtlePattern = () => (
    <div className="absolute inset-0 z-0 overflow-hidden">
        <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="subtle-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#subtle-grid)">
            <animate attributeName="x" from="0" to="32" dur="10s" repeatCount="indefinite" />
            <animate attributeName="y" from="0" to="32" dur="10s" repeatCount="indefinite" />
          </rect>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
      </div>
);

export default function HeroSection({ name, hebrewName, tagline, stats }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      <SubtlePattern />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4">
            <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl">
              {name}
            </h1>
            <p className="font-code text-lg text-muted-foreground">{hebrewName}</p>
          </div>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            {tagline}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat) => (
            <AnimatedStatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
