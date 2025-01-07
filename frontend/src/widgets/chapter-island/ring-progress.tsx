"use client"

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import { ChartConfig, ChartContainer } from "@ui/chart"
import { cn } from "@lib/utils"

const chartConfig = {
  value: {
    label: "Value",
  },
  completion: {
    label: "Completion",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export const RingProgress = ({ value, className }: Props) => {
  const chartData = [
    { label: "completion", value: value, fill: "var(--color-completion)" },
  ];

  const endAngle = 90 - (value / 100) * 360;

  return (
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
  )
}

type Props = {
  value: number;
  className?: string;
}