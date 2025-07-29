import React, { useState, useEffect } from 'react';
import { fetchPosts, addPost, updatePost, deletePost } from '../../lib/repositories/postApi';
import type { Post } from '../../lib/models/post';

export default function PostManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postForm, setPostForm] = useState<Partial<Omit<Post, 'id'>>>({});
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts().then(setPosts);
  }, []);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingPostId) {
        await updatePost(editingPostId, postForm);
      } else {
        await addPost(postForm as Omit<Post, 'id'>);
      }
      setPostForm({});
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

  return (
    <section>
      <h2 className="font-semibold mb-2">Danh sách bài viết</h2>
      <div className="grid gap-2 mb-4">
        {posts.map(post => (
          <div key={post.id} className="border rounded p-2 flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="flex-1">
              <b>{post.title}</b> | {post.author} {post.created_at && `- ${new Date(post.created_at).toLocaleDateString()}`}
            </div>
            <div className="flex gap-2">
              <button className="px-2 py-1 bg-yellow-400 rounded" onClick={() => handlePostEdit(post)}>Sửa</button>
              <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handlePostDelete(post.id)}>Xóa</button>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handlePostSubmit} className="border rounded p-4 grid gap-2 bg-gray-50">
        <h3 className="font-semibold">{editingPostId ? 'Sửa bài viết' : 'Thêm bài viết mới'}</h3>
        <input required placeholder="Tiêu đề" className="border rounded px-2 py-1" value={postForm.title||''} onChange={e=>setPostForm(f=>({...f,title:e.target.value}))}/>
        <textarea placeholder="Nội dung" className="border rounded px-2 py-1" value={postForm.content||''} onChange={e=>setPostForm(f=>({...f,content:e.target.value}))}/>
        <input placeholder="URL ảnh" className="border rounded px-2 py-1" value={postForm.image||''} onChange={e=>setPostForm(f=>({...f,image:e.target.value}))}/>
        <input placeholder="Tác giả" className="border rounded px-2 py-1" value={postForm.author||''} onChange={e=>setPostForm(f=>({...f,author:e.target.value}))}/>
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white rounded px-3 py-1" disabled={loading}>{editingPostId ? 'Cập nhật' : 'Thêm mới'}</button>
          {editingPostId && <button type="button" className="bg-gray-400 rounded px-3 py-1" onClick={()=>{setPostForm({});setEditingPostId(null);}}>Hủy</button>}
        </div>
      </form>
    </section>
  );
} 