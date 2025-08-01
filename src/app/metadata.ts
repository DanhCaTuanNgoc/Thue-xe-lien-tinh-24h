import { Metadata } from 'next'

// Base metadata cho toàn bộ website
export const baseMetadata: Metadata = {
   title: {
      default: 'Thuê xe liên tỉnh 24H - Dịch vụ thuê xe uy tín, chất lượng cao',
      template: '%s | Thuê xe liên tỉnh 24H',
   },
   description:
      'Thuê xe liên tỉnh 24H cung cấp dịch vụ thuê xe 4 chỗ, 7 chỗ, 16 chỗ và Limousine chất lượng cao. Đặt xe nhanh chóng, giá cả hợp lý, tài xế chuyên nghiệp. Hotline: 0978 971 421',
   keywords: [
      'thuê xe',
      'thuê xe liên tỉnh',
      'xe 4 chỗ',
      'xe 7 chỗ',
      'xe 16 chỗ',
      'limousine',
      'đặt xe',
      'thuê xe du lịch',
      'xe đưa đón',
      'taxi đường dài',
   ],
   authors: [{ name: 'Thuê xe liên tỉnh 24H' }],
   creator: 'Thuê xe liên tỉnh 24H',
   publisher: 'Thuê xe liên tỉnh 24H',
   robots: {
      index: true,
      follow: true,
      googleBot: {
         index: true,
         follow: true,
         'max-video-preview': -1,
         'max-image-preview': 'large',
         'max-snippet': -1,
      },
   },
   openGraph: {
      type: 'website',
      locale: 'vi_VN',
      url: 'https://thue-xe-lien-tinh-24h.vercel.app/',
      title: 'Thuê xe liên tỉnh 24H - Dịch vụ thuê xe uy tín, chất lượng cao',
      description:
         'Thuê xe liên tỉnh 24H cung cấp dịch vụ thuê xe 4 chỗ, 7 chỗ, 16 chỗ và Limousine chất lượng cao. Đặt xe nhanh chóng, giá cả hợp lý, tài xế chuyên nghiệp.',
      siteName: 'Thuê xe liên tỉnh 24H',
      images: [
         {
            url: 'https://thue-xe-lien-tinh-24h.vercel.app/banner.jpg',
            width: 1200,
            height: 630,
            alt: 'Thuê xe liên tỉnh 24H',
         },
      ],
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Thuê xe liên tỉnh 24H - Dịch vụ thuê xe uy tín, chất lượng cao',
      description:
         'Thuê xe liên tỉnh 24H cung cấp dịch vụ thuê xe 4 chỗ, 7 chỗ, 16 chỗ và Limousine chất lượng cao. Đặt xe nhanh chóng, giá cả hợp lý, tài xế chuyên nghiệp.',
      images: ['https://thue-xe-lien-tinh-24h.vercel.app/banner.jpg'],
   },
   verification: {
      google: 'your-google-verification-code', // Thay bằng code từ Google Search Console
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
   },
   alternates: {
      canonical: 'https://thue-xe-lien-tinh-24h.vercel.app/',
   },
}

// Metadata cho trang chủ
export const homeMetadata: Metadata = {
   ...baseMetadata,
   title: 'Thuê xe liên tỉnh 24H - Dịch vụ thuê xe uy tín, chất lượng cao',
   description:
      'Thuê xe liên tỉnh 24H cung cấp dịch vụ thuê xe 4 chỗ, 7 chỗ, 16 chỗ và Limousine chất lượng cao. Đặt xe nhanh chóng, giá cả hợp lý, tài xế chuyên nghiệp. Hotline: 0978 971 421',
}

// Metadata cho trang xe 4 chỗ
export const car4Metadata: Metadata = {
   ...baseMetadata,
   title: 'Thuê xe 4 chỗ - Giá rẻ, chất lượng cao | Thuê xe liên tỉnh 24H',
   description:
      'Thuê xe 4 chỗ giá rẻ, chất lượng cao. Xe đời mới, tài xế chuyên nghiệp, phục vụ 24/7. Đặt xe ngay: 0978 971 421',
   keywords: [
      'thuê xe 4 chỗ',
      'xe 4 chỗ',
      'đặt xe 4 chỗ',
      'thuê xe du lịch',
      'xe đưa đón',
   ],
}

// Metadata cho trang xe 7 chỗ
export const car7Metadata: Metadata = {
   ...baseMetadata,
   title: 'Thuê xe 7 chỗ - Giá rẻ, chất lượng cao | Thuê xe liên tỉnh 24H',
   description:
      'Thuê xe 7 chỗ giá rẻ, chất lượng cao. Xe đời mới, rộng rãi, tài xế chuyên nghiệp. Đặt xe ngay: 0978 971 421',
   keywords: [
      'thuê xe 7 chỗ',
      'xe 7 chỗ',
      'đặt xe 7 chỗ',
      'thuê xe du lịch',
      'xe đưa đón',
   ],
}

// Metadata cho trang xe 16 chỗ
export const car16Metadata: Metadata = {
   ...baseMetadata,
   title: 'Thuê xe 16 chỗ - Giá rẻ, chất lượng cao | Thuê xe liên tỉnh 24H',
   description:
      'Thuê xe 16 chỗ giá rẻ, chất lượng cao. Xe đời mới, rộng rãi, phù hợp cho đoàn lớn. Đặt xe ngay: 0978 971 421',
   keywords: [
      'thuê xe 16 chỗ',
      'xe 16 chỗ',
      'đặt xe 16 chỗ',
      'thuê xe đoàn',
      'xe đưa đón đoàn',
   ],
}

// Metadata cho trang Limousine
export const limousineMetadata: Metadata = {
   ...baseMetadata,
   title: 'Thuê xe Limousine - Cao cấp, sang trọng | Thuê xe liên tỉnh 24H',
   description:
      'Thuê xe Limousine cao cấp, sang trọng. Nội thất đẹp, tài xế chuyên nghiệp. Dịch vụ VIP 24/7. Đặt xe ngay: 0978 971 421',
   keywords: [
      'thuê xe limousine',
      'xe limousine',
      'đặt xe limousine',
      'xe cao cấp',
      'dịch vụ vip',
   ],
}

// Metadata cho trang bài viết
export const postsMetadata: Metadata = {
   ...baseMetadata,
   title: 'Bài viết - Tin tức thuê xe | Thuê xe liên tỉnh 24H',
   description:
      'Cập nhật tin tức mới nhất về dịch vụ thuê xe, kinh nghiệm du lịch, địa điểm tham quan. Thuê xe liên tỉnh 24H',
   keywords: [
      'tin tức thuê xe',
      'kinh nghiệm du lịch',
      'địa điểm tham quan',
      'bài viết thuê xe',
   ],
}
