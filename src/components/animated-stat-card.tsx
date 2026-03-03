"use client";

import { useState, useEffect, useRef } from "react";

interface AnimatedStatCardProps {
  value: number;
  label: string;
}

export function AnimatedStatCard({ value, label }: AnimatedStatCardProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const duration = 2000;
      const increment = end / (duration / 16); // ~60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <div ref={ref}>
      <div className="rounded-md border border-border bg-[hsl(var(--card))] p-6 text-center transition-colors hover:border-[hsl(var(--muted-foreground)_/_0.4)]">
        <p className="font-code text-4xl font-bold text-foreground">{count}</p>
        <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
          {label}
        </p>
      </div>
    </div>
  );
}
