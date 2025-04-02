import { labEntity } from "@entities/lab"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/accordion"
import { Card } from "@ui/card";
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

export async function Projects() {
  const projects = await labEntity.getUserProjects();

  return (
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
            {projects.slice(0, 3).map((item) => (
              <Card key={item.projectId} className="relative p-2">
                <div className="h-20">
                  <ContentPlaceholder />
                </div>
                <h3 className="mt-2 font-medium">
                  <Link href={`/gns3/${item.projectId}`} className="focus:outline-none">
                    <span
                      className="absolute inset-0"
                      aria-hidden={true}
                    />
                    {item.labId}
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
        className="border-border mt-6 overflow-hidden rounded-md border px-4"
      >
        <AccordionTrigger className="text-foreground cursor-pointer text-sm font-medium hover:no-underline">
          Все ({projects.length})
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 gap-4 pb-1 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((item) => (
              <Card key={item.projectId} className="relative p-2">
                <div className="h-20">
                  <ContentPlaceholder />
                </div>
                <h3 className="mt-2 text-sm font-medium">
                  <Link href={`/gns3/${item.projectId}`} className="focus:outline-none">
                    <span
                      className="absolute inset-0"
                      aria-hidden={true}
                    />
                    {item.labId}
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