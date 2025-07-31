import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import CarSearchClient from './CarSearchClient'

const supabase = createClient(
   process.env.NEXT_PUBLIC_SUPABASE_URL!,
   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export default async function CarTypePage({ params }: { params: { slug: string } }) {
   // Fetch dữ liệu từ Supabase
   const { data, error } = await supabase
      .from('car_types')
      .select('*')
      .eq('slug', params.slug)
      .single()

   if (error || !data) {
      return (
         <div className="text-center py-20 text-red-600">Không tìm thấy danh mục xe!</div>
      )
   }

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
            <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-3 md:p-4">
               <div className="bg-[rgba(0,0,0,0.5)] rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl mx-auto">
                  <div className="text-center text-white">
                     <h1 className="text-[20px] sm:text-[25px] md:text-[35px] lg:text-[47px] font-bold mb-2 sm:mb-3 md:mb-4 drop-shadow-lg leading-tight">
                        {data.title || `BẢNG GIÁ THUÊ ${data.name?.toUpperCase()}`}
                     </h1>
                     <p className="text-sm sm:text-base md:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 drop-shadow-lg leading-tight">
                        {data.description || (
                           <>
                              Chỉ từ{' '}
                              <span className="text-red-500 font-bold">
                                 {data.description_price}
                              </span>{' '}
                              Có Ngay {data.name}
                           </>
                        )}
                     </p>
                     <div className="flex justify-center">
                        <a
                           className="bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base transition-colors duration-300 shadow-lg flex items-center gap-1 sm:gap-2 cursor-pointer"
                           href={data.contact_url || 'https://zalo.me/0978971421'}
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
         <section className="max-w-5xl mx-auto pt-4 md:pt-8 !pb-0">
            <div className="text-left border-b border-gray-300 max-w">
               <h1 className="text-[20px] md:text-[30px] font-bold text-black mb-2 pl-4">
                  {`Bảng giá thuê ${data.name?.toLowerCase()} mới nhất`}
               </h1>
            </div>
            <div className="max-w mt-4 text-center items-center flex justify-center">
               <Image
                  src={data.img_url}
                  alt={data.name}
                  width={650}
                  height={800}
                  className="max-w-full h-auto rounded-lg shadow-lg"
               />
            </div>
         </section>
         {/* Search Section */}
         <section className="max-w-5xl mx-auto pt-4 md:pt-8 pb-4">
            <CarSearchClient slug={params.slug} />
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
