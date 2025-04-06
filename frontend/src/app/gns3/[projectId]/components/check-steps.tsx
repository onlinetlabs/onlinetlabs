import type { UserChecklog } from "@entities/lab";
import { cn } from "@lib/utils";
import { CheckIcon, XIcon } from "lucide-react";
import {
  Timeline,
  // TimelineContent,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@ui/timeline"

export function CheckSteps({ logs }: { logs: UserChecklog['checklog'] }) {
  return (
    <Timeline>
      {Object.entries(logs).map(([key, passed], idx) => (
        <TimelineItem
          key={idx}
          step={idx}
          className="group-data-[orientation=vertical]/timeline:ms-10 group-data-[orientation=vertical]/timeline:not-last:pb-4 has-[:not([data-completed])]:[&_[data-slot=timeline-separator]]:bg-ds-red-300 has-[+[data-completed]]:[&_[data-slot=timeline-separator]]:bg-ds-blue-400"
          {...(passed ? { "data-completed": true } : {})}
          //  has-[+[data-completed]]:[&_[data-slot=timeline-separator]]:bg-ds-blue-300
        >
          <TimelineHeader>
            <TimelineSeparator className={cn(
              "group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1rem)] group-data-[orientation=vertical]/timeline:translate-y-4",
            )} />
            <TimelineTitle className="-mt-0.5">{key}</TimelineTitle>
            <TimelineIndicator className={cn(
              "flex size-4 items-center justify-center group-data-[orientation=vertical]/timeline:-left-7",
              {
                "group-data-completed/timeline-item:bg-ds-blue-700 group-data-completed/timeline-item:text-background-100 border-none":
                  passed,
                "group-not-data-completed/timeline-item:bg-ds-red-700 group-not-data-completed/timeline-item:text-background-100 border-none":
                  !passed,
              }
            )}>
              <CheckIcon
                className="group-not-data-completed/timeline-item:hidden"
                size={12}
              />
              <XIcon
                className="group-data-completed/timeline-item:hidden"
                size={12}
              />
            </TimelineIndicator>
          </TimelineHeader>
          {/* <TimelineContent>Описание</TimelineContent> */}
        </TimelineItem>
      ))}
    </Timeline>
  );
}