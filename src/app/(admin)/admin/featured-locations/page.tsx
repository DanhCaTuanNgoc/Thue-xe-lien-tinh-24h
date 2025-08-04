'use client'

import { useEffect } from 'react'
import { useFeaturedLocationManagement } from '../hooks/useFeaturedLocationManagement'
import FeaturedLocationManagement from '../components/FeaturedLocationManagement'

export default function FeaturedLocationsPage() {
   const {
      locations,
      locationForm,
      editingLocationId,
      loading,
      imageFile,
      imagePreview,
      fileInputRef,
      setLocationForm,
      handleLocationSubmit,
      handleLocationEdit,
      handleLocationDelete,
      handleCancelEdit,
      handleImageUpload,
      removeImage,
      loadLocations,
   } = useFeaturedLocationManagement()

   useEffect(() => {
      loadLocations()
   }, [loadLocations])

   return (
      <div className="min-h-screen bg-slate-50 p-6">
         <div className="max-w-7xl mx-auto">
            <div className="mb-8">
               <h1 className="text-3xl font-bold text-slate-800 mb-2">
                  Quản lý địa điểm nổi bật
               </h1>
               <p className="text-slate-600">
                  Thêm, sửa và xóa các địa điểm nổi bật hiển thị trên trang chủ
               </p>
            </div>

            <FeaturedLocationManagement
               locations={locations}
               locationForm={locationForm}
               editingLocationId={editingLocationId}
               loading={loading}
               imageFile={imageFile}
               imagePreview={imagePreview}
               fileInputRef={fileInputRef}
               onLocationFormChange={setLocationForm}
               onLocationSubmit={handleLocationSubmit}
               onLocationEdit={handleLocationEdit}
               onLocationDelete={handleLocationDelete}
               onCancelEdit={handleCancelEdit}
               onImageUpload={handleImageUpload}
               onRemoveImage={removeImage}
            />
         </div>
      </div>
   )
} 