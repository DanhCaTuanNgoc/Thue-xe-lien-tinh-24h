'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-3xl font-bold mb-8">Chào mừng đến với dịch vụ thuê xe</h1>
      <div className="flex gap-6">
        <Link href="/cars" className="px-6 py-3 bg-blue-600 text-white rounded text-lg shadow hover:bg-blue-700 transition">Danh sách xe cho thuê</Link>
        <Link href="/posts" className="px-6 py-3 bg-green-600 text-white rounded text-lg shadow hover:bg-green-700 transition">Bài viết</Link>
      </div>
    </main>
  );
}
