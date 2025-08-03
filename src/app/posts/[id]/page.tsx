'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { fetchPostById } from '../../../lib/repositories/postApi'

interface Post {
   id: string
   title: string
   description: string
   content: string
   image: string
   author: string
   created_at: string
}

export default function PostDetailPage() {
   const { id } = useParams()
   const [post, setPost] = useState<Post | null>(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)

   useEffect(() => {
      async function loadPost() {
         try {
            const data = await fetchPostById(id as string)
            setPost(data)
         } catch (err: any) {
            setError('Không thể tải bài viết')
         } finally {
            setLoading(false)
         }
      }
      if (id) loadPost()
   }, [id])

   if (loading) return <p className="text-center">Đang tải bài viết...</p>
   if (error || !post) return <p className="text-center text-red-500">{error}</p>

   return (
      <div className="max-w-3xl mx-auto py-10 px-4 bg-white">
         <Link
            href="/posts"
            className="text-red-700 hover:underline mb-4 inline-block font-medium"
         >
            &larr; Quay lại danh sách bài viết
         </Link>
         <h1 className="text-3xl font-bold mb-4 text-gray-900">{post.title}</h1>
         <div className="flex items-center text-gray-600 text-sm mb-6">
            <span>{post.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
         </div>
         <div className="relative w-full h-64 mb-6">
            <Image
               src={post.image}
               alt={post.title}
               fill
               className="object-cover rounded-lg"
               sizes="100vw"
               priority
            />
         </div>
         <p className="text-lg text-black mb-6">{post.description}</p>
         <div className="text-black" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
   )
}
