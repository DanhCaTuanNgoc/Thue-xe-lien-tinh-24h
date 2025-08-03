import * as XLSX from 'xlsx'
import type { Car } from '../models/car'

// Định nghĩa interface cho dữ liệu Excel
export interface ExcelCarData {
   tỉnh: string
   'điểm đến': string
   'quãng đường': number
   'loại xe': string
   giá: number
   'thời gian': number
}

// Chuyển đổi từ Excel data sang Car object
export function excelDataToCar(excelData: ExcelCarData): Omit<Car, 'id'> {
   return {
      province: excelData.tỉnh,
      end_location: excelData['điểm đến'],
      distance: excelData['quãng đường'],
      slug: excelData['loại xe'],
      price: excelData.giá.toString(),
      time: excelData['thời gian'],
   }
}

// Chuyển đổi từ Car object sang Excel data
export function carToExcelData(car: Car): ExcelCarData {
   return {
      tỉnh: car.province,
      'điểm đến': car.end_location,
      'quãng đường': car.distance || 0,
      'loại xe': car.slug || '',
      giá: parseInt(car.price || '0'),
      'thời gian': car.time || 0,
   }
}

// Đọc file Excel
export function readExcelFile(file: File): Promise<ExcelCarData[]> {
   return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
         try {
            const data = new Uint8Array(e.target?.result as ArrayBuffer)
            const workbook = XLSX.read(data, { type: 'array' })
            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]

            // Chuyển đổi sheet thành array of arrays
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as (
               | string
               | number
               | boolean
               | null
               | undefined
            )[][]

            if (jsonData.length < 2) {
               reject(
                  new Error(
                     'File Excel phải có ít nhất 1 dòng dữ liệu (không tính header)',
                  ),
               )
               return
            }

            // Bỏ qua header row (row đầu tiên)
            const dataRows = jsonData.slice(1)

            // Chuyển đổi thành ExcelCarData
            const cars: ExcelCarData[] = dataRows
               .filter((row) => row.length >= 6) // Đảm bảo có đủ 6 cột
               .map((row, index) => {
                  const car = {
                     tỉnh: String(row[0] || '').trim(),
                     'điểm đến': String(row[1] || '').trim(),
                     'quãng đường': Number(row[2] || 0),
                     'loại xe': String(row[3] || '').trim(),
                     giá: Number(row[4] || 0),
                     'thời gian': Number(row[5] || 0),
                  }

                  // Validation
                  if (!car.tỉnh || !car['điểm đến']) {
                     throw new Error(
                        `Dòng ${index + 2}: Tỉnh và điểm đến không được để trống`,
                     )
                  }

                  if (car['quãng đường'] < 0) {
                     throw new Error(`Dòng ${index + 2}: Quãng đường phải >= 0`)
                  }

                  if (car.giá < 0) {
                     throw new Error(`Dòng ${index + 2}: Giá phải >= 0`)
                  }

                  if (car['thời gian'] < 0) {
                     throw new Error(`Dòng ${index + 2}: Thời gian phải >= 0`)
                  }

                  return car
               })
               .filter((car) => car.tỉnh && car['điểm đến']) // Chỉ lấy những dòng có dữ liệu cơ bản

            if (cars.length === 0) {
               reject(new Error('Không tìm thấy dữ liệu hợp lệ trong file Excel'))
               return
            }

            resolve(cars)
         } catch (error) {
            reject(new Error('Không thể đọc file Excel: ' + error))
         }
      }

      reader.onerror = () => {
         reject(new Error('Lỗi đọc file'))
      }

      reader.readAsArrayBuffer(file)
   })
}

// Xuất file Excel
export function exportToExcel(cars: Car[]): void {
   // Chuyển đổi cars thành Excel data
   const excelData = cars.map(carToExcelData)

   // Tạo workbook và worksheet
   const workbook = XLSX.utils.book_new()
   const worksheet = XLSX.utils.json_to_sheet(excelData)

   // Thêm worksheet vào workbook
   XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách xe')

   // Tạo file và download
   const fileName = `danh_sach_xe_${new Date().toISOString().split('T')[0]}.xlsx`
   XLSX.writeFile(workbook, fileName)
}

// Tạo template Excel
export function createExcelTemplate(): void {
   // Tạo header row
   const headers = ['tỉnh', 'điểm đến', 'quãng đường', 'loại xe', 'giá', 'thời gian']

   // Tạo dữ liệu mẫu với slug tiếng Việt và ký tự đặc biệt
   const templateData = [
      headers, // Header row
      ['Hà Nội', 'Hồ Chí Minh', 1700, 'car-xe-khach', 500000, 2],
      ['Hà Nội', 'Đà Nẵng', 800, 'car-xe-4-cho', 300000, 1],
      ['Hồ Chí Minh', 'Nha Trang', 450, 'car-xe-bus', 200000, 1],
      ['Hà Nội', 'Hải Phòng', 120, 'car-xe-4-cho-vip', 150000, 1],
      ['Hồ Chí Minh', 'Vũng Tàu', 125, 'car-xe-khach-bus', 180000, 1],
   ]

   // Tạo workbook
   const workbook = XLSX.utils.book_new()

   // Tạo worksheet từ array data
   const worksheet = XLSX.utils.aoa_to_sheet(templateData)

   // Thêm worksheet vào workbook
   XLSX.utils.book_append_sheet(workbook, worksheet, 'Template')

   // Tạo file và download
   const fileName = 'template_danh_sach_xe.xlsx'
   XLSX.writeFile(workbook, fileName)
}
