import { cn } from "@lib/utils"
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const Quiz = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-secondary/80 dark:bg-background mt-12 flex flex-col justify-center rounded-[16px] px-4 py-4 md:px-0 md:py-14",
      className
    )}
    {...props}
  />
))
Quiz.displayName = "Quiz"

const QuizHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-center", className)}
    {...props}
  />
))
QuizHeader.displayName = "QuizHeader"

const QuizTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-lg",
      className
    )}
    {...props}
  />
))
QuizTitle.displayName = "QuizTitle"

const QuizDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
QuizDescription.displayName = "QuizDescription"

const QuizContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("bg-background dark:bg-muted/25 border mx-auto mt-8 flex w-full max-w-[640px] flex-col items-center rounded-lg p-4 shadow-md md:p-8", className)} {...props} />
))
QuizContent.displayName = "QuizContent"

const QuizOptions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("border group mt-4 w-full rounded-lg md:mt-6", className)} {...props} />
))
QuizOptions.displayName = "QuizOptions"

const quizOptionVariants = cva("flex w-full items-center gap-3 border-b p-3 text-left text-sm transition-colors first-of-type:rounded-t-lg last-of-type:rounded-b-lg last-of-type:border-none md:p-4 md:text-base", {
  variants: {
    selected: {
      true: "bg-background text-foreground dark:bg-muted/25 [&_[quiz-icon]]:bg-chart-1 [&_[quiz-icon]]:text-white",
      false: "bg-secondary/80 dark:bg-background text-muted-foreground hover:bg-background dark:hover:bg-muted/25 [&_[quiz-icon]]:bg-chart-5 [&_[quiz-icon]]:text-chart-1"
    }
  },
  defaultVariants: {
    selected: false
  }
})

const QuizOption = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement> & VariantProps<typeof quizOptionVariants>
>(({ className, selected, ...props }, ref) => (
  <button ref={ref} className={cn(quizOptionVariants({ selected }), className)} {...props} />
))
QuizOption.displayName = "QuizOption";

const QuizOptionIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} quiz-icon="" className={cn("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-medium transition-colors", className)} {...props} />
))
QuizOptionIcon.displayName = "QuizOptionIcon";

const QuizFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-4 flex w-full justify-end md:mt-6", className)}
    {...props}
  />
))
QuizFooter.displayName = "QuizFooter"

const QuizHero = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col items-center", className)}
    {...props}
  />
)
QuizHero.displayName = "QuizHero"

const QuizHeroIcon = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mb-4 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-chart-1", className)}
    {...props}
  />
)
QuizHeroIcon.displayName = "QuizHeroIcon"

const QuizHeroTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn("text-base", className)}
    {...props}
  />
)
QuizHeroTitle.displayName = "QuizHeroTitle"

const QuizHeroDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("md:max-w-auto w-[200px] text-center md:w-auto", className)}
    {...props}
  />
)
QuizHeroDescription.displayName = "QuizHeroDescription"

export { Quiz, QuizHero, QuizHeroIcon, QuizHeroTitle, QuizHeroDescription, QuizHeader, QuizTitle, QuizDescription, QuizContent, QuizOptions as QuizOptions, QuizOption, QuizOptionIcon, QuizFooter }