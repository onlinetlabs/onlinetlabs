"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
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
import { allCourses, allLabs } from "contentlayer/generated"
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
        className="hidden sm:inline-flex h-fit items-center gap-1 bg-muted/50 px-2 py-1"
        onClick={() => setOpen(true)}
        {...props}
      >
        <Search className="-ml-0.5 size-3.5! text-muted-foreground" />
        <kbd className="hidden font-sans text-xs/4 text-muted-foreground [.os-macos_&]:block">⌘K</kbd>
        <kbd className="hidden font-sans text-xs/4 text-muted-foreground not-[.os-macos_&]:block">Ctrl&nbsp;K</kbd>
      </Button>
      <button className="inline-grid sm:hidden size-7 place-items-center rounded-md" onClick={() => setOpen(true)} {...props}>
        <Search className="size-4" />
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Найти..." />
        <CommandList>
          <CommandEmpty>Результатов не найдено.</CommandEmpty>
          <CommandGroup heading="Курсы">
            {allCourses.filter(page => page.isEntryPage).map((course, idx) => (
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
            {allLabs.filter(page => page.isEntryPage).map((lab, idx) => (
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
