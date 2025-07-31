-- Tạo bảng car_types
CREATE TABLE IF NOT EXISTS car_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  image VARCHAR(500),
  price VARCHAR(100),
  features TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo index cho slug để tìm kiếm nhanh
CREATE INDEX IF NOT EXISTS idx_car_types_slug ON car_types(slug);
CREATE INDEX IF NOT EXISTS idx_car_types_active ON car_types(is_active);

-- Tạo RLS (Row Level Security) policies
ALTER TABLE car_types ENABLE ROW LEVEL SECURITY;

-- Policy cho phép đọc tất cả car_types (public)
CREATE POLICY "Allow public read access" ON car_types
  FOR SELECT USING (true);

-- Policy cho phép admin thêm/sửa/xóa (cần authentication)
CREATE POLICY "Allow authenticated users to manage car_types" ON car_types
  FOR ALL USING (auth.role() = 'authenticated');

-- Thêm một số dữ liệu mẫu
INSERT INTO car_types (name, slug, description, price, features, is_active) VALUES
  ('Xe 4 chỗ', 'xe-4-cho', 'Xe 4 chỗ đời mới, tiện nghi', '1,500,000đ', ARRAY['Điều hòa', 'GPS', 'Tài xế chuyên nghiệp'], true),
  ('Xe 7 chỗ', 'xe-7-cho', 'Xe 7 chỗ rộng rãi, thoải mái', '2,000,000đ', ARRAY['Điều hòa', 'GPS', 'Ghế bọc da', 'Tài xế chuyên nghiệp'], true),
  ('Xe 16 chỗ', 'xe-16-cho', 'Xe 16 chỗ cho đoàn lớn', '3,500,000đ', ARRAY['Điều hòa', 'GPS', 'Ghế êm ái', 'Tài xế chuyên nghiệp'], true),
  ('Limousine', 'limousine', 'Xe Limousine cao cấp', '4,000,000đ', ARRAY['Điều hòa', 'GPS', 'Nội thất cao cấp', 'Tài xế chuyên nghiệp'], true)
ON CONFLICT (slug) DO NOTHING; 