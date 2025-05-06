import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card"

import { NextButton } from "./components/next-button"

export const ChapterNextUp = ({
  title,
  description = "Далее",
  content,
  action,
  href = "#",
  namespace,
  sortOrder,
}: Props) => {
  return (
    <Card className="mx-auto mt-8 w-full max-w-[640px] gap-1 rounded-lg px-4 py-8 md:mt-12">
      <CardHeader className="p-0 items-center text-center">
        <CardDescription className="text-muted-foreground text-sm">
          {description}
        </CardDescription>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-3 pb-4 md:pb-6">
        <p className="text-muted-foreground text-center text-base max-w-[540px]">{content}</p>
      </CardContent>
      <CardFooter className="w-full justify-center p-0">
        {/* TODO: Make sortOrder required */}
        <NextButton
          namespace={namespace}
          sortOrder={sortOrder || 0}
          className="w-full gap-2 md:w-fit"
          asChild
        >
          <Link href={href}>
            {action}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </NextButton>
      </CardFooter>
    </Card>
  )
}

type Props = {
  title?: string
  description?: string
  content?: string
  action?: string
  href?: string
  namespace: string
  sortOrder?: number
}
