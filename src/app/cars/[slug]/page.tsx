import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import CarSearchClient from './CarSearchClient'
import { fetchCarTypeBySlug } from '@/lib/repositories/car_typeApi'

const supabase = createClient(
   process.env.NEXT_PUBLIC_SUPABASE_URL!,
   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export default async function CarTypePage(props: { params: { slug: string } }) {
   const params = props.params
   const decodedSlug = decodeURIComponent(params.slug)

   const data = await fetchCarTypeBySlug(decodedSlug)

   if (!data) {
      return (
         <div className="max-h-screen text-center py-20 text-red-600">
            Không tìm thấy danh mục xe!
         </div>
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
                        BẢNG GIÁ THUÊ {data.name?.toUpperCase()}
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
            {data.img_url && (
               <div className="max-w mt-4 text-center items-center flex justify-center">
                  <Image
                     src={data.img_url}
                     alt={data.name}
                     width={650}
                     height={800}
                     className="max-w-full h-auto rounded-lg shadow-lg"
                  />
               </div>
            )}
         </section>
         {/* Search Section */}
         <section className="max-w-5xl mx-auto pt-4 md:pt-8 pb-4">
            <CarSearchClient slug={params.slug} />
         </section>
      </>
   )
}
