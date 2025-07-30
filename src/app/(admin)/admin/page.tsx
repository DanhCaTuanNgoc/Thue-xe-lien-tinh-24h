'use client';

import React, { useState, useEffect, useRef } from 'react';
import { fetchCars, addCar, updateCar, deleteCar } from '../../../lib/repositories/carApi';
import { fetchPosts, addPost, updatePost, deletePost } from '../../../lib/repositories/postApi';
import type { Car } from '../../../lib/models/car';
import type { Post } from '../../../lib/models/post';

const ADMIN_PASSWORD = 'admin123';

export default function AdminPage() {
  // Auth
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // Tabs
  const [tab, setTab] = useState<'car' | 'post'>('car');
  // Car state
  const [cars, setCars] = useState<Car[]>([]);
  const [carForm, setCarForm] = useState<Partial<Omit<Car, 'id'>>>({});
  const [editingCarId, setEditingCarId] = useState<string | null>(null);
  // Post state
  const [posts, setPosts] = useState<Post[]>([]);
  const [postForm, setPostForm] = useState<Partial<Omit<Post, 'id'>>>({});
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [postImages, setPostImages] = useState<string[]>([]);
  // Loading
  const [loading, setLoading] = useState(false);
  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auth handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Sai mật khẩu!');
    }
  };

  // Fetch data
  useEffect(() => {
    if (!authenticated) return;
    if (tab === 'car') {
      fetchCars().then(setCars);
    } else {
      fetchPosts().then(setPosts);
    }
  }, [authenticated, tab]);

  // Image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          newImages.push(result);
          setPostImages(prev => [...prev, result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  // Remove image
  const removeImage = (index: number) => {
    setPostImages(prev => prev.filter((_, i) => i !== index));
  };

  // Car handlers
  const handleCarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingCarId) {
        await updateCar(editingCarId, carForm);
      } else {
        await addCar(carForm as Omit<Car, 'id'>);
      }
      setCarForm({});
      setEditingCarId(null);
      setCars(await fetchCars());
    } catch (err) {
      alert('Lỗi thao tác xe!');
    } finally {
      setLoading(false);
    }
  };
  const handleCarEdit = (car: Car) => {
    setCarForm(car);
    setEditingCarId(car.id);
  };
  const handleCarDelete = async (id: string) => {
    if (!window.confirm('Xóa xe này?')) return;
    setLoading(true);
    try {
      await deleteCar(id);
      setCars(await fetchCars());
    } catch {
      alert('Lỗi xóa xe!');
    } finally {
      setLoading(false);
    }
  };

  // Post handlers
  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Combine images with existing image URL
      const allImages = postForm.image ? [postForm.image, ...postImages] : postImages;
      const imageUrls = allImages.join('|');
      
      const postData = {
        ...postForm,
        image: imageUrls
      };

      if (editingPostId) {
        await updatePost(editingPostId, postData);
      } else {
        await addPost(postData as Omit<Post, 'id'>);
      }
      setPostForm({});
      setPostImages([]);
      setEditingPostId(null);
      setPosts(await fetchPosts());
    } catch (err) {
      alert('Lỗi thao tác bài viết!');
    } finally {
      setLoading(false);
    }
  };
  const handlePostEdit = (post: Post) => {
    setPostForm(post);
    setEditingPostId(post.id);
    // Parse existing images
    if (post.image) {
      const images = post.image.split('|').filter(img => img.startsWith('data:image'));
      setPostImages(images);
    } else {
      setPostImages([]);
    }
  };
  const handlePostDelete = async (id: string) => {
    if (!window.confirm('Xóa bài viết này?')) return;
    setLoading(true);
    try {
      await deletePost(id);
      setPosts(await fetchPosts());
    } catch {
      alert('Lỗi xóa bài viết!');
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Mật khẩu Admin</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Đăng nhập
            </button>
            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-200">
          
          {/* Tabs */}
          <div className="flex gap-4 justify-center">
            <button
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                tab === 'car' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
              onClick={() => setTab('car')}
            >
              🚗 Quản lý xe
            </button>
            <button
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                tab === 'post' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
              onClick={() => setTab('post')}
            >
              📝 Quản lý bài viết
            </button>
          </div>
        </div>

        {tab === 'car' ? (
          <div className="space-y-6">
            {/* Form thêm/sửa xe ở trên */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
                <span className="text-blue-600">🚗</span>
                {editingCarId ? 'Sửa thông tin xe' : 'Thêm xe mới'}
              </h2>
              
              <form onSubmit={handleCarSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    required 
                    placeholder="Điểm đi" 
                    className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500" 
                    value={carForm.start_location||''} 
                    onChange={e=>setCarForm(f=>({...f,start_location:e.target.value}))}
                  />
                  <input 
                    required 
                    placeholder="Điểm đến" 
                    className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500" 
                    value={carForm.end_location||''} 
                    onChange={e=>setCarForm(f=>({...f,end_location:e.target.value}))}
                  />
                  <input 
                    placeholder="Thời gian" 
                    className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500" 
                    value={carForm.time||''} 
                    onChange={e=>setCarForm(f=>({...f,time:e.target.value}))}
                  />
                  <input 
                    type="number" 
                    placeholder="Quãng đường (km)" 
                    className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500" 
                    value={carForm.distance||''} 
                    onChange={e=>setCarForm(f=>({...f,distance:Number(e.target.value)}))}
                  />
                  <input 
                    placeholder="Loại xe" 
                    className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500" 
                    value={carForm.car_type||''} 
                    onChange={e=>setCarForm(f=>({...f,car_type:e.target.value}))}
                  />
                  <input 
                    type="number" 
                    placeholder="Giá (VNĐ)" 
                    className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500" 
                    value={carForm.price||''} 
                    onChange={e=>setCarForm(f=>({...f,price:Number(e.target.value)}))}
                  />
                </div>
                <div className="flex gap-3">
                  <button 
                    type="submit" 
                    className="bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50" 
                    disabled={loading}
                  >
                    {loading ? '⏳ Đang xử lý...' : (editingCarId ? '💾 Cập nhật' : '➕ Thêm mới')}
                  </button>
                  {editingCarId && (
                    <button 
                      type="button" 
                      className="bg-slate-500 text-white rounded-lg px-6 py-3 font-semibold hover:bg-slate-600 transition-colors" 
                      onClick={()=>{setCarForm({});setEditingCarId(null);}}
                    >
                      ❌ Hủy
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Danh sách xe ở dưới */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
                <span className="text-blue-600">📋</span>
                Danh sách xe ({cars.length})
              </h3>
              <div className="space-y-3">
                {cars.map(car => (
                  <div key={car.id} className="border-2 border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-slate-50">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800">
                          <span className="text-blue-600">{car.start_location}</span> 
                          <span className="mx-2">→</span>
                          <span className="text-blue-700">{car.end_location}</span>
                        </div>
                        <div className="text-sm text-slate-600 mt-1">
                          {car.car_type} • {car.distance}km • {car.price?.toLocaleString()} VNĐ
                        </div>
                        {car.time && <div className="text-sm text-slate-500">⏰ {car.time}</div>}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-semibold" 
                          onClick={() => handleCarEdit(car)}
                        >
                          ✏️ Sửa
                        </button>
                        <button 
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold" 
                          onClick={() => handleCarDelete(car.id)}
                        >
                          🗑️ Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {cars.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <div className="text-4xl mb-2">🚗</div>
                    <div>Chưa có xe nào trong danh sách</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Form thêm/sửa bài viết ở trên */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
                <span className="text-blue-600">📝</span>
                {editingPostId ? 'Sửa bài viết' : 'Thêm bài viết mới'}
              </h2>
              
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <input 
                  required 
                  placeholder="Tiêu đề bài viết" 
                  className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500" 
                  value={postForm.title||''} 
                  onChange={e=>setPostForm(f=>({...f,title:e.target.value}))}
                />
                <textarea 
                  placeholder="Nội dung bài viết" 
                  rows={4}
                  className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500 resize-none" 
                  value={postForm.content||''} 
                  onChange={e=>setPostForm(f=>({...f,content:e.target.value}))}
                />
                
                {/* Image Upload Section */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">Hình ảnh bài viết</label>
                  
                  {/* URL Input */}
                  <input 
                    placeholder="URL ảnh (tùy chọn)" 
                    className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500" 
                    value={postForm.image||''} 
                    onChange={e=>setPostForm(f=>({...f,image:e.target.value}))}
                  />
                  
                  {/* File Upload */}
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-700 transition-all duration-200"
                    >
                      📁 Chọn ảnh từ máy tính
                    </button>
                    <p className="text-sm text-slate-500 mt-2">Có thể chọn nhiều ảnh cùng lúc</p>
                  </div>
                  
                  {/* Image Preview */}
                  {postImages.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-slate-700">Ảnh đã chọn ({postImages.length})</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {postImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border-2 border-slate-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <input 
                  placeholder="Tác giả" 
                  className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500" 
                  value={postForm.author||''} 
                  onChange={e=>setPostForm(f=>({...f,author:e.target.value}))}
                />
                
                <div className="flex gap-3">
                  <button 
                    type="submit" 
                    className="bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50" 
                    disabled={loading}
                  >
                    {loading ? '⏳ Đang xử lý...' : (editingPostId ? '💾 Cập nhật' : '➕ Thêm mới')}
                  </button>
                  {editingPostId && (
                    <button 
                      type="button" 
                      className="bg-slate-500 text-white rounded-lg px-6 py-3 font-semibold hover:bg-slate-600 transition-colors" 
                      onClick={()=>{setPostForm({});setPostImages([]);setEditingPostId(null);}}
                    >
                      ❌ Hủy
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Danh sách bài viết ở dưới */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
                <span className="text-blue-600">📋</span>
                Danh sách bài viết ({posts.length})
              </h3>
              <div className="space-y-3">
                {posts.map(post => (
                  <div key={post.id} className="border-2 border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-slate-50">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800">{post.title}</div>
                        <div className="text-sm text-slate-600 mt-1">
                          👤 {post.author} {post.created_at && `• 📅 ${new Date(post.created_at).toLocaleDateString()}`}
                        </div>
                        {post.content && (
                          <div className="text-sm text-slate-500 mt-1 line-clamp-2">
                            {post.content.substring(0, 100)}...
                          </div>
                        )}
                        {/* Show image count */}
                        {post.image && (
                          <div className="text-sm text-blue-600 mt-1">
                            🖼️ {post.image.split('|').length} ảnh
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-semibold" 
                          onClick={() => handlePostEdit(post)}
                        >
                          ✏️ Sửa
                        </button>
                        <button 
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold" 
                          onClick={() => handlePostDelete(post.id)}
                        >
                          🗑️ Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {posts.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <div className="text-4xl mb-2">📝</div>
                    <div>Chưa có bài viết nào trong danh sách</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
