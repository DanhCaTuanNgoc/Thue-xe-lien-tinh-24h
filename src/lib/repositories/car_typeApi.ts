import { supabase } from '../supabaseClient'
import type { CarType } from '../models/car_type'

// Hàm upload ảnh lên bucket images
export async function uploadImageToBucket(file: File, fileName: string): Promise<string> {
   const { error } = await supabase.storage
      .from('images')
      .upload(fileName, file, { upsert: true })
   if (error) throw error
   const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName)
   return publicUrlData.publicUrl
}

// Lấy tất cả loại xe
export async function fetchCarTypes(): Promise<CarType[]> {
   const { data, error } = await supabase.from('car_types').select('*').order('name')
   if (error) throw error
   return data?.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      description_price: item.description_price,
      image: item.img_url || '',
   })) as CarType[]
}

// Lấy loại xe theo ID
export async function fetchCarTypeById(id: number): Promise<CarType | null> {
   const { data, error } = await supabase
      .from('car_types')
      .select('*')
      .eq('id', id)
      .single()
   if (error) throw error
   if (!data) return null
   return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description_price: data.description_price,
      image: data.img_url || '',
   } as CarType
}

// Lấy loại xe theo slug
export async function fetchCarTypeBySlug(slug: string) {
   const { data, error } = await supabase
      .from('car_types')
      .select('*')
      .eq('slug', slug)
      .single()
   if (error) {
      console.error(error)
      return null
   }
   return data
}

// Thêm loại xe mới với upload ảnh
export async function addCarType(carType: Omit<CarType, 'id'> & { imageFile?: File }) {
   try {
      let imageUrl: string | null = null
      
      // Upload ảnh nếu có
      if (carType.imageFile) {
         const fileName = `car_type_${Date.now()}_${carType.imageFile.name}`
         imageUrl = await uploadImageToBucket(carType.imageFile, fileName)
      } else if (carType.image) {
         imageUrl = carType.image
      }
      
      const { imageFile, ...rest } = carType
      const carTypeData = {
         ...rest,
         img_url: imageUrl,
      }
      
      const { data, error } = await supabase
         .from('car_types')
         .insert([carTypeData])
         .select()
      
      if (error) {
         console.error('Error adding car type:', error)
         throw new Error(`Lỗi thêm loại xe: ${error.message}`)
      }
      
      if (!data?.[0]) return null
      return {
         id: data[0].id,
         name: data[0].name,
         slug: data[0].slug,
         description_price: data[0].description_price,
         image: data[0].img_url,
      } as CarType
   } catch (error) {
      console.error('Error in addCarType:', error)
      throw error
   }
}

// Cập nhật loại xe với upload ảnh
export async function updateCarType(id: number, carType: Partial<Omit<CarType, 'id'>> & { imageFile?: File }) {
   try {
      let imageUrl: string | null = null
      
      // Upload ảnh mới nếu có
      if (carType.imageFile) {
         const fileName = `car_type_${Date.now()}_${carType.imageFile.name}`
         imageUrl = await uploadImageToBucket(carType.imageFile, fileName)
      } else if (carType.image !== undefined) {
         imageUrl = carType.image
      }
      
      const updateData: {
         name?: string
         slug?: string
         description_price?: string
         img_url?: string | null
      } = {}
      
      if (carType.name) updateData.name = carType.name
      if (carType.slug) updateData.slug = carType.slug
      if (carType.description_price) updateData.description_price = carType.description_price
      if (imageUrl !== undefined) updateData.img_url = imageUrl

      const { data, error } = await supabase
         .from('car_types')
         .update(updateData)
         .eq('id', id)
         .select()
      
      if (error) {
         console.error('Error updating car type:', error)
         throw new Error(`Lỗi cập nhật loại xe: ${error.message}`)
      }
      
      if (!data?.[0]) return null
      return {
         id: data[0].id,
         name: data[0].name,
         slug: data[0].slug,
         description_price: data[0].description_price,
         image: data[0].img_url,
      } as CarType
   } catch (error) {
      console.error('Error in updateCarType:', error)
      throw error
   }
}

// Xóa loại xe
export async function deleteCarType(id: number) {
   const { error } = await supabase.from('car_types').delete().eq('id', id)
   if (error) throw error
   return true
}
