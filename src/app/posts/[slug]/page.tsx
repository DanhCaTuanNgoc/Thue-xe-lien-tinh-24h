import Image from 'next/image'
import Link from 'next/link'

const demoPost = {
   title: 'Kinh nghiệm thuê xe đi Vũng Tàu cuối tuần',
   description:
      'Tổng hợp những lưu ý và kinh nghiệm khi thuê xe đi Vũng Tàu, giúp chuyến đi của bạn an toàn và tiết kiệm hơn.',
   content: `
    <p>Vũng Tàu là điểm đến lý tưởng cho những chuyến du lịch cuối tuần. Khi thuê xe, bạn nên chú ý đến các yếu tố như giá cả, chất lượng xe, và dịch vụ hỗ trợ.</p>
    <ul>
      <li>Chọn xe phù hợp với số lượng người đi.</li>
      <li>Kiểm tra kỹ hợp đồng thuê xe.</li>
      <li>Tham khảo đánh giá từ khách hàng trước đó.</li>
    </ul>
    <p>Chúc bạn có chuyến đi vui vẻ và an toàn!</p>
  `,
   image: '/vungtau.jpg',
   author: 'Nguyễn Văn An',
   date: '2024-06-01',
}

export default function PostDetailPage() {
   return (
      <div className="max-w-3xl mx-auto py-10 px-4 bg-white">
         <Link
            href="/posts"
            className="text-red-700 hover:underline mb-4 inline-block font-medium"
         >
            &larr; Quay lại danh sách bài viết
         </Link>
         <h1 className="text-3xl font-bold mb-4 text-gray-900">{demoPost.title}</h1>
         <div className="flex items-center text-gray-600 text-sm mb-6">
            <span>{demoPost.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(demoPost.date).toLocaleDateString('vi-VN')}</span>
         </div>
         <div className="relative w-full h-64 mb-6">
            <Image
               src={demoPost.image}
               alt={demoPost.title}
               fill
               className="object-cover rounded-lg"
               sizes="100vw"
               priority
            />
         </div>
         <p className="text-lg text-black mb-6">{demoPost.description}</p>
         <div
            className="text-black"
            dangerouslySetInnerHTML={{ __html: demoPost.content }}
         />
      </div>
   )
}
