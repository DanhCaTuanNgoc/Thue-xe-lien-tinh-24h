# Reset Admin Password

## 🚨 Khẩn cấp - Quên mật khẩu admin?

Sử dụng file `reset-admin-password.sql` để reset mật khẩu admin về **admin123**

## 📋 Hướng dẫn sử dụng

### Cách 1: Qua Supabase Dashboard (Khuyến nghị)
1. Truy cập [Supabase Dashboard](https://supabase.com/dashboard)
2. Chọn project của bạn
3. Vào **SQL Editor** ở sidebar
4. Copy toàn bộ nội dung file `reset-admin-password.sql`
5. Paste vào SQL Editor và click **RUN**

### Cách 2: Qua psql command line
```bash
psql -h [your-host] -p [port] -U [username] -d [database] -f reset-admin-password.sql
```

## 🔑 Thông tin đăng nhập sau khi reset

- **Username**: admin
- **Password**: admin123

## ⚠️ Bảo mật quan trọng

1. **Đổi mật khẩu ngay lập tức** sau khi đăng nhập thành công
2. Sử dụng mật khẩu mạnh (ít nhất 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt)
3. Không chia sẻ mật khẩu cho người khác
4. Xóa file SQL này sau khi sử dụng xong để tránh rủi ro bảo mật

## 🔧 Troubleshooting

**Lỗi "admin_user not found":**
- File SQL sẽ tự động tạo bảng `admin_user` nếu chưa tồn tại

**Lỗi permission:**
- Đảm bảo bạn có quyền admin trên database
- Hoặc liên hệ database administrator

**Vẫn không đăng nhập được:**
1. Kiểm tra lại username/password
2. Clear browser cache
3. Thử trình duyệt khác
4. Kiểm tra network connection

## 📞 Hỗ trợ
Nếu vẫn gặp vấn đề, hãy liên hệ technical support. 