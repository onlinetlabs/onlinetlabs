import { Badge } from "@ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@ui/card"
import { Circle } from "lucide-react"
import Link from "next/link"

export const Chapters = ({ data }: ChapterProps) => {
  return (
    <>
      {data.map((item, idx) => (
        <Card key={idx} className="relative flex flex-col h-56 shadow-sm transition-all hover:bg-accent">
          <CardHeader>
            <h2 className="text-xl font-bold">{item.title}</h2>
          </CardHeader>
          <CardContent className="flex-1">
            <p>{item.description}</p>
          </CardContent>
          <CardFooter>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <Badge>
                tag 1
              </Badge>
              <Badge variant='outline'>
                tag 2
              </Badge>
              <div className="flex items-center">
                <Circle className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                tag 1
              </div>
            </div>
          </CardFooter>
          <Link href={item.slug} className="absolute inset-0" />
        </Card>
      ))}
    </>
  )
}

type ChapterProps = {
  data: {
    title: string;
    description?: string;
    slug: string;
  }[];
}