'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
   return (
      <>
         {/* Banner Section */}
         <section className="relative w-full h-[280px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden">
            <Image
               src="/banner.jpg"
               alt="Banner thuê xe"
               width={1920}
               height={500}
               className="w-full h-full object-cover"
               priority
            />
            {/* Overlay content */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
               <div className="bg-[rgba(0,0,0,0.4)] rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
                  <div className="text-center text-white align-center">
                     <h1 className="text-[35px] md:text-[47px] font-bold mb-4 drop-shadow-lg">
                        BẢNG GIÁ THUÊ XE 7 CHỖ
                     </h1>
                     <p className="text-xl md:text-2xl font-semibold mb-4 drop-shadow-lg">
                        Chỉ <span className="text-red-500 font-bold">950.000đ</span> Có
                        Ngay Xe 7 Chỗ
                     </p>
                     <div className="flex justify-center">
                        <a
                           className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-sm md:text-base transition-colors duration-300 shadow-lg flex items-center gap-2 cursor-pointer"
                           href="https://zalo.me/0978971421"
                           target="_blank"
                        >
                           <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                           >
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                           </svg>
                           Gọi Ngay Đặt Vé
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         {/* Title  */}
         <section className="max-w-5xl mx-auto p-4 md:p-8 !pb-0">
            <div className="text-left border-b border-gray-300 max-w">
               <h1 className="text-[20px] md:text-[30px] font-bold text-black mb-2">
                  Bảng giá thuê xe 7 chỗ mới nhất
               </h1>
            </div>
            {/* <div className="flex justify-center mb-4">
               <Image
                  src="/xe4cho.png"
                  alt="Xe 4 chỗ"
                  width={800}
                  height={600}
                  className="max-w-full h-auto rounded-lg shadow-lg"
               />
            </div> */}
         </section>
         {/* Search Section */}
         <section className="max-w-5xl mx-auto p-0 md:p-8">
            <form
               className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 rounded-lg p-4 shadow"
               onSubmit={(e) => e.preventDefault()}
            >
               {/* Địa điểm */}
               <div className="flex flex-col w-full md:w-1/4">
                  <label
                     htmlFor="search-location"
                     className="font-semibold mb-1 text-gray-700"
                  >
                     Địa điểm
                  </label>
                  <input
                     id="search-location"
                     name="location"
                     type="text"
                     placeholder="VD: Vũng Tàu, Biên Hòa..."
                     className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 placeholder:font-semibold placeholder:text-[14px]"
                  />
               </div>
               {/* Khoảng cách */}
               <div className="flex flex-col w-full md:w-1/4">
                  <label
                     htmlFor="search-distance-min"
                     className="font-semibold mb-1 text-gray-700"
                  >
                     Khoảng cách (Km)
                  </label>
                  <div className="flex gap-2">
                     <input
                        id="search-distance-min"
                        name="distanceMin"
                        type="number"
                        min={0}
                        placeholder="VD: 10"
                        className="border border-gray-300 rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 placeholder:font-semibold placeholder:text-[14px]"
                     />
                     <input
                        id="search-distance-max"
                        name="distanceMax"
                        type="number"
                        min={0}
                        placeholder="VD: 100"
                        className="border border-gray-300 rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 placeholder:font-semibold placeholder:text-[14px]"
                     />
                  </div>
               </div>
               {/* Khoảng giá */}
               <div className="flex flex-col w-full md:w-1/4">
                  <label
                     htmlFor="search-price-min"
                     className="font-semibold mb-1 text-gray-700"
                  >
                     Khoảng giá (VNĐ)
                  </label>
                  <div className="flex gap-2">
                     <input
                        id="search-price-min"
                        name="priceMin"
                        type="number"
                        min={0}
                        className="border border-gray-300 rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 placeholder:font-semibold placeholder:text-[14px]"
                     />
                     <input
                        id="search-price-max"
                        name="priceMax"
                        type="number"
                        min={0}
                        className="border border-gray-300 rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 placeholder:font-semibold placeholder:text-[14px]"
                     />
                  </div>
               </div>
               {/* Nút tìm kiếm */}
               <div className="flex items-end w-full md:w-auto">
                  <button
                     type="submit"
                     className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg transition-colors duration-300 shadow flex items-center gap-2"
                  >
                     <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                     >
                        <circle
                           cx="11"
                           cy="11"
                           r="7"
                           stroke="currentColor"
                           strokeWidth="2"
                        />
                        <line
                           x1="21"
                           y1="21"
                           x2="16.65"
                           y2="16.65"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                        />
                     </svg>
                     Tìm kiếm
                  </button>
               </div>
            </form>
         </section>
         {/* Price Section */}
         <section className="max-w-5xl mx-auto bg-white rounded-lg">
            <div className="overflow-x-auto">
               <table className="min-w-full border border-gray-200 text-sm md:text-base">
                  <thead>
                     <tr className="bg-gray-100 text-gray-700">
                        <th className="px-4 py-2 border-b font-bold text-center">
                           Địa điểm
                        </th>
                        <th className="px-4 py-2 border-b font-bold text-center">
                           Thời gian
                        </th>
                        <th className="px-4 py-2 border-b font-bold text-center">Km</th>
                        <th className="px-4 py-2 border-b font-bold text-center">
                           Xe 4 chỗ
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {/* Hồ Chí Minh */}
                     <tr className="bg-white font-bold text-gray-700">
                        <td className="px-4 py-2 border-b text-left text-gray-700">
                           Hồ Chí Minh
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700"></td>
                        <td className="px-4 py-2 border-b text-center text-gray-700"></td>
                        <td className="px-4 py-2 border-b text-center text-gray-700"></td>
                     </tr>
                     <tr className="bg-gray-50 text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">Sân Bay</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           10
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           500,000
                        </td>
                     </tr>
                     <tr className="bg-white text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">
                           City tour (4 tiếng/50km)
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           50
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           900,000
                        </td>
                     </tr>
                     <tr className="bg-gray-50 text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">
                           City tour{' '}
                           <span className="block text-gray-700">(8 tiếng/100km)</span>
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           100
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,100,000
                        </td>
                     </tr>
                     <tr className="bg-white text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">Củ Chi</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           100
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,100,000
                        </td>
                     </tr>
                     <tr className="bg-gray-50 text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">Cần Giờ</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           130
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,400,000
                        </td>
                     </tr>
                     {/* Bình Dương */}
                     <tr className="bg-white font-bold text-gray-700">
                        <td className="px-4 py-2 border-b text-left text-gray-700">
                           Bình Dương
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700"></td>
                        <td className="px-4 py-2 border-b text-center text-gray-700"></td>
                        <td className="px-4 py-2 border-b text-center text-gray-700"></td>
                     </tr>
                     <tr className="bg-gray-50 text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">Dĩ An</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           50
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,200,000
                        </td>
                     </tr>
                     <tr className="bg-white text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">
                           Khu du lịch Thủy Châu
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           50
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,200,000
                        </td>
                     </tr>
                     <tr className="bg-gray-50 text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">TP Thủ Dầu 1</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           80
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,100,000
                        </td>
                     </tr>
                     <tr className="bg-white text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">
                           KCN VSIP 1 và 2
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           80
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,100,000
                        </td>
                     </tr>
                     <tr className="bg-gray-50 text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">
                           TP mới Bình Dương
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           80
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,200,000
                        </td>
                     </tr>
                     <tr className="bg-white text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">
                           Khu du lịch Đại Nam
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           80
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,100,000
                        </td>
                     </tr>
                     {/* Thêm các chuyến Bình Dương */}
                     <tr className="bg-gray-50 text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">Tân Uyên</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           100
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,400,000
                        </td>
                     </tr>
                     <tr className="bg-white text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">Bến Cát</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           100
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,400,000
                        </td>
                     </tr>
                     <tr className="bg-gray-50 text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">Phú Giáo</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           130
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,500,000
                        </td>
                     </tr>
                     <tr className="bg-white text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">Bàu Bàng</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           130
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,500,000
                        </td>
                     </tr>
                     <tr className="bg-gray-50 text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">Dầu Tiếng</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           170
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,700,000
                        </td>
                     </tr>
                     {/* Bình Phước */}
                     <tr className="bg-white font-bold text-gray-700">
                        <td className="px-4 py-2 border-b text-left text-gray-700">
                           Bình Phước
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700"></td>
                        <td className="px-4 py-2 border-b text-center text-gray-700"></td>
                        <td className="px-4 py-2 border-b text-center text-gray-700"></td>
                     </tr>
                     <tr className="bg-gray-50 text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">Chơn Thành</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           200
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,800,000
                        </td>
                     </tr>
                     <tr className="bg-white text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">Đồng Xoài</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           200
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,800,000
                        </td>
                     </tr>
                     <tr className="bg-gray-50 text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">Bình Long</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           250
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           2,000,000
                        </td>
                     </tr>
                     <tr className="bg-white text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">Lộc Ninh</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           260
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           2,000,000
                        </td>
                     </tr>
                     <tr className="bg-gray-50 text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">Bù Đăng</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           300
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           2,100,000
                        </td>
                     </tr>
                     <tr className="bg-white text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">Phước Long</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           300
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           2,100,000
                        </td>
                     </tr>
                     <tr className="bg-gray-50 text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">Bù Đốp</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           350
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           2,200,000
                        </td>
                     </tr>
                     <tr className="bg-white text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">Bù Gia Mập</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           400
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           2,500,000
                        </td>
                     </tr>
                     {/* Tây Ninh */}
                     <tr className="bg-gray-50 font-bold text-gray-700">
                        <td className="px-4 py-2 border-b text-left text-gray-700">
                           Tây Ninh
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700"></td>
                        <td className="px-4 py-2 border-b text-center text-gray-700"></td>
                        <td className="px-4 py-2 border-b text-center text-gray-700"></td>
                     </tr>
                     <tr className="bg-white text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">Trảng Bàng</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           100
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,400,000
                        </td>
                     </tr>
                     <tr className="bg-gray-50 text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">
                           cửa khẩu Mộc Bài
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           150
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,400,000
                        </td>
                     </tr>
                     <tr className="bg-white text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">Gò Dầu</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           150
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,400,000
                        </td>
                     </tr>
                     <tr className="bg-gray-50 text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">TP Tây Ninh</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           200
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,800,000
                        </td>
                     </tr>
                     <tr className="bg-white text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">
                           Tòa thánh Tây Ninh
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           200
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,800,000
                        </td>
                     </tr>
                     <tr className="bg-gray-50 text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">
                           Long Hoa Hòa Thành
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           200
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,800,000
                        </td>
                     </tr>
                     <tr className="bg-white text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">chùa Gò Kén</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           200
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,800,000
                        </td>
                     </tr>
                     <tr className="bg-gray-50 text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">
                           Dương Minh Châu
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           200
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,800,000
                        </td>
                     </tr>
                     <tr className="bg-white text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">
                           Châu thành Tây Ninh
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           220
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,900,000
                        </td>
                     </tr>
                     <tr className="bg-gray-50 text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">Núi Bà Đen</td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           220
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1,900,000
                        </td>
                     </tr>
                     <tr className="bg-white text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">
                           Tân Châu Đồng Pan
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           250
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           2,000,000
                        </td>
                     </tr>
                     <tr className="bg-gray-50 text-gray-700">
                        <td className="px-4 py-2 border-b text-gray-700">
                           Tân Biên Xa Mát
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           1 ngày
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           260
                        </td>
                        <td className="px-4 py-2 border-b text-center text-gray-700">
                           2,100,000
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </section>
      </>
   )
}
