import { notFound } from "next/navigation"
import { allCourses } from "contentlayer/generated"

import "@styles/mdx.css"

import type { Metadata } from "next"

import { CourseIsland } from "@widgets/course-island"
import { ChapterNextUp } from "@widgets/chapter-next-up"
import { siteConfig } from "@shared/config/site"
import { CourseCompletion } from "@components/course-completion"
import { Mdx } from "@components/mdx-components"
import { DashboardTableOfContents } from "@components/toc"
import { Circle } from "@ui/circle"
import {
  getCourseChapterCountBySlug,
  getCourseBySlug,
  getNextChapter,
} from "@lib/course"
import { getTableOfContents } from "@lib/toc"
import { absoluteUrl } from "@lib/utils"

type Params = Promise<{ slug: string[] }>

export async function generateMetadata({
  params,
}: { params: Params }): Promise<Metadata> {
  const slug =  (await params).slug;

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
  const slug =  (await params).slug;
  const course = await getCourseBySlug(slug)

  if (!course) {
    notFound()
  }

  const toc = await getTableOfContents(course.body.raw)
  const next = await getNextChapter(course)
  const chapters = await getCourseChapterCountBySlug(slug)

  // sortOrder starts from 0, therefore we need to subtract 1 from total
  // @ts-expect-error TS2362
  const isLastChapter = chapters - 1 === course.sortOrder
  // @ts-expect-error TS2362
  const isFirstChapter = course.sortOrder === 0

  return (
    <div className="relative px-4 py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <CourseIsland
        slug={slug}
        className="col-span-1 col-start-1 max-w-4xl mx-auto mb-8 xl:mb-0"
      />
      <div className="mx-auto w-full min-w-0 max-w-3xl col-start-1 col-span-1">
        {!isFirstChapter && (
          <div className="flex flex-col gap-2 items-start mb-4 not-prose md:mb-10 md:flex-row md:items-center md:gap-6">
            <Circle className="h-10 w-10 md:h-[72px] md:w-[72px] text-2xl md:text-4xl">
              {course.sortOrder}
            </Circle>
            <hgroup>
              <p className="text-sm text-muted-foreground">
                Глава {course.sortOrder}
              </p>
              <h1 className="text-base leading-10 text-primary">
                {course.title}
              </h1>
            </hgroup>
          </div>
        )}
        <div className="pb-12">
          <Mdx code={course.body.code} />
        </div>
        <CourseCompletion
          // @ts-expect-error TS2362
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
            // @ts-expect-error TS2362
            sortOrder={course.sortOrder}
          />
        )}
      </div>
      <div className="hidden text-sm xl:block xl:col-start-2 xl:col-span-1">
        <div className="sticky top-20 -mt-3 h-screen pt-4">
          <div className="no-scrollbar h-full overflow-auto pb-10">
            {course.toc && <DashboardTableOfContents toc={toc} />}
          </div>
        </div>
      </div>
    </div>
  )
}
