import { siteConfig } from '@shared/config/site';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
