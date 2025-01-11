// import { getCourses } from '@content/utils';

import { siteConfig } from "@shared/config/site";

export async function GET() {
  // const allCourses = await getCourses();

  // const itemsXml = allCourses
  //   .sort((a, b) => {
  //     if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
  //       return -1;
  //     }
  //     return 1;
  //   })
  //   .map(
  //     (post) =>
  //       `<item>
  //         <title>${post.metadata.title}</title>
  //         <link>${siteConfig.url}/blog/${post.slug}</link>
  //         <description>${post.metadata.description || ''}</description>
  //         <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
  //       </item>`,
  //   )
  //   .join('\n');

  // const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  // <rss version="2.0">
  //   <channel>
  //       <title>Обучающая платформа</title>
  //       <link>${siteConfig.url}</link>
  //       <description>This is обучающая платформа RSS feed</description>
  //       ${itemsXml}
  //   </channel>
  // </rss>`;

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Обучающая платформа</title>
        <link>${siteConfig.url}</link>
        <description>This is обучающая платформа RSS feed</description>
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
