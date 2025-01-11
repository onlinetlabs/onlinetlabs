import { notFound } from "next/navigation"
import { allChapters } from "contentlayer/generated"

import "@styles/mdx.css"
import type { Metadata } from "next"

import { siteConfig } from "@shared/config/site"
import { absoluteUrl } from "@lib/utils"
import { Mdx } from "@components/mdx-components"
import { DashboardTableOfContents } from "@components/toc"
import { getTableOfContents } from "@lib/toc"
import { ChapterIsland } from "@widgets/chapter-island"
import { ChapterNextUp } from "@widgets/chapter-next-up"
import { getChapterFromParams, getChapterTotalCount, getCourseBySlug, getNextChapter } from "@lib/chapter"
import { ChapterCompletion } from "@components/chapter-completion"

interface Params {
  slug: string
  chapter: string
}

interface ChapterPageProps {
  params: Promise<Params>
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const chapter = await getChapterFromParams({ params });
  const course = await getCourseBySlug({ params });

  if (!chapter || !course) {
    return {}
  }

  return {
    title: `${course.title}: ${chapter.title}`,
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

export async function generateStaticParams(): Promise<Params[]> {
  return allChapters.map((c) => {
    const [slug, chapter] = c.slugAsParams.split("/");
    return {
      slug,
      chapter,
    }
  })
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const chapter = await getChapterFromParams({ params });

  if (!chapter) {
    notFound()
  }

  const toc = await getTableOfContents(chapter.body.raw)
  const next = await getNextChapter(chapter);
  const total = await getChapterTotalCount({ namespace: chapter.namespace });

  // sortOrder starts from 0, therefore we need to subtract 1 from total
  const isLastChapter = (total - 1) === chapter.sortOrder;

  return (
    <div className="relative px-4 py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <ChapterIsland chapter={chapter} className="col-span-1 col-start-1 max-w-4xl mx-auto mb-8 xl:mb-0" />
      <div className="mx-auto w-full min-w-0 max-w-3xl col-start-1 col-span-1">
        <div className="flex flex-col gap-2 items-start mb-4 not-prose md:mb-10 md:flex-row md:items-center md:gap-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted md:h-[72px] md:w-[72px]">
            <p className="text-muted-foreground text-2xl md:text-4xl">{chapter.sortOrder}</p>
          </div>
          <hgroup>
            <p className="text-sm text-muted-foreground">Глава {chapter.sortOrder}</p>
            <h1 className="text-base leading-10 text-primary">{chapter.title}</h1>
          </hgroup>
        </div>
        <div className="pb-12">
          <Mdx code={chapter.body.code} />
        </div>
        <ChapterCompletion 
          number={chapter.sortOrder}
          type={isLastChapter ? 'end' : 'default'}
        />
        {!isLastChapter && (
          <ChapterNextUp
            title={`${next?.sortOrder}: ${next?.title}`}
            content={next?.description}
            action={`Перейти к главе ${next?.sortOrder}`}
            href={next?.slug}
            namespace={chapter.namespace}
            sortOrder={chapter?.sortOrder}
          />
        )}
      </div>
      <div className="hidden text-sm xl:block xl:col-start-2 xl:col-span-1">
        <div className="sticky top-20 -mt-3 h-screen pt-4">
          <div className="no-scrollbar h-full overflow-auto pb-10">
            {chapter.toc && <DashboardTableOfContents toc={toc} />}
          </div>
        </div>
      </div>
    </div>
  )
}
