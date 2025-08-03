import { useState, useEffect } from 'react'
import {
   fetchFeaturedLocations,
   addFeaturedLocation,
   updateFeaturedLocation,
   deleteFeaturedLocation,
} from '../../../../lib/repositories/featuredLocationApi'
import type { FeaturedLocation } from '../../../../lib/models/featuredLocation'

export function useFeaturedLocationManagement() {
   const [locations, setLocations] = useState<FeaturedLocation[]>([])
   // Thêm imageFile vào state
   const [locationForm, setLocationForm] = useState<
      Partial<Omit<FeaturedLocation, 'id'>> & { imageFile?: File }
   >({})
   const [editingLocationId, setEditingLocationId] = useState<number | null>(null)
   const [loading, setLoading] = useState(false)

   const loadLocations = async () => {
      try {
         const data = await fetchFeaturedLocations()
         setLocations(data)
      } catch (error) {
         console.error('Error loading featured locations:', error)
      }
   }

   const handleLocationSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)

      try {
         // Validate required fields
         if (!locationForm.title || !locationForm.name) {
            alert('Vui lòng nhập đầy đủ tiêu đề và tên địa điểm!')
            setLoading(false)
            return
         }
         // Validate ảnh khi thêm mới
         if (!editingLocationId && !locationForm.imageFile) {
            alert('Vui lòng chọn ảnh cho địa điểm!')
            setLoading(false)
            return
         }

         if (editingLocationId) {
            await updateFeaturedLocation(editingLocationId, locationForm)
         } else {
            await addFeaturedLocation(
               locationForm as Omit<FeaturedLocation, 'id' | 'image_url'> & {
                  imageFile: File
               },
            )
         }

         setLocationForm({})
         setEditingLocationId(null)
         await loadLocations()
      } catch (err) {
         console.error('Error submitting location:', err)
         alert('Lỗi thao tác địa điểm! Vui lòng kiểm tra console để biết thêm chi tiết.')
      } finally {
         setLoading(false)
      }
   }

   const handleLocationEdit = (location: FeaturedLocation) => {
      // Không set imageFile khi edit, chỉ set khi user chọn file mới
      setLocationForm(location)
      setEditingLocationId(location.id)
   }

   const handleLocationDelete = async (id: number) => {
      if (!window.confirm('Xóa địa điểm này?')) return
      setLoading(true)
      try {
         await deleteFeaturedLocation(id)
         await loadLocations()
      } catch {
         alert('Lỗi xóa địa điểm!')
      } finally {
         setLoading(false)
      }
   }

   const handleCancelEdit = () => {
      setLocationForm({})
      setEditingLocationId(null)
   }

   return {
      locations,
      locationForm,
      editingLocationId,
      loading,
      setLocationForm,
      handleLocationSubmit,
      handleLocationEdit,
      handleLocationDelete,
      handleCancelEdit,
      loadLocations,
   }
}
