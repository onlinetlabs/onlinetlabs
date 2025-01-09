"use client"

import {
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import { ChartConfig, ChartContainer } from "@ui/chart"
import { cn } from "@lib/utils"
import { allChapters } from "contentlayer/generated"

const chartConfig = {
  value: {
    label: "Value",
  },
  completion: {
    label: "Completion",
    color: "hsl(var(--ds-blue-700))",
  },
} satisfies ChartConfig

export const RingProgress = ({ namespace, className }: Props) => {
  const lsKey = `${namespace}-completion`;

  const storedArray = (localStorage.getItem(lsKey) || "[]");

  const total = allChapters.filter((chapter) => chapter.namespace === namespace).length;

  const completed = JSON.parse(storedArray).length;

  const percentage = Math.round((completed / total) * 100);

  const chartData = [
    { label: "completion", value: completed, fill: "var(--color-completion)" },
  ];

  const endAngle = 90 - (completed / total) * 360;  

  return (
    <>
      <div className="hidden md:flex flex-col ml-auto">
        <p className="text-sm text-muted-foreground text-right">{percentage}%</p>
        <p className="text-sm text-muted-foreground text-right">{completed}/{total} глав</p>
      </div>
      <ChartContainer
        config={chartConfig}
        className={cn("aspect-square", className)}
      >
        <RadialBarChart
          data={chartData}
          startAngle={90}
          endAngle={endAngle}
          innerRadius={14}
          outerRadius={26}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-muted last:fill-background"
            polarRadius={[16, 12]}
          />
          <RadialBar dataKey="value" background cornerRadius={10} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} />
        </RadialBarChart>
      </ChartContainer>
    </>
  )
}

type Props = {
  namespace: string;
  className?: string;
}