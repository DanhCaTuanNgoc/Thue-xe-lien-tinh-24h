'use client'

import React from 'react'
import { exportToExcel } from '../../../../../lib/utils/excelUtils'
import type { Car } from '../../../../../lib/models/car'
import type { CarType } from '../../../../../lib/models/car_type'

interface ExcelExportProps {
  cars: Car[]
  carTypes: CarType[] // Thêm prop carTypes để hiển thị tên loại xe
}

export default function ExcelExport({ cars, carTypes }: ExcelExportProps) {
  const handleExport = () => {
    if (cars.length === 0) {
      alert('Không có dữ liệu để xuất!')
      return
    }

    try {
      exportToExcel(cars, carTypes)
      alert(`Đã xuất thành công ${cars.length} xe ra file Excel!`)
    } catch (error) {
      console.error('Lỗi xuất Excel:', error)
      alert('Lỗi xuất file Excel!')
    }
  }

  // Hàm lấy tên loại xe từ id_car_type
  const getCarTypeName = (id_car_type: number) => {
    const carType = carTypes.find(ct => ct.id === id_car_type)
    return carType ? carType.name : `ID: ${id_car_type}`
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
      <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
        <span className="text-orange-600">📤</span>
        Export Excel
      </h3>

      <div className="space-y-4">
        {/* Thông tin */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="font-semibold text-orange-800 mb-2">ℹ️ Thông tin:</h4>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• Xuất toàn bộ danh sách xe hiện tại</li>
            <li>• File sẽ có định dạng: danh_sach_xe_YYYY-MM-DD.xlsx</li>
            <li>• Bao gồm 6 cột: tỉnh, điểm đến, quãng đường, loại xe, giá, thời gian</li>
          </ul>
        </div>

        {/* Export button */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleExport}
            disabled={cars.length === 0}
            className={`rounded-lg px-6 py-3 font-semibold transition-colors flex items-center gap-2 ${
              cars.length === 0
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-orange-600 text-white hover:bg-orange-700'
            }`}
          >
            📤 Xuất Excel ({cars.length} xe)
          </button>
        </div>

        {/* Preview */}
        {cars.length > 0 && (
          <div className="border border-slate-200 rounded-lg p-4">
            <h4 className="font-semibold text-slate-700 mb-2">👀 Xem trước (5 xe đầu):</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-3 py-2 text-left border text-slate-800">Tỉnh</th>
                    <th className="px-3 py-2 text-left border text-slate-800">Điểm đến</th>
                    <th className="px-3 py-2 text-left border text-slate-800">Quãng đường</th>
                    <th className="px-3 py-2 text-left border text-slate-800">Loại xe</th>
                    <th className="px-3 py-2 text-left border text-slate-800">Giá</th>
                    <th className="px-3 py-2 text-left border text-slate-800">Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.slice(0, 5).map((car, index) => (
                    <tr key={car.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-3 py-2 border text-slate-700">{car.province}</td>
                      <td className="px-3 py-2 border text-slate-700">{car.end_location}</td>
                      <td className="px-3 py-2 border text-slate-700">{car.distance || 0} km</td>
                      <td className="px-3 py-2 border text-slate-700">{car.id_car_type ? getCarTypeName(car.id_car_type) : '-'}</td>
                      <td className="px-3 py-2 border text-slate-700">{car.price || 0} VNĐ</td>
                      <td className="px-3 py-2 border text-slate-700">{car.time || 0} ngày</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {cars.length > 5 && (
              <div className="text-center text-slate-500 text-sm mt-2">
                ... và {cars.length - 5} xe khác
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 