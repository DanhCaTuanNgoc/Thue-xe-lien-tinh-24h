import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
   return {
      rules: [
         {
            userAgent: '*',
            allow: '/',
            disallow: [
               '/admin/',
               '/api/',
               '/private/',
               '/_next/',
               '/temp/',
               '/backup/',
               '*.sql',
               '*.log'
            ],
         },
         {
            userAgent: 'Googlebot',
            allow: '/',
            disallow: ['/admin/', '/api/'],
         },
         {
            userAgent: 'Bingbot',
            allow: '/',
            disallow: ['/admin/', '/api/'],
         }
      ],
      sitemap: 'https://dulichlientinh24h.com/sitemap.xml',
      host: 'https://dulichlientinh24h.com',
   }
}
