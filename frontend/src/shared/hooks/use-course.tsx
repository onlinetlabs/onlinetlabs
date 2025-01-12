'use client'

import { navConfig } from "@shared/config/nav";
import { allChapters } from "contentlayer/generated"
import { useEffect, useState, useMemo } from "react"

export const useCourse = ({ namespace }: Props) => {
  const lsKey = `${namespace}-completion`;

  const [storedArray, setStoredArray] = useState<string | null>(null);
  
  useEffect(() => {
    const stored = localStorage.getItem(lsKey)
    setStoredArray(stored)
  }, [lsKey])

  const total = useMemo(() => {
    return allChapters.filter(
      (chapter) => chapter.namespace === namespace
    ).length
  }, [namespace])

  const completed = useMemo(() => {
      return storedArray ? JSON.parse(storedArray).length + 1 : 0;
    }, [storedArray])
    
  const percentage = useMemo(() => {
    return Math.round((completed / total) * 100)
  }, [completed, total]);

  const course = useMemo(() => {
    return navConfig.courses.items.find((course) => course.slug === namespace);
  }, [namespace]);

  return ({
    course,
    completed,
    total,
    percentage,
  })
}

type Props = {
  namespace: string;
}