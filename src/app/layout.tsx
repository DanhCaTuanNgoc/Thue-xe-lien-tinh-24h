'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { useState } from 'react'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

   const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen)
   }

   const closeMobileMenu = () => {
      setIsMobileMenuOpen(false)
   }

   return (
      <html lang="vi">
         <Head>
            {/* Primary Meta Tags */}
            <title>Thuê xe liên tỉnh 24H - Dịch vụ thuê xe uy tín, chất lượng cao</title>
            <meta
               name="title"
               content="Thuê xe liên tỉnh 24H - Dịch vụ thuê xe uy tín, chất lượng cao"
            />
            <meta
               name="description"
               content="Thuê xe liên tỉnh 24H cung cấp dịch vụ thuê xe 4 chỗ, 7 chỗ, 16 chỗ và Limousine chất lượng cao. Đặt xe nhanh chóng, giá cả hợp lý, tài xế chuyên nghiệp. Hotline: 0978 971 421"
            />
            <meta
               name="keywords"
               content="thuê xe, thuê xe liên tỉnh, xe 4 chỗ, xe 7 chỗ, xe 16 chỗ, limousine, đặt xe, thuê xe du lịch, xe đưa đón, taxi đường dài"
            />
            <meta name="author" content="Thuê xe liên tỉnh 24H" />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="Vietnamese" />
            <meta name="revisit-after" content="7 days" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://thue-xe-lien-tinh-24h.vercel.app/" />
            <meta
               property="og:title"
               content="Thuê xe liên tỉnh 24H - Dịch vụ thuê xe uy tín, chất lượng cao"
            />
            <meta
               property="og:description"
               content="Thuê xe liên tỉnh 24H cung cấp dịch vụ thuê xe 4 chỗ, 7 chỗ, 16 chỗ và Limousine chất lượng cao. Đặt xe nhanh chóng, giá cả hợp lý, tài xế chuyên nghiệp."
            />
            <meta
               property="og:image"
               content="https://thue-xe-lien-tinh-24h.vercel.app/banner.jpg"
            />
            <meta property="og:site_name" content="Thuê xe liên tỉnh 24H" />
            <meta property="og:locale" content="vi_VN" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta
               property="twitter:url"
               content="https://thue-xe-lien-tinh-24h.vercel.app/"
            />
            <meta
               property="twitter:title"
               content="Thuê xe liên tỉnh 24H - Dịch vụ thuê xe uy tín, chất lượng cao"
            />
            <meta
               property="twitter:description"
               content="Thuê xe liên tỉnh 24H cung cấp dịch vụ thuê xe 4 chỗ, 7 chỗ, 16 chỗ và Limousine chất lượng cao. Đặt xe nhanh chóng, giá cả hợp lý, tài xế chuyên nghiệp."
            />
            <meta
               property="twitter:image"
               content="https://thue-xe-lien-tinh-24h.vercel.app/banner.jpg"
            />

            {/* Additional SEO Meta Tags */}
            <meta name="theme-color" content="#dc2626" />
            <meta name="msapplication-TileColor" content="#dc2626" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="Thuê xe liên tỉnh 24H" />

            {/* Canonical URL */}
            <link rel="canonical" href="https://thue-xe-lien-tinh-24h.vercel.app/" />

            {/* Favicon */}
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />

            {/* Structured Data / JSON-LD */}
            <script
               type="application/ld+json"
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                     '@context': 'https://schema.org',
                     '@type': 'LocalBusiness',
                     name: 'Thuê xe liên tỉnh 24H',
                     description: 'Dịch vụ thuê xe liên tỉnh chất lượng cao',
                     url: 'https://thue-xe-lien-tinh-24h.vercel.app/',
                     telephone: '+84978971421',
                     address: {
                        '@type': 'PostalAddress',
                        streetAddress: '32 Nguyễn Thái Bình, P.Nguyễn Thái Bình, Quận 1',
                        addressLocality: 'Hồ Chí Minh',
                        addressCountry: 'VN',
                     },
                     geo: {
                        '@type': 'GeoCoordinates',
                        latitude: '10.7769',
                        longitude: '106.7009',
                     },
                     openingHours: 'Mo-Su 00:00-23:59',
                     priceRange: '$$',
                     serviceArea: {
                        '@type': 'GeoCircle',
                        geoMidpoint: {
                           '@type': 'GeoCoordinates',
                           latitude: '10.7769',
                           longitude: '106.7009',
                        },
                        geoRadius: '500000',
                     },
                     sameAs: ['https://zalo.me/0978971421'],
                  }),
               }}
            />
         </Head>
         <body className={`${inter.className} overflow-x-hidden overscroll-none`}>
            {/* Header */}
            <header className="w-full shadow-md bg-white sticky top-0 z-50">
               <div className="w-full flex items-center justify-between py-3 px-4 md:px-25">
                  <Link href="/" className="flex items-center gap-3 transition-opacity">
                     <span className="relative flex items-center">
                        <img
                           src="/car-icon.png"
                           alt="Logo"
                           className="h-10 w-12 md:h-10 md:w-12 text-blue-500"
                           style={{
                              transform: 'scale(1.5)',
                              zIndex: 1,
                              position: 'relative',
                           }}
                        />
                     </span>
                     <span className="text-lg md:text-xl font-bold text-black">
                        Thuexelientinh<span className="text-red-700">24H</span>
                     </span>
                  </Link>

                  {/* Desktop Navigation */}
                  <nav className="hidden lg:flex gap-4 xl:gap-15 text-sm xl:text-base font-medium">
                     <Link
                        href="/"
                        className="relative text-black hover:text-red-700 transition group whitespace-nowrap"
                     >
                        Trang chủ
                        <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-red-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                     </Link>

                     {/* Dropdown Menu */}
                     <div className="relative group">
                        <button className="relative text-black hover:text-red-700 transition group flex items-center gap-1 whitespace-nowrap">
                           <span className="text-sm xl:text-base">Bảng giá thuê xe</span>
                           <svg
                              className="w-3 h-3 xl:w-4 xl:h-4 transition-transform group-hover:rotate-180"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                           >
                              <path
                                 fillRule="evenodd"
                                 d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                 clipRule="evenodd"
                              />
                           </svg>
                           <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-red-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </button>

                        {/* Dropdown Content */}
                        <div className="absolute top-full left-0 mt-2 w-40 xl:w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 z-50">
                           <div className="py-2">
                              <Link
                                 href="/cars/cars-4"
                                 className="block px-3 xl:px-4 py-2 text-sm xl:text-base text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors"
                              >
                                 Xe 4 chỗ
                              </Link>
                              <Link
                                 href="/cars/cars-7"
                                 className="block px-3 xl:px-4 py-2 text-sm xl:text-base text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors"
                              >
                                 Xe 7 chỗ
                              </Link>
                              <Link
                                 href="/cars/cars-16"
                                 className="block px-3 xl:px-4 py-2 text-sm xl:text-base text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors"
                              >
                                 Xe 16 chỗ
                              </Link>
                              <Link
                                 href="/cars/cars-limousine"
                                 className="block px-3 xl:px-4 py-2 text-sm xl:text-base text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors"
                              >
                                 Xe Limousine
                              </Link>
                           </div>
                        </div>
                     </div>

                     <Link
                        href="/posts"
                        className="relative text-black hover:text-red-700 transition group whitespace-nowrap"
                     >
                        <span className="text-sm xl:text-base">Bài viết</span>
                        <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-red-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                     </Link>
                  </nav>

                  {/* Desktop Hotline */}
                  <div className="hidden md:flex items-center gap-2 py-1.5 xl:py-2 bg-gradient-to-r from-red-600 to-red-700 px-3 xl:px-4 text-white font-bold text-base xl:text-xl rounded-xl shadow-md mx-2 border border-red-700 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 relative overflow-hidden group">
                     <div className="flex items-center gap-2 relative z-10">
                        <div className="relative">
                           <svg
                              className="w-4 h-4 xl:w-5 xl:h-5 animate-pulse text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                           >
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                           </svg>
                           <div className="absolute inset-0 w-4 h-4 xl:w-5 xl:h-5 rounded-full ring-2 ring-red-400 animate-ping"></div>
                        </div>
                        <span className="text-sm xl:text-base">Hotline:</span>
                     </div>
                     <a
                        href="tel:0978971421"
                        className="underline underline-offset-4 decoration-2 hover:text-yellow-200 transition-colors duration-200 text-sm xl:text-base font-bold relative z-10"
                     >
                        0978 971 421
                     </a>
                     {/* Animated background effect */}
                     <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Mobile Hamburger Button */}
                  <button
                     onClick={toggleMobileMenu}
                     className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
                     aria-label="Toggle mobile menu"
                  >
                     <span
                        className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                           isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                        }`}
                     ></span>
                     <span
                        className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                           isMobileMenuOpen ? 'opacity-0' : ''
                        }`}
                     ></span>
                     <span
                        className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                           isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                        }`}
                     ></span>
                  </button>
               </div>

               {/* Mobile Menu Drawer */}
               <div
                  className={`lg:hidden fixed inset-0 z-50 ${
                     isMobileMenuOpen ? 'block' : 'hidden'
                  }`}
               >
                  {/* Backdrop */}
                  <div className="absolute inset-0" onClick={closeMobileMenu}></div>

                  {/* Drawer Content */}
                  <div
                     className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
                        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                     }`}
                  >
                     <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                           <span className="text-lg font-bold text-black">
                              Thuexelientinh<span className="text-red-700">24H</span>
                           </span>
                           <button
                              onClick={closeMobileMenu}
                              className="p-2 hover:bg-gray-100 rounded-full text-black cursor-pointer"
                           >
                              <svg
                                 className="w-6 h-6"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                 />
                              </svg>
                           </button>
                        </div>

                        {/* Mobile Navigation */}
                        <nav className="flex-1 p-4">
                           <div className="space-y-4">
                              <Link
                                 href="/"
                                 onClick={closeMobileMenu}
                                 className="block py-3 px-4 text-lg text-black hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                 Trang chủ
                              </Link>

                              {/* Mobile Dropdown */}
                              <div className="space-y-2">
                                 <div className="py-3 px-4 text-lg text-black font-medium">
                                    Bảng giá thuê xe
                                 </div>
                                 <div className="pl-4 space-y-2">
                                    <Link
                                       href="/cars/cars-4"
                                       onClick={closeMobileMenu}
                                       className="block py-2 px-4 text-gray-700 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                       Xe 4 chỗ
                                    </Link>
                                    <Link
                                       href="/cars/cars-7"
                                       onClick={closeMobileMenu}
                                       className="block py-2 px-4 text-gray-700 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                       Xe 16 chỗ
                                    </Link>
                                    <Link
                                       href="/cars/cars-16"
                                       onClick={closeMobileMenu}
                                       className="block py-2 px-4 text-gray-700 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                       Xe 7 chỗ
                                    </Link>
                                    <Link
                                       href="/cars/cars-limousine"
                                       onClick={closeMobileMenu}
                                       className="block py-2 px-4 text-gray-700 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                       Xe Limousine
                                    </Link>
                                 </div>
                              </div>

                              <Link
                                 href="/posts"
                                 onClick={closeMobileMenu}
                                 className="block py-3 px-4 text-lg text-black hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                 Bài viết
                              </Link>
                           </div>
                        </nav>

                        {/* Mobile Hotline */}
                        <div className="p-4 border-t">
                           <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-lg text-center hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 relative overflow-hidden group">
                              <div className="font-bold mb-2 flex items-center justify-center gap-2 relative z-10">
                                 <div className="relative">
                                    <svg
                                       className="w-5 h-5 animate-pulse text-white"
                                       fill="currentColor"
                                       viewBox="0 0 20 20"
                                    >
                                       <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    <div className="absolute inset-0 w-5 h-5 rounded-full ring-2 ring-red-400 animate-ping"></div>
                                 </div>
                                 <span>Hotline:</span>
                              </div>
                              <a
                                 href="tel:0978971421"
                                 className="text-xl font-bold underline hover:text-yellow-200 transition-colors relative z-10"
                                 onClick={closeMobileMenu}
                              >
                                 0978 971 421
                              </a>
                              {/* Animated background effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </header>

            {/* Main content */}
            <main className="flex-1 w-full bg-white pb-8">{children}</main>
            {/* Footer */}
            <footer className="w-full bg-gray-100 border-t">
               <div className="max-w-7xl mx-auto py-6 px-4 flex flex-col md:flex-row justify-between gap-4 text-gray-700 text-sm">
                  <div className="w-s">
                     <div className="font-bold text-blue-700 text-lg mb-1">
                        <span className="text-xl font-bold text-black">
                           Thuexelientinh<span className="text-red-700">24H</span>
                        </span>
                     </div>
                     <div>
                        Địa chỉ: 409/40/66/5 Huỳnh Thị Hai, phường Tân Chánh Hiệp, Quận
                        12, TP.HCM
                     </div>
                  </div>
                  <div>
                     <div className="font-bold">Hotline:</div>
                     <a href="tel:0978971421" className="text-red-700 font-bold text-lg">
                        0978 971 421
                     </a>
                  </div>
                  <div>
                     <div className="font-bold">Loại xe:</div>
                     <div>Hợp đồng 4/7/16/Limousine chỗ đời mới</div>
                  </div>
                  <div>
                     <div className="font-bold">Dịch vụ:</div>
                     <div>Thuê xe riêng, Limousine, Tour du lịch</div>
                  </div>
               </div>
               <div className="text-center text-xs text-gray-500 pb-2">
                  © {new Date().getFullYear()} THUÊ XE LIÊN TỈNH 24H. All rights reserved.
               </div>
            </footer>

            {/* Fixed Contact Buttons */}
            <div className="fixed bottom-6 right-6 flex flex-col gap-5 z-50">
               {/* Phone Button */}
               <a
                  href="tel:0978971421"
                  className="relative bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ripple"
                  title="Gọi điện thoại"
               >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                     <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping"></div>
               </a>

               <a
                  href="https://zalo.me/0978971421"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative bg-white-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                  title="Chat Zalo"
               >
                  <img src="/zalo_icon.png" alt="Zalo" className="w-9 h-9" />
                  <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping"></div>
               </a>
            </div>
         </body>
      </html>
   )
}
