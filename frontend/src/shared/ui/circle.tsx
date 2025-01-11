import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@shared/lib/utils"

const circleVariants = cva(
  "inline-flex items-center rounded-full border border-ring/25 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        warning:
          "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",
        success:
          "border-transparent bg-success text-success-foreground hover:bg-success/80",
        outline: "text-foreground",
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
