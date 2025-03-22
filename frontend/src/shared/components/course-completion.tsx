import { BookCheckIcon, BookOpenIcon, CheckIcon } from "lucide-react"

import { Circle } from "@ui/circle"

const DEFAULT_TITLES = {
  start: "Готовы начать?",
  end: "Вы прошли курс!",
  default: "Вы завершили главу",
} as const

const DEFAULT_DESCRIPTIONS = {
  start:
    "Теперь, когда вы познакомились с курсом, давайте приступим к его изучению.",
  end: "Теперь, когда вы завершили последнюю главу, вы можете перейти к следующим курсам.",
  default: "",
} as const

export const CourseCompletion = ({
  number = 0,
  type = "default",
  ...props
}: Props) => {
  const title = props.title || DEFAULT_TITLES[type]
  const description = props.description || DEFAULT_DESCRIPTIONS[type]

  return (
    <>
      <div
        aria-hidden="true"
        className="mx-auto h-32 w-[1px] bg-linear-to-t from-ds-blue-300 md:h-48"
      ></div>
      <Circle
        aria-hidden="true"
        variant="subtle-blue"
        className="mx-auto relative h-24 w-24 text-[48px] font-semibold md:h-32 md:w-32 md:text-[72px]"
      >
        {type === "start" && <BookOpenIcon className="h-16 w-16" />}
        {type === "end" && <BookCheckIcon className="h-16 w-16" />}
        {type === "default" && <>{number}</>}
        {type !== "start" && (
          <Circle
            variant="blue"
            className="border-background absolute bottom-0 right-0 h-8 w-8 translate-x-[6px] translate-y-[6px] border-[3px] md:h-10 md:w-10"
          >
            <CheckIcon className="h-5 w-5" />
          </Circle>
        )}
      </Circle>
      <h2 className="text-base text-primary text-center pt-8 pb-2">
        {title} {type === "default" && <>{number}</>}
      </h2>
      {description && (
        <p className="text-base text-muted-foreground text-center">
          {description}
        </p>
      )}
    </>
  )
}

type Props = {
  title?: string
  description?: string
  number?: number
  type?: "start" | "end" | "default"
}
