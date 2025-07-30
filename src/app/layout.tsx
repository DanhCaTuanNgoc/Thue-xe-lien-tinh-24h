'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { useState } from 'react'

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
         <body className={`${inter.className} overflow-x-hidden overscroll-none`}>
            {/* Header */}
            <header className="w-full shadow bg-white sticky top-0 z-50">
               <div className="w-full flex items-center justify-between py-3 px-4 md:px-25">
                  <Link href="/" className="flex items-center gap-3 transition-opacity">
                     <img
                        src="/globe.svg"
                        alt="Logo"
                        className="h-8 w-8 md:h-10 md:w-10 text-blue-500"
                     />
                     <span className="text-lg md:text-xl font-bold text-black">
                        Thuexelientinh<span className="text-red-700">24H</span>
                     </span>
                  </Link>

                  {/* Desktop Navigation */}
                  <nav className="hidden md:flex gap-6 text-base font-medium gap-15">
                     <Link
                        href="/"
                        className="relative text-black hover:text-red-700 transition group"
                     >
                        Trang chủ
                        <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-red-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                     </Link>

                     {/* Dropdown Menu */}
                     <div className="relative group">
                        <button className="relative text-black hover:text-red-700 transition group flex items-center gap-1">
                           Bảng giá thuê xe
                           <svg
                              className="w-4 h-4 transition-transform group-hover:rotate-180"
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
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 z-50">
                           <div className="py-2">
                              <Link
                                 href="/cars-4"
                                 className="block px-4 py-2 text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors"
                              >
                                 Xe 4 chỗ
                              </Link>
                              <Link
                                 href="/cars-7"
                                 className="block px-4 py-2 text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors"
                              >
                                 Xe 7 chỗ
                              </Link>
                           </div>
                        </div>
                     </div>

                     <Link
                        href="/posts"
                        className="relative text-black hover:text-red-700 transition group"
                     >
                        Bài viết
                        <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-red-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                     </Link>
                  </nav>

                  {/* Desktop Hotline */}
                  <div className="hidden md:flex items-center gap-0 py-2 bg-red-600 px-4 text-white font-bold text-lg rounded-xl shadow-md mx-2 border border-red-700">
                     <span className="mr-1 flex items-center gap-1">Hotline:</span>
                     <a
                        href="tel:0978971421"
                        className="underline underline-offset-4 decoration-2 hover:text-yellow-200 transition-colors duration-200"
                     >
                        0978 971 421
                     </a>
                  </div>

                  {/* Mobile Hamburger Button */}
                  <button
                     onClick={toggleMobileMenu}
                     className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
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
                  className={`md:hidden fixed inset-0 z-50 ${
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
                              className="p-2 hover:bg-gray-100 rounded-full"
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
                                       href="/cars-4"
                                       onClick={closeMobileMenu}
                                       className="block py-2 px-4 text-gray-700 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                       Xe 4 chỗ
                                    </Link>
                                    <Link
                                       href="/cars-7"
                                       onClick={closeMobileMenu}
                                       className="block py-2 px-4 text-gray-700 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                       Xe 7 chỗ
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
                           <div className="bg-red-600 text-white p-4 rounded-lg text-center">
                              <div className="font-bold mb-2">Hotline:</div>
                              <a
                                 href="tel:0978971421"
                                 className="text-xl font-bold underline hover:text-yellow-200 transition-colors"
                                 onClick={closeMobileMenu}
                              >
                                 0978 971 421
                              </a>
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
                  <div>
                     <div className="font-bold text-blue-700 text-lg mb-1">
                        <span className="text-xl font-bold text-black">
                           Thuexelientinh<span className="text-red-700">24H</span>
                        </span>
                     </div>
                     <div>
                        Địa chỉ: 32 Nguyễn Thái Bình, P.Nguyễn Thái Bình, Quận 1, Hồ Chí
                        Minh
                     </div>
                     <div>185 Thống Nhất Mới, Phường 8, Vũng Tàu, Bà Rịa - Vũng Tàu</div>
                  </div>
                  <div>
                     <div className="font-bold">Hotline:</div>
                     <a href="tel:0978971421" className="text-red-700 font-bold text-lg">
                        0978 971 421
                     </a>
                  </div>
                  <div>
                     <div className="font-bold">Loại xe:</div>
                     <div>Hợp đồng 4/7 chỗ đời mới</div>
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
