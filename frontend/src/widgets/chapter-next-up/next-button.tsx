"use client"

import { useEffect, useState } from "react"

import { Button, ButtonProps } from "@ui/button"

export const NextButton = ({
  namespace,
  sortOrder,
  ...props
}: React.PropsWithChildren<Props>) => {
  const lsKey = `${namespace}-completion`

  // +1 because the intro chapter is not included in the total
  const nextSortOrder = sortOrder + 1

  const [sortOrderArray, setSortOrderArray] = useState<number[]>([])

  useEffect(() => {
    const storedArray = localStorage.getItem(lsKey)
    if (storedArray) {
      setSortOrderArray(JSON.parse(storedArray))
    }
  }, [lsKey])

  const handleClick = () => {
    if (!sortOrderArray.includes(nextSortOrder)) {
      const updatedArray = [...sortOrderArray, nextSortOrder]
      setSortOrderArray(updatedArray)
      localStorage.setItem(lsKey, JSON.stringify(updatedArray))
    }
  }

  return (
    <Button
      className="w-full md:w-fit gap-2"
      onClick={handleClick}
      {...props}
    />
  )
}

type Props = ButtonProps & {
  namespace: string
  sortOrder: number
}
