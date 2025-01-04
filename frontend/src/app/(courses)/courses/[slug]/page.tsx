import { Chapter } from "@components/chapter";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@components/page-header";
import { absoluteUrl } from "@lib/utils";
import { navConfig } from "@shared/config/nav";
import { siteConfig } from "@shared/config/site";
import { allChapters } from "contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = {
  slug: string;
}

interface CoursePageProps {
  params: Promise<Params>
}

async function getCourseChaptersFromParams(props: CoursePageProps) {
  const params = await props.params;

  const chapters = allChapters.filter((chapter) => chapter.slugAsParams.startsWith(params.slug));

  const sortedChapters = chapters.sort((a, b) => (a?.sortOrder ?? 0) - (b?.sortOrder ?? 0));

  return sortedChapters
}

async function getCourseFromParams({ params }: CoursePageProps) {
  const { slug } = await params;

  const course = navConfig.courses.find((course) => course.slug === slug);

  return course;
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const course = await getCourseFromParams({ params });

  if (!course || Array.isArray(course)) {
    return {};
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
  return navConfig.courses.map(({ slug }) => ({ slug }));
}

export default async function CoursePage({ params }: CoursePageProps) {
  const chapters = await getCourseChaptersFromParams({ params });

  if (!chapters) {
    return notFound();
  }

  const course = await getCourseFromParams({ params });

  return (
    <div className="relative">
      <PageHeader>
        <PageHeaderHeading>{course?.title}</PageHeaderHeading>
        {course?.description && (
          <PageHeaderDescription>
            {course?.description}
          </PageHeaderDescription>
        )}
      </PageHeader>
      <div className="container py-6 flex flex-col gap-2">
        {chapters.map((chapter, idx) => (<Chapter key={idx} title={chapter.title} description={chapter.description} slug={chapter.slug} />))}
      </div>
    </div>
  );
}