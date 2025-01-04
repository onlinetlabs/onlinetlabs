import { Card, CardContent, CardFooter, CardHeader } from "@ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

export const Chapter = ({ title, description, slug }: ChapterProps) => {
  return (
    <div className="relative flex flex-col md:flex-row gap-3 p-4 border hover:bg-accent rounded-xl">
      <div className="flex-grow">
        <h2 className="text-md md:text-base">{title}</h2>
        <p className="text-xs md:text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col flex-shrink-0 justify-end gap-1 w-56 md:w-72">
        <div className="flex items-center gap-1">
          <Check className="h-3 w-3" />
          <span className="text-xs md:text-sm">55%</span>
          
        </div>
        <div className="inline-block h-1 align-middle rounded-sm bg-primary/15">
          <div className="w-[55%] min-w-1 h-full rounded-sm bg-chart-1" />
        </div>
      </div>
      <Link href={slug} className="absolute inset-0" />
    </div>
  )
}

type ChapterProps = {
  title: string;
  description?: string;
  slug: string;
}