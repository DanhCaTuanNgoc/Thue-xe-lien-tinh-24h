import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Dùng Service Role Key để update
);

// Kiểm tra mật khẩu admin
export async function AdminPassword(password: string) {
  try {
    const { data, error } = await supabase.from('admin_user').select('password_hash').eq('id', 1).single()
    if (error) throw error
    if (!data?.password_hash) return false
    
    // Sử dụng bcrypt.compare để so sánh password với hash
    const isMatch = await bcrypt.compare(password, data.password_hash)
    return isMatch
  } catch (error) {
    console.error('Lỗi khi kiểm tra mật khẩu admin:', error)
    return false
  }
}

// Kiểm tra mật khẩu admin
export async function POST(req: NextRequest) {
  try {
    const { id, oldPassword, newPassword } = await req.json();

    if (!id || !oldPassword || !newPassword) {
      return NextResponse.json({ error: 'Thiếu thông tin' }, { status: 400 });
    }

    // Lấy user từ Supabase
    const { data: user, error } = await supabase
      .from('admin_user')
      .select('password_hash')
      .eq('id', id)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'Không tìm thấy user' }, { status: 404 });
    }

    // So sánh mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Mật khẩu cũ không đúng' }, { status: 401 });
    }

    // Hash mật khẩu mới
    const newHash = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu mới
    const { error: updateError } = await supabase
      .from('admin_user')
      .update({ password_hash: newHash })
      .eq('id', id);

    if (updateError) {
      return NextResponse.json({ error: 'Cập nhật thất bại' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Đổi mật khẩu thành công' });
  } catch (err) {
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}