"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { allCourses, allLabs } from "contentlayer/generated"
import { File, FlaskConical, Laptop, Moon, Search, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@ui/command"
import { DialogProps } from "@ui/dialog"

export function CommandMenu(props: DialogProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="ghost"
        className="bg-muted/50 hidden h-fit items-center gap-1 px-2 py-1 sm:inline-flex"
        onClick={() => setOpen(true)}
        {...props}
      >
        <Search className="text-muted-foreground -ml-0.5 size-3.5!" />
        <kbd className="text-muted-foreground hidden font-sans text-xs/4 [.os-macos_&]:block">
          ⌘K
        </kbd>
        <kbd className="text-muted-foreground hidden font-sans text-xs/4 not-[.os-macos_&]:block">
          Ctrl&nbsp;K
        </kbd>
      </Button>
      <button
        className="inline-grid size-7 place-items-center rounded-md sm:hidden"
        onClick={() => setOpen(true)}
        {...props}
      >
        <Search className="size-4" />
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Найти..." />
        <CommandList>
          <CommandEmpty>Результатов не найдено.</CommandEmpty>
          <CommandGroup heading="Курсы">
            {allCourses
              .filter((page) => page.isEntryPage)
              .map((course, idx) => (
                <CommandItem
                  key={idx}
                  value={course.title}
                  onSelect={() => {
                    runCommand(() => router.push(course.slug as string))
                  }}
                >
                  <File />
                  {course.title}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Лабы">
            {allLabs
              .filter((page) => page.isEntryPage)
              .map((lab, idx) => (
                <CommandItem
                  key={idx}
                  value={lab.title}
                  onSelect={() => {
                    runCommand(() => router.push(lab.slug as string))
                  }}
                >
                  <FlaskConical />
                  {lab.title}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Темы">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Sun />
              Светлая
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon />
              Темная
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Laptop />
              Системная
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
