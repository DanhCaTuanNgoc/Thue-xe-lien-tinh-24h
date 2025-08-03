'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { fetchPosts } from '../../lib/repositories/postApi'
import type { Post } from '../../lib/models/post'

export default function PostsPage() {
   const [posts, setPosts] = useState<Post[]>([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const loadPosts = async () => {
         try {
            const data = await fetchPosts()
            setPosts(data)
         } catch (error) {
            console.error('Lỗi tải bài viết:', error)
         } finally {
            setLoading(false)
         }
      }
      loadPosts()
   }, [])

   return (
      <>
         <section className="relative w-full h-[280px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden">
            <Image
               src="/banner.jpg"
               alt="Banner thuê xe"
               width={1920}
               height={500}
               className="w-full h-full object-cover"
               priority
            />
         </section>

         <section className="max-w-5xl mx-auto py-12 px-4">
            <div className="flex flex-col items-center mb-8">
               <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center tracking-wide uppercase">
                  BÀI VIẾT
               </h1>
               <div className="mt-2 flex items-center gap-2">
                  <span className="block w-10 h-1 bg-gray-300 rounded-full"></span>
                  <svg
                     className="w-5 h-5 text-gray-400"
                     fill="currentColor"
                     viewBox="0 0 20 20"
                  >
                     <path d="M10 2a1 1 0 01.894.553l7 14A1 1 0 0117 18H3a1 1 0 01-.894-1.447l7-14A1 1 0 0110 2zm0 3.618L4.618 16h10.764L10 5.618z" />
                  </svg>
                  <span className="block w-10 h-1 bg-gray-300 rounded-full"></span>
               </div>
            </div>

            {loading ? (
               <div className="flex flex-col items-center justify-center py-8 text-slate-500">
                  <svg
                     className="animate-spin h-8 w-8 text-red-500 mb-4"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                  >
                     <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                     ></circle>
                     <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                     ></path>
                  </svg>
                  Đang tải dữ liệu...
               </div>
            ) : posts.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-center text-gray-500 text-lg">
                     Chưa có bài viết nào.
                     <br />
                     Hãy quay lại sau để xem những bài viết mới nhất!
                  </p>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {posts.map((post) => (
                     <div
                        key={post.id}
                        className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
                     >
                        <div className="relative h-48 w-full">
                           <Image
                              src={post.image?.split('|')[0] || '/placeholder.png'}
                              alt={post.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 33vw"
                              priority={post === posts[0]}
                           />
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                           <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                              {post.title}
                           </h2>
                           <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                              {post.description}
                           </p>
                           <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                              <span>{post.author}</span>
                              <span>
                                 {post.created_at
                                    ? new Date(post.created_at).toLocaleDateString(
                                         'vi-VN',
                                      )
                                    : ''}
                              </span>
                           </div>
                           <Link
                              href={`/posts/${post.id}`}
                              className="mt-auto inline-block bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-red-700 transition-colors"
                           >
                              Đọc tiếp
                           </Link>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </section>
      </>
   )
}
