import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@shared/lib/utils"

const circleVariants = cva(
  "flex flex-shrink-0 justify-center items-center min-h-7 min-w-7 text-sm rounded-full",
  {
    variants: {
      variant: {
        default: "text-muted-foreground bg-muted",
        amber: "text-amber-900 bg-amber-300",
        red: "text-red-900 bg-red-300",
        green: "text-green-900 bg-green-300",
        blue: "text-background bg-blue-700",
        "subtle-blue": "text-blue-900 bg-blue-300",
        white: "bg-primary text-primary-foreground"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface CircleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof circleVariants> {}

function Circle({ className, variant, ...props }: CircleProps) {
  return (
    <div className={cn(circleVariants({ variant }), className)} {...props} />
  )
}

export { Circle, circleVariants }
