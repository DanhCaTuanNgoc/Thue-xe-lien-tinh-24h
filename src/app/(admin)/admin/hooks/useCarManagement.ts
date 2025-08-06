import { useState, useEffect } from 'react'
import {
   fetchCars,
   addCar,
   updateCar,
   deleteCar,
} from '../../../../lib/repositories/carApi'
import type { Car } from '../../../../lib/models/car'
import { formatNumberVND } from '../../../../lib/utils/formatCurrency'

export function useCarManagement() {
   const [cars, setCars] = useState<Car[]>([])
   const [carForm, setCarForm] = useState<Partial<Omit<Car, 'id'>>>({})
   const [editingCarId, setEditingCarId] = useState<string | null>(null)
   const [loading, setLoading] = useState(false)

   const loadCars = async () => {
      try {
         const data = await fetchCars()
         setCars(data)
      } catch (error) {
         console.error('Error loading cars:', error)
      }
   }

   const handleCarSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)

      try {
         // Validate required fields
         if (!carForm.province || !carForm.province.trim()) {
            alert('Vui lòng nhập tỉnh!')
            setLoading(false)
            return
         }

         if (!carForm.end_location || !carForm.end_location.trim()) {
            alert('Vui lòng nhập điểm đến!')
            setLoading(false)
            return
         }

         if (!carForm.id_car_type) {
            alert('Vui lòng chọn loại xe!')
            setLoading(false)
            return
         }

         // Validate required number fields
         if (!carForm.distance || carForm.distance === 0) {
            alert('Vui lòng nhập quãng đường!')
            setLoading(false)
            return
         }

         if (!carForm.price || Number(carForm.price) === 0) {
            alert('Vui lòng nhập giá!')
            setLoading(false)
            return
         }

         if (!carForm.time || carForm.time === 0) {
            alert('Vui lòng nhập thời gian!')
            setLoading(false)
            return
         }

         console.log('Submitting car form:', carForm)

         if (editingCarId) {
            const formattedCarForm = {
               ...carForm,
               price: carForm.price || 0,
            }
            console.log('Updating car with ID:', editingCarId)
            await updateCar(editingCarId, formattedCarForm)
            alert('Cập nhật xe thành công!')
         } else {
            // ... trong handleCarSubmit:
            const formattedCarForm = {
               ...carForm,
               price: carForm.price || 0,
            }
            console.log('Adding new car')
            const newCar = await addCar(formattedCarForm as Omit<Car, 'id'>)
            console.log('New car added:', newCar)
            alert('Thêm xe mới thành công!')
         }

         setCarForm({})
         setEditingCarId(null)
         await loadCars()
      } catch (err) {
         console.error('Error submitting car:', err)
         const errorMessage = err instanceof Error ? err.message : 'Lỗi thao tác xe!'
         
         // Kiểm tra nếu là lỗi trùng lặp
         if (errorMessage.includes('đã tồn tại')) {
            alert(`❌ ${errorMessage}`)
         } else {
            alert('Lỗi thao tác xe! Vui lòng kiểm tra console để biết thêm chi tiết.')
         }
      } finally {
         setLoading(false)
      }
   }

   const handleCarEdit = (car: Car) => {
      setCarForm(car)
      setEditingCarId(car.id)
   }

   const handleCarDelete = async (id: string) => {
      if (!window.confirm('Xóa xe này?')) return
      setLoading(true)
      try {
         await deleteCar(id)
         await loadCars()
      } catch {
         alert('Lỗi xóa xe!')
      } finally {
         setLoading(false)
      }
   }

   const handleCancelEdit = () => {
      setCarForm({})
      setEditingCarId(null)
   }

   return {
      cars,
      carForm,
      editingCarId,
      loading,
      setCarForm,
      handleCarSubmit,
      handleCarEdit,
      handleCarDelete,
      handleCancelEdit,
      loadCars,
      reloadCars: loadCars, // Alias cho loadCars để dễ sử dụng
   }
}
