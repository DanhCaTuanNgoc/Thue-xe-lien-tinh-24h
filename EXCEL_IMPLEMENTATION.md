# Tóm tắt Implementation Excel Import/Export

## Các file đã tạo/cập nhật

### 1. Utility Functions (`src/lib/utils/excelUtils.ts`)
- **readExcelFile()**: Đọc file Excel và chuyển đổi thành dữ liệu Car
- **exportToExcel()**: Xuất danh sách xe ra file Excel
- **createExcelTemplate()**: Tạo template Excel mẫu
- **excelDataToCar()**: Chuyển đổi Excel data sang Car object
- **carToExcelData()**: Chuyển đổi Car object sang Excel data

### 2. Components
- **ExcelImport** (`src/app/(admin)/admin/components/ExcelImport.tsx`): Component import Excel với progress bar
- **ExcelExport** (`src/app/(admin)/admin/components/ExcelExport.tsx`): Component export Excel với preview

### 3. Cập nhật Components
- **CarManagement** (`src/app/(admin)/admin/components/CarManagement.tsx`): Tích hợp Excel tools
- **useCarManagement** (`src/app/(admin)/admin/hooks/useCarManagement.ts`): Thêm callback reloadCars
- **Admin Page** (`src/app/(admin)/admin/page.tsx`): Truyền callback onReloadCars

### 4. Dependencies
- **xlsx**: Thư viện xử lý Excel files
- **@types/xlsx**: Type definitions cho xlsx

## Tính năng chính

### Import Excel
- ✅ Đọc file Excel (.xlsx, .xls)
- ✅ Validation dữ liệu (tỉnh, điểm đến, số >= 0)
- ✅ Import từng dòng và gọi hàm `addCar` cho mỗi dòng
- ✅ Progress bar hiển thị tiến trình
- ✅ Error handling chi tiết
- ✅ Reload danh sách sau khi import

### Export Excel
- ✅ Xuất toàn bộ danh sách xe
- ✅ Định dạng file: `danh_sach_xe_YYYY-MM-DD.xlsx`
- ✅ Preview dữ liệu trước khi xuất
- ✅ 6 cột theo định dạng yêu cầu

### Template Excel
- ✅ Tạo template mẫu với header và dữ liệu mẫu
- ✅ 3 dòng dữ liệu mẫu
- ✅ Định dạng chuẩn để người dùng tham khảo

## Định dạng Excel

### Header (dòng 1):
```
tỉnh | điểm đến | quãng đường | loại xe | giá | thời gian
```

### Dữ liệu (từ dòng 2):
- **tỉnh**: String (bắt buộc)
- **điểm đến**: String (bắt buộc)
- **quãng đường**: Number >= 0
- **loại xe**: String (slug trong hệ thống)
- **giá**: Number >= 0
- **thời gian**: Number >= 0

## Cách sử dụng

1. **Import**:
   - Vào Admin → Quản lý xe
   - Click "🔼 Hiện Công cụ Excel"
   - Tải template → Điền dữ liệu → Upload file

2. **Export**:
   - Vào Admin → Quản lý xe
   - Click "🔼 Hiện Công cụ Excel"
   - Click "📤 Xuất Excel"

## Validation Rules

- File phải có header đúng định dạng
- Tỉnh và điểm đến không được trống
- Quãng đường, giá, thời gian >= 0
- Loại xe phải khớp với slug trong hệ thống
- Ít nhất 1 dòng dữ liệu (không tính header)

## Error Handling

- File format không đúng
- Dữ liệu không hợp lệ
- Validation errors với thông báo chi tiết
- Progress tracking cho import lớn
- Success/error notifications

## Performance

- Import từng dòng để tránh timeout
- Progress bar cho user feedback
- Validation trước khi import
- Error handling cho từng dòng riêng biệt 