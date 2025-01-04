// import { getCourses } from '@content/utils';

export const baseUrl = 'https://example.vercel.app';

export default async function sitemap() {
  // const courses = getCourses().map((course) => ({
  //   url: `${baseUrl}/courses/${course.slug}`,
  //   lastModified: course.metadata.publishedAt,
  // }));

  const routes = ['', '/courses'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));
  
  // return [...routes, ...courses];
  return routes;
}
