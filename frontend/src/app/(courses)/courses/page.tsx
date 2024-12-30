import Link from "next/link"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@components/page-header"
import { navConfig } from "@shared/config/nav"

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
                <Link className="group flex flex-col h-full p-4 bg-background rounded-md transition-all relative border shadow hover:-translate-y-[5px] hover:shadow-[0_16px_24px_rgb(0_0_0_/_7%),0_6px_30px_rgb(0_0_0_/_6%),0_8px_10px_rgb(0_0_0_/_10%)]" href={item.href || '#'} target="_blank">
                  <header className="mb-4">
                    <div className="mb-1">
                      <p className="inline-block m-0 text-xs text-muted-foreground after:content-['•'] after:px-[0.33em]">Тэг 1</p>
                      <p className="inline-block m-0 text-xs text-muted-foreground after:content-['•'] after:px-[0.33em]">Тэг 2</p>
                      <p className="inline-block m-0 text-xs text-muted-foreground">Тэг 3</p>
                    </div>
                    <h2 className="text-xl">{item.title}</h2>
                  </header>
                  <div className="flex content-center m-[auto_0_0] py-5 rounded overflow-hidden">
                    <div className="max-w-full h-[132px]" role="img" />
                  </div>
                  <footer className="mt-3">
                    <p className="m-0 text-lg">от 4&nbsp;часов</p>
                    <p className="m-0 mr-auto text-xs text-muted-foreground">пройдено 0% курса</p>
                  </footer>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
