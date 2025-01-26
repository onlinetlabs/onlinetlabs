
import { contentConfig } from "@shared/config/content";
import { siteConfig } from "@shared/config/site"

export async function GET() {
  const coursesXml = contentConfig.courses
    .sort((a, b) => {
      if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
        return -1;
      }
      return 1;
    })
    .map(
      (post) =>
        `<item>
          <title>${post.title}</title>
          <link>${siteConfig.url}/${post.slug}</link>
          <description>${post.description || ''}</description>
          <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
        </item>`,
    )
    .join('\n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Обучающая платформа - ${siteConfig.name}</title>
        <link>${siteConfig.url}</link>
        <description>${siteConfig.description}: RSS feed</description>
        ${coursesXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  })
}
