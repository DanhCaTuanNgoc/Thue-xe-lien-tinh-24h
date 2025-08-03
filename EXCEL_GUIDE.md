# Hướng dẫn sử dụng chức năng Excel Import/Export

## Tổng quan
Hệ thống hỗ trợ import và export dữ liệu xe thông qua file Excel để thuận tiện cho việc quản lý số lượng lớn dữ liệu.

## Định dạng file Excel

### Cấu trúc cột (bắt buộc có header):
1. **tỉnh** - Tỉnh/thành phố xuất phát
2. **điểm đến** - Điểm đến
3. **quãng đường** - Quãng đường (km) - số nguyên >= 0
4. **loại xe** - Slug của loại xe (phải khớp với slug trong hệ thống)
5. **giá** - Giá vé (VNĐ) - số nguyên >= 0
6. **thời gian** - Thời gian di chuyển (ngày) - số nguyên >= 0

### Ví dụ dữ liệu:
```
tỉnh        | điểm đến    | quãng đường | loại xe   | giá     | thời gian
Hà Nội      | Hồ Chí Minh | 1700        | xe-khach  | 500000  | 2
Hà Nội      | Đà Nẵng     | 800         | xe-khach  | 300000  | 1
Hồ Chí Minh | Nha Trang   | 450         | xe-khach  | 200000  | 1
```

## Cách sử dụng

### 1. Import Excel
1. Vào trang Admin → Tab "Quản lý xe"
2. Click "🔼 Hiện Công cụ Excel"
3. Trong phần Import Excel:
   - Click "📥 Tải template Excel" để tải file mẫu
   - Điền dữ liệu theo template
   - Click "📁 Click để chọn file Excel" và chọn file
   - Hệ thống sẽ tự động import từng dòng và hiển thị tiến trình

### 2. Export Excel
1. Vào trang Admin → Tab "Quản lý xe"
2. Click "🔼 Hiện Công cụ Excel"
3. Trong phần Export Excel:
   - Click "📤 Xuất Excel" để tải file Excel chứa toàn bộ danh sách xe
   - File sẽ có tên: `danh_sach_xe_YYYY-MM-DD.xlsx`

## Lưu ý quan trọng

### Import:
- File phải có định dạng `.xlsx` hoặc `.xls`
- Dòng đầu tiên phải là header với đúng tên cột
- Tỉnh và điểm đến không được để trống
- Quãng đường, giá, thời gian phải là số >= 0
- Loại xe phải khớp với slug trong hệ thống
- Hệ thống sẽ import từng dòng và gọi hàm `addCar` cho mỗi dòng

### Export:
- Xuất toàn bộ danh sách xe hiện tại
- Bao gồm cả xe đã được lọc bởi bộ tìm kiếm
- File được tải về thư mục Downloads

## Xử lý lỗi

### Lỗi thường gặp:
1. **"File Excel không có dữ liệu hợp lệ"**
   - Kiểm tra file có đúng định dạng không
   - Đảm bảo có ít nhất 1 dòng dữ liệu (không tính header)

2. **"Tỉnh và điểm đến không được để trống"**
   - Điền đầy đủ thông tin tỉnh và điểm đến

3. **"Quãng đường phải >= 0"**
   - Kiểm tra giá trị quãng đường là số >= 0

4. **"Loại xe phải khớp với slug trong hệ thống"**
   - Kiểm tra slug loại xe trong tab "Quản lý loại xe"
   - Sử dụng đúng slug (ví dụ: xe-khach, xe-bus, etc.)

## Template mẫu
Hệ thống cung cấp template Excel mẫu với:
- Header đúng định dạng
- 3 dòng dữ liệu mẫu
- Định dạng cột chuẩn

Tải template và điền dữ liệu theo mẫu để đảm bảo import thành công. 