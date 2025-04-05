'use client'

import Link from "next/link"

import { ProgressCircle } from "@components/progress-circle"
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card"

export function ActiveCard() {
  return (
    <Card className="relative flex w-full flex-col md:w-9/12">
      <CardHeader className="flex flex-row space-x-2 items-center">
        <CardTitle className="truncate text-sm font-medium">
          Маршрутизация в IP сетях
        </CardTitle>
        {true ? (
          <span className="bg-ds-green-200 text-ds-green-900 ml-auto inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium">
            Активна
          </span>
        ) : null}
      </CardHeader>

      <CardContent className="mt-auto flex flex-wrap gap-4">
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
          href={`/gns3/#`}
          className="text-ds-blue-900 decoration-chill ml-auto text-sm font-medium underline decoration-2 underline-offset-2"
        >
          <span className="absolute inset-0" aria-hidden={true} />
          Продолжить &#8594;
        </Link>
      </CardContent>
    </Card>
  )
}
