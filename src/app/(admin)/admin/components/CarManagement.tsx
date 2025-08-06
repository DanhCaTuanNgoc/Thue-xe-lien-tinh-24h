'use client'

import React, { useState, useMemo } from 'react'
import type { Car } from '../../../../lib/models/car'
import type { CarType } from '../../../../lib/models/car_type'
import ExcelImport from './excel/ExcelImport'
import ExcelExport from './excel/ExcelExport'
import { deleteAllCars } from '../../../../lib/repositories/carApi'

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
   onReloadCars: () => void // Thêm callback để reload cars
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
   onReloadCars,
}: CarManagementProps) {
   // State cho tìm kiếm
   const [searchLocation, setSearchLocation] = useState('')
   const [selectedCarType, setSelectedCarType] = useState(Number)
   const [priceMin, setPriceMin] = useState('')
   const [priceMax, setPriceMax] = useState('')

   // State cho Excel import/export
   const [showExcelTools, setShowExcelTools] = useState(false)

   // State cho validation errors
   const [errors, setErrors] = useState<{
      province?: string
      end_location?: string
      distance?: string
      price?: number
      time?: string
      slug?: string // Thêm validation cho loại xe
      id_car_type?: number
   }>({})

   // State for deleting all cars
   const [deletingAll, setDeletingAll] = useState(false)

   // Hàm kiểm tra ký tự hợp lệ cho text
   const isValidTextCharacter = (char: string) => {
      return /[a-zA-ZÀ-ỹ0-9\s]/.test(char)
   }

   const formatPrice = (price: number | string) => {
      if (typeof price === 'string') price = Number(price.replace(/,/g, ''))
      if (isNaN(price)) return ''
      return price.toLocaleString('en-US')
   }

   // Hàm xử lý input text với validation
   const handleTextInputChange = (field: string, value: string) => {
      // Kiểm tra từng ký tự cho tất cả các trường
      const invalidChars = value.split('').filter((char) => !isValidTextCharacter(char))

      if (invalidChars.length > 0) {
         setErrors((prev) => ({
            ...prev,
            [field]: `Không được chứa ký tự đặc biệt: ${invalidChars.join(', ')}`,
         }))
         return
      }

      // Xóa lỗi nếu input hợp lệ
      setErrors((prev) => ({
         ...prev,
         [field]: undefined,
      }))

      onCarFormChange({
         ...carForm,
         [field]: value,
      })
   }

   // Hàm xử lý input số với validation
   const handleNumberInputChange = (field: string, value: string) => {
      // Kiểm tra xem có phải toàn số không (không có dấu chấm)
      if (value && !/^\d+$/.test(value)) {
         setErrors((prev) => ({
            ...prev,
            [field]: 'Chỉ được nhập số nguyên từ 0-9',
         }))
         return
      }

      if (!value.trim()) {
         setErrors((prev) => ({
            ...prev,
            [field]: `Trường này là bắt buộc`,
         }))
      } else {
         setErrors((prev) => ({
            ...prev,
            [field]: undefined,
         }))
      }

      // Xóa lỗi nếu input hợp lệ
      setErrors((prev) => ({
         ...prev,
         [field]: undefined,
      }))

      onCarFormChange({
         ...carForm,
         [field]: value ? Number(value) : undefined,
      })
   }

   // Hàm xử lý select loại xe với validation
   const handleCarTypeChange = (id: number) => {
      // Xóa lỗi nếu input hợp lệ
      setErrors((prev) => ({
         ...prev,
         id_car_type: id,
      }))

      onCarFormChange({ ...carForm, id_car_type: id })
   }

   // Lọc xe theo các tiêu chí
   const filteredCars = useMemo(() => {
      return cars.filter((car) => {
         // Lọc theo địa điểm (tỉnh hoặc điểm đến)
         const matchesLocation =
            !searchLocation ||
            car.province.toLowerCase().includes(searchLocation.toLowerCase()) ||
            car.end_location.toLowerCase().includes(searchLocation.toLowerCase())

         // Lọc theo loại xe
         const matchesCarType = !selectedCarType || car.id_car_type === selectedCarType

         // Lọc theo khoảng giá
         const matchesPrice = (() => {
            // If no price filters are set, return true
            if (!priceMin && !priceMax) return true

            // Convert car price to number for comparison (remove commas first)
            const carPriceString = String(car.price || '').replace(/,/g, '')
            const carPrice = Number(carPriceString)
            if (isNaN(carPrice)) return false

            // Check min price
            if (priceMin && carPrice < Number(priceMin)) return false

            // Check max price
            if (priceMax && carPrice > Number(priceMax)) return false

            return true
         })()

         return matchesLocation && matchesCarType && matchesPrice
      })
   }, [cars, searchLocation, selectedCarType, priceMin, priceMax])

   // Handlers cho Excel import/export
   const handleImportComplete = () => {
      // Reload cars sau khi import
      onReloadCars()
   }

   const handleImportError = (message: string) => {
      alert('Lỗi import: ' + message)
   }

   // Handler for deleting all cars
   const handleDeleteAllCars = async () => {
      if (
         !window.confirm(
            'Bạn có chắc chắn muốn xóa tất cả xe? Hành động này không thể hoàn tác!',
         )
      )
         return
      setDeletingAll(true)
      try {
         await deleteAllCars()
         onReloadCars()
      } catch (err) {
         alert('Lỗi khi xóa tất cả xe!')
         console.log(err)
      } finally {
         setDeletingAll(false)
      }
   }

   return (
      <div className="space-y-6">
         {/* Excel Tools Toggle */}
         <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                  <span className="text-purple-600">📊</span>
                  Công cụ Excel
               </h3>
               <button
                  type="button"
                  onClick={() => setShowExcelTools(!showExcelTools)}
                  className="bg-purple-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2 cursor-pointer"
               >
                  {showExcelTools ? '🔽 Ẩn' : '🔼 Hiện'} Công cụ Excel
               </button>
            </div>
         </div>

         {/* Excel Import/Export Tools */}
         {showExcelTools && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <ExcelImport
                  onImportComplete={handleImportComplete}
                  onError={handleImportError}
                  carTypes={carTypes}
               />
               <ExcelExport cars={cars} carTypes={carTypes} />
            </div>
         )}

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
                     placeholder="Tỉnh*"
                     className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500"
                     value={carForm.province || ''}
                     onChange={(e) => handleTextInputChange('province', e.target.value)}
                  />
                  <input
                     required
                     placeholder="Điểm đến*"
                     className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500"
                     value={carForm.end_location || ''}
                     onChange={(e) =>
                        handleTextInputChange('end_location', e.target.value)
                     }
                  />
                  <input
                     type="number"
                     required
                     placeholder="Quãng đường (km) *"
                     className={`border-2 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500 ${
                        errors.distance ? 'border-red-500' : 'border-slate-200'
                     }`}
                     value={carForm.distance || ''}
                     onChange={(e) => handleNumberInputChange('distance', e.target.value)}
                     onKeyDown={(e) => {
                        // Cho phép: số, backspace, delete, arrow keys, tab, enter
                        const allowedKeys = [
                           'Backspace',
                           'Delete',
                           'Tab',
                           'Enter',
                           'ArrowLeft',
                           'ArrowRight',
                           'ArrowUp',
                           'ArrowDown',
                        ]
                        const isNumber = /[0-9]/.test(e.key)
                        const isAllowedKey = allowedKeys.includes(e.key)

                        if (!isNumber && !isAllowedKey) {
                           e.preventDefault()
                        }
                     }}
                  />
                  {errors.distance && (
                     <p className="text-red-500 text-xs mt-1">{errors.distance}</p>
                  )}
                  <select
                     required
                     className={`border-2 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 ${
                        errors.id_car_type ? 'border-red-500' : 'border-slate-200'
                     }`}
                     value={carForm.id_car_type}
                     onChange={(e) => handleCarTypeChange(Number(e.target.value))}
                  >
                     <option value="">-- Chọn loại xe * --</option>
                     {carTypes.map((carType) => (
                        <option key={carType.id} value={carType.id}>
                           {carType.name}
                        </option>
                     ))}
                  </select>
                  {errors.id_car_type && (
                     <p className="text-red-500 text-xs mt-1">{errors.id_car_type}</p>
                  )}
                  <input
                     required
                     placeholder="Giá (VNĐ)"
                     className={`border-2 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500 ${
                        errors.price ? 'border-red-500' : 'border-slate-200'
                     }`}
                     value={carForm.price || ''}
                     onChange={(e) => handleNumberInputChange('price', e.target.value)}
                     onKeyDown={(e) => {
                        // Cho phép: số, backspace, delete, arrow keys, tab, enter
                        const allowedKeys = [
                           'Backspace',
                           'Delete',
                           'Tab',
                           'Enter',
                           'ArrowLeft',
                           'ArrowRight',
                           'ArrowUp',
                           'ArrowDown',
                        ]
                        const isNumber = /[0-9]/.test(e.key)
                        const isAllowedKey = allowedKeys.includes(e.key)

                        if (!isNumber && !isAllowedKey) {
                           e.preventDefault()
                        }
                     }}
                  />
                  {errors.price && (
                     <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                  )}
                  <input
                     type="number"
                     required
                     placeholder="Thời gian (ngày) *"
                     className={`border-2 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500 ${
                        errors.time ? 'border-red-500' : 'border-slate-200'
                     }`}
                     value={carForm.time || ''}
                     onChange={(e) => handleNumberInputChange('time', e.target.value)}
                     onKeyDown={(e) => {
                        // Cho phép: số, backspace, delete, arrow keys, tab, enter
                        const allowedKeys = [
                           'Backspace',
                           'Delete',
                           'Tab',
                           'Enter',
                           'ArrowLeft',
                           'ArrowRight',
                           'ArrowUp',
                           'ArrowDown',
                        ]
                        const isNumber = /[0-9]/.test(e.key)
                        const isAllowedKey = allowedKeys.includes(e.key)

                        if (!isNumber && !isAllowedKey) {
                           e.preventDefault()
                        }
                     }}
                  />
                  {errors.time && (
                     <p className="text-red-500 text-xs mt-1">{errors.time}</p>
                  )}
               </div>
               <div className="flex gap-3">
                  <button
                     type="submit"
                     className="bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 cursor-pointer"
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
               {/* Tìm theo địa điểm */}
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                     Địa điểm
                  </label>
                  <input
                     type="text"
                     placeholder="Nhập địa điểm..."
                     className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800"
                     value={searchLocation}
                     onChange={(e) => setSearchLocation(e.target.value)}
                  />
               </div>

               {/* Tìm theo loại xe */}
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                     Loại xe
                  </label>
                  <select
                     className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800"
                     value={selectedCarType}
                     onChange={(e) => setSelectedCarType(Number(e.target.value))}
                  >
                     <option value="">Tất cả loại xe</option>
                     {carTypes.map((carType) => (
                        <option key={carType.id} value={carType.id}>
                           {carType.name}
                        </option>
                     ))}
                  </select>
               </div>

               {/* Tìm theo khoảng giá */}
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                     Khoảng giá (VNĐ)
                  </label>
                  <div className="flex gap-2">
                     <input
                        type="number"
                        placeholder="Từ"
                        className="w-1/2 border-2 border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800"
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                     />
                     <input
                        type="number"
                        placeholder="Đến"
                        className="w-1/2 border-2 border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800"
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                     />
                  </div>
               </div>
            </div>
         </div>

         {/* Danh sách xe ở dưới */}
         <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                  <span className="text-blue-600">📋</span>
                  Danh sách xe ({filteredCars.length})
               </h3>
               {cars.length > 0 && (
                  <button
                     className="bg-red-600 cursor-pointer text-white rounded-lg px-4 py-2 font-semibold hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                     onClick={handleDeleteAllCars}
                     disabled={deletingAll || loading}
                  >
                     {deletingAll ? 'Đang xóa tất cả...' : '🗑️ Xóa tất cả'}
                  </button>
               )}
            </div>
            <div className="space-y-3">
               {filteredCars.map((car) => (
                  <div
                     key={car.id}
                     className="border-2 border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-slate-50"
                  >
                     <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1">
                           <div className="font-semibold text-slate-800">
                              <span className="text-blue-600">Tỉnh: {car.province}</span>
                              <span className="mx-2">|</span>
                              <span className="text-blue-700">
                                 Địa điểm: {car.end_location}
                              </span>
                           </div>
                           <div className="text-sm text-slate-600 mt-1">
                              {car.id_car_type && (
                                 <span className="mr-2">
                                    Loại xe:{' '}
                                    {carTypes.find((ct) => ct.id === car.id_car_type)
                                       ?.name || car.id_car_type}
                                 </span>
                              )}
                              {car.distance && (
                                 <span className="mr-2">• {car.distance}km</span>
                              )}
                              {car.price && (
                                 <span className="mr-2">
                                    • {formatPrice(car.price)} VNĐ
                                 </span>
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
