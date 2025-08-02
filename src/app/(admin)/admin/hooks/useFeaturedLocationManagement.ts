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
   const [locationForm, setLocationForm] = useState<Partial<Omit<FeaturedLocation, 'id'>>>({})
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

         console.log('Submitting location form:', locationForm)

         if (editingLocationId) {
            console.log('Updating location with ID:', editingLocationId)
            await updateFeaturedLocation(editingLocationId, locationForm)
         } else {
            console.log('Adding new location')
            const newLocation = await addFeaturedLocation(locationForm as Omit<FeaturedLocation, 'id'>)
            console.log('New location added:', newLocation)
         }

         // Reset form completely
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