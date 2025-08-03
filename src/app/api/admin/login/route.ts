import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ error: 'Thiếu mật khẩu' }, { status: 400 });
    }

    // Lấy admin user từ database
    const { data: adminUser, error } = await supabase
      .from('admin_user')
      .select('password_hash')
      .eq('id', 1)
      .single();

    if (error || !adminUser) {
      console.error('Lỗi khi lấy admin user:', error);
      return NextResponse.json({ error: 'Không tìm thấy admin user' }, { status: 404 });
    }

    // So sánh password với hash
    const isMatch = await bcrypt.compare(password, adminUser.password_hash);
    
    if (!isMatch) {
      return NextResponse.json({ error: 'Mật khẩu không đúng' }, { status: 401 });
    }

    // Đăng nhập thành công
    return NextResponse.json({ 
      success: true, 
      message: 'Đăng nhập thành công' 
    });

  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
} 