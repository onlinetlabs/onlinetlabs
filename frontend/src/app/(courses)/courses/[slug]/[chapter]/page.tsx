import { notFound } from "next/navigation"
import { allChapters } from "contentlayer/generated"

import "@styles/mdx.css"
import type { Metadata } from "next"
import { ChevronRight } from "lucide-react"
import Balancer from "react-wrap-balancer"

import { siteConfig } from "@shared/config/site"
import { absoluteUrl } from "@lib/utils"
import { Mdx } from "@components/mdx-components"
import { ChaptersPager } from "@components/pager"
import { DashboardTableOfContents } from "@components/toc"
import { getTableOfContents } from "@lib/toc"

interface Params {
  slug: string
  chapter: string
}

interface ChapterPageProps {
  params: Promise<Params>
}

async function getChapterFromParams(props: ChapterPageProps) {
  const params = await props.params;

  const slug = `${params.slug}/${params.chapter}`;
  const chapter = allChapters.find((chapter) => chapter.slugAsParams === slug)

  if (!chapter) {
    return null
  }

  return chapter
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const chapter = await getChapterFromParams({ params });

  if (!chapter) {
    return {}
  }

  return {
    title: chapter.title,
    description: chapter.description,
    openGraph: {
      title: chapter.title,
      description: chapter.description,
      type: "article",
      url: absoluteUrl(chapter.slug),
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

// export async function generateStaticParams(): Promise<Params[]> {
//   return allChapters.map((chapter) => {
//     const [slug, chapter] = chapter.slugAsParams.split("/");
//     return {
//       slug,
//       chapter,
//     }
//   })
//   // return allChapters.map((chapter) => ({
//   //   chapter: chapter.slugAsParams.split("/"),
//   // }))
// }

export default async function ChapterPage({ params }: ChapterPageProps) {
  const chapter = await getChapterFromParams({ params })

  if (!chapter) {
    notFound()
  }

  const toc = await getTableOfContents(chapter.body.raw)

  return (
    <div className="relative px-4 py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0 max-w-3xl">
        <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
          <div className="truncate">Глава</div>
          <ChevronRight className="h-3.5 w-3.5" />
          <div className="text-foreground">{chapter.title}</div>
        </div>
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
            {chapter.title}
          </h1>
          {chapter.description && (
            <p className="text-base text-muted-foreground">
              <Balancer>{chapter.description}</Balancer>
            </p>
          )}
        </div>
        <div className="pb-12 pt-8">
          <Mdx code={chapter.body.code} />
        </div>
        <ChaptersPager chapter={chapter} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-20 -mt-6 h-[calc(100vh-3.5rem)] pt-4">
          <div className="no-scrollbar h-full overflow-auto pb-10">
            {chapter.toc && <DashboardTableOfContents toc={toc} />}
          </div>
        </div>
      </div>
    </div>
  )
}
