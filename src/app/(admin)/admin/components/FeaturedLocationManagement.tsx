'use client'

import React, { useState, useMemo } from 'react'
import type { FeaturedLocation } from '../../../../lib/models/featuredLocation'

interface FeaturedLocationManagementProps {
   locations: FeaturedLocation[]
   locationForm: Partial<Omit<FeaturedLocation, 'id'>>
   editingLocationId: number | null
   loading: boolean
   onLocationFormChange: (form: Partial<Omit<FeaturedLocation, 'id'>>) => void
   onLocationSubmit: (e: React.FormEvent) => void
   onLocationEdit: (location: FeaturedLocation) => void
   onLocationDelete: (id: number) => void
   onCancelEdit: () => void
}

export default function FeaturedLocationManagement({
   locations,
   locationForm,
   editingLocationId,
   loading,
   onLocationFormChange,
   onLocationSubmit,
   onLocationEdit,
   onLocationDelete,
   onCancelEdit,
}: FeaturedLocationManagementProps) {
   // State cho tìm kiếm
   const [searchTitle, setSearchTitle] = useState('')
   const [imagePreview, setImagePreview] = useState<string | null>(null)
   const fileInputRef = React.useRef<HTMLInputElement>(null)

   // State cho validation errors
   const [errors, setErrors] = useState<{
      title?: string
      name?: string
      subtitle?: string
      car_description?: string
      price?: string
      distance_km?: string
      duration_days?: string
      image_url?: string
   }>({})

   // Hàm kiểm tra ký tự hợp lệ
   const isValidCharacter = (char: string) => {
      return /[a-zA-ZÀ-ỹ0-9\s]/.test(char)
   }

   // Hàm xử lý input với validation
   const handleInputChange = (field: string, value: string) => {
      // Bỏ qua validation cho phụ đề và mô tả xe
      if (field === 'subtitle' || field === 'car_description') {
         onLocationFormChange({
            ...locationForm,
            [field]: value,
         })
         return
      }

      // Kiểm tra từng ký tự cho các trường khác
      const invalidChars = value.split('').filter((char) => !isValidCharacter(char))

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

      onLocationFormChange({
         ...locationForm,
         [field]: value,
      })
   }

   // Hàm xử lý input số với validation
   const handleNumberInputChange = (field: string, value: string) => {
      // Kiểm tra xem có phải toàn số không
      if (value && !/^\d+$/.test(value)) {
         setErrors((prev) => ({
            ...prev,
            [field]: 'Chỉ được nhập số từ 0-9',
         }))
         return
      }

      // Xóa lỗi nếu input hợp lệ
      setErrors((prev) => ({
         ...prev,
         [field]: undefined,
      }))

      onLocationFormChange({
         ...locationForm,
         [field]: value ? Number(value) : undefined,
      })
   }

   // Lọc địa điểm theo tiêu đề
   const filteredLocations = useMemo(() => {
      return locations.filter((location) => {
         const matchesTitle =
            !searchTitle ||
            location.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
            location.name.toLowerCase().includes(searchTitle.toLowerCase())

         return matchesTitle
      })
   }, [locations, searchTitle])

   const clearFilters = () => {
      setSearchTitle('')
   }

   // Hàm xử lý upload ảnh với validation
   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
         // Create a preview URL for the selected image
         const reader = new FileReader()
         reader.onload = (event) => {
            setImagePreview(event.target?.result as string)
         }
         reader.readAsDataURL(file)

         // For now, we'll just store the file name as the image URL
         // In a real application, you'd upload the file to a server and get back a URL
         onLocationFormChange({ ...locationForm, image_url: file.name })

         // Xóa lỗi ảnh nếu có
         setErrors((prev) => ({
            ...prev,
            image_url: undefined,
         }))
      } else {
         // Nếu không chọn file, hiển thị lỗi
         setErrors((prev) => ({
            ...prev,
            image_url: 'Vui lòng chọn một ảnh',
         }))
      }
   }

   // Hàm kiểm tra ảnh khi blur khỏi upload area
   const handleImageAreaBlur = () => {
      if (!locationForm.image_url && !imagePreview) {
         setErrors((prev) => ({
            ...prev,
            image_url: 'Vui lòng chọn một ảnh',
         }))
      }
   }

   const clearImagePreview = () => {
      setImagePreview(null)
      onLocationFormChange({ ...locationForm, image_url: '' })
      // Clear the file input
      if (fileInputRef.current) {
         fileInputRef.current.value = ''
      }
      // Xóa lỗi ảnh nếu có
      setErrors((prev) => ({
         ...prev,
         image_url: undefined,
      }))
   }

   // Handle editing a location - clear image preview when starting to edit
   const handleEditLocation = (location: FeaturedLocation) => {
      setImagePreview(null) // Clear any existing image preview
      onLocationEdit(location)
      // Clear the file input
      if (fileInputRef.current) {
         fileInputRef.current.value = ''
      }
   }

   // Reset image preview when form is cleared (after submit or cancel)
   React.useEffect(() => {
      // Check if form is empty (no data in any field)
      const isFormEmpty =
         !locationForm.title &&
         !locationForm.name &&
         !locationForm.subtitle &&
         !locationForm.price &&
         !locationForm.distance_km &&
         !locationForm.duration_days &&
         !locationForm.car_description &&
         !locationForm.image_url

      if (isFormEmpty && !editingLocationId) {
         setImagePreview(null)
      }
   }, [editingLocationId, locationForm])

   // Kiểm tra validation ảnh khi form thay đổi
   React.useEffect(() => {
      // Nếu có dữ liệu khác nhưng không có ảnh, hiển thị lỗi
      const hasOtherData =
         locationForm.title ||
         locationForm.name ||
         locationForm.subtitle ||
         locationForm.price ||
         locationForm.distance_km ||
         locationForm.duration_days ||
         locationForm.car_description

      if (hasOtherData && !locationForm.image_url && !imagePreview) {
         setErrors((prev) => ({
            ...prev,
            image_url: 'Vui lòng chọn một ảnh',
         }))
      }
   }, [locationForm, imagePreview])

   // Hàm kiểm tra form có hợp lệ không
   const isFormValid = () => {
      return !Object.values(errors).some((error) => error !== undefined)
   }

   // Hàm xử lý submit với validation
   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()

      // Kiểm tra các trường bắt buộc
      const requiredFields = [
         'title',
         'name',
         'price',
         'distance_km',
         'duration_days',
         'image_url',
      ]
      const missingFields = requiredFields.filter(
         (field) => !locationForm[field as keyof typeof locationForm],
      )

      if (missingFields.length > 0) {
         setErrors((prev) => ({
            ...prev,
            ...Object.fromEntries(
               missingFields.map((field) => [field, 'Trường này là bắt buộc']),
            ),
         }))
         return
      }

      // Kiểm tra lỗi validation
      if (!isFormValid()) {
         return
      }

      // Nếu tất cả hợp lệ, submit form
      onLocationSubmit(e)
   }

   return (
      <div className="space-y-6">
         {/* Form thêm/sửa địa điểm ở trên */}
         <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
               <span className="text-blue-600">📍</span>
               {editingLocationId
                  ? 'Sửa thông tin địa điểm nổi bật'
                  : 'Thêm địa điểm nổi bật mới'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
               {/* Basic Information Section */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                     required
                     placeholder="Tiêu đề (VD: NÚI BÀ ĐEN) *"
                     className={`border-2 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500 ${
                        errors.title ? 'border-red-500' : 'border-slate-200'
                     }`}
                     value={locationForm.title || ''}
                     onChange={(e) => handleInputChange('title', e.target.value)}
                     onKeyDown={(e) => {
                        // Cho phép: chữ cái, số, khoảng trắng, backspace, delete, arrow keys, tab, enter
                        const allowedKeys = [
                           'Backspace',
                           'Delete',
                           'Tab',
                           'Enter',
                           'ArrowLeft',
                           'ArrowRight',
                           'ArrowUp',
                           'ArrowDown',
                           ' ',
                        ]
                        const isLetter = /[a-zA-ZÀ-ỹ]/.test(e.key)
                        const isNumber = /[0-9]/.test(e.key)
                        const isAllowedKey = allowedKeys.includes(e.key)

                        if (!isLetter && !isNumber && !isAllowedKey) {
                           e.preventDefault()
                        }
                     }}
                  />
                  {errors.title && (
                     <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                  )}
                  <input
                     required
                     placeholder="Tên địa điểm (VD: Tây Ninh) *"
                     className={`border-2 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500 ${
                        errors.name ? 'border-red-500' : 'border-slate-200'
                     }`}
                     value={locationForm.name || ''}
                     onChange={(e) => handleInputChange('name', e.target.value)}
                     onKeyDown={(e) => {
                        // Cho phép: chữ cái, số, khoảng trắng, backspace, delete, arrow keys, tab, enter
                        const allowedKeys = [
                           'Backspace',
                           'Delete',
                           'Tab',
                           'Enter',
                           'ArrowLeft',
                           'ArrowRight',
                           'ArrowUp',
                           'ArrowDown',
                           ' ',
                        ]
                        const isLetter = /[a-zA-ZÀ-ỹ]/.test(e.key)
                        const isNumber = /[0-9]/.test(e.key)
                        const isAllowedKey = allowedKeys.includes(e.key)

                        if (!isLetter && !isNumber && !isAllowedKey) {
                           e.preventDefault()
                        }
                     }}
                  />
                  {errors.name && (
                     <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                  <input
                     placeholder="Phụ đề (VD: Nóc nhà Nam Bộ)"
                     className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500 md:col-span-2"
                     value={locationForm.subtitle || ''}
                     onChange={(e) => handleInputChange('subtitle', e.target.value)}
                  />
               </div>

               {/* Pricing & Details Section */}

               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                     type="number"
                     required
                     placeholder="Giá (VNĐ) *"
                     className={`border-2 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500 ${
                        errors.price ? 'border-red-500' : 'border-slate-200'
                     }`}
                     value={locationForm.price || ''}
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
                     placeholder="Khoảng cách (km) *"
                     className={`border-2 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500 ${
                        errors.distance_km ? 'border-red-500' : 'border-slate-200'
                     }`}
                     value={locationForm.distance_km || ''}
                     onChange={(e) =>
                        handleNumberInputChange('distance_km', e.target.value)
                     }
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
                  {errors.distance_km && (
                     <p className="text-red-500 text-xs mt-1">{errors.distance_km}</p>
                  )}
                  <input
                     type="number"
                     required
                     placeholder="Thời gian (ngày) *"
                     className={`border-2 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500 ${
                        errors.duration_days ? 'border-red-500' : 'border-slate-200'
                     }`}
                     value={locationForm.duration_days || ''}
                     onChange={(e) =>
                        handleNumberInputChange('duration_days', e.target.value)
                     }
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
                  {errors.duration_days && (
                     <p className="text-red-500 text-xs mt-1">{errors.duration_days}</p>
                  )}
               </div>

               {/* Car Description Section */}
               <textarea
                  placeholder="Mô tả các phương tiện phục vụ (VD: Xe 4 và 7 chỗ đời mới)"
                  rows={3}
                  className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500 resize-none"
                  value={locationForm.car_description || ''}
                  onChange={(e) => handleInputChange('car_description', e.target.value)}
               />

               {/* Image Upload Section */}
               <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                     <span className="text-blue-600">🖼️</span>
                     Hình ảnh cho địa điểm nổi bật <span className="text-red-500">*</span>
                  </h3>

                  {/* File Upload */}
                  <div
                     className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors ${
                        errors.image_url ? 'border-red-500' : 'border-slate-300'
                     }`}
                     onBlur={handleImageAreaBlur}
                  >
                     <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                        required
                     />
                     <button
                        type="button"
                        onClick={() => {
                           fileInputRef.current?.click()
                           // Nếu không có ảnh, hiển thị lỗi sau khi click
                           setTimeout(() => {
                              if (!locationForm.image_url && !imagePreview) {
                                 setErrors((prev) => ({
                                    ...prev,
                                    image_url: 'Vui lòng chọn một ảnh',
                                 }))
                              }
                           }, 100)
                        }}
                        className="bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-700 transition-all duration-200"
                     >
                        📁 Chọn ảnh từ máy tính
                     </button>
                     <p className="text-sm text-slate-500 mt-2">
                        Chọn một ảnh để hiển thị cho địa điểm này (bắt buộc)
                     </p>
                  </div>

                  {errors.image_url && (
                     <p className="text-red-500 text-xs mt-1">{errors.image_url}</p>
                  )}

                  {/* Image Preview */}
                  {imagePreview && (
                     <div className="mt-4 space-y-3">
                        <h4 className="text-sm font-semibold text-slate-700">
                           Xem trước ảnh
                        </h4>
                        <div className="relative group">
                           <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-40 h-40 object-cover rounded-lg border-2 border-slate-200 shadow-md"
                           />
                           <button
                              type="button"
                              onClick={clearImagePreview}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                           >
                              ×
                           </button>
                        </div>
                     </div>
                  )}

                  {/* Existing Image Display */}
                  {locationForm.image_url && !imagePreview && (
                     <div className="mt-4 text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-2">
                           <span>📄</span>
                           <span>Hình ảnh hiện tại: {locationForm.image_url}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                           Chọn ảnh mới để thay thế hoặc giữ nguyên ảnh hiện tại
                        </p>
                     </div>
                  )}
               </div>

               {/* Submit Buttons */}
               <div className="flex gap-3 justify-center">
                  <button
                     type="submit"
                     className="bg-blue-600 text-white rounded-lg px-8 py-3 font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                     disabled={loading || !isFormValid()}
                  >
                     {loading
                        ? '⏳ Đang xử lý...'
                        : editingLocationId
                        ? '💾 Cập nhật địa điểm'
                        : '➕ Thêm địa điểm mới'}
                  </button>
                  {editingLocationId && (
                     <button
                        type="button"
                        className="bg-slate-500 text-white rounded-lg px-6 py-3 font-semibold hover:bg-slate-600 transition-colors"
                        onClick={onCancelEdit}
                     >
                        ❌ Hủy chỉnh sửa
                     </button>
                  )}
               </div>
            </form>
         </div>

         {/* Tìm kiếm */}
         <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
               <span className="text-blue-600">🔍</span>
               Tìm kiếm địa điểm
            </h3>

            <div className="flex gap-4 mb-4">
               <input
                  type="text"
                  placeholder="Nhập tên địa điểm..."
                  className="flex-1 border-2 border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
               />
               <button
                  onClick={clearFilters}
                  className="bg-slate-500 text-white rounded-lg px-4 py-2 hover:bg-slate-600 transition-colors"
               >
                  Xóa bộ lọc
               </button>
            </div>
         </div>

         {/* Danh sách địa điểm ở dưới */}
         <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
               <span className="text-blue-600">📋</span>
               Danh sách địa điểm nổi bật ({filteredLocations.length})
            </h3>
            <div className="space-y-3">
               {filteredLocations.map((location) => (
                  <div
                     key={location.id}
                     className="border-2 border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-slate-50"
                  >
                     <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1">
                           <div className="font-semibold text-slate-800">
                              <span className="text-blue-600">{location.title}</span>
                              {location.subtitle && (
                                 <span className="text-slate-600 ml-2">
                                    - {location.subtitle}
                                 </span>
                              )}
                           </div>
                           <div className="text-sm text-slate-600 mt-1">
                              <span className="mr-2">📍 {location.name}</span>
                              {location.price && (
                                 <span className="mr-2">
                                    • {location.price.toLocaleString()} VNĐ
                                 </span>
                              )}
                              {location.distance_km && (
                                 <span className="mr-2">• {location.distance_km}km</span>
                              )}
                              {location.duration_days && (
                                 <span className="mr-2">
                                    • {location.duration_days} ngày
                                 </span>
                              )}
                              {location.car_description && (
                                 <span>• {location.car_description}</span>
                              )}
                           </div>
                           {location.image_url && (
                              <div className="text-xs text-slate-500 mt-1">
                                 🖼️ {location.image_url}
                              </div>
                           )}
                        </div>
                        <div className="flex gap-2">
                           <button
                              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold cursor-pointer"
                              onClick={() => handleEditLocation(location)}
                           >
                              ✏️ Sửa
                           </button>
                           <button
                              className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold cursor-pointer"
                              onClick={() => onLocationDelete(location.id)}
                           >
                              🗑️ Xóa
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
               {filteredLocations.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                     <div className="text-4xl mb-2">📍</div>
                     <div>
                        {locations.length === 0
                           ? 'Chưa có địa điểm nào trong danh sách'
                           : 'Không tìm thấy địa điểm phù hợp với bộ lọc'}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}
