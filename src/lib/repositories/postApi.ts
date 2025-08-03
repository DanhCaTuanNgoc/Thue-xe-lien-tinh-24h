import { supabase } from '../supabaseClient'
import type { Post } from '../models/post'

// Hàm upload ảnh lên bucket images
export async function uploadImageToBucket(file: File, fileName: string): Promise<string> {
   const { error } = await supabase.storage
      .from('images')
      .upload(fileName, file, { upsert: true })
   if (error) throw error
   const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName)
   return publicUrlData.publicUrl
}

export async function fetchPosts(): Promise<Post[]> {
   const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
   if (error) throw error
   return data as Post[]
}
export async function fetchPostById(id: string) {
   const { data, error } = await supabase.from('posts').select('*').eq('id', id).single()

   if (error) throw error
   return data
}

// Sửa addPost để nhận images: File[] và upload lên bucket
export async function addPost(post: Omit<Post, 'id'> & { images?: File[] }) {
   const imageUrls: string[] = []
   if (post.images && post.images.length > 0) {
      for (const file of post.images) {
         const fileName = `${Date.now()}_${file.name}`
         const url = await uploadImageToBucket(file, fileName)
         imageUrls.push(url)
      }
   }
   const { ...rest } = post
   const { data, error } = await supabase
      .from('posts')
      .insert([{ ...rest, image: imageUrls.join('|') }])
      .select()
   if (error) throw error
   return data?.[0]
}

// Sửa updatePost để nhận images: File[] và upload lên bucket nếu có
export async function updatePost(
   id: string,
   post: Partial<Omit<Post, 'id'>> & { images?: File[] },
) {
   const imageUrls: string[] = []
   if (post.images && post.images.length > 0) {
      for (const file of post.images) {
         const fileName = `${Date.now()}_${file.name}`
         const url = await uploadImageToBucket(file, fileName)
         imageUrls.push(url)
      }
   }
   const { ...rest } = post
   // Nếu có ảnh mới thì dùng ảnh mới, không thì giữ nguyên image cũ
   const updateData =
      imageUrls.length > 0 ? { ...rest, image: imageUrls.join('|') } : rest
   const { data, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
   if (error) throw error
   return data?.[0]
}

export async function deletePost(id: string) {
   const { error } = await supabase.from('posts').delete().eq('id', id)
   if (error) throw error
   return true
}
