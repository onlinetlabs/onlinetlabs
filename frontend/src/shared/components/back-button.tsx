"use client"

import { useRouter } from "next/navigation"

import { Button, ButtonProps } from "@ui/button"

export const BackButton = ({ onClick, ...props }: Props) => {
  const router = useRouter()

  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (onClick) onClick(e)
    router.back()
  }

  return <Button onClick={handleOnClick} {...props} />
}

type Props = ButtonProps
