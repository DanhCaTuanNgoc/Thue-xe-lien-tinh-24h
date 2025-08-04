import { useState } from 'react'
import {
   fetchPosts,
   addPost,
   updatePost,
   deletePost,
} from '../../../../lib/repositories/postApi'
import type { Post } from '../../../../lib/models/post'

export function usePostManagement() {
   const [posts, setPosts] = useState<Post[]>([])
   const [postForm, setPostForm] = useState<Partial<Omit<Post, 'id'>>>({})
   const [editingPostId, setEditingPostId] = useState<string | null>(null)
   const [postImages, setPostImages] = useState<string[]>([]) // preview base64
   const [postFiles, setPostFiles] = useState<File[]>([]) // thực tế file ảnh
   const [loading, setLoading] = useState(false)

   const loadPosts = async () => {
      try {
         const data = await fetchPosts()
         setPosts(data)
      } catch (error) {
         console.error('Error loading posts:', error)
      }
   }

   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files) return
      const fileArr = Array.from(files)
      setPostFiles(fileArr)
      // preview
      fileArr.forEach((file) => {
         if (file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (event) => {
               const result = event.target?.result as string
               setPostImages((prev) => [...prev, result])
            }
            reader.readAsDataURL(file)
         }
      })
   }

   const removeImage = (index: number) => {
      setPostImages((prev) => prev.filter((_, i) => i !== index))
      setPostFiles((prev) => prev.filter((_, i) => i !== index))
   }

   const handlePostSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      try {
         // Validate required fields
         if (!postForm.title || !postForm.title.trim()) {
            alert('Vui lòng nhập tiêu đề bài viết!')
            setLoading(false)
            return
         }

         if (!postForm.description || !postForm.description.trim()) {
            alert('Vui lòng nhập mô tả bài viết!')
            setLoading(false)
            return
         }

         if (!postForm.content || !postForm.content.trim()) {
            alert('Vui lòng nhập nội dung bài viết!')
            setLoading(false)
            return
         }

         if (!postForm.author || !postForm.author.trim()) {
            alert('Vui lòng nhập tác giả!')
            setLoading(false)
            return
         }

         const postData = {
            ...postForm,
            images: postFiles,
         }
         
         console.log('Submitting post data:', postData)
         
         if (editingPostId) {
            await updatePost(editingPostId, postData)
            alert('Cập nhật bài viết thành công!')
         } else {
            await addPost(postData as Omit<Post, 'id'> & { images: File[] })
            alert('Thêm bài viết mới thành công!')
         }
         
         setPostForm({})
         setPostImages([])
         setPostFiles([])
         setEditingPostId(null)
         await loadPosts()
      } catch (err) {
         console.error('Error submitting post:', err)
         const errorMessage = err instanceof Error ? err.message : 'Lỗi thao tác bài viết!'
         alert(`Lỗi: ${errorMessage}`)
      } finally {
         setLoading(false)
      }
   }

   const handlePostEdit = (post: Post) => {
      setPostForm(post)
      setEditingPostId(post.id)
      // Không set lại postFiles khi edit, chỉ preview ảnh cũ
      if (post.image) {
         const images = post.image.split('|')
         setPostImages(images)
      } else {
         setPostImages([])
      }
      setPostFiles([])
   }

   const handlePostDelete = async (id: string) => {
      if (!window.confirm('Xóa bài viết này?')) return
      setLoading(true)
      try {
         await deletePost(id)
         await loadPosts()
      } catch {
         alert('Lỗi xóa bài viết!')
      } finally {
         setLoading(false)
      }
   }

   const handleCancelEdit = () => {
      setPostForm({})
      setPostImages([])
      setPostFiles([])
      setEditingPostId(null)
   }

   return {
      posts,
      postForm,
      postImages,
      postFiles,
      editingPostId,
      loading,
      setPostForm,
      handlePostSubmit,
      handlePostEdit,
      handlePostDelete,
      handleCancelEdit,
      handleImageUpload,
      removeImage,
      loadPosts,
   }
}
