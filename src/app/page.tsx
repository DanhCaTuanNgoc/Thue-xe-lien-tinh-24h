'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <section className="max-w-5xl mx-auto bg-white rounded-lg shadow p-4 md:p-8 mt-4 mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2 text-center">BẢNG GIÁ THUÊ XE 4 CHỖ</h1>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="text-lg font-semibold text-gray-700">Chỉ <span className="text-red-600 text-2xl font-bold">850.000đ</span> Có Ngay Xe 4 Chỗ</div>
        <div className="bg-yellow-400 px-4 py-2 rounded shadow font-bold text-lg text-red-700 flex items-center gap-2">
          <span>Hotline:</span>
          <a href="tel:0563572572" className="underline">0563 572 572</a>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm md:text-base">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-2 border">Địa điểm</th>
              <th className="p-2 border">Thời gian</th>
              <th className="p-2 border">Km</th>
              <th className="p-2 border">Xe 4 chỗ</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50 font-bold"><td colSpan={4}>Hồ Chí Minh</td></tr>
            <tr><td className="border p-2">Sân Bay</td><td className="border p-2">1 ngày</td><td className="border p-2">10</td><td className="border p-2">500,000</td></tr>
            <tr><td className="border p-2">City tour (4 tiếng/50km)</td><td className="border p-2">1 ngày</td><td className="border p-2">50</td><td className="border p-2">900,000</td></tr>
            <tr><td className="border p-2">City tour (8 tiếng/100km)</td><td className="border p-2">1 ngày</td><td className="border p-2">100</td><td className="border p-2">1,100,000</td></tr>
            <tr><td className="border p-2">Củ Chi</td><td className="border p-2">1 ngày</td><td className="border p-2">100</td><td className="border p-2">1,100,000</td></tr>
            <tr><td className="border p-2">Cần Giờ</td><td className="border p-2">1 ngày</td><td className="border p-2">130</td><td className="border p-2">1,400,000</td></tr>
            <tr className="bg-gray-50 font-bold"><td colSpan={4}>Bình Dương</td></tr>
            <tr><td className="border p-2">Dĩ An</td><td className="border p-2">1 ngày</td><td className="border p-2">50</td><td className="border p-2">1,200,000</td></tr>
            <tr><td className="border p-2">Khu du lịch Thủy Châu</td><td className="border p-2">1 ngày</td><td className="border p-2">50</td><td className="border p-2">1,200,000</td></tr>
            <tr><td className="border p-2">TP Thủ Dầu 1</td><td className="border p-2">1 ngày</td><td className="border p-2">80</td><td className="border p-2">1,100,000</td></tr>
            <tr><td className="border p-2">KCN VSIP 1 và 2</td><td className="border p-2">1 ngày</td><td className="border p-2">80</td><td className="border p-2">1,100,000</td></tr>
            <tr><td className="border p-2">TP mới Bình Dương</td><td className="border p-2">1 ngày</td><td className="border p-2">80</td><td className="border p-2">1,200,000</td></tr>
            <tr><td className="border p-2">Khu du lịch Đại Nam</td><td className="border p-2">1 ngày</td><td className="border p-2">80</td><td className="border p-2">1,100,000</td></tr>
            <tr><td className="border p-2">Tân Uyên</td><td className="border p-2">1 ngày</td><td className="border p-2">100</td><td className="border p-2">1,200,000</td></tr>
            <tr><td className="border p-2">Bến Cát</td><td className="border p-2">1 ngày</td><td className="border p-2">100</td><td className="border p-2">1,200,000</td></tr>
            <tr><td className="border p-2">Phú Giáo</td><td className="border p-2">1 ngày</td><td className="border p-2">130</td><td className="border p-2">1,300,000</td></tr>
            <tr><td className="border p-2">Bàu Bàng</td><td className="border p-2">1 ngày</td><td className="border p-2">130</td><td className="border p-2">1,300,000</td></tr>
            <tr><td className="border p-2">Dầu Tiếng</td><td className="border p-2">1 ngày</td><td className="border p-2">170</td><td className="border p-2">1,500,000</td></tr>
            {/* ...Thêm các địa điểm khác nếu muốn... */}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-gray-700 text-sm">
        <div className="font-bold mb-1">Bảng giá trên đã bao gồm:</div>
        <ul className="list-disc pl-6">
          <li>Xe ô tô 4 chỗ đời mới nhất được quý khách tận tay chọn lựa.</li>
          <li>Bảo hiểm bắt buộc (tai nạn 100 triệu/người, thân vỏ xe, miễn trừ trách nhiệm).</li>
          <li>Phí xăng dầu đi đường, bảo dưỡng xe.</li>
        </ul>
        <div className="mt-2">Một số hạng mục như: thuế VAT 10%, phí qua trạm, tiền lưu trú qua đêm của người lái xe,… sẽ được tư vấn cụ thể, minh bạch.</div>
      </div>
    </section>
  );
}
