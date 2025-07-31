'use client'

import React, { useState, useEffect } from 'react'
import { fetchCars, addCar, updateCar, deleteCar } from '../../lib/repositories/carApi'
import {
   fetchPosts,
   addPost,
   updatePost,
   deletePost,
} from '../../lib/repositories/postApi'
import type { Car } from '../../lib/models/car'
import type { Post } from '../../lib/models/post'

const ADMIN_PASSWORD = 'admin123'

export default function AdminPage() {
   // Auth
   const [authenticated, setAuthenticated] = useState(false)
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')
   // Tabs
   const [tab, setTab] = useState<'car' | 'post' | 'carType'>('car')
   // Car state
   const [cars, setCars] = useState<Car[]>([])
   const [carForm, setCarForm] = useState<Partial<Omit<Car, 'id'>>>({})
   const [editingCarId, setEditingCarId] = useState<string | null>(null)
   // Post state
   const [posts, setPosts] = useState<Post[]>([])
   const [postForm, setPostForm] = useState<Partial<Omit<Post, 'id'>>>({})
   const [editingPostId, setEditingPostId] = useState<string | null>(null)
   // Loading
   const [loading, setLoading] = useState(false)

   // Auth handler
   const handleLogin = (e: React.FormEvent) => {
      e.preventDefault()
      if (password === ADMIN_PASSWORD) {
         setAuthenticated(true)
         setError('')
      } else {
         setError('Sai mật khẩu!')
      }
   }

   // Fetch data
   useEffect(() => {
      if (!authenticated) return
      if (tab === 'car') {
         fetchCars().then(setCars)
      } else {
         fetchPosts().then(setPosts)
      }
   }, [authenticated, tab])

   // Car handlers
   const handleCarSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      try {
         if (editingCarId) {
            await updateCar(editingCarId, carForm)
         } else {
            await addCar(carForm as Omit<Car, 'id'>)
         }
         setCarForm({})
         setEditingCarId(null)
         setCars(await fetchCars())
      } catch (err) {
         alert('Lỗi thao tác xe!')
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
         setCars(await fetchCars())
      } catch {
         alert('Lỗi xóa xe!')
      } finally {
         setLoading(false)
      }
   }

   // Post handlers
   const handlePostSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      try {
         if (editingPostId) {
            await updatePost(editingPostId, postForm)
         } else {
            await addPost(postForm as Omit<Post, 'id'>)
         }
         setPostForm({})
         setEditingPostId(null)
         setPosts(await fetchPosts())
      } catch (err) {
         alert('Lỗi thao tác bài viết!')
      } finally {
         setLoading(false)
      }
   }
   const handlePostEdit = (post: Post) => {
      setPostForm(post)
      setEditingPostId(post.id)
   }
   const handlePostDelete = async (id: string) => {
      if (!window.confirm('Xóa bài viết này?')) return
      setLoading(true)
      try {
         await deletePost(id)
         setPosts(await fetchPosts())
      } catch {
         alert('Lỗi xóa bài viết!')
      } finally {
         setLoading(false)
      }
   }

   if (!authenticated) {
      return (
         <main className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-xs">
               <h1 className="text-xl font-bold mb-4 text-center text-black">
                  Đăng nhập Admin
               </h1>
               <form onSubmit={handleLogin} className="flex flex-col gap-3">
                  <input
                     type="password"
                     placeholder="Mật khẩu admin"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="border rounded px-3 py-2 text-black"
                  />
                  <button
                     type="submit"
                     className="bg-blue-600 text-white rounded px-3 py-2"
                  >
                     Đăng nhập
                  </button>
                  {error && (
                     <div className="text-red-500 text-sm text-center">{error}</div>
                  )}
               </form>
            </div>
         </main>
      )
   }

   return (
      <main className="max-w-3xl mx-auto py-8 px-4 bg-white text-black">
         <h1 className="text-2xl font-bold mb-6 text-black text-center">Quản trị hệ thống</h1>
         <div className="flex gap-4 mb-6">
            <button
               className={`px-4 py-2 rounded font-semibold border ${
                  tab === 'car'
                     ? 'bg-blue-100 text-black border-blue-400'
                     : 'bg-gray-100 text-black border-gray-300'
               }`}
               onClick={() => setTab('car')}
            >
               Quản lý xe
            </button>
            <button
               className={`px-4 py-2 rounded font-semibold border ${
                  tab === 'post'
                     ? 'bg-blue-100 text-black border-blue-400'
                     : 'bg-gray-100 text-black border-gray-300'
               }`}
               onClick={() => setTab('post')}
            >
               Quản lý bài viết
            </button>
         </div>
         {tab === 'car' ? (
            <section>
               <h2 className="font-semibold mb-2 text-black">Danh sách xe</h2>
               <div className="grid gap-2 mb-4">
                  {cars.map((car) => (
                     <div
                        key={car.id}
                        className="border border-gray-300 rounded p-2 flex flex-col sm:flex-row sm:items-center gap-2 bg-white text-black"
                     >
                        <div className="flex-1 text-black">
                           <b className="text-black">{car.start_location}</b> →{' '}
                           <b className="text-black">{car.end_location}</b> |{' '}
                           <span className="text-black">{car.car_type}</span> |{' '}
                           <span className="text-black">
                              {car.price?.toLocaleString()} VNĐ
                           </span>
                        </div>
                        <div className="flex gap-2">
                           <button
                              className="px-2 py-1 bg-yellow-300 text-black rounded border border-yellow-400 hover:bg-yellow-400"
                              onClick={() => handleCarEdit(car)}
                           >
                              Sửa
                           </button>
                           <button
                              className="px-2 py-1 bg-red-200 text-black rounded border border-red-400 hover:bg-red-300"
                              onClick={() => handleCarDelete(car.id)}
                           >
                              Xóa
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
               <form
                  onSubmit={handleCarSubmit}
                  className="border border-gray-300 rounded p-4 grid gap-2 bg-gray-50 text-black"
               >
                  <h3 className="font-semibold text-black">
                     {editingCarId ? 'Sửa xe' : 'Thêm xe mới'}
                  </h3>
                  <input
                     required
                     placeholder="Điểm đi"
                     className="border border-gray-300 rounded px-2 py-1 text-black bg-white"
                     value={carForm.start_location || ''}
                     onChange={(e) =>
                        setCarForm((f) => ({ ...f, start_location: e.target.value }))
                     }
                  />
                  <input
                     required
                     placeholder="Điểm đến"
                     className="border border-gray-300 rounded px-2 py-1 text-black bg-white"
                     value={carForm.end_location || ''}
                     onChange={(e) =>
                        setCarForm((f) => ({ ...f, end_location: e.target.value }))
                     }
                  />
                  <input
                     placeholder="Thời gian"
                     className="border border-gray-300 rounded px-2 py-1 text-black bg-white"
                     value={carForm.time || ''}
                     onChange={(e) => setCarForm((f) => ({ ...f, time: e.target.value }))}
                  />
                  <input
                     type="number"
                     placeholder="Quãng đường (km)"
                     className="border border-gray-300 rounded px-2 py-1 text-black bg-white"
                     value={carForm.distance || ''}
                     onChange={(e) =>
                        setCarForm((f) => ({ ...f, distance: Number(e.target.value) }))
                     }
                  />
                  <input
                     placeholder="Loại xe"
                     className="border border-gray-300 rounded px-2 py-1 text-black bg-white"
                     value={carForm.car_type || ''}
                     onChange={(e) =>
                        setCarForm((f) => ({ ...f, car_type: e.target.value }))
                     }
                  />
                  <input
                     type="number"
                     placeholder="Giá (VNĐ)"
                     className="border border-gray-300 rounded px-2 py-1 text-black bg-white"
                     value={carForm.price || ''}
                     onChange={(e) =>
                        setCarForm((f) => ({ ...f, price: Number(e.target.value) }))
                     }
                  />
                  <div className="flex gap-2">
                     <button
                        type="submit"
                        className="bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600"
                        disabled={loading}
                     >
                        {editingCarId ? 'Cập nhật' : 'Thêm mới'}
                     </button>
                     {editingCarId && (
                        <button
                           type="button"
                           className="bg-gray-300 text-black rounded px-3 py-1 border border-gray-400 hover:bg-gray-400"
                           onClick={() => {
                              setCarForm({})
                              setEditingCarId(null)
                           }}
                        >
                           Hủy
                        </button>
                     )}
                  </div>
               </form>
            </section>
         ) : (
            <section>
               <h2 className="font-semibold mb-2 text-black">Danh sách bài viết</h2>
               <div className="grid gap-2 mb-4">
                  {posts.map((post) => (
                     <div
                        key={post.id}
                        className="border border-gray-300 rounded p-2 flex flex-col sm:flex-row sm:items-center gap-2 bg-white text-black"
                     >
                        <div className="flex-1 text-black">
                           <b className="text-black">{post.title}</b> |{' '}
                           <span className="text-black">{post.author}</span>{' '}
                           {post.created_at && (
                              <span className="text-black">
                                 - {new Date(post.created_at).toLocaleDateString()}
                              </span>
                           )}
                        </div>
                        <div className="flex gap-2">
                           <button
                              className="px-2 py-1 bg-yellow-300 text-black rounded border border-yellow-400 hover:bg-yellow-400"
                              onClick={() => handlePostEdit(post)}
                           >
                              Sửa
                           </button>
                           <button
                              className="px-2 py-1 bg-red-200 text-black rounded border border-red-400 hover:bg-red-300"
                              onClick={() => handlePostDelete(post.id)}
                           >
                              Xóa
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
               <form
                  onSubmit={handlePostSubmit}
                  className="border border-gray-300 rounded p-4 grid gap-2 bg-gray-50 text-black"
               >
                  <h3 className="font-semibold text-black">
                     {editingPostId ? 'Sửa bài viết' : 'Thêm bài viết mới'}
                  </h3>
                  <input
                     required
                     placeholder="Tiêu đề"
                     className="border border-gray-300 rounded px-2 py-1 text-black bg-white"
                     value={postForm.title || ''}
                     onChange={(e) =>
                        setPostForm((f) => ({ ...f, title: e.target.value }))
                     }
                  />
                  <textarea
                     placeholder="Nội dung"
                     className="border border-gray-300 rounded px-2 py-1 text-black bg-white"
                     value={postForm.content || ''}
                     onChange={(e) =>
                        setPostForm((f) => ({ ...f, content: e.target.value }))
                     }
                  />
                  <input
                     placeholder="URL ảnh"
                     className="border border-gray-300 rounded px-2 py-1 text-black bg-white"
                     value={postForm.image || ''}
                     onChange={(e) =>
                        setPostForm((f) => ({ ...f, image: e.target.value }))
                     }
                  />
                  <input
                     placeholder="Tác giả"
                     className="border border-gray-300 rounded px-2 py-1 text-black bg-white"
                     value={postForm.author || ''}
                     onChange={(e) =>
                        setPostForm((f) => ({ ...f, author: e.target.value }))
                     }
                  />
                  <div className="flex gap-2">
                     <button
                        type="submit"
                        className="bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600"
                        disabled={loading}
                     >
                        {editingPostId ? 'Cập nhật' : 'Thêm mới'}
                     </button>
                     {editingPostId && (
                        <button
                           type="button"
                           className="bg-gray-300 text-black rounded px-3 py-1 border border-gray-400 hover:bg-gray-400"
                           onClick={() => {
                              setPostForm({})
                              setEditingPostId(null)
                           }}
                        >
                           Hủy
                        </button>
                     )}
                  </div>
               </form>
            </section>
         )}
      </main>
   )
}
