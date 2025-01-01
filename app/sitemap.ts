import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://heidiandkareem.com',
      lastModified: new Date(),
    },
  ];
}
