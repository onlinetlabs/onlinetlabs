'use client'

import Link from "next/link"

import { ProgressCircle } from "@components/progress-circle"
import { Card } from "@ui/card"
import { labEntity } from "@entities/lab"

export function ActiveCard() {
  const { projectId } = labEntity.useLab();
  
  return (
    <Card className="relative flex w-full flex-col gap-y-6 p-6 md:w-9/12">
      <div className="flex items-center space-x-2">
        <h4 className="truncate text-sm font-medium">
          Маршрутизация в IP сетях
        </h4>
        {true ? (
          <span className="bg-ds-green-200 text-ds-green-900 ml-auto inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium">
            Активна
          </span>
        ) : null}
      </div>

      <div className="mt-auto flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <ProgressCircle
            variant="success"
            value={70}
            radius={9}
            strokeWidth={3.5}
          />
          <p className="text-sm font-medium">Успешные проверки (7/10)</p>
        </div>
        <Link
          href={`/gns3/${projectId}`}
          className="text-ds-blue-900 decoration-chill ml-auto text-sm font-medium underline decoration-2 underline-offset-2"
        >
          <span className="absolute inset-0" aria-hidden={true} />
          Продолжить &#8594;
        </Link>
      </div>
    </Card>
  )
}
