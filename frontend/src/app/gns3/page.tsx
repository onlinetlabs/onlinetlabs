// 'use client';

import { BookOpenIcon } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/accordion"
import { Card } from "@ui/card"

import { ActiveCard } from "./components/active-card"

const data = [
  {
    id: 1,
    name: "Report name",
    description: "Description",
    href: "#",
  },
  {
    id: 2,
    name: "Report name",
    description: "Description",
    href: "#",
  },
  {
    id: 3,
    name: "Report name",
    description: "Description",
    href: "#",
  },
  {
    id: 4,
    name: "Report name",
    description: "Description",
    href: "#",
  },
  {
    id: 5,
    name: "Report name",
    description: "Description",
    href: "#",
  },
  {
    id: 6,
    name: "Report name",
    description: "Description",
    href: "#",
  },
]

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

export default function IndexPage() {
  return (
    <>
      <div className="bg-muted p-4 sm:p-6 lg:p-8">
        <div>
          <h1 className="text-foreground text-lg font-semibold">
            Лабораторные работы
          </h1>
          <p className="text-muted-foreground text-sm">
            Просматривайте и управляйте своими лабораторными работами
          </p>
          <div className="mt-8 flex w-full flex-col gap-y-4 md:max-w-3xl md:flex-row md:items-stretch md:space-x-4">
            <ActiveCard />
            <Card className="relative w-full p-6 md:w-7/12">
              <div className="border-border inline-flex items-center justify-center rounded-md border p-2">
                <BookOpenIcon
                  className="text-foreground size-5"
                  aria-hidden={true}
                />
              </div>
              <h3 className="mt-4 text-sm font-medium">
                <a href="#" className="focus:outline-none">
                  {/* Extend link to entire card */}
                  <span className="absolute inset-0" aria-hidden={true} />
                  Полезная информация
                </a>
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
              </p>
            </Card>
          </div>
        </div>
      </div>
      <div>
        <div className="p-4 sm:p-6 lg:p-8">
          <main>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Ваши работы</h2>
            </div>
            <Accordion type="multiple" className="mt-6">
              <AccordionItem
                value="recent"
                className="border-border overflow-hidden rounded-md border px-4"
              >
                <AccordionTrigger className="text-foreground cursor-pointer text-sm font-medium hover:no-underline">
                  Последние (3)
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-4 pb-1 sm:grid-cols-2 lg:grid-cols-3">
                    {data.slice(0, 3).map((item) => (
                      <Card key={item.id} className="relative p-2">
                        <div className="h-20">
                          <ContentPlaceholder />
                        </div>
                        <h3 className="mt-2 font-medium">
                          <a href={item.href} className="focus:outline-none">
                            {/* Extend link to entire card */}
                            <span
                              className="absolute inset-0"
                              aria-hidden={true}
                            />
                            {item.name}
                          </a>
                        </h3>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="all"
                className="border-border mt-6 overflow-hidden rounded-md border px-4"
              >
                <AccordionTrigger className="text-foreground cursor-pointer text-sm font-medium hover:no-underline">
                  Все (6)
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-4 pb-1 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((item) => (
                      <Card key={item.id} className="relative p-2">
                        <div className="h-20">
                          <ContentPlaceholder />
                        </div>
                        <h3 className="mt-2 text-sm font-medium">
                          <a href={item.href} className="focus:outline-none">
                            {/* Extend link to entire card */}
                            <span
                              className="absolute inset-0"
                              aria-hidden={true}
                            />
                            {item.name}
                          </a>
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {item.description}
                        </p>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </main>
        </div>
      </div>
    </>
  )
}
