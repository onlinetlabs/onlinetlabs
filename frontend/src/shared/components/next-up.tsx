import { Button } from "@ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@ui/card"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

export const NextUp = ({ title, description = "Далее", content, action, href = "#" }:Props) => {
  return (
    <Card className="mt-8 flex w-full mx-auto max-w-[640px] flex-col items-center justify-center gap-1 rounded-lg px-4 py-8 md:mt-12">
      <CardHeader className="p-0">
        <CardDescription className="text-sm text-center text-muted-foreground">{description}</CardDescription>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="max-w-[540px] pb-4 pt-3 md:pb-6">
        <p className="text-base text-muted-foreground">{content}</p>
      </CardContent>
      <CardFooter className="p-0 w-full justify-center">
        <Button className="w-full md:w-fit gap-2" asChild>
          <Link href={href}>
            {action}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

type Props = {
  title?: string;
  description?: string;
  content?: string;
  action?: string;
  href?: string;
}