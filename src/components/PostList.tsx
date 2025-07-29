import React from 'react';

export type Post = {
  id: string;
  title: string;
  content?: string;
  image?: string;
  created_at?: string;
  author?: string;
};

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  if (!posts.length) return <div>Không có bài viết nào để hiển thị.</div>;
  return (
    <div className="grid gap-4">
      {posts.map(post => (
        <div key={post.id} className="border rounded p-4 shadow">
          <div className="font-bold text-lg mb-1">{post.title}</div>
          {post.image && <img src={post.image} alt={post.title} className="mb-2 max-h-48 object-cover w-full" />}
          {post.content && <div className="mb-2">{post.content}</div>}
          <div className="text-xs text-gray-500">{post.author} {post.created_at && `- ${new Date(post.created_at).toLocaleDateString()}`}</div>
        </div>
      ))}
    </div>
  );
};

export default PostList; 