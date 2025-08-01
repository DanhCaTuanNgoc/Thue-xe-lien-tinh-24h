import { useState } from 'react';
import { fetchPosts, addPost, updatePost, deletePost } from '../../../../lib/repositories/postApi';
import type { Post } from '../../../../lib/models/post';

export function usePostManagement() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postForm, setPostForm] = useState<Partial<Omit<Post, 'id'>>>({});
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [postImages, setPostImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          setPostImages(prev => [...prev, result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setPostImages(prev => prev.filter((_, i) => i !== index));
  };

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
      await loadPosts();
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
      await loadPosts();
    } catch {
      alert('Lỗi xóa bài viết!');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setPostForm({});
    setPostImages([]);
    setEditingPostId(null);
  };

  return {
    posts,
    postForm,
    postImages,
    editingPostId,
    loading,
    setPostForm,
    handlePostSubmit,
    handlePostEdit,
    handlePostDelete,
    handleCancelEdit,
    handleImageUpload,
    removeImage,
    loadPosts
  };
} 