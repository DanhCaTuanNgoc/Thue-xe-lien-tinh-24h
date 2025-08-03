import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { oldPassword, newPassword } = await req.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json({ error: 'Thiếu thông tin mật khẩu' }, { status: 400 });
    }

    // Lấy admin user từ database
    const { data: adminUser, error } = await supabase
      .from('admin_user')
      .select('password_hash')
      .eq('id', 1)
      .single();

    if (error || !adminUser) {
      return NextResponse.json({ error: 'Không tìm thấy admin user' }, { status: 404 });
    }

    // So sánh mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, adminUser.password_hash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Mật khẩu cũ không đúng' }, { status: 401 });
    }

    // Hash mật khẩu mới
    const newHash = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu mới
    const { error: updateError } = await supabase
      .from('admin_user')
      .update({ password_hash: newHash })
      .eq('id', 1);

    if (updateError) {
      return NextResponse.json({ error: 'Cập nhật thất bại' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Đổi mật khẩu thành công' 
    });

  } catch (error) {
    console.error('Lỗi khi đổi mật khẩu:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
} 