import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
   return {
      rules: {
         userAgent: '*',
         allow: '/',
         disallow: ['/admin/', '/api/'],
      },
      sitemap: 'https://thue-xe-lien-tinh-24h.vercel.app/sitemap.xml',
   }
}
