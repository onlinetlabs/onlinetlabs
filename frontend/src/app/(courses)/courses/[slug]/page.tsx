import { Chapters } from "@components/chapters";
import { Mdx } from "@components/mdx-components";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@components/page-header";
import { CoursesPager } from "@components/pager";
import { DashboardTableOfContents } from "@components/toc";
import { getTableOfContents } from "@lib/toc";
import { absoluteUrl } from "@lib/utils";
import { navConfig } from "@shared/config/nav";
import { siteConfig } from "@shared/config/site";
import { NavItemWithChildren } from "@shared/types/nav";
import { allCourses } from "contentlayer/generated";
import { ChevronRight } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";

type Params = {
  slug: string;
}

interface CoursePageProps {
  params: Promise<Params>
}

async function getCourseFromParams(props: CoursePageProps) {
  const params = await props.params;

  const course = allCourses.find((course) => course.slugAsParams === params.slug);

  if (!course) {
    const chapters = allCourses.filter((course) => course.slugAsParams.startsWith(params.slug));
    if (chapters.length > 0) {
      return chapters;
    }
    return null
  }

  return course
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
  return navConfig.courses
    .filter((course: NavItemWithChildren): course is Omit<NavItemWithChildren, 'href'> & {href: string } => Boolean(course.href))
    .map((course) => {
      const slug = course.href.split("/").slice(-1)[0];
      return ({ slug })
    });
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = await getCourseFromParams({ params });

  if (!course) {
    return notFound();
  }

  if (Array.isArray(course)) {
    const { slug } = await params;
    const navCourse = navConfig.courses.find((course) => course.href === `/courses/${slug}`);

    return (
      <div className="relative">
        <PageHeader>
          <PageHeaderHeading>{navCourse?.title}</PageHeaderHeading>
          {navCourse?.description && (
            <PageHeaderDescription>
              {navCourse?.description}
            </PageHeaderDescription>
          )}
        </PageHeader>
        <div className="container py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Chapters data={course} />
        </div>
      </div>
    );
  }

  const toc = await getTableOfContents(course.body.raw)

  return (
    <div className="relative px-4 py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0 max-w-3xl">
        <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
          <div className="truncate">Course</div>
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