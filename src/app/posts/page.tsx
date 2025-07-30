'use client';

import PostList from '../../components/PostList';
import { fetchPosts } from '../../lib/repositories/postApi';
import React, { useEffect, useState } from 'react';
import type { Post } from '../../lib/models/post';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts()
      .then(data => setPosts(data))
      .catch(err => setError('Lỗi tải bài viết!'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Bài viết</h1>
      {loading && <div>Đang tải...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && <PostList posts={posts} />}
    </main>
  );
} 