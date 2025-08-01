-- Tạo bảng car_types
CREATE TABLE IF NOT EXISTS car_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    img_url VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Thêm dữ liệu mẫu cho 4 loại xe hiện tại
INSERT INTO car_types (name, img_url, slug, description_price) VALUES
    ('Xe 4 chỗ', '/xe4cho.png', 'cars-4', '850.000đ'),
    ('Xe 7 chỗ', '/xe7cho.png', 'cars-7', '850.000đ'),
    ('Xe 16 chỗ', '/xe16cho.jpg', 'cars-16', '850.000đ'),
    ('Xe Limousine', '/xelimousine.jpg', 'cars-limousine', '850.000đ');

-- Tạo index cho slug để tối ưu query
CREATE INDEX IF NOT EXISTS idx_car_types_slug ON car_types(slug);

-- Tạo trigger để tự động cập nhật updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_car_types_updated_at 
    BEFORE UPDATE ON car_types 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 