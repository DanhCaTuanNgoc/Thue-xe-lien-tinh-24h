import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
   return {
      name: 'Thuê xe liên tỉnh 24H',
      short_name: 'Thuê xe 24H',
      description: 'Dịch vụ thuê xe liên tỉnh chất lượng cao, uy tín',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#dc2626',
      icons: [
         {
            src: '/favicon.ico',
            sizes: 'any',
            type: 'image/x-icon',
         },
         {
            src: '/car-icon.png',
            sizes: '192x192',
            type: 'image/png',
         },
         {
            src: '/car-icon.png',
            sizes: '512x512',
            type: 'image/png',
         },
      ],
      categories: ['travel', 'transportation'],
      lang: 'vi',
      dir: 'ltr',
      orientation: 'portrait',
      scope: '/',
      prefer_related_applications: false,
   }
}
