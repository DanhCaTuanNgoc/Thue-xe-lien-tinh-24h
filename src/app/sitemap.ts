import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
   const baseUrl = 'https://thue-xe-lien-tinh-24h.vercel.app'

   return [
      {
         url: baseUrl,
         lastModified: new Date(),
         changeFrequency: 'daily',
         priority: 1,
      },
      {
         url: `${baseUrl}/cars-4`,
         lastModified: new Date(),
         changeFrequency: 'weekly',
         priority: 0.8,
      },
      {
         url: `${baseUrl}/cars-7`,
         lastModified: new Date(),
         changeFrequency: 'weekly',
         priority: 0.8,
      },
      {
         url: `${baseUrl}/cars-16`,
         lastModified: new Date(),
         changeFrequency: 'weekly',
         priority: 0.8,
      },
      {
         url: `${baseUrl}/cars-limousine`,
         lastModified: new Date(),
         changeFrequency: 'weekly',
         priority: 0.8,
      },
      {
         url: `${baseUrl}/posts`,
         lastModified: new Date(),
         changeFrequency: 'weekly',
         priority: 0.6,
      },
      {
         url: `${baseUrl}/admin`,
         lastModified: new Date(),
         changeFrequency: 'monthly',
         priority: 0.1,
      },
   ]
}
