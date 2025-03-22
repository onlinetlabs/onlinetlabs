"use client"

import { useEffect, useMemo, useState } from "react"
import { allCourses } from "contentlayer/generated"

export const useCourse = ({ namespace }: Props) => {
  const lsKey = `${namespace}-completion`

  const [storedArray, setStoredArray] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(lsKey)
    setStoredArray(stored)
  }, [lsKey])

  const total = useMemo(() => {
    return allCourses.filter((course) => course.namespace === namespace)
      .length
  }, [namespace])

  const completed = useMemo(() => {
    return storedArray ? JSON.parse(storedArray).length + 1 : 0
  }, [storedArray])

  const percentage = useMemo(() => {
    return Math.round((completed / total) * 100)
  }, [completed, total])

  const course = useMemo(() => {
    return allCourses.filter(page => page.isEntryPage).find((course) => course.slug === namespace)
  }, [namespace])

  return {
    course,
    completed,
    total,
    percentage,
  }
}

type Props = {
  namespace: string
}
