'use client'

import React, { useState, useRef } from 'react'
import { readExcelFile, excelDataToCar, createExcelTemplate } from '../../../../../lib/utils/excelUtils' 
import { addCar } from '../../../../../lib/repositories/carApi'
import type { CarType } from '../../../../../lib/models/car_type'

interface ExcelImportProps {
  onImportComplete: () => void
  onError: (message: string) => void
  carTypes: CarType[] // Thêm prop carTypes để tìm ID từ tên
}

export default function ExcelImport({ onImportComplete, onError, carTypes }: ExcelImportProps) {
  const [isImporting, setIsImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(0)
  const [totalRows, setTotalRows] = useState(0)
  const [currentRow, setCurrentRow] = useState(0)
  const [skipInvalidRows, setSkipInvalidRows] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Hàm tìm car type ID từ tên
  const findCarTypeId = (carTypeName: string): number | null => {
    const carType = carTypes.find(ct => ct.name.toLowerCase() === carTypeName.toLowerCase())
    return carType ? carType.id : null
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Kiểm tra file type
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      onError('Vui lòng chọn file Excel (.xlsx hoặc .xls)')
      return
    }

    setIsImporting(true)
    setImportProgress(0)
    setCurrentRow(0)

    try {
      // Đọc file Excel - nếu có lỗi validation sẽ throw error và dừng ngay
      const excelData = await readExcelFile(file)
      setTotalRows(excelData.length)

      if (excelData.length === 0) {
        onError('File Excel không có dữ liệu hợp lệ')
        return
      }

      // Import dữ liệu
      let successCount = 0
      const errors: string[] = []
      const skippedRows: number[] = []

      for (let i = 0; i < excelData.length; i++) {
        try {
          const carData = excelData[i]
          
          // Tìm car type ID từ tên
          const carTypeId = findCarTypeId(carData['loại xe'])
          if (!carTypeId) {
            throw new Error(`Loại xe "${carData['loại xe']}" không tồn tại trong hệ thống`)
          }
          
          // Chuyển đổi Excel data sang Car object
          const car = excelDataToCar(carData)
          car.id_car_type = carTypeId // Set ID đã tìm được
          
          // Thêm xe vào database
          await addCar(car)
          
          successCount++
        } catch (error) {
          const errorMessage = error instanceof Error && error.message.includes('đã tồn tại') 
            ? `Dòng ${i + 2}: ${error.message}` 
            : `Dòng ${i + 2}: ${(error as Error).message}`
          errors.push(errorMessage)
          skippedRows.push(i + 2)
          console.error(errorMessage, error)
          
          // Nếu không bỏ qua lỗi thì dừng ngay
          if (!skipInvalidRows) {
            const fullErrorMessage = `Import thất bại!\n\nLỗi gặp phải:\n${errorMessage}\n\nVui lòng sửa lỗi và thử lại.`
            onError(fullErrorMessage)
            return
          }
        }

        // Cập nhật progress
        setCurrentRow(i + 1)
        setImportProgress(((i + 1) / excelData.length) * 100)
      }

      // Kiểm tra kết quả
      if (errors.length > 0 && !skipInvalidRows) {
        // Có lỗi và không bỏ qua - dừng và hiển thị tất cả lỗi
        const errorMessage = `Import thất bại!\n\nCác lỗi gặp phải:\n${errors.join('\n')}\n\nVui lòng sửa lỗi và thử lại.`
        onError(errorMessage)
        return
      }

      // Thông báo kết quả
      if (errors.length > 0) {
        // Có lỗi nhưng đã bỏ qua
        const resultMessage = `Import hoàn tất!\n\n✅ Thành công: ${successCount} xe\n❌ Bỏ qua: ${errors.length} dòng có lỗi\n\nCác dòng bị bỏ qua: ${skippedRows.join(', ')}\n\nLỗi chi tiết:\n${errors.join('\n')}`
        alert(resultMessage)
        onImportComplete()
      } else {
        // Thành công hoàn toàn
        onImportComplete()
        alert(`Import thành công ${successCount} xe!`)
      }

    } catch (error) {
      console.error('Lỗi import Excel:', error)
      onError('Lỗi đọc file Excel: ' + (error as Error).message)
    } finally {
      setIsImporting(false)
      setImportProgress(0)
      setCurrentRow(0)
      setTotalRows(0)
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDownloadTemplate = () => {
    createExcelTemplate()
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
      <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
        <span className="text-green-600">📊</span>
        Import Excel
      </h3>

      <div className="space-y-4">
        {/* Hướng dẫn */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">📋 Hướng dẫn:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• File Excel phải có 6 cột: tỉnh, điểm đến, quãng đường, loại xe, giá, thời gian</li>
            <li>• Dòng đầu tiên là header, dữ liệu bắt đầu từ dòng thứ 2</li>
            <li>• Quãng đường, giá, thời gian phải là số</li>
            <li>• Loại xe phải khớp với tên loại xe trong hệ thống</li>
            <li>• Hệ thống sẽ kiểm tra trùng lặp dựa trên tỉnh, điểm đến và loại xe</li>
          </ul>
        </div>

        {/* Danh sách loại xe có sẵn */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">🚙 Loại xe có sẵn trong hệ thống:</h4>
          <div className="text-sm text-green-700">
            {carTypes.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {carTypes.map(carType => (
                  <span key={carType.id} className="bg-green-100 px-2 py-1 rounded text-green-800">
                    {carType.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-yellow-600">Chưa có loại xe nào trong hệ thống</p>
            )}
          </div>
        </div>

        {/* Tùy chọn xử lý lỗi */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="skip-invalid-rows"
              checked={skipInvalidRows}
              onChange={(e) => setSkipInvalidRows(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="skip-invalid-rows" className="text-sm font-medium text-yellow-800">
              Bỏ qua các dòng có lỗi và tiếp tục import
            </label>
          </div>
          <p className="text-xs text-yellow-700 mt-1">
            Khi bật: Hệ thống sẽ bỏ qua các dòng có lỗi và chỉ import các dòng hợp lệ
          </p>
        </div>

        {/* Download template */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleDownloadTemplate}
            className="bg-green-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            📥 Tải template Excel
          </button>
        </div>

        {/* File input */}
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileSelect}
            disabled={isImporting}
            className="hidden"
            id="excel-file-input"
          />
          <label
            htmlFor="excel-file-input"
            className={`cursor-pointer flex flex-col items-center gap-2 ${
              isImporting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="text-4xl">📁</div>
            <div className="text-slate-600">
              {isImporting ? 'Đang import...' : 'Click để chọn file Excel'}
            </div>
            <div className="text-sm text-slate-500">
              Hỗ trợ .xlsx và .xls
            </div>
          </label>
        </div>

        {/* Progress bar */}
        {isImporting && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Đang import...</span>
              <span>{currentRow}/{totalRows} dòng</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${importProgress}%` }}
              ></div>
            </div>
            <div className="text-center text-sm text-slate-500">
              {Math.round(importProgress)}% hoàn thành
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 