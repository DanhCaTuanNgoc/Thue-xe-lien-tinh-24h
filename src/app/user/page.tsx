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

         {/* Pricing Section */}
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
                  </tbody>
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
