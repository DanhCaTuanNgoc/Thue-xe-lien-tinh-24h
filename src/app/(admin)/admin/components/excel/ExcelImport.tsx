'use client'

import React, { useState, useRef } from 'react'
import { readExcelFile, excelDataToCar, createExcelTemplate } from '../../../../../lib/utils/excelUtils' 
import type { Car } from '../../../../../lib/models/car'
import { addCar } from '../../../../../lib/repositories/carApi'

interface ExcelImportProps {
  onImportComplete: () => void
  onError: (message: string) => void
}

export default function ExcelImport({ onImportComplete, onError }: ExcelImportProps) {
  const [isImporting, setIsImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(0)
  const [totalRows, setTotalRows] = useState(0)
  const [currentRow, setCurrentRow] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
      // Đọc file Excel
      const excelData = await readExcelFile(file)
      setTotalRows(excelData.length)

      if (excelData.length === 0) {
        onError('File Excel không có dữ liệu hợp lệ')
        setIsImporting(false)
        return
      }

      // Import từng dòng
      let successCount = 0
      let errorCount = 0

      for (let i = 0; i < excelData.length; i++) {
        try {
          const carData = excelData[i]
          
          // Chuyển đổi Excel data sang Car object
          const car = excelDataToCar(carData)
          
          // Thêm xe vào database
          await addCar(car)
          
          successCount++
        } catch (error) {
          console.error(`Lỗi import dòng ${i + 1}:`, error)
          errorCount++
        }

        // Cập nhật progress
        setCurrentRow(i + 1)
        setImportProgress(((i + 1) / excelData.length) * 100)
      }

      // Thông báo kết quả
      if (errorCount === 0) {
        onImportComplete()
        alert(`Import thành công ${successCount} xe!`)
      } else {
        alert(`Import hoàn tất: ${successCount} thành công, ${errorCount} lỗi`)
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
            <li>• Loại xe phải khớp với slug trong hệ thống</li>
          </ul>
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