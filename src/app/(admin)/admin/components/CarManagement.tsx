'use client'

import React, { useState, useMemo } from 'react'
import type { Car } from '../../../../lib/models/car'
import type { CarType } from '../../../../lib/models/car_type'

interface CarManagementProps {
   cars: Car[]
   carTypes: CarType[] // Thêm prop carTypes
   carForm: Partial<Omit<Car, 'id'>>
   editingCarId: string | null
   loading: boolean
   onCarFormChange: (form: Partial<Omit<Car, 'id'>>) => void
   onCarSubmit: (e: React.FormEvent) => void
   onCarEdit: (car: Car) => void
   onCarDelete: (id: string) => void
   onCancelEdit: () => void
}

export default function CarManagement({
   cars,
   carTypes,
   carForm,
   editingCarId,
   loading,
   onCarFormChange,
   onCarSubmit,
   onCarEdit,
   onCarDelete,
   onCancelEdit,
}: CarManagementProps) {
   // State cho tìm kiếm
   const [startLocation, setStartLocation] = useState('')
   const [endLocation, setEndLocation] = useState('')
   const [selectedCarType, setSelectedCarType] = useState('')

   // Lọc xe theo các tiêu chí
   const filteredCars = useMemo(() => {
      return cars.filter((car) => {
         // Lọc theo điểm đón
         const matchesStartLocation =
            !startLocation ||
            car.start_location.toLowerCase().includes(startLocation.toLowerCase())

         // Lọc theo điểm đến
         const matchesEndLocation =
            !endLocation ||
            car.end_location.toLowerCase().includes(endLocation.toLowerCase())

         // Lọc theo loại xe
         const matchesCarType = !selectedCarType || car.slug === selectedCarType

         return matchesStartLocation && matchesEndLocation && matchesCarType
      })
   }, [cars, startLocation, endLocation, selectedCarType])

   const clearFilters = () => {
      setStartLocation('')
      setEndLocation('')
      setSelectedCarType('')
   }

   return (
      <div className="space-y-6">
         {/* Form thêm/sửa xe ở trên */}
         <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
               <span className="text-blue-600">🚗</span>
               {editingCarId ? 'Sửa thông tin xe' : 'Thêm xe mới'}
            </h2>

            <form onSubmit={onCarSubmit} className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                     required
                     placeholder="Điểm đón"
                     className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500"
                     value={carForm.start_location || ''}
                     onChange={(e) =>
                        onCarFormChange({ ...carForm, start_location: e.target.value })
                     }
                  />
                  <input
                     required
                     placeholder="Điểm đến"
                     className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500"
                     value={carForm.end_location || ''}
                     onChange={(e) =>
                        onCarFormChange({ ...carForm, end_location: e.target.value })
                     }
                  />
                  <input
                     type="number"
                     placeholder="Quãng đường (km)"
                     className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500"
                     value={carForm.distance || ''}
                     onChange={(e) =>
                        onCarFormChange({ ...carForm, distance: Number(e.target.value) })
                     }
                  />
                  <select
                     className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800"
                     value={carForm.slug || ''}
                     onChange={(e) =>
                        onCarFormChange({ ...carForm, slug: e.target.value })
                     }
                  >
                     <option value="">-- Chọn loại xe --</option>
                     {carTypes.map((carType) => (
                        <option key={carType.id} value={carType.slug}>
                           {carType.name} ({carType.slug})
                        </option>
                     ))}
                  </select>
                  <input
                     required
                     placeholder="Giá (VNĐ)"
                     className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500"
                     value={carForm.price || ''}
                     onChange={(e) =>
                        onCarFormChange({ ...carForm, price: e.target.value })
                     }
                  />
                  <input
                     type="number"
                     placeholder="Thời gian (ngày)"
                     className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500"
                     value={carForm.time || ''}
                     onChange={(e) =>
                        onCarFormChange({ ...carForm, time: Number(e.target.value) })
                     }
                  />
               </div>
               <div className="flex gap-3">
                  <button
                     type="submit"
                     className="bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                     disabled={loading}
                  >
                     {loading
                        ? '⏳ Đang xử lý...'
                        : editingCarId
                        ? '💾 Cập nhật'
                        : '➕ Thêm mới'}
                  </button>
                  {editingCarId && (
                     <button
                        type="button"
                        className="bg-slate-500 text-white rounded-lg px-6 py-3 font-semibold hover:bg-slate-600 transition-colors"
                        onClick={onCancelEdit}
                     >
                        ❌ Hủy
                     </button>
                  )}
               </div>
            </form>
         </div>

         {/* Tìm kiếm */}
         <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
               <span className="text-blue-600">🔍</span>
               Tìm kiếm xe
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
               {/* Tìm theo điểm đón */}
               <div>
                  <input
                     type="text"
                     placeholder="Nhập điểm đón..."
                     className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800"
                     value={startLocation}
                     onChange={(e) => setStartLocation(e.target.value)}
                  />
               </div>

               {/* Tìm theo điểm đến */}
               <div>
                  <input
                     type="text"
                     placeholder="Nhập điểm đến..."
                     className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800"
                     value={endLocation}
                     onChange={(e) => setEndLocation(e.target.value)}
                  />
               </div>

               {/* Tìm theo loại xe */}
               <div>
                  <select
                     className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800"
                     value={selectedCarType}
                     onChange={(e) => setSelectedCarType(e.target.value)}
                  >
                     <option value="">Tất cả loại xe</option>
                     {carTypes.map((carType) => (
                        <option key={carType.id} value={carType.slug}>
                           {carType.name}
                        </option>
                     ))}
                  </select>
               </div>
            </div>
         </div>

         {/* Danh sách xe ở dưới */}
         <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
               <span className="text-blue-600">📋</span>
               Danh sách xe ({filteredCars.length})
            </h3>
            <div className="space-y-3">
               {filteredCars.map((car) => (
                  <div
                     key={car.id}
                     className="border-2 border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-slate-50"
                  >
                     <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1">
                           <div className="font-semibold text-slate-800">
                              <span className="text-blue-600">{car.start_location}</span>
                              <span className="mx-2">→</span>
                              <span className="text-blue-700">{car.end_location}</span>
                           </div>
                           <div className="text-sm text-slate-600 mt-1">
                              {car.slug && (
                                 <span className="mr-2">
                                    Loại xe:{' '}
                                    {carTypes.find((ct) => ct.slug === car.slug)?.name ||
                                       car.slug}
                                 </span>
                              )}
                              {car.distance && (
                                 <span className="mr-2">• {car.distance}km</span>
                              )}
                              {car.price && (
                                 <span>• {car.price.toLocaleString()} VNĐ</span>
                              )}
                              {car.time && <span>• {car.time} ngày</span>}
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <button
                              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold cursor-pointer"
                              onClick={() => onCarEdit(car)}
                           >
                              ✏️ Sửa
                           </button>
                           <button
                              className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold cursor-pointer"
                              onClick={() => onCarDelete(car.id)}
                           >
                              🗑️ Xóa
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
               {filteredCars.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                     <div className="text-4xl mb-2">🚗</div>
                     <div>
                        {cars.length === 0
                           ? 'Chưa có xe nào trong danh sách'
                           : 'Không tìm thấy xe phù hợp với bộ lọc'}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}
