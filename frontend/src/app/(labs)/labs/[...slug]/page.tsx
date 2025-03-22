import { notFound } from "next/navigation"
import { allLabs } from "contentlayer/generated"

import "@styles/mdx.css"

import type { Metadata } from "next"

import { siteConfig } from "@shared/config/site"
import { Mdx } from "@components/mdx-components"
import { DashboardTableOfContents } from "@components/toc"
import { Circle } from "@ui/circle"
import { getTableOfContents } from "@lib/toc"
import { absoluteUrl } from "@lib/utils"
import { getLabBySlug } from "@lib/lab"
import { FlaskConical } from "lucide-react"

type Params = Promise<{ slug: string[] }>

export async function generateMetadata({
  params,
}: { params: Params }): Promise<Metadata> {
  const slug =  (await params).slug;

  const lab = await getLabBySlug(slug)

  if (!lab) {
    return {}
  }

  return {
    title: `${lab.title}`,
    description: lab.description,
    openGraph: {
      title: lab.title,
      description: lab.description,
      type: "article",
      url: absoluteUrl(lab.slug),
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
  return allLabs.map((c) => ({ slug: c.slugAsParams.split("/") }))
}

export default async function CoursePage({ params }: { params: Params }) {
  const slug =  (await params).slug;
  const lab = await getLabBySlug(slug)

  if (!lab) {
    notFound()
  }

  const toc = await getTableOfContents(lab.body.raw)

  return (
    <div className="relative px-4 py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0 max-w-3xl col-start-1 col-span-1">
        <div className="flex flex-col gap-2 items-start mb-4 not-prose md:mb-10 md:flex-row md:items-center md:gap-6">
          <Circle className="h-10 w-10 md:h-[72px] md:w-[72px] text-2xl md:text-4xl">
            <FlaskConical />
          </Circle>
          <hgroup>
            <p className="text-sm text-muted-foreground">
              Лабораторная работа
            </p>
            <h1 className="text-base leading-10 text-primary">
              {lab.title}
            </h1>
          </hgroup>
        </div>
        <div className="pb-12">
          <Mdx code={lab.body.code} />
        </div>
      </div>
      <div className="hidden text-sm xl:block xl:col-start-2 xl:col-span-1">
        <div className="sticky top-20 -mt-3 h-screen pt-4">
          <div className="no-scrollbar h-full overflow-auto pb-10">
            {lab.toc && <DashboardTableOfContents toc={toc} />}
          </div>
        </div>
      </div>
    </div>
  )
}
