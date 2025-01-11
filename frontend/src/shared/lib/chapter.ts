import { navConfig } from "@shared/config/nav";
import { allChapters, type Chapter } from "contentlayer/generated";

export async function getNextChapter(chapter: Chapter) {
  const links = allChapters
    .filter((c) => c.slugAsParams.startsWith(chapter.namespace))
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  const activeIndex = links.findIndex(
    (link) => chapter.slug === link.slug
  )

  const next =
    activeIndex !== links.length - 1
      ? links[activeIndex + 1]
      : null
  return next
}

export async function getCourseBySlug({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const course = navConfig.courses.items.find((course) => course.slug === slug);

  if (!course) {
    return null
  }

  return course;
}

export async function getIntroFromParams({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const intro = allChapters.find((chapter) => chapter.slugAsParams === slug)

  if (!intro) {
    return null
  }

  return intro
}

export async function getChapterFromParams(props: { params: Promise<{ slug: string; chapter: string; }> }) {
  const params = await props.params;

  const slug = `${params.slug}/${params.chapter}`;
  const chapter = allChapters.find((chapter) => chapter.slugAsParams === slug)

  if (!chapter) {
    return null
  }

  return chapter
}

export async function getChapterTotalCount({ namespace }: { namespace: string; }) {
  return allChapters.filter((c) => c.namespace === namespace).length;
}