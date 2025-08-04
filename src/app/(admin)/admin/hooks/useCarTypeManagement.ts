import { useState, useRef } from 'react'
import {
   fetchCarTypes,
   addCarType,
   updateCarType,
   deleteCarType,
} from '../../../../lib/repositories/car_typeApi'
import type { CarType } from '../../../../lib/models/car_type'

export function useCarTypeManagement() {
   const [carTypes, setCarTypes] = useState<CarType[]>([])
   const [carTypeForm, setCarTypeForm] = useState<Partial<Omit<CarType, 'id'>>>({})
   const [editingCarTypeId, setEditingCarTypeId] = useState<number | null>(null)
   const [loading, setLoading] = useState(false)
   const [imageFile, setImageFile] = useState<File | null>(null)
   const [imagePreview, setImagePreview] = useState<string>('')
   const fileInputRef = useRef<HTMLInputElement>(null)

   const loadCarTypes = async () => {
      try {
         const data = await fetchCarTypes()
         setCarTypes(data)
      } catch (error) {
         console.error('Error loading car types:', error)
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

   const handleCarTypeSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)

      try {
         // Validate required fields
         if (!carTypeForm.name || !carTypeForm.name.trim()) {
            alert('Vui lòng nhập tên loại xe!')
            setLoading(false)
            return
         }

         if (!carTypeForm.description_price || !carTypeForm.description_price.trim()) {
            alert('Vui lòng nhập giá!')
            setLoading(false)
            return
         }

         console.log('Submitting car type form:', carTypeForm)

         const carTypeData = {
            ...carTypeForm,
            imageFile: imageFile || undefined,
         }

         if (editingCarTypeId) {
            console.log('Updating car type with ID:', editingCarTypeId)
            await updateCarType(editingCarTypeId, carTypeData)
            alert('Cập nhật loại xe thành công!')
         } else {
            console.log('Adding new car type')
            const newCarType = await addCarType(carTypeData as Omit<CarType, 'id'> & { imageFile?: File })
            console.log('New car type added:', newCarType)
            alert('Thêm loại xe mới thành công!')
         }

         setCarTypeForm({})
         setImageFile(null)
         setImagePreview('')
         setEditingCarTypeId(null)
         await loadCarTypes()
      } catch (err) {
         console.error('Error submitting car type:', err)
         const errorMessage = err instanceof Error ? err.message : 'Lỗi thao tác loại xe!'
         alert(`Lỗi: ${errorMessage}`)
      } finally {
         setLoading(false)
      }
   }

   const handleCarTypeEdit = (carType: CarType) => {
      setCarTypeForm(carType)
      setEditingCarTypeId(carType.id)
      setImagePreview(carType.image || '')
      setImageFile(null)
   }

   const handleCarTypeDelete = async (id: number) => {
      if (!window.confirm('Xóa loại xe này?')) return
      setLoading(true)
      try {
         await deleteCarType(id)
         await loadCarTypes()
      } catch {
         alert('Lỗi xóa loại xe!')
      } finally {
         setLoading(false)
      }
   }

   const handleCancelEdit = () => {
      setCarTypeForm({})
      setImageFile(null)
      setImagePreview('')
      setEditingCarTypeId(null)
   }

   return {
      carTypes,
      carTypeForm,
      editingCarTypeId,
      loading,
      imageFile,
      imagePreview,
      fileInputRef,
      setCarTypeForm,
      handleCarTypeSubmit,
      handleCarTypeEdit,
      handleCarTypeDelete,
      handleCancelEdit,
      handleImageUpload,
      removeImage,
      loadCarTypes,
   }
}
