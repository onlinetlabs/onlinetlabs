import React from "react"
import clsx from "clsx"

const Label = ({
  children,
  animateRerendering,
  color,
}: {
  children: React.ReactNode
  animateRerendering?: boolean
  color?: "default" | "blue" | "red" | "amber" | "green"
}) => {
  return (
    <div
      className={clsx("rounded-full px-1.5 shadow-[0_0_1px_3px_black]", {
        "bg-muted-foreground text-gray-300": color === "default",
        "bg-blue-500 text-white": color === "blue",
        "bg-red-500 text-white": color === "red",
        "bg-amber-500 text-violet-100": color === "amber",
        "bg-green-500 text-white": color === "green",
        "animate-[highlight_1s_ease-in-out_1]": animateRerendering,
      })}
    >
      {children}
    </div>
  )
}
export const Boundary = ({
  children,
  labels = ["children"],
  size = "default",
  color = "default",
  animateRerendering = true,
}: {
  children: React.ReactNode
  labels?: string[]
  size?: "small" | "default"
  color?: "default" | "blue" | "red" | "amber" | "green"
  animateRerendering?: boolean
}) => {
  return (
    <div
      className={clsx("relative rounded-lg border border-dashed", {
        "p-3 lg:p-5": size === "small",
        "p-4 lg:p-9": size === "default",
        "border-gray-700": color === "default",
        "border-blue-500": color === "blue",
        "border-red-500": color === "red",
        "border-amber-500": color === "amber",
        "border-green-500": color === "green",
        "animate-[rerender_1s_ease-in-out_1] text-blue-500": animateRerendering,
      })}
    >
      <div
        className={clsx(
          "absolute -top-2.5 flex gap-x-1 text-[9px] uppercase leading-4 tracking-widest",
          {
            "left-3 lg:left-5": size === "small",
            "left-4 lg:left-9": size === "default",
          }
        )}
      >
        {labels.map((label) => {
          return (
            <Label
              key={label}
              color={color}
              animateRerendering={animateRerendering}
            >
              {label}
            </Label>
          )
        })}
      </div>

      {children}
    </div>
  )
}
