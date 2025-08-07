import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayoutShell from './ClientLayoutShell'

export const metadata = {
   title: 'Du lịch liên tỉnh 24H',
   description:
      'Thuê xe liên tỉnh 24H cung cấp dịch vụ thuê xe 4 chỗ, 7 chỗ, 16 chỗ và Limousine chất lượng cao. Đặt xe nhanh chóng, giá cả hợp lý, tài xế chuyên nghiệp. Hotline: 0978 971 421',
   icons: {
      icon: '/car-icon.png',
      apple: '/car-icon.png',
   },
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="vi">
         <head>
            {/* Google tag (gtag.js) */}
            <script
               async
               src="https://www.googletagmanager.com/gtag/js?id=AW-17393577943"
            ></script>
            <script
               dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'AW-17393577943');
                  `,
               }}
            />
         </head>
         <body className={`${inter.className} overflow-x-hidden overscroll-none`}>
            <ClientLayoutShell>{children}</ClientLayoutShell>
         </body>
      </html>
   )
}
