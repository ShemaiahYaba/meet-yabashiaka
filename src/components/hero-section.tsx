"use client";

import { useState, useEffect } from "react";
import { useStats } from "@/hooks/useStats";

interface HeroSectionProps {
  name: string;
  hebrewName: string;
  tagline: string;
  yearsOfCoding: number;
}

export default function HeroSection({
  name,
  hebrewName,
  tagline,
  yearsOfCoding,
}: HeroSectionProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const { data: dynamicStats } = useStats();

  const statsObj = {
    years_of_coding: yearsOfCoding,
    solo_projects_completed: dynamicStats?.soloProjects ?? "...",
    collaborations: dynamicStats?.collaborations ?? "...",
    github_commits: dynamicStats?.githubCommits ?? "...",
  };

  const terminalLines = [
    { type: "command" as const, text: "$ whoami" },
    { type: "output" as const, text: `${name} (${hebrewName})` },
    { type: "output" as const, text: `> ${tagline}` },
    { type: "blank" as const, text: "" },
    { type: "command" as const, text: "$ cat stats.json" },
    { type: "json" as const, text: JSON.stringify(statsObj, null, 2) },
  ];

  useEffect(() => {
    if (visibleLines < terminalLines.length) {
      const delay = visibleLines === 0 ? 400 : visibleLines === 4 ? 600 : 300;
      const timer = setTimeout(() => setVisibleLines((v) => v + 1), delay);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, terminalLines.length]);

  useEffect(() => {
    const timer = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-md border border-border bg-[hsl(var(--card))]">
            {/* Title Bar */}
            <div className="flex items-center gap-2 border-b border-border bg-[hsl(var(--muted))] px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <div className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="ml-2 font-code text-xs text-[hsl(var(--muted-foreground))]">
                shemaiah@dev ~{" "}
              </span>
            </div>
            {/* Terminal Content */}
            <div className="p-5 md:p-6 font-code text-sm leading-relaxed">
              {terminalLines.slice(0, visibleLines).map((line, i) => (
                <div
                  key={i}
                  className={`${line.type === "blank" ? "h-4" : "mb-1"}`}
                >
                  {line.type === "command" && (
                    <span className="text-[hsl(var(--gh-green))]">
                      {line.text}
                    </span>
                  )}
                  {line.type === "output" && (
                    <span className="text-foreground">{line.text}</span>
                  )}
                  {line.type === "json" && (
                    <pre className="text-primary whitespace-pre">
                      {line.text}
                    </pre>
                  )}
                </div>
              ))}
              <span
                className={`inline-block w-2 h-4 bg-[hsl(var(--gh-green))] align-middle ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
