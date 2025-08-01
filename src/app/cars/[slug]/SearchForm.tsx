'use client'
import React from 'react'

export default function SearchForm() {
   return (
      <form
         className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 rounded-lg p-4 shadow"
         onSubmit={(e) => e.preventDefault()}
      >
         {/* Địa điểm */}
         <div className="flex flex-col w-full md:w-1/4">
            <label htmlFor="search-location" className="font-semibold mb-1 text-gray-700">
               Địa điểm
            </label>
            <input
               id="search-location"
               name="location"
               type="text"
               placeholder="VD: Vũng Tàu, Biên Hòa..."
               className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 placeholder:font-semibold placeholder:text-[14px] text-black bg-white"
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
                  className="border border-gray-300 rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 placeholder:font-semibold placeholder:text-[14px] text-black bg-white"
               />
               <input
                  id="search-distance-max"
                  name="distanceMax"
                  type="number"
                  min={0}
                  placeholder="VD: 100"
                  className="border border-gray-300 rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 placeholder:font-semibold placeholder:text-[14px] text-black bg-white"
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
                  className="border border-gray-300 rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 placeholder:font-semibold placeholder:text-[14px] text-black bg-white"
               />
               <input
                  id="search-price-max"
                  name="priceMax"
                  type="number"
                  min={0}
                  className="border border-gray-300 rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 placeholder:font-semibold placeholder:text-[14px] text-black bg-white"
               />
            </div>
         </div>
         {/* Nút tìm kiếm */}
         <div className="flex items-end w-full md:w-auto">
            <button
               type="submit"
               className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg transition-colors duration-300 shadow flex items-center justify-center gap-2 cursor-pointer w-full md:w-auto"
            >
               <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
               >
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
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
   )
}
