'use client'

import React, { useRef } from 'react'
import type { CarType } from '../../../../lib/models/car_type'

interface CarTypeManagementProps {
   carTypes: CarType[]
   carTypeForm: Partial<Omit<CarType, 'id'>>
   editingCarTypeId: number | null
   loading: boolean
   onCarTypeFormChange: (form: Partial<Omit<CarType, 'id'>>) => void
   onCarTypeSubmit: (e: React.FormEvent) => void
   onCarTypeEdit: (carType: CarType) => void
   onCarTypeDelete: (id: number) => void
   onCancelEdit: () => void
   onImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function CarTypeManagement({
   carTypes,
   carTypeForm,
   editingCarTypeId,
   loading,
   onCarTypeFormChange,
   onCarTypeSubmit,
   onCarTypeEdit,
   onCarTypeDelete,
   onCancelEdit,
   onImageUpload,
}: CarTypeManagementProps) {
   const fileInputRef = useRef<HTMLInputElement>(null)

   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files) return

      const file = files[0]
      if (file && file.type.startsWith('image/')) {
         const reader = new FileReader()
         reader.onload = (event) => {
            const result = event.target?.result as string
            onCarTypeFormChange({ ...carTypeForm, image: result })
         }
         reader.readAsDataURL(file)
      }
   }

   return (
      <div className="space-y-6">
         {/* Form thêm/sửa loại xe ở trên */}
         <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
               <span className="text-blue-600">🚙</span>
               {editingCarTypeId ? 'Sửa loại xe' : 'Thêm loại xe mới'}
            </h2>

            <form onSubmit={onCarTypeSubmit} className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                     required
                     placeholder="Tên loại xe (ví dụ: Xe 4 chỗ)"
                     className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500"
                     value={carTypeForm.name || ''}
                     onChange={(e) =>
                        onCarTypeFormChange({ ...carTypeForm, name: e.target.value })
                     }
                  />
                  <input
                     required
                     placeholder="Slug (ví dụ: cars-4)"
                     className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500"
                     value={carTypeForm.slug || ''}
                     onChange={(e) =>
                        onCarTypeFormChange({ ...carTypeForm, slug: e.target.value })
                     }
                  />
                  <input
                     placeholder="Giá giới thiệu (ví dụ: 850.000đ)"
                     className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500"
                     value={carTypeForm.description_price || ''}
                     onChange={(e) =>
                        onCarTypeFormChange({
                           ...carTypeForm,
                           description_price: e.target.value,
                        })
                     }
                  />
               </div>

               {/* Image Upload Section */}
               <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">
                     Hình ảnh loại xe
                  </label>
                  {/* File Upload */}
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                     <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                     />
                     <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-700 transition-all duration-200 cursor-pointer"
                     >
                        📁 Chọn ảnh từ máy tính
                     </button>
                     <p className="text-sm text-slate-500 mt-2">
                        Chọn ảnh đại diện cho loại xe
                     </p>
                  </div>

                  {/* Image Preview */}
                  {carTypeForm.image && (
                     <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-slate-700">
                           Ảnh đã chọn
                        </h4>
                        <div className="relative inline-block">
                           <img
                              src={carTypeForm.image}
                              alt="Preview"
                              className="w-32 h-32 object-cover rounded-lg border-2 border-slate-200"
                           />
                           <button
                              type="button"
                              onClick={() =>
                                 onCarTypeFormChange({ ...carTypeForm, image: '' })
                              }
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors cursor-pointer"
                           >
                              ×
                           </button>
                        </div>
                     </div>
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
                        : editingCarTypeId
                        ? '💾 Cập nhật'
                        : '➕ Thêm mới'}
                  </button>
                  {editingCarTypeId && (
                     <button
                        type="button"
                        className="bg-slate-500 text-white rounded-lg px-6 py-3 font-semibold hover:bg-slate-600 transition-colors cursor-pointer"
                        onClick={onCancelEdit}
                     >
                        ❌ Hủy
                     </button>
                  )}
               </div>
            </form>
         </div>

         {/* Danh sách loại xe ở dưới */}
         <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
               <span className="text-blue-600">📋</span>
               Danh sách loại xe ({carTypes.length})
            </h3>
            <div className="space-y-3">
               {carTypes.map((carType) => (
                  <div
                     key={carType.id}
                     className="border-2 border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-slate-50"
                  >
                     <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1">
                           <div className="font-semibold text-slate-800 flex items-center gap-3">
                              {carType.image && (
                                 <img
                                    src={carType.image}
                                    alt={carType.name}
                                    className="w-12 h-12 object-cover rounded-lg border border-slate-300"
                                 />
                              )}
                              <span>{carType.name}</span>
                           </div>
                           <div className="text-sm text-slate-600 mt-1">
                              Slug:{' '}
                              <span className="font-mono bg-slate-200 px-2 py-1 rounded">
                                 {carType.slug}
                              </span>
                              {carType.description_price && (
                                 <span className="ml-3">
                                    • {carType.description_price}
                                 </span>
                              )}
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <button
                              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold cursor-pointer"
                              onClick={() => onCarTypeEdit(carType)}
                           >
                              ✏️ Sửa
                           </button>
                           <button
                              className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold cursor-pointer"
                              onClick={() => onCarTypeDelete(carType.id)}
                           >
                              🗑️ Xóa
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
               {carTypes.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                     <div className="text-4xl mb-2">🚙</div>
                     <div>Chưa có loại xe nào trong danh sách</div>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}
