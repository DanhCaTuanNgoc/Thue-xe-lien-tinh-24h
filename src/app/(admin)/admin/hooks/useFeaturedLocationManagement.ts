import { useState, useRef } from 'react'
import {
   fetchFeaturedLocations,
   addFeaturedLocation,
   updateFeaturedLocation,
   deleteFeaturedLocation,
} from '../../../../lib/repositories/featuredLocationApi'
import type { FeaturedLocation } from '../../../../lib/models/featuredLocation'

export function useFeaturedLocationManagement() {
   const [locations, setLocations] = useState<FeaturedLocation[]>([])
   const [locationForm, setLocationForm] = useState<Partial<Omit<FeaturedLocation, 'id'>>>({})
   const [editingLocationId, setEditingLocationId] = useState<number | null>(null)
   const [loading, setLoading] = useState(false)
   const [imageFile, setImageFile] = useState<File | null>(null)
   const [imagePreview, setImagePreview] = useState<string>('')
   const fileInputRef = useRef<HTMLInputElement>(null)

   const loadLocations = async () => {
      try {
         const data = await fetchFeaturedLocations()
         setLocations(data)
      } catch (error) {
         console.error('Error loading featured locations:', error)
      }
   }

   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      
      setImageFile(file)
      
      // Preview ảnh
      if (file.type.startsWith('image/')) {
         const reader = new FileReader()
         reader.onload = (event) => {
            const result = event.target?.result as string
            setImagePreview(result)
         }
         reader.readAsDataURL(file)
      }
   }

   const removeImage = () => {
      setImageFile(null)
      setImagePreview('')
      if (fileInputRef.current) {
         fileInputRef.current.value = ''
      }
   }

   const handleLocationSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)

      try {
         // Validate required fields
         if (!locationForm.title || !locationForm.title.trim()) {
            alert('Vui lòng nhập tiêu đề!')
            setLoading(false)
            return
         }

         if (!locationForm.name || !locationForm.name.trim()) {
            alert('Vui lòng nhập tên địa điểm!')
            setLoading(false)
            return
         }

         if (!locationForm.price) {
            alert('Vui lòng nhập giá!')
            setLoading(false)
            return
         }

         if (!locationForm.distance_km) {
            alert('Vui lòng nhập khoảng cách!')
            setLoading(false)
            return
         }

         if (!locationForm.duration_days) {
            alert('Vui lòng nhập thời gian!')
            setLoading(false)
            return
         }

         // Validate image - bắt buộc khi thêm mới, tùy chọn khi edit
         if (!editingLocationId && !imageFile) {
            alert('Vui lòng chọn một ảnh!')
            setLoading(false)
            return
         }

         console.log('Submitting location form:', locationForm)

         if (editingLocationId) {
            // Update existing location
            console.log('Updating location with ID:', editingLocationId)
            const updateData = {
               ...locationForm,
               imageFile: imageFile || undefined,
            }
            await updateFeaturedLocation(editingLocationId, updateData)
            alert('Cập nhật địa điểm thành công!')
         } else {
            // Add new location - imageFile là bắt buộc
            console.log('Adding new location')
            if (!imageFile) {
               alert('Vui lòng chọn một ảnh!')
               setLoading(false)
               return
            }
            const newLocationData = {
               ...locationForm,
               imageFile: imageFile,
            }
            const newLocation = await addFeaturedLocation(newLocationData as Omit<FeaturedLocation, 'id' | 'image_url'> & { imageFile: File })
            console.log('New location added:', newLocation)
            alert('Thêm địa điểm mới thành công!')
         }

         setLocationForm({})
         setImageFile(null)
         setImagePreview('')
         setEditingLocationId(null)
         await loadLocations()
      } catch (err) {
         console.error('Error submitting location:', err)
         const errorMessage = err instanceof Error ? err.message : 'Lỗi thao tác địa điểm!'
         alert(`Lỗi: ${errorMessage}`)
      } finally {
         setLoading(false)
      }
   }

   const handleLocationEdit = (location: FeaturedLocation) => {
      setLocationForm(location)
      setEditingLocationId(location.id)
      setImagePreview(location.image_url || '')
      setImageFile(null)
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
      setImageFile(null)
      setImagePreview('')
      setEditingLocationId(null)
   }

   return {
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
   }
}
