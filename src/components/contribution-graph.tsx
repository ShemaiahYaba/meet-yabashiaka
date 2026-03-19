"use client";

import { useMemo } from "react";
import type { ContributionDay } from "@/hooks/useStats";

interface ContributionGraphProps {
  data: ContributionDay[];
  totalContributions: number;
}

const DAYS_OF_WEEK = ["", "Mon", "", "Wed", "", "Fri", ""];
const WEEK_COUNT = 53;

function getColor(count: number): string {
  if (count === 0) return "hsl(215 14% 17%)"; // --muted
  if (count <= 3) return "#0e4429";
  if (count <= 6) return "#006d32";
  if (count <= 9) return "#26a641";
  return "#39d353";
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function ContributionGraph({ data, totalContributions }: ContributionGraphProps) {
  const grid = useMemo(() => {
    // Build a map of date -> count
    const map = new Map<string, number>();
    for (const d of data) map.set(d.date, d.count);

    // Figure out the starting Sunday for the grid
    const today = new Date();
    const endSunday = new Date(today);
    endSunday.setDate(today.getDate() + (6 - today.getDay())); // end of current week

    const startDate = new Date(endSunday);
    startDate.setDate(endSunday.getDate() - (WEEK_COUNT * 7 - 1));

    // Build weeks array: each week is 7 days (Sun → Sat)
    const weeks: { date: string; count: number }[][] = [];
    let current = new Date(startDate);

    for (let w = 0; w < WEEK_COUNT; w++) {
      const week: { date: string; count: number }[] = [];
      for (let d = 0; d < 7; d++) {
        const iso = current.toISOString().slice(0, 10);
        const isFuture = current > today;
        week.push({ date: iso, count: isFuture ? -1 : (map.get(iso) ?? 0) });
        current.setDate(current.getDate() + 1);
      }
      weeks.push(week);
    }

    // Month labels: track which column each month starts at
    const months: { label: string; col: number }[] = [];
    for (let w = 0; w < weeks.length; w++) {
      const firstDay = weeks[w][0];
      if (firstDay && firstDay.count !== -1) {
        const d = new Date(firstDay.date + "T00:00:00");
        if (d.getDate() <= 7) {
          const label = d.toLocaleDateString("en-US", { month: "short" });
          if (months.length === 0 || months[months.length - 1].label !== label) {
            months.push({ label, col: w });
          }
        }
      }
    }

    return { weeks, months };
  }, [data]);

  return (
    <div className="rounded-md border border-border bg-[hsl(var(--card))] p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-foreground">
          {totalContributions.toLocaleString()} contributions in the last year
        </span>
        <div className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))]">
          <span>Less</span>
          {[0, 3, 6, 9, 12].map((n) => (
            <div
              key={n}
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: getColor(n) }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div style={{ display: "grid", gridTemplateColumns: `14px repeat(${WEEK_COUNT}, 1fr)`, gap: "3px", minWidth: "660px" }}>
          {/* Month labels row */}
          <div /> {/* spacer for day labels column */}
          {grid.months.map((m, i) => {
            const nextCol = grid.months[i + 1]?.col ?? WEEK_COUNT;
            const span = nextCol - m.col;
            return (
              <div
                key={`${m.label}-${m.col}`}
                style={{ gridColumn: `span ${span}`, gridRow: 1 }}
                className="text-[10px] text-[hsl(var(--muted-foreground))]"
              >
                {m.label}
              </div>
            );
          })}

          {/* Day labels + cells */}
          {DAYS_OF_WEEK.map((label, dayIdx) => (
            <>
              <div
                key={`label-${dayIdx}`}
                className="text-[10px] text-[hsl(var(--muted-foreground))] flex items-center justify-end pr-1 leading-none"
                style={{ height: "12px" }}
              >
                {label}
              </div>
              {grid.weeks.map((week, weekIdx) => {
                const cell = week[dayIdx];
                if (!cell) return <div key={`empty-${weekIdx}`} style={{ height: "12px" }} />;
                const isFuture = cell.count === -1;
                return (
                  <div
                    key={`${weekIdx}-${dayIdx}`}
                    title={isFuture ? "" : `${cell.count} contribution${cell.count !== 1 ? "s" : ""} on ${formatDate(cell.date)}`}
                    className="rounded-sm"
                    style={{
                      height: "12px",
                      backgroundColor: isFuture ? "transparent" : getColor(cell.count),
                      cursor: isFuture ? "default" : "default",
                    }}
                  />
                );
              })}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
