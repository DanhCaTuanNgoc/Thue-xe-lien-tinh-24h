'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
   return (
      <>
         {/* Banner Section */}
         <section className="relative w-full md:h-[350px] overflow-hidden">
            <Image
               src="/banner.jpg"
               alt="Banner thuê xe"
               width={1920}
               height={500}
               className="w-full h-full object-cover"
               priority
            />
         </section>
         {/* Pricing Section
         <section className="max-w-5xl mx-auto bg-white rounded-lg p-4 md:p-8 pb-8 mt-6 shadow-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-2 text-center">
               BẢNG GIÁ THUÊ XE 4 CHỖ
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
               <div className="text-lg font-semibold text-black">
                  Chỉ <span className="text-red-600 text-2xl font-bold">850.000đ</span> Có
                  Ngay Xe 4 Chỗ
               </div>
               <div className="bg-yellow-400 px-4 py-2 rounded shadow font-bold text-lg text-red-700 flex items-center gap-2">
                  <span>Hotline:</span>
                  <a href="tel:0978971421" className="underline">
                     0978 971 421
                  </a>
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="min-w-full border border-gray-300 text-sm md:text-base">
                  <thead className="bg-red-600 text-white">
                     <tr>
                        <th className="p-2 border">Địa điểm</th>
                        <th className="p-2 border">Thời gian</th>
                        <th className="p-2 border">Km</th>
                        <th className="p-2 border">Xe 4 chỗ</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr className="bg-gray-50 font-bold">
                        <td colSpan={4} className="text-black">
                           Hồ Chí Minh
                        </td>
                     </tr>
                     <tr>
                        <td className="border p-2 text-black">Sân Bay</td>
                        <td className="border p-2 text-black">1 ngày</td>
                        <td className="border p-2 text-black">10</td>
                        <td className="border p-2 text-black">500,000</td>
                     </tr>
                     <tr>
                        <td className="border p-2 text-black">
                           City tour (4 tiếng/50km)
                        </td>
                        <td className="border p-2 text-black">1 ngày</td>
                        <td className="border p-2 text-black">50</td>
                        <td className="border p-2 text-black">900,000</td>
                     </tr>
                     <tr>
                        <td className="border p-2 text-black">
                           City tour (8 tiếng/100km)
                        </td>
                        <td className="border p-2 text-black">1 ngày</td>
                        <td className="border p-2 text-black">100</td>
                        <td className="border p-2 text-black">1,100,000</td>
                     </tr>
                     <tr>
                        <td className="border p-2 text-black">Củ Chi</td>
                        <td className="border p-2 text-black">1 ngày</td>
                        <td className="border p-2 text-black">100</td>
                        <td className="border p-2 text-black">1,100,000</td>
                     </tr>
                     <tr>
                        <td className="border p-2 text-black">Cần Giờ</td>
                        <td className="border p-2 text-black">1 ngày</td>
                        <td className="border p-2 text-black">130</td>
                        <td className="border p-2 text-black">1,400,000</td>
                     </tr>
                     <tr className="bg-gray-50 font-bold">
                        <td colSpan={4} className="text-black">
                           Bình Dương
                        </td>
                     </tr>
                     <tr>
                        <td className="border p-2 text-black">Dĩ An</td>
                        <td className="border p-2 text-black">1 ngày</td>
                        <td className="border p-2 text-black">50</td>
                        <td className="border p-2 text-black">1,200,000</td>
                     </tr>
                     <tr>
                        <td className="border p-2 text-black">Khu du lịch Thủy Châu</td>
                        <td className="border p-2 text-black">1 ngày</td>
                        <td className="border p-2 text-black">50</td>
                        <td className="border p-2 text-black">1,200,000</td>
                     </tr>
                     <tr>
                        <td className="border p-2 text-black">TP Thủ Dầu 1</td>
                        <td className="border p-2 text-black">1 ngày</td>
                        <td className="border p-2 text-black">80</td>
                        <td className="border p-2 text-black">1,100,000</td>
                     </tr>
                     <tr>
                        <td className="border p-2 text-black">KCN VSIP 1 và 2</td>
                        <td className="border p-2 text-black">1 ngày</td>
                        <td className="border p-2 text-black">80</td>
                        <td className="border p-2 text-black">1,100,000</td>
                     </tr>
                     <tr>
                        <td className="border p-2 text-black">TP mới Bình Dương</td>
                        <td className="border p-2 text-black">1 ngày</td>
                        <td className="border p-2 text-black">80</td>
                        <td className="border p-2 text-black">1,200,000</td>
                     </tr>
                     <tr>
                        <td className="border p-2 text-black">Khu du lịch Đại Nam</td>
                        <td className="border p-2 text-black">1 ngày</td>
                        <td className="border p-2 text-black">80</td>
                        <td className="border p-2 text-black">1,100,000</td>
                     </tr>
                     <tr>
                        <td className="border p-2 text-black">Tân Uyên</td>
                        <td className="border p-2 text-black">1 ngày</td>
                        <td className="border p-2 text-black">100</td>
                        <td className="border p-2 text-black">1,200,000</td>
                     </tr>
                     <tr>
                        <td className="border p-2 text-black">Bến Cát</td>
                        <td className="border p-2 text-black">1 ngày</td>
                        <td className="border p-2 text-black">100</td>
                        <td className="border p-2 text-black">1,200,000</td>
                     </tr>
                     <tr>
                        <td className="border p-2 text-black">Phú Giáo</td>
                        <td className="border p-2 text-black">1 ngày</td>
                        <td className="border p-2 text-black">130</td>
                        <td className="border p-2 text-black">1,300,000</td>
                     </tr>
                     <tr>
                        <td className="border p-2 text-black">Bàu Bàng</td>
                        <td className="border p-2 text-black">1 ngày</td>
                        <td className="border p-2 text-black">130</td>
                        <td className="border p-2 text-black">1,300,000</td>
                     </tr>
                     <tr>
                        <td className="border p-2 text-black">Dầu Tiếng</td>
                        <td className="border p-2 text-black">1 ngày</td>
                        <td className="border p-2 text-black">170</td>
                        <td className="border p-2 text-black">1,500,000</td>
                     </tr>
                     {/* ...Thêm các địa điểm khác nếu muốn... */}
         {/* </tbody>
               </table>
            </div>
            <div className="mt-6 text-black text-sm">
               <div className="font-bold mb-1">Bảng giá trên đã bao gồm:</div>
               <ul className="list-disc pl-6">
                  <li>Xe ô tô 4 chỗ đời mới nhất được quý khách tận tay chọn lựa.</li>
                  <li>
                     Bảo hiểm bắt buộc (tai nạn 100 triệu/người, thân vỏ xe, miễn trừ
                     trách nhiệm).
                  </li>
                  <li>Phí xăng dầu đi đường, bảo dưỡng xe.</li>
               </ul>
               <div className="mt-2">
                  Một số hạng mục như: thuế VAT 10%, phí qua trạm, tiền lưu trú qua đêm
                  của người lái xe,… sẽ được tư vấn cụ thể, minh bạch.
               </div>
            </div>
         </section> */}
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
               {/* Đồng Nai */}
               <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 relative overflow-hidden">
                     <Image
                        src="/dongnai.png"
                        alt="Đồng Nai"
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                        <div className="text-center text-white">
                           <h3 className="text-2xl font-bold mb-2">ĐỒNG NAI</h3>
                           <p className="text-sm opacity-90">Thành phố công nghiệp</p>
                        </div>
                     </div>
                  </div>
                  <div className="p-6">
                     <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600 font-bold">Biên Hòa</span>
                        <span className="text-red-600 font-bold">1,200,000đ</span>
                     </div>
                     <div className="text-xs text-gray-500 mb-4">
                        <p>• Khoảng cách: 60km</p>
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

               {/* TP Huế */}
               <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 relative overflow-hidden">
                     <Image
                        src="/hue.jpg"
                        alt="Huế"
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                        <div className="text-center text-white">
                           <h3 className="text-2xl font-bold mb-2">TP HUẾ</h3>
                           <p className="text-sm opacity-90">Cố đô lịch sử</p>
                        </div>
                     </div>
                  </div>
                  <div className="p-6">
                     <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600 font-bold">TP Huế</span>
                        <span className="text-red-600 font-bold">14,000,000đ</span>
                     </div>
                     <div className="text-xs text-gray-500 mb-4">
                        <p>• Khoảng cách: 2,200km</p>
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

               {/* Lâm Đồng */}
               <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 relative overflow-hidden">
                     <Image
                        src="/lamdong.jpg"
                        alt="Lâm Đồng"
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                        <div className="text-center text-white">
                           <h3 className="text-2xl font-bold mb-2">ĐÀ LẠT</h3>
                           <p className="text-sm opacity-90">Thành phố ngàn hoa</p>
                        </div>
                     </div>
                  </div>
                  <div className="p-6">
                     <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600 font-bold">Đà Lạt</span>
                        <span className="text-red-600 font-bold">3,300,000đ</span>
                     </div>
                     <div className="text-xs text-gray-500 mb-4">
                        <p>• Khoảng cách: 600km</p>
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

               {/* Đắk Lắk */}
               <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 relative overflow-hidden">
                     <Image
                        src="/daklak.jpg"
                        alt="ĐẮK LẮK"
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                        <div className="text-center text-white">
                           <h3 className="text-2xl font-bold mb-2">ĐẮK LẮK</h3>
                           <p className="text-sm opacity-90">Tây Nguyên hùng vĩ</p>
                        </div>
                     </div>
                  </div>
                  <div className="p-6">
                     <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600 font-bold">Buôn Đôn</span>
                        <span className="text-red-600 font-bold">3,200,000đ</span>
                     </div>
                     <div className="text-xs text-gray-500 mb-4">
                        <p>• Khoảng cách: 720km</p>
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
