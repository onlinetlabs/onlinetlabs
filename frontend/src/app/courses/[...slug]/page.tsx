import { notFound } from "next/navigation"
import { allCourses } from "contentlayer/generated"

import "@styles/mdx.css"

import type { Metadata } from "next"

import { ChapterNextUp } from "@widgets/chapter-next-up"
import { CourseIsland } from "@widgets/course-island"
import { siteConfig } from "@shared/config/site"
import { CourseCompletion } from "@components/course-completion"
import { Mdx } from "@components/mdx-components"
import { DashboardTableOfContents } from "@components/toc"
import { Circle } from "@ui/circle"
import {
  getCourseBySlug,
  getCourseChapterCountBySlug,
  getNextChapter,
} from "@lib/course"
import { getTableOfContents } from "@lib/toc"
import { absoluteUrl } from "@lib/utils"

type Params = Promise<{ slug: string[] }>

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const slug = (await params).slug

  const course = await getCourseBySlug(slug)

  if (!course) {
    return {}
  }

  return {
    title: `${course.title}`,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      type: "article",
      url: absoluteUrl(course.slug),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
  }
}

export async function generateStaticParams(): Promise<Awaited<Params>[]> {
  return allCourses.map((c) => ({ slug: c.slugAsParams.split("/") }))
}

export default async function CoursePage({ params }: { params: Params }) {
  const slug = (await params).slug
  const course = await getCourseBySlug(slug)

  if (!course) {
    notFound()
  }

  const toc = await getTableOfContents(course.body.raw)
  const next = await getNextChapter(course)
  const chapters = await getCourseChapterCountBySlug(slug)

  // sortOrder starts from 0, therefore we need to subtract 1 from total
  const isLastChapter = chapters - 1 === course.sortOrder
  const isFirstChapter = course.sortOrder === 0

  return (
    <div className="relative px-4 py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <CourseIsland
        slug={slug}
        className="col-span-1 col-start-1 mx-auto mb-8 max-w-4xl xl:mb-0"
      />
      <div className="col-span-1 col-start-1 mx-auto w-full max-w-3xl min-w-0">
        {!isFirstChapter && (
          <div className="not-prose mb-4 flex flex-col items-start gap-2 md:mb-10 md:flex-row md:items-center md:gap-6">
            <Circle className="h-10 w-10 text-2xl md:h-[72px] md:w-[72px] md:text-4xl">
              {course.sortOrder}
            </Circle>
            <hgroup>
              <p className="text-muted-foreground text-sm">
                Глава {course.sortOrder}
              </p>
              <h1 className="text-primary text-base leading-10">
                {course.title}
              </h1>
            </hgroup>
          </div>
        )}
        <div className="pb-12">
          <Mdx code={course.body.code} />
        </div>
        <CourseCompletion
          number={course.sortOrder}
          type={isLastChapter ? "end" : isFirstChapter ? "start" : "default"}
        />
        {!isLastChapter && (
          <ChapterNextUp
            title={`${next?.sortOrder}: ${next?.title}`}
            content={next?.description}
            action={`Перейти к главе ${next?.sortOrder}`}
            href={next?.slug}
            namespace={course.namespace}
            sortOrder={course.sortOrder}
          />
        )}
      </div>
      <div className="hidden text-sm xl:col-span-1 xl:col-start-2 xl:block">
        <div className="sticky top-20 -mt-3 h-screen pt-4">
          <div className="no-scrollbar h-full overflow-auto pb-10">
            {course.toc && <DashboardTableOfContents toc={toc} />}
          </div>
        </div>
      </div>
    </div>
  )
}
