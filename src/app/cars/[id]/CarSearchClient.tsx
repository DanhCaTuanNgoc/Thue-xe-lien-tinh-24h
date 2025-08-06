'use client'
import { useEffect, useState, useMemo } from 'react'
import type { Car } from '../../../lib/models/car'
import { fetchCarByType } from '../../../lib/repositories/carApi'

function formatPrice(price: number | string) {
   if (typeof price === 'string') price = Number(price.replace(/,/g, ''))
   if (isNaN(price)) return ''
   return price.toLocaleString('en-US')
}

export default function CarSearchClient({ id }: { id: number }) {
   const [cars, setCars] = useState<Car[]>([])
   const [loading, setLoading] = useState(false)

   // Search state
   const [searchLocation, setSearchLocation] = useState('')
   const [priceMin, setPriceMin] = useState('')
   const [priceMax, setPriceMax] = useState('')

   // Tải tất cả dữ liệu xe khi component mount
   useEffect(() => {
      setLoading(true)
      fetchCarByType(id)
         .then((data) => {
            setCars(data)
         })
         .finally(() => setLoading(false))
   }, [id])

   // Filter cars based on search criteria
   const filteredCars = useMemo(() => {
      return cars.filter((car) => {
         // Filter by location (province or end_location)
         const locationMatch =
            !searchLocation ||
            car.province.toLowerCase().includes(searchLocation.toLowerCase()) ||
            car.end_location.toLowerCase().includes(searchLocation.toLowerCase())

         // Filter by price range
         const priceMatch = (() => {
            // If no price filters are set, return true
            if (!priceMin && !priceMax) return true

            // Lấy giá thấp nhất giữa price_1 và price_2 để so sánh
            const carPrice1 = car.price_1 || 0
            const carPrice2 = car.price_2 || 0
            const minCarPrice = carPrice1 > 0 && carPrice2 > 0 ? Math.min(carPrice1, carPrice2) : carPrice1 || carPrice2

            if (minCarPrice === 0) return false

            // Check min price
            if (priceMin && minCarPrice < Number(priceMin)) return false

            // Check max price
            if (priceMax && minCarPrice > Number(priceMax)) return false

            return true
         })()

         return locationMatch && priceMatch
      })
   }, [cars, searchLocation, priceMin, priceMax])

   const handleSearch = (e: React.FormEvent) => {
      e.preventDefault()
      // Search is handled by filteredCars automatically
   }

   const clearSearch = () => {
      setSearchLocation('')
      setPriceMin('')
      setPriceMax('')
   }

   return (
      <div>
         <form
            className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 rounded-lg p-4 shadow"
            onSubmit={handleSearch}
         >
            {/* Địa điểm */}
            <div className="flex flex-col w-full md:w-1/3">
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
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 placeholder:font-semibold placeholder:text-[14px] text-black bg-white"
               />
            </div>

            {/* Khoảng giá */}
            <div className="flex flex-col w-full md:w-1/3">
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
                     placeholder="Từ"
                     value={priceMin}
                     onChange={(e) => setPriceMin(e.target.value)}
                     className="border border-gray-300 rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 placeholder:font-semibold placeholder:text-[14px] text-black bg-white"
                  />
                  <input
                     id="search-price-max"
                     name="priceMax"
                     type="number"
                     min={0}
                     placeholder="Đến"
                     value={priceMax}
                     onChange={(e) => setPriceMax(e.target.value)}
                     className="border border-gray-300 rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 placeholder:font-semibold placeholder:text-[14px] text-black bg-white"
                  />
               </div>
            </div>
            {/* Nút tìm kiếm */}
            <div className="flex items-end gap-2 w-full md:w-1/3 mt-6">
               <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg transition-colors duration-300 shadow flex items-center justify-center gap-2 cursor-pointer flex-1"
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
               <button
                  type="button"
                  onClick={clearSearch}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 rounded-lg transition-colors duration-300 shadow flex items-center justify-center gap-2 cursor-pointer"
               >
                  🗑️ Xóa
               </button>
            </div>
         </form>

         {/* Search Results Info */}
         {/* <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
               <span className="text-blue-800 font-medium">
                  Kết quả tìm kiếm: {filteredCars.length} xe
               </span>
               {(searchLocation || priceMin || priceMax) && (
                  <span className="text-blue-600 text-sm">
                     Đang lọc dữ liệu...
                  </span>
               )}
            </div>
         </div> */}

         <div className="overflow-x-auto pt-4">
            <table className="min-w-full border border-gray-200 text-sm md:text-base">
               <thead>
                  <tr className="bg-gray-100 text-gray-700">
                     <th className="px-4 py-2 border-b font-bold text-center">Tỉnh</th>
                     <th className="px-4 py-2 border-b font-bold text-center">
                        Điểm đến
                     </th>
                     <th className="px-4 py-2 border-b font-bold text-center">
                        Số chiều
                     </th>
                     <th className="px-4 py-2 border-b font-bold text-center">
                        Khoảng cách (Km)
                     </th>
                     <th className="px-4 py-2 border-b font-bold text-center">Giá</th>
                  </tr>
               </thead>
               <tbody>
                  {loading && (
                     <tr>
                        <td colSpan={5} className="text-center py-4 text-gray-400">
                           Đang tải dữ liệu...
                        </td>
                     </tr>
                  )}
                  {!loading && filteredCars.length === 0 && (
                     <tr>
                        <td colSpan={5} className="text-center py-4 text-gray-400">
                           {cars.length === 0
                              ? 'Hiện chưa có dữ liệu'
                              : 'Không tìm thấy xe phù hợp với bộ lọc'}
                        </td>
                     </tr>
                  )}
                  {!loading &&
                     filteredCars.map((item) => (
                        <tr
                           key={item.id}
                           className="bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                           <td className="px-4 py-2 border-b text-gray-700">
                              {item.province}
                           </td>
                           <td className="px-4 py-2 border-b text-gray-700">
                              {item.end_location}
                           </td>
                           <td className="px-4 py-2 border-b text-center text-gray-700">
                              {item.price_1 && item.price_2 ? '2' : '1'} chiều
                           </td>
                           <td className="px-4 py-2 border-b text-center text-gray-700">
                              {item.distance}
                           </td>
                           <td className="px-4 py-2 border-b text-center text-gray-700">
                              {item.price_1 && item.price_2 
                                 ? `${formatPrice(item.price_1)} - ${formatPrice(item.price_2)}đ`
                                 : item.price_1 
                                    ? `${formatPrice(item.price_1)}đ`
                                    : item.price_2 
                                       ? `${formatPrice(item.price_2)}đ`
                                       : 'Liên hệ'
                              }
                           </td>
                        </tr>
                     ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}
