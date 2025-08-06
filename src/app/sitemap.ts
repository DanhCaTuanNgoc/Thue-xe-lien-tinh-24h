import { MetadataRoute } from 'next'
import { fetchCarTypes } from '../lib/repositories/car_typeApi'
import { supabase } from '../lib/supabaseClient'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const baseUrl = 'https://dulichlientinh24h.com'
   
   try {
      // Lấy danh sách car types từ database
      const carTypes = await fetchCarTypes()
      
      // Lấy danh sách posts từ database
      const { data: posts } = await supabase
         .from('posts')
         .select('id, updated_at')
         .order('created_at', { ascending: false })
      
      const sitemap: MetadataRoute.Sitemap = [
         // Trang chủ
         {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
         },
         // Trang về chúng tôi
         {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
         },
         // Trang liên hệ
         {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
         },
         // Trang danh sách bài viết
         {
            url: `${baseUrl}/posts`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
         },
      ]

      // Thêm các trang car types (sử dụng ID thay vì slug)
      carTypes.forEach((carType) => {
         sitemap.push({
            url: `${baseUrl}/cars/${carType.id}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
         })
      })

      // Thêm các trang bài viết chi tiết
      if (posts && posts.length > 0) {
         posts.forEach((post) => {
            sitemap.push({
               url: `${baseUrl}/posts/${post.id}`,
               lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
               changeFrequency: 'monthly',
               priority: 0.6,
            })
         })
      }

      // Trang admin (với priority thấp để không xuất hiện trong search results)
      sitemap.push({
         url: `${baseUrl}/admin`,
         lastModified: new Date(),
         changeFrequency: 'yearly',
         priority: 0.1,
      })

      return sitemap

   } catch (error) {
      console.error('Error generating sitemap:', error)
      
      // Fallback sitemap nếu có lỗi
      return [
         {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
         },
         {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
         },
         {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
         },
         {
            url: `${baseUrl}/posts`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
         },
         {
            url: `${baseUrl}/admin`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.1,
         },
      ]
   }
}
