'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
export default function Home() {
   const [currentSlide, setCurrentSlide] = useState(0)

   const slides = [
      {
         image: '/banner.jpg',
         title: 'Thuê xe Sài Gòn <=> Vũng Tàu',
         subtitle: 'Chỉ 850.000đ Có Ngay Xe 4 Chỗ',
         price: '850.000đ',
         buttonText: 'Đặt nhanh - Tư vấn miễn phí',
         link: 'https://zalo.me/0978971421',
      },
      {
         image: '/limouse-banner.jpg',
         title: 'Đặt vé nhanh',
         subtitle: 'Đặt vé Limousine chỉ từ 200.000đ',
         subtitle2: 'Tư vấn báo giá miễn phí 24/7',
         price: '1.200.000đ',
         buttonText: 'Đặt nhanh - Tư vấn miễn phí',
         link: 'https://zalo.me/0978971421',
      },
      {
         image: '/banner3.jpg',
         title: 'Đặt vé Sài Gòn <=> Vũng Tàu',
         subtitle: 'Du lịch biển Vũng Tàu chỉ với 350.000đ',
         price: '350.000đ',
         buttonText: 'Đặt nhanh - Tư vấn miễn phí',
         link: 'https://zalo.me/0978971421',
      },
   ]

   // Auto-play functionality
   useEffect(() => {
      const timer = setInterval(() => {
         setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 15000)

      return () => clearInterval(timer)
   }, [slides.length])

   const goToSlide = (index: number) => {
      setCurrentSlide(index)
   }

   const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
   }

   const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
   }

   return (
      <>
         {/* Banner Carousel Section */}
         <section className="relative w-full h-[280px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden">
            {/* Slides */}
            <div className="relative w-full h-full">
               {slides.map((slide, index) => (
                  <div
                     key={index}
                     className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                     }`}
                  >
                     <Image
                        src={slide.image}
                        alt={`Banner ${index + 1}`}
                        width={1920}
                        height={500}
                        className="w-full h-full object-cover"
                        priority={index === 0}
                     />
                     {/* Overlay content */}
                     <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-3 md:p-4">
                        <div className="bg-[rgba(0,0,0,0.5)] rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl mx-auto">
                           <div className="text-center text-white">
                              <h1 className="text-[20px] sm:text-[25px] md:text-[35px] lg:text-[47px] font-bold mb-2 sm:mb-3 md:mb-4 drop-shadow-lg leading-tight">
                                 {slide.title}
                              </h1>
                              <p className="text-sm sm:text-base md:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 drop-shadow-lg leading-tight">
                                 {slide.subtitle.includes('850.000đ') ? (
                                    <>
                                       Chỉ <span className="text-red-500">850.000đ</span>{' '}
                                       Có Ngay Xe 4 Chỗ
                                    </>
                                 ) : slide.subtitle.includes('350.000đ') ? (
                                    <>
                                       Du lịch biển Vũng Tàu chỉ với{' '}
                                       <span className="text-red-500">350.000đ</span>
                                    </>
                                 ) : slide.subtitle.includes('200.000đ') ? (
                                    <>
                                       Đặt vé Limousine chỉ từ{' '}
                                       <span className="text-red-500">200.000đ</span>
                                    </>
                                 ) : (
                                    slide.subtitle
                                 )}
                              </p>
                              <p className="text-sm sm:text-base md:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 drop-shadow-lg leading-tight">
                                 {slide.subtitle2}
                              </p>
                              <div className="flex justify-center">
                                 <a
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base transition-colors duration-300 shadow-lg flex items-center gap-1 sm:gap-2 cursor-pointer"
                                    href={slide.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                 >
                                    <svg
                                       className="w-3 h-3 sm:w-4 sm:h-4"
                                       fill="currentColor"
                                       viewBox="0 0 20 20"
                                    >
                                       <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    <span className="whitespace-nowrap">
                                       {slide.buttonText}
                                    </span>
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* Navigation Arrows */}
            <button
               onClick={prevSlide}
               className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-300 z-10"
               aria-label="Previous slide"
            >
               <svg
                  className="w-4 h-4 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M15 19l-7-7 7-7"
                  />
               </svg>
            </button>
            <button
               onClick={nextSlide}
               className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-300 z-10"
               aria-label="Next slide"
            >
               <svg
                  className="w-4 h-4 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M9 5l7 7-7 7"
                  />
               </svg>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
               {slides.map((_, index) => (
                  <button
                     key={index}
                     onClick={() => goToSlide(index)}
                     className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                           ? 'bg-white scale-125'
                           : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                     }`}
                     aria-label={`Go to slide ${index + 1}`}
                  />
               ))}
            </div>
         </section>

         {/* Popular Destinations Section */}
         <section className="max-w-6xl mx-auto py-12 px-4">
            <div className="flex flex-col items-center mb-8">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center tracking-wide uppercase">
                  ĐIỂM ĐẾN NỔI BẬT
               </h2>
               <div className="mt-2 flex items-center gap-2">
                  <span className="block w-10 h-1 bg-gray-300 rounded-full"></span>
                  <svg
                     className="w-5 h-5 text-gray-400"
                     fill="currentColor"
                     viewBox="0 0 20 20"
                  >
                     <path d="M10 2a1 1 0 01.894.553l7 14A1 1 0 0117 18H3a1 1 0 01-.894-1.447l7-14A1 1 0 0110 2zm0 3.618L4.618 16h10.764L10 5.618z" />
                  </svg>
                  <span className="block w-10 h-1 bg-gray-300 rounded-full"></span>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {/* Núi Bà Đen */}
               <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 relative overflow-hidden">
                     <Image
                        src="/nuibaden.jpg"
                        alt="Núi Bà Đen"
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                        <div className="text-center text-white">
                           <h3 className="text-2xl font-bold mb-2">NÚI BÀ ĐEN</h3>
                           <p className="text-sm opacity-90">Nóc nhà Nam Bộ</p>
                        </div>
                     </div>
                  </div>
                  <div className="p-6">
                     <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600 font-bold">Tây Ninh</span>
                        <span className="text-red-600 font-bold">1,900,000đ</span>
                     </div>
                     <div className="text-xs text-gray-500 mb-4">
                        <p>• Khoảng cách: 100km</p>
                        <p>• Thời gian: 1 ngày</p>
                        <p>• Xe 4 và 7 chỗ đời mới</p>
                     </div>
                     <Link href="/cars-4" passHref legacyBehavior>
                        <a className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold cursor-pointer block text-center">
                           Xem ngay
                        </a>
                     </Link>
                  </div>
               </div>

               {/* Vũng Tàu */}
               <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 relative overflow-hidden">
                     <Image
                        src="/vungtau.jpg"
                        alt="Vũng Tàu"
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                        <div className="text-center text-white">
                           <h3 className="text-2xl font-bold mb-2">VŨNG TÀU</h3>
                           <p className="text-sm opacity-90">Thành phố biển sôi động</p>
                        </div>
                     </div>
                  </div>
                  <div className="p-6">
                     <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600 font-bold">Vũng Tàu</span>
                        <span className="text-red-600 font-bold">1,500,000đ</span>
                     </div>
                     <div className="text-xs text-gray-500 mb-4">
                        <p>• Khoảng cách: 100km</p>
                        <p>• Thời gian: 1 ngày</p>
                        <p>• Xe 4 và 7 chỗ đời mới</p>
                     </div>
                     <Link href="/cars-4" passHref legacyBehavior>
                        <a className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold cursor-pointer block text-center">
                           Xem ngay
                        </a>
                     </Link>
                  </div>
               </div>

               {/* Phan Thiết */}
               <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 relative overflow-hidden">
                     <Image
                        src="/phanthiet.jpg"
                        alt="Phan Thiết"
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                        <div className="text-center text-white">
                           <h3 className="text-2xl font-bold mb-2">PHAN THIẾT</h3>
                           <p className="text-sm opacity-90">Biển xanh cát trắng</p>
                        </div>
                     </div>
                  </div>
                  <div className="p-6">
                     <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600 font-bold">Phan Thiết</span>
                        <span className="text-red-600 font-bold">2,500,000đ</span>
                     </div>
                     <div className="text-xs text-gray-500 mb-4">
                        <p>• Khoảng cách: 200-400km</p>
                        <p>• Thời gian: 2 ngày</p>
                        <p>• Xe 4 và 7 chỗ đời mới</p>
                     </div>
                     <Link href="/cars-4" passHref legacyBehavior>
                        <a className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold cursor-pointer block text-center">
                           Xem ngay
                        </a>
                     </Link>
                  </div>
               </div>
               {/* Nha Trang */}
               <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 relative overflow-hidden">
                     <Image
                        src="/nhatrang.jpg"
                        alt="Nha Trang"
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                        <div className="text-center text-white">
                           <h3 className="text-2xl font-bold mb-2">Nha Trang</h3>
                           <p className="text-sm opacity-90">Thành phố biển</p>
                        </div>
                     </div>
                  </div>
                  <div className="p-6">
                     <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600 font-bold">Nha Trang</span>
                        <span className="text-red-600 font-bold">2,500,000đ</span>
                     </div>
                     <div className="text-xs text-gray-500 mb-4">
                        <p>• Khoảng cách: 200-400km</p>
                        <p>• Thời gian: 2 ngày</p>
                        <p>• Xe 4 và 7 chỗ đời mới</p>
                     </div>
                     <Link href="/cars-4" passHref legacyBehavior>
                        <a className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold cursor-pointer block text-center">
                           Xem ngay
                        </a>
                     </Link>
                  </div>
               </div>
            </div>
         </section>

         {/* Process Section */}
         <section className="max-w-6xl mx-auto py-12 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
               QUY TRÌNH ĐẶT XE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               {/* Step 1 */}
               <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                     <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">LIÊN HỆ ĐẶT XE</h3>
                  <p className="text-black text-sm">
                     Quý khách liên hệ qua số tổng đài hoặc chat Zalo
                  </p>
               </div>

               {/* Step 2 */}
               <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                     <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">ĐÓN KHÁCH</h3>
                  <p className="text-black text-sm">
                     Đón khách tại các bến xe và điểm đón
                  </p>
               </div>

               {/* Step 3 */}
               <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                     <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">DI CHUYỂN</h3>
                  <p className="text-black text-sm">
                     Xe di chuyển đến các địa điểm đã đặt ban đầu
                  </p>
               </div>

               {/* Step 4 */}
               <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                     <span className="text-white font-bold text-xl">4</span>
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">THANH TOÁN</h3>
                  <p className="text-black text-sm">
                     Thanh toán sau khi đến địa điểm đã đặt
                  </p>
               </div>
            </div>
         </section>
      </>
   )
}

export function HomePage() {
   return (
      <section className="max-w-5xl mx-auto p-4 md:p-8 mt-6">
         <h1 className="text-3xl font-bold mb-4 text-center text-blue-700 drop-shadow">
            Dịch vụ thuê xe liên tỉnh 24H
         </h1>
         <p className="text-center text-gray-600">
            Chúng tôi cung cấp dịch vụ thuê xe 4, 7, 16 chỗ và Limousine với tài xế chuyên
            nghiệp, giá cả minh bạch.
         </p>
      </section>
   )
}
