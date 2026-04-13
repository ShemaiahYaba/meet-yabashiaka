"use client";

import { useMemo } from "react";
import type { ContributionDay } from "@/hooks/useStats";

interface ContributionGraphProps {
  data: ContributionDay[];
  totalContributions: number;
}

const CELL = 10; // px
const GAP = 3; // px between cells
const STEP = CELL + GAP; // 13px per cell slot
const DAY_LABEL_W = 28; // px reserved for Mon/Wed/Fri labels
const MONTH_ROW_H = 16; // px for month labels above the grid

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

// GitHub light-mode green scale
function getColor(count: number): string {
  if (count === 0) return "#ebedf0";
  if (count <= 3) return "#9be9a8";
  if (count <= 6) return "#40c463";
  if (count <= 9) return "#30a14e";
  return "#216e39";
}

function toIso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const LEGEND = [0, 2, 5, 8, 12];

export default function ContributionGraph({
  data,
  totalContributions,
}: ContributionGraphProps) {
  const { weeks, months } = useMemo(() => {
    const map = new Map<string, number>(data.map((d) => [d.date, d.count]));
    const today = new Date();

    // End on the last day of the current week (Saturday)
    const end = new Date(today);
    end.setDate(today.getDate() + (6 - today.getDay()));

    // Go back 52 full weeks from end (52 weeks = 364 days) → start on a Sunday
    const start = new Date(end);
    start.setDate(end.getDate() - 52 * 7 + 1);

    const weeks: { date: string; count: number; future: boolean }[][] = [];
    let cur = new Date(start);

    while (cur <= end) {
      const week: { date: string; count: number; future: boolean }[] = [];
      for (let d = 0; d < 7; d++) {
        const iso = toIso(cur);
        week.push({ date: iso, count: map.get(iso) ?? 0, future: cur > today });
        cur.setDate(cur.getDate() + 1);
      }
      weeks.push(week);
    }

    // Month labels: emit whenever the 1st of a month appears in column 0 (Sunday) of a week
    const months: { label: string; col: number }[] = [];
    weeks.forEach((week, wi) => {
      const sun = new Date(week[0].date + "T00:00:00");
      if (sun.getDate() <= 7) {
        const label = sun.toLocaleDateString("en-US", { month: "short" });
        if (!months.length || months[months.length - 1].label !== label) {
          months.push({ label, col: wi });
        }
      }
    });

    return { weeks, months };
  }, [data]);

  const gridW = weeks.length * STEP - GAP;
  const gridH = 7 * STEP - GAP;
  const totalW = DAY_LABEL_W + gridW;
  const totalH = MONTH_ROW_H + gridH;

  return (
    <div className="rounded-md border border-border/60 bg-card p-4 shadow-sm">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-foreground">
          {totalContributions.toLocaleString()} contributions in the last year
        </span>
        <div className="flex items-center gap-1 text-[11px] text-[hsl(var(--muted-foreground))]">
          <span>Less</span>
          {LEGEND.map((n) => (
            <div
              key={n}
              style={{
                width: CELL,
                height: CELL,
                backgroundColor: getColor(n),
                borderRadius: 2,
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Graph */}
      <div style={{ overflowX: "auto" }}>
        <svg
          width={totalW}
          height={totalH}
          style={{ display: "block" }}
          aria-label="Contribution graph"
        >
          {/* Month labels */}
          {months.map((m, i) => (
            <text
              key={`m-${i}`}
              x={DAY_LABEL_W + m.col * STEP}
              y={MONTH_ROW_H - 4}
              fontSize={10}
              fill="hsl(210 9% 44%)"
              fontFamily="inherit"
            >
              {m.label}
            </text>
          ))}

          {/* Day-of-week labels */}
          {DAY_LABELS.map((label, di) =>
            label ? (
              <text
                key={`d-${di}`}
                x={DAY_LABEL_W - 4}
                y={MONTH_ROW_H + di * STEP + CELL - 1}
                fontSize={10}
                fill="hsl(210 9% 44%)"
                textAnchor="end"
                fontFamily="inherit"
              >
                {label}
              </text>
            ) : null,
          )}

          {/* Cells */}
          {weeks.map((week, wi) =>
            week.map((day, di) => (
              <rect
                key={`${wi}-${di}`}
                x={DAY_LABEL_W + wi * STEP}
                y={MONTH_ROW_H + di * STEP}
                width={CELL}
                height={CELL}
                rx={2}
                ry={2}
                fill={day.future ? "#ebedf0" : getColor(day.count)}
                opacity={day.future ? 0.3 : 1}
              >
                {!day.future && (
                  <title>
                    {day.count} contribution{day.count !== 1 ? "s" : ""} on{" "}
                    {formatDate(day.date)}
                  </title>
                )}
              </rect>
            )),
          )}
        </svg>
      </div>
    </div>
  );
}
