'use client';
import "@styles/mdx.css"
import { Mdx } from "@components/mdx-components";
import { getLabById } from "@lib/lab";
import { Card } from "@ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@ui/dialog";
import { BookOpenIcon } from "lucide-react";

export function LabCard({ labId }: Props) {
  const lab = getLabById(labId);

  if (!lab) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group/preview relative w-full p-6 md:w-7/12 cursor-pointer gap-0">
          <div className="border-border inline-flex items-center justify-center rounded-md border p-2 size-9.5">
            <BookOpenIcon
              className="text-foreground size-5"
              aria-hidden={true}
            />
          </div>
          <h3 className="mt-4 text-sm font-medium group-hover/preview:underline">
            <span className="absolute inset-0" aria-hidden={true} />
              Описание работы
          </h3>
          <p className="text-muted-foreground mt-2 text-sm">
            Откройте описание лабораторной работы в модальном окне
          </p>
        </Card>
      </DialogTrigger>
      <DialogContent className="flex flex-col w-full max-w-4xl! max-h-3/4">
        <DialogHeader className="sticky top-0">
          <DialogTitle>Лабораторная работа</DialogTitle>
          <DialogDescription>
            {lab.title}
          </DialogDescription>
        </DialogHeader>
        <div className="pb-12 flex flex-col overflow-y-auto">
          <Mdx code={lab.body.code} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

type Props = {
  labId: string;
}