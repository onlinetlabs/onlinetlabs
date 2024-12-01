import { notFound } from "next/navigation"
import { allCourses } from "contentlayer/generated"

import "@styles/mdx.css"
import type { Metadata } from "next"
import { ChevronRight } from "lucide-react"
import Balancer from "react-wrap-balancer"

import { siteConfig } from "@shared/config/site"
import { absoluteUrl } from "@lib/utils"
import { Mdx } from "@components/mdx-components"
import { CoursesPager } from "@components/pager"
import { DashboardTableOfContents } from "@components/toc"
import { getTableOfContents } from "@lib/toc"

interface Params {
  slug: string
  chapter: string
}

interface ChapterPageProps {
  params: Promise<Params>
}

async function getCourseFromParams(props: ChapterPageProps) {
  const params = await props.params;

  const slug = `${params.slug}/${params.chapter}`;
  const course = allCourses.find((course) => course.slugAsParams === slug)

  if (!course) {
    return null
  }

  return course
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const course = await getCourseFromParams({ params });

  if (!course) {
    return {}
  }

  return {
    title: course.title,
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

export async function generateStaticParams(): Promise<Params[]> {
  return allCourses.map((course) => {
    const [slug, chapter] = course.slugAsParams.split("/");
    return {
      slug,
      chapter,
    }
  })
  // return allCourses.map((course) => ({
  //   chapter: course.slugAsParams.split("/"),
  // }))
}

export default async function CoursePage({ params }: ChapterPageProps) {
  const course = await getCourseFromParams({ params })

  if (!course) {
    notFound()
  }

  const toc = await getTableOfContents(course.body.raw)

  return (
    <div className="relative px-4 py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0 max-w-3xl">
        <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
          <div className="truncate">Courses</div>
          <ChevronRight className="h-3.5 w-3.5" />
          <div className="text-foreground">{course.title}</div>
        </div>
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
            {course.title}
          </h1>
          {course.description && (
            <p className="text-base text-muted-foreground">
              <Balancer>{course.description}</Balancer>
            </p>
          )}
        </div>
        <div className="pb-12 pt-8">
          <Mdx code={course.body.code} />
        </div>
        <CoursesPager course={course} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-20 -mt-6 h-[calc(100vh-3.5rem)] pt-4">
          <div className="no-scrollbar h-full overflow-auto pb-10">
            {course.toc && <DashboardTableOfContents toc={toc} />}
          </div>
        </div>
      </div>
    </div>
  )
}
