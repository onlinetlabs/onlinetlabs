import { ProgressCircle } from "@components/progress-circle";
import { Card } from "@ui/card";
import Link from "next/link";

export function ActiveCard() {
  return (
    <Card className="relative w-full md:w-9/12 p-6 flex flex-col gap-y-6">
      <div className="flex items-center space-x-2">
        <h4 className="truncate text-sm font-medium">
          Маршрутизация в IP сетях
        </h4>
        {true ? (
          <span className="inline-flex ml-auto items-center rounded bg-ds-green-200 text-ds-green-900 px-1.5 py-0.5 text-xs font-medium">
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
          <p className="text-sm font-medium">
            Успешные проверки (7/10)
          </p>
        </div>
        <Link
          href="#"
          className="text-sm font-medium ml-auto text-ds-blue-900 decoration-chill underline underline-offset-2 decoration-2"
        >
          <span
            className="absolute inset-0"
            aria-hidden={true}
          />
          Продолжить &#8594;
        </Link>
      </div>
    </Card>
  )
}