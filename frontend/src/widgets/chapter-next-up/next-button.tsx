"use client"

import { Button, ButtonProps } from "@ui/button"

export const NextButton = ({
  namespace,
  sortOrder,
  ...props
}: React.PropsWithChildren<Props>) => {
  const lsKey = `${namespace}-completion`

  // +1 because the intro chapter is not included in the total
  const nextSortOrder = sortOrder + 1

  const handleClick = () => {
    let sortOrderArray = []
    const storedArray = localStorage.getItem(lsKey)

    if (storedArray) {
      sortOrderArray = JSON.parse(storedArray)
    }

    if (!sortOrderArray.includes(nextSortOrder)) {
      sortOrderArray.push(nextSortOrder)
      localStorage.setItem(lsKey, JSON.stringify(sortOrderArray))
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
