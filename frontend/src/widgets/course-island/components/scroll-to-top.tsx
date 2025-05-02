"use client"

import { ArrowUpIcon } from "lucide-react"

import { Button } from "@ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip"

export const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            aria-label="Scroll to top"
            className="[&_svg]:size-5"
            onClick={scrollToTop}
          >
            <ArrowUpIcon className="text-muted-foreground" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="text-xs sm:text-sm">Наверх</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
