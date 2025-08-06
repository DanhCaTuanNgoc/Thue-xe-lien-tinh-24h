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
      id_car_type: 0, // Sẽ được set sau khi tìm car type
      price: excelData.giá,
      time: excelData['thời gian'],
   }
}

// Chuyển đổi từ Car object sang Excel data
export function carToExcelData(car: Car, carTypes: any[]): ExcelCarData {
   const carType = carTypes.find(ct => ct.id === car.id_car_type)
   return {
      tỉnh: car.province,
      'điểm đến': car.end_location,
      'quãng đường': car.distance || 0,
      'loại xe': carType ? carType.name : `ID: ${car.id_car_type}`,
      giá: car.price || 0,
      'thời gian': car.time || 0,
   }
}

// Hàm helper để chuyển đổi string số có dấu phẩy/dấu chấm thành number
function parseNumber(value: unknown, fieldName: string, rowIndex: number): number {
   if (typeof value === 'number') {
      return value
   }

   if (typeof value === 'string') {
      const trimmedValue = value.trim()

      // Kiểm tra xem có chứa chữ cái không (ngoại trừ dấu phẩy, dấu chấm, dấu trừ, dấu cộng)
      // Chỉ cho phép: số, dấu phẩy, dấu chấm, dấu trừ, dấu cộng, khoảng trắng
      const validNumberPattern = /^[\d\s,.\-+]+$/

      if (!validNumberPattern.test(trimmedValue)) {
         throw new Error(
            `Dòng ${
               rowIndex + 2
            }: ${fieldName} chứa ký tự không hợp lệ. Giá trị: "${trimmedValue}". Chỉ cho phép số, dấu phẩy, dấu chấm, dấu trừ, dấu cộng`,
         )
      }

      // Loại bỏ khoảng trắng và chuyển dấu phẩy thành dấu chấm
      const cleanedValue = trimmedValue.replace(/,/g, '.')
      const parsed = parseFloat(cleanedValue)
      return isNaN(parsed) ? 0 : parsed
   }

   return 0
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
                     'quãng đường': parseNumber(row[2], 'Quãng đường', index),
                     'loại xe': String(row[3] || '').trim(),
                     giá: parseNumber(row[4], 'Giá', index),
                     'thời gian': parseNumber(row[5], 'Thời gian', index),
                  }

                  // Validation
                  if (!car.tỉnh || !car['điểm đến']) {
                     throw new Error(
                        `Dòng ${index + 2}: Tỉnh và điểm đến không được để trống`,
                     )
                  }

                  if (car['quãng đường'] <= 0) {
                     throw new Error(`Dòng ${index + 2}: Quãng đường phải >= 0`)
                  }

                  if (car.giá <= 0) {
                     throw new Error(`Dòng ${index + 2}: Giá phải >= 0`)
                  }

                  if (car['thời gian'] <= 0) {
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
export function exportToExcel(cars: Car[], carTypes: any[]): void {
   // Chuyển đổi cars thành Excel data
   const excelData = cars.map(car => carToExcelData(car, carTypes))

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

   // Tạo dữ liệu mẫu với tên loại xe
   const templateData = [
      headers, // Header row
      ['Hà Nội', 'Hồ Chí Minh', 1700, 'Xe 4 chỗ', 500000, 2],
      ['Hà Nội', 'Đà Nẵng', 800, 'Xe 7 chỗ', 300000, 1],
      ['Hồ Chí Minh', 'Nha Trang', 450, 'Xe khách', 200000, 1],
      ['Hà Nội', 'Hải Phòng', 120, 'Xe tải', 150000, 1],
      ['Hồ Chí Minh', 'Vũng Tàu', 125, 'Xe bus', 180000, 1],
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
