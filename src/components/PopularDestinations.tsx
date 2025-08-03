import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { fetchFeaturedLocations } from '../lib/repositories/featuredLocationApi'
import type { FeaturedLocation } from '../lib/models/featuredLocation'

export default function PopularDestinations() {
   const [locations, setLocations] = useState<FeaturedLocation[]>([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      fetchFeaturedLocations()
         .then((data) => setLocations(data))
         .finally(() => setLoading(false))
   }, [])

   return (
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
         {loading ? (
            <div className="flex flex-col items-center justify-center py-8 text-slate-500">
               <svg
                  className="animate-spin h-8 w-8 text-red-500 mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
               >
                  <circle
                     className="opacity-25"
                     cx="12"
                     cy="12"
                     r="10"
                     stroke="currentColor"
                     strokeWidth="4"
                  ></circle>
                  <path
                     className="opacity-75"
                     fill="currentColor"
                     d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
               </svg>
               Đang tải dữ liệu...
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {locations.map((location) => (
                  <div
                     key={location.id}
                     className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                     <div className="h-48 relative overflow-hidden">
                        <Image
                           src={location.image_url}
                           alt={location.title}
                           width={400}
                           height={200}
                           className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                           <div className="text-center text-white">
                              <h3 className="text-2xl font-bold mb-2">
                                 {location.title}
                              </h3>
                              {location.subtitle && (
                                 <p className="text-sm opacity-90">{location.subtitle}</p>
                              )}
                           </div>
                        </div>
                     </div>
                     <div className="p-6">
                        <div className="flex justify-between items-center mb-3">
                           <span className="text-gray-600 font-bold">
                              {location.name}
                           </span>
                           <span className="text-red-600 font-bold">
                              {location.price?.toLocaleString()}đ
                           </span>
                        </div>
                        <div className="text-xs text-gray-500 mb-4">
                           <p>• Khoảng cách: {location.distance_km}km</p>
                           <p>• Thời gian: {location.duration_days} ngày</p>
                           <p>• {location.car_description}</p>
                        </div>
                        <Link
                           href="https://zalo.me/0978971421"
                           className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold cursor-pointer block text-center"
                           target="_blank"
                        >
                           Liên hệ ngay
                        </Link>
                     </div>
                  </div>
               ))}
               {locations.length === 0 && (
                  <div className="text-center py-8 text-slate-500 w-full col-span-4">
                     Chưa có địa điểm nổi bật nào.
                  </div>
               )}
            </div>
         )}
      </section>
   )
}
