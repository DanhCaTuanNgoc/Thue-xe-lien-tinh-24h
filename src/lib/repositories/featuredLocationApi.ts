import { supabase } from '../supabaseClient'
import type { FeaturedLocation } from '../models/featuredLocation'

// Thêm hàm upload ảnh
async function uploadImageToBucket(file: File, fileName: string): Promise<string> {
   const { data, error } = await supabase.storage
      .from('images')
      .upload(fileName, file, { upsert: true })
   if (error) throw error
   const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName)
   return publicUrlData.publicUrl
}

export async function fetchFeaturedLocations(): Promise<FeaturedLocation[]> {
   const { data, error } = await supabase
      .from('featured_locations')
      .select('*')
      .order('title')
   if (error) throw error
   return data as FeaturedLocation[]
}

export async function addFeaturedLocation(
   location: Omit<FeaturedLocation, 'id' | 'image_url'> & { imageFile: File },
) {
   const file = location.imageFile
   const fileName = `${Date.now()}_${file.name}`
   const image_url = await uploadImageToBucket(file, fileName)

   const { imageFile, ...rest } = location
   const { data, error } = await supabase
      .from('featured_locations')
      .insert([{ ...rest, image_url }])
      .select()
   if (error) throw error
   return data?.[0]
}

export async function updateFeaturedLocation(
   id: number,
   location: Partial<Omit<FeaturedLocation, 'id' | 'image_url'>> & { imageFile?: File },
) {
   let image_url
   if (location.imageFile) {
      const file = location.imageFile
      const fileName = `${Date.now()}_${file.name}`
      image_url = await uploadImageToBucket(file, fileName)
   }
   const { imageFile, ...rest } = location
   const updateData = image_url ? { ...rest, image_url } : rest

   const { data, error } = await supabase
      .from('featured_locations')
      .update(updateData)
      .eq('id', id)
      .select()
   if (error) throw error
   return data?.[0]
}

export async function deleteFeaturedLocation(id: number) {
   const { error } = await supabase.from('featured_locations').delete().eq('id', id)
   if (error) throw error
   return true
}
