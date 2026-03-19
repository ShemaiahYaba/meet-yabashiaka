"use client";

import { useStats } from "@/hooks/useStats";
import ContributionGraph from "./contribution-graph";

export default function ContributionGraphSection() {
  const { data: stats } = useStats();

  if (!stats?.contributionGraph?.length) return null;

  return (
    <div className="container mx-auto px-4 md:px-6 pb-6">
      <ContributionGraph
        data={stats.contributionGraph}
        totalContributions={stats.githubCommits}
      />
    </div>
  );
}
