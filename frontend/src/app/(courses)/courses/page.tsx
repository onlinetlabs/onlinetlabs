import Link from "next/link"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@components/page-header"
import { Circle, CircuitBoard } from "lucide-react"
import { Badge } from "@ui/badge"
import { navConfig } from "@shared/config/nav"
import { Icons } from "@components/icons"

export default function CoursesPage() {
  return (
    <div className="relative">
      <PageHeader>
        <PageHeaderHeading>Список курсов</PageHeaderHeading>
        <PageHeaderDescription>
          Полный список всех доступных курсов. 
        </PageHeaderDescription>
      </PageHeader>
      <div className="container py-6 grid auto-rows-min grid-cols-4 gap-3 list-none h-auto">
        <ul className="contents">
          {navConfig.courses.map((item, idx) => (
            <li key={idx} className="list-none min-h-[136px]">
              <article className="h-full">
                <a className="group flex flex-col h-full p-4 bg-background rounded-md transition-all relative border shadow hover:shadow-md" href="/mobile-app-design/?from=catalog" target="_blank">
                  <header className="mb-4">
                    <div className="mb-1">
                      <p className="inline-block m-0 text-xs text-muted-foreground after:content-['•'] after:px-[0.33em]">Дизайн</p>
                      <p className="inline-block m-0 text-xs text-muted-foreground after:content-['•'] after:px-[0.33em]">3 месяца</p>
                      <p className="inline-block m-0 text-xs text-muted-foreground">С опытом</p>
                    </div>
                    <h2 className="text-xl">{item.title}</h2>
                  </header>
                  <div className="flex content-center m-[auto_0_0] py-5 rounded overflow-hidden">
                    <div className="max-w-full h-[132px]" role="img" />
                  </div>
                  <footer className="mt-3">
                    <p className="m-0 text-lg">от 3&nbsp;497 ₽/мес </p>
                    <p className="m-0 mr-auto text-xs text-muted-foreground">или сразу 68&nbsp;000&nbsp;₽</p>
                  </footer>
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
