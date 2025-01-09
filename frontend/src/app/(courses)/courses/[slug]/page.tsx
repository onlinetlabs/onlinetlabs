import { notFound } from "next/navigation"
import { allChapters } from "contentlayer/generated"

import "@styles/mdx.css"
import type { Metadata } from "next"

import { siteConfig } from "@shared/config/site"
import { absoluteUrl } from "@lib/utils"
import { Mdx } from "@components/mdx-components"
import { ChaptersPager } from "@components/pager"
import { DashboardTableOfContents } from "@components/toc"
import { getTableOfContents } from "@lib/toc"
import { ChapterIsland } from "@widgets/chapter-island"
import { getIntroFromParams, getNextChapter } from "@lib/chapter"
import { ChapterNextUp } from "@widgets/chapter-next-up"
import { ChapterCompletion } from "@components/chapter-completion"

interface Params {
  slug: string
}

interface ChapterPageProps {
  params: Promise<Params>
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const intro = await getIntroFromParams({ params });

  if (!intro) {
    return {}
  }

  return {
    title: intro.title,
    description: intro.description,
    openGraph: {
      title: intro.title,
      description: intro.description,
      type: "article",
      url: absoluteUrl(intro.slug),
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
  return allChapters.filter(c => c.sortOrder === 0).map((c) => ({ slug: c.slugAsParams }))
}

export default async function IntroPage({ params }: ChapterPageProps) {
  const intro = await getIntroFromParams({ params })

  if (!intro) {
    notFound()
  }

  const toc = await getTableOfContents(intro.body.raw)
  const next = await getNextChapter(intro);

  return (
    <div className="relative px-4 py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <ChapterIsland chapter={intro} className="col-span-1 col-start-1 max-w-4xl mx-auto mb-8 xl:mb-0" index />
      <div className="mx-auto w-full min-w-0 max-w-3xl col-start-1 col-span-1">
        <div className="pb-12">
          <Mdx code={intro.body.code} />
        </div>
        <ChapterCompletion
          number={intro.sortOrder}
          type='start'
        />
        <ChapterNextUp
          title={`${next?.sortOrder}: ${next?.title}`}
          content={next?.description}
          action={`Перейти к главе ${next?.sortOrder}`}
          href={next?.slug}
          namespace={intro.namespace}
          sortOrder={intro.sortOrder}
        />
      </div>
      <div className="hidden text-sm xl:block xl:col-start-2 xl:col-span-1">
        <div className="sticky top-20 -mt-3 h-screen pt-4">
          <div className="no-scrollbar h-full overflow-auto pb-10">
            {intro.toc && <DashboardTableOfContents toc={toc} />}
          </div>
        </div>
      </div>
    </div>
  )
}
