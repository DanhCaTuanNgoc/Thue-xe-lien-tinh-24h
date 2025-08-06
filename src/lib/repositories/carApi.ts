import { supabase } from '../supabaseClient'
import type { Car } from '../models/car'
import { fetchCarTypeById } from './car_typeApi'

export async function fetchCars(): Promise<Car[]> {
   const { data, error } = await supabase.from('cars').select('*').order('province')
   if (error) throw error
   return data as Car[]
}

// Hàm kiểm tra xe đã tồn tại dựa trên tỉnh, điểm đến và loại xe
export async function checkCarExists(province: string, end_location: string, id_car_type: number): Promise<boolean> {
   const { data, error } = await supabase
      .from('cars')
      .select('id')
      .ilike('province', province.toLowerCase())
      .ilike('end_location', end_location.toLowerCase())
      .eq('id_car_type', id_car_type)
      .single()
   
   if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw error
   }
   
   return !!data // Trả về true nếu tìm thấy, false nếu không tìm thấy
}

export async function addCar(car: Omit<Car, 'id'>) {
   // Kiểm tra xe đã tồn tại chưa
   const exists = await checkCarExists(car.province, car.end_location, car.id_car_type)
   const carType = await fetchCarTypeById(car.id_car_type)
   if (exists) {
      throw new Error(`${carType?.name} đến ${car.province}, ${car.end_location} đã tồn tại trong hệ thống!`)
   }

   // Generate a unique ID for the car
   const carId = `car_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

   const carData = {
      id: carId,
      ...car,
   }

   const { data, error } = await supabase.from('cars').insert([carData]).select()
   if (error) throw error
   return data?.[0]
}

export async function updateCar(id: string, car: Partial<Omit<Car, 'id'>>) {
   // Nếu có thay đổi tỉnh, điểm đến hoặc loại xe, kiểm tra trùng lặp
   if (car.province || car.end_location || car.id_car_type) {
      // Lấy thông tin xe hiện tại
      const { data: currentCar } = await supabase
         .from('cars')
         .select('province, end_location, id_car_type')
         .eq('id', id)
         .single()
      
      if (currentCar) {
         const newProvince = car.province || currentCar.province
         const newEndLocation = car.end_location || currentCar.end_location
         const newCarTypeId = car.id_car_type || currentCar.id_car_type
         
         // Kiểm tra xem có xe khác có cùng tỉnh, điểm đến và loại xe không (trừ xe hiện tại)
         const { data: existingCar } = await supabase
            .from('cars')
            .select('id')
            .ilike('province', newProvince.toLowerCase())
            .ilike('end_location', newEndLocation.toLowerCase())
            .eq('id_car_type', newCarTypeId)
            .neq('id', id)
            .single()
         
         if (existingCar) {
            const carType = await fetchCarTypeById(newCarTypeId)
               throw new Error(`${carType?.name} đến ${newProvince}, ${newEndLocation} đã tồn tại trong hệ thống!`)
         }
      }
   }

   const { data, error } = await supabase.from('cars').update(car).eq('id', id).select()
   if (error) throw error
   return data?.[0]
}

export async function deleteCar(id: string) {
   const { error } = await supabase.from('cars').delete().eq('id', id)
   if (error) throw error
   return true
}

export async function fetchCarByIdCarType(id_car_type: number): Promise<Car[]> {
   const { data, error } = await supabase
      .from('cars')
      .select('*')
      .eq('id_car_type', id_car_type)
      .order('province')
   if (error) throw error
   return data as Car[]
}
