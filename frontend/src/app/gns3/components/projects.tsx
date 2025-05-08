'use client'

import { projectsOptions } from "@entities/lab"
import { getLabById } from "@lib/lab";
import { cn } from "@lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/accordion"
import { buttonVariants } from "@ui/button";
import { Card } from "@ui/card";
import { FlaskConicalIcon } from "lucide-react";
import Link from "next/link";

function ContentPlaceholder() {
  return (
    <div className="bg-muted/50 relative h-full overflow-hidden rounded">
      <svg
        className="stroke-muted-foreground/25 absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <pattern
            id="pattern-1"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
          </pattern>
        </defs>
        <rect
          stroke="none"
          fill="url(#pattern-1)"
          width="100%"
          height="100%"
        ></rect>
      </svg>
    </div>
  )
}

export function Projects() {
  const { data: labs } = useSuspenseQuery({
    ...projectsOptions,
    initialData: [],
    select: (projects) => {
      return projects
        .map((project) => {
          const lab = getLabById(project.labId);
          return lab ? { ...lab, ...project } : undefined;
        })
        .filter((lab) => lab !== undefined)
    }
  });

  if (!labs.length) {
    return (
      <div className="relative">
        <ul
          role="list"
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <li className="h-44 rounded-lg bg-ds-gray-100" />
          <li className="h-44 rounded-lg bg-ds-gray-100" />
          <li className="hidden h-44 rounded-lg bg-ds-gray-100 lg:block" />
          <li className="hidden h-44 rounded-lg bg-ds-gray-100 lg:block" />
          <li className="hidden h-44 rounded-lg bg-ds-gray-100 sm:block" />
          <li className="hidden h-44 rounded-lg bg-ds-gray-100 sm:block" />
        </ul>
        {/* Change dark:from-gray-950 in parent below according to your dark mode background */}
        <div className="absolute inset-x-0 bottom-0 flex h-32 flex-col items-center justify-center bg-gradient-to-t from-white to-transparent dark:from-gray-950">
          <p className="font-medium text-foreground">
            Нет лабораторных работ
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Запусти свою первую лабораторную работу
          </p>
          <Link
            href="/labs"
            className={cn("mt-6", buttonVariants())}
          >
            Лабораторные
            <FlaskConicalIcon className="-me-1 opacity-60" size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Accordion type="multiple" className="mt-6" defaultValue={["recent"]}>
      <AccordionItem
        value="recent"
        className="border-border overflow-hidden rounded-md border px-4"
      >
        <AccordionTrigger className="text-foreground cursor-pointer text-sm font-medium hover:no-underline">
          Последние (3)
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 gap-4 pb-1 sm:grid-cols-2 lg:grid-cols-3">
            {labs.slice(0, 3).map((item) => (
              <Card key={item.projectId} className="relative p-2 gap-2">
                <div className="h-20">
                  <ContentPlaceholder />
                </div>
                <h3 className="mt-2 font-medium">
                  <Link href={`/gns3/${item.projectId}`} className="focus:outline-none">
                    <span
                      className="absolute inset-0"
                      aria-hidden={true}
                    />
                    {item.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground">
                  {item.createdAt}
                </p>
              </Card>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="all"
        className="border-border mt-6 overflow-hidden rounded-md border px-4 last:border-b"
      >
        <AccordionTrigger className="text-foreground cursor-pointer text-sm font-medium hover:no-underline">
          Все ({labs.length})
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 gap-4 pb-1 sm:grid-cols-2 lg:grid-cols-3">
            {labs.map((item) => (
              <Card key={item.projectId} className="relative p-2 gap-2">
                <div className="h-20">
                  <ContentPlaceholder />
                </div>
                <h3 className="mt-2 text-sm font-medium">
                  <Link href={`/gns3/${item.projectId}`} className="focus:outline-none">
                    <span
                      className="absolute inset-0"
                      aria-hidden={true}
                    />
                    {item.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.createdAt}
                </p>
              </Card>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}