import { supabase } from '../supabaseClient'
import type { Post } from '../models/post'

// Hàm tạo UUID
function generateUUID(): string {
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
   })
}

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
   try {
      const imageUrls: string[] = []
      if (post.images && post.images.length > 0) {
         for (const file of post.images) {
            const fileName = `${Date.now()}_${file.name}`
            const url = await uploadImageToBucket(file, fileName)
            imageUrls.push(url)
         }
      }
      
      const { images, ...rest } = post
      const postData = {
         ...rest,
         image: imageUrls.join('|') || null,
      }
      
      const { data, error } = await supabase
         .from('posts')
         .insert([postData])
         .select()
      
      if (error) {
         console.error('Error adding post:', error)
         throw new Error(`Lỗi thêm bài viết: ${error.message}`)
      }
      
      return data?.[0]
   } catch (error) {
      console.error('Error in addPost:', error)
      throw error
   }
}

// Sửa updatePost để nhận images: File[] và upload lên bucket nếu có
export async function updatePost(
   id: string,
   post: Partial<Omit<Post, 'id'>> & { images?: File[] },
) {
   try {
      const imageUrls: string[] = []
      if (post.images && post.images.length > 0) {
         for (const file of post.images) {
            const fileName = `${Date.now()}_${file.name}`
            const url = await uploadImageToBucket(file, fileName)
            imageUrls.push(url)
         }
      }
      
      const { images, ...rest } = post
      
      // Tạo updateData - nếu có ảnh mới thì dùng ảnh mới, không thì giữ nguyên image cũ
      const updateData = {
         ...rest,
         ...(imageUrls.length > 0 && { image: imageUrls.join('|') }),
      }
      
      const { data, error } = await supabase
         .from('posts')
         .update(updateData)
         .eq('id', id)
         .select()
      
      if (error) {
         console.error('Error updating post:', error)
         throw new Error(`Lỗi cập nhật bài viết: ${error.message}`)
      }
      
      return data?.[0]
   } catch (error) {
      console.error('Error in updatePost:', error)
      throw error
   }
}

export async function deletePost(id: string) {
   const { error } = await supabase.from('posts').delete().eq('id', id)
   if (error) throw error
   return true
}
