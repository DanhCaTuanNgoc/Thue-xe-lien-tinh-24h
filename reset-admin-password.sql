-- Reset Admin Password Script
-- Sử dụng file này để reset mật khẩu admin về "admin123" khi quên mật khẩu
-- 
-- Cách sử dụng:
-- 1. Truy cập Supabase Dashboard
-- 2. Vào SQL Editor
-- 3. Copy và paste nội dung file này
-- 4. Chạy query
-- 
-- Hoặc sử dụng psql:
-- psql -h [your-host] -p [port] -U [username] -d [database] -f reset-admin-password.sql

-- Tạo bảng admin_user nếu chưa tồn tại
CREATE TABLE IF NOT EXISTS admin_user (
    id SERIAL PRIMARY KEY,
    password_hash VARCHAR(255) NOT NULL,
);

-- Reset password admin về "admin123"
-- Hash này được tạo bằng bcrypt với salt rounds = 10
INSERT INTO admin_user (id, password_hash) 
VALUES (1, '$2b$10$lmgXWkfW.qQXTczmWW0ya.UB.VKOVv6OUhMjjny.6qbl4cbyaC6/6')
ON CONFLICT (id) 
DO UPDATE SET
    password_hash = '$2b$10$lmgXWkfW.qQXTczmWW0ya.UB.VKOVv6OUhMjjny.6qbl4cbyaC6/6',
    updated_at = NOW();

-- Kiểm tra kết quả
SELECT id, 'Password reset successfully' as status 
FROM admin_user 
WHERE id = 1;

-- Thông báo hoàn thành
DO $$
BEGIN
    RAISE NOTICE '✅ HOÀN THÀNH: Mật khẩu admin đã được reset về "admin123"';
    RAISE NOTICE '🔑 Password: admin123';
    RAISE NOTICE '⚠️  Hãy đổi mật khẩu ngay sau khi đăng nhập để bảo mật!';
END $$; 