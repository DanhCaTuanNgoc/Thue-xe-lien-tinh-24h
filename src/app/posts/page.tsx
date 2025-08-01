'use client'

import Link from 'next/link'
import Image from 'next/image'

const demoPosts = [
   {
      id: 1,
      title: 'Kinh nghiệm thuê xe đi Vũng Tàu cuối tuần',
      description:
         'Tổng hợp những lưu ý và kinh nghiệm khi thuê xe đi Vũng Tàu, giúp chuyến đi của bạn an toàn và tiết kiệm hơn.',
      image: '/vungtau.jpg',
      author: 'Nguyễn Văn An',
      date: '2024-06-01',
      href: '/posts/kinh-nghiem-thue-xe-vung-tau',
   },
   {
      id: 2,
      title: 'So sánh các loại xe 4, 7, 16 chỗ khi đi du lịch',
      description:
         'Nên chọn xe 4 chỗ, 7 chỗ hay 16 chỗ cho chuyến đi gia đình, nhóm bạn? Xem ngay phân tích chi tiết!',
      image: '/xe7cho.png',
      author: 'Trần Thị Bình',
      date: '2024-05-20',
      href: '/posts/so-sanh-xe-du-lich',
   },
   {
      id: 3,
      title: '5 lý do nên chọn Limousine cho chuyến công tác',
      description:
         'Limousine không chỉ sang trọng mà còn mang lại trải nghiệm thoải mái, an toàn cho chuyến đi công tác của bạn.',
      image: '/limouse-banner.jpg',
      author: 'Lê Minh Cường',
      date: '2024-05-10',
      href: '/posts/ly-do-chon-limousine',
   },
]

export default function PostsPage() {
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {demoPosts.map((post) => (
                  <div
                     key={post.id}
                     className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
                  >
                     <div className="relative h-48 w-full">
                        <Image
                           src={post.image}
                           alt={post.title}
                           fill
                           className="object-cover"
                           sizes="(max-width: 768px) 100vw, 33vw"
                           priority={post.id === 1}
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
                           <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <Link
                           href={post.href}
                           className="mt-auto inline-block bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-red-700 transition-colors"
                        >
                           Đọc tiếp
                        </Link>
                     </div>
                  </div>
               ))}
            </div>
         </section>
      </>
   )
}
