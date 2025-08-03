'use client';

import React, { useRef } from 'react';
import type { Post } from '../../../../lib/models/post';

interface PostManagementProps {
  posts: Post[];
  postForm: Partial<Omit<Post, 'id'>>;
  postImages: string[];
  editingPostId: string | null;
  loading: boolean;
  onPostFormChange: (form: Partial<Omit<Post, 'id'>>) => void;
  onPostSubmit: (e: React.FormEvent) => void;
  onPostEdit: (post: Post) => void;
  onPostDelete: (id: string) => void;
  onCancelEdit: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}

export default function PostManagement({
  posts,
  postForm,
  postImages,
  editingPostId,
  loading,
  onPostFormChange,
  onPostSubmit,
  onPostEdit,
  onPostDelete,
  onCancelEdit,
  onImageUpload,
  onRemoveImage
}: PostManagementProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-6">
      {/* Form thêm/sửa bài viết ở trên */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
          <span className="text-blue-600">📝</span>
          {editingPostId ? 'Sửa bài viết' : 'Thêm bài viết mới'}
        </h2>
        
        <form onSubmit={onPostSubmit} className="space-y-4">
          <input 
            required 
            placeholder="Tiêu đề bài viết" 
            className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500" 
            value={postForm.title||''} 
            onChange={e=>onPostFormChange({...postForm,title:e.target.value})}
          />
          <textarea 
            placeholder="Nội dung bài viết" 
            rows={4}
            className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500 resize-none" 
            value={postForm.content||''} 
            onChange={e=>onPostFormChange({...postForm,content:e.target.value})}
          />
          
          {/* Image Upload Section */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">Hình ảnh bài viết</label>
            
            {/* File Upload */}
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={onImageUpload}
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
                        onClick={() => onRemoveImage(index)}
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
            onChange={e=>onPostFormChange({...postForm,author:e.target.value})}
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
                onClick={onCancelEdit}
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
                    onClick={() => onPostEdit(post)}
                  >
                    ✏️ Sửa
                  </button>
                  <button 
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold" 
                    onClick={() => onPostDelete(post.id)}
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
  );
} 