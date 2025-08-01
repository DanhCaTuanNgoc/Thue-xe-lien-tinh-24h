import { supabase } from '../supabaseClient';
import type { CarType } from '../models/car_type';

// Lấy tất cả loại xe
export async function fetchCarTypes(): Promise<CarType[]> {
  const { data, error } = await supabase
    .from('car_types')
    .select('*')
    .order('name');
  if (error) throw error;
  return data?.map(item => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    description: item.description,
    image: item.img_url
  })) as CarType[];
}

// Lấy loại xe theo ID
export async function fetchCarTypeById(id: number): Promise<CarType | null> {
  const { data, error } = await supabase
    .from('car_types')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  if (!data) return null;
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    image: data.img_url
  } as CarType;
}

// Lấy loại xe theo slug
export async function fetchCarTypeBySlug(slug: string): Promise<CarType | null> {
  const { data, error } = await supabase
    .from('car_types')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) throw error;
  if (!data) return null;
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    image: data.img_url
  } as CarType;
}

// Thêm loại xe mới
export async function addCarType(carType: Omit<CarType, 'id'>) {
  const { data, error } = await supabase
    .from('car_types')
    .insert([{
      name: carType.name,
      slug: carType.slug,
      description: carType.description,
      img_url: carType.image
    }])
    .select();
  if (error) throw error;
  if (!data?.[0]) return null;
  return {
    id: data[0].id,
    name: data[0].name,
    slug: data[0].slug,
    description: data[0].description,
    image: data[0].img_url
  } as CarType;
}

// Cập nhật loại xe
export async function updateCarType(id: number, carType: Partial<Omit<CarType, 'id'>>) {
  const updateData: any = {};
  if (carType.name) updateData.name = carType.name;
  if (carType.slug) updateData.slug = carType.slug;
  if (carType.description) updateData.description = carType.description;
  if (carType.image) updateData.img_url = carType.image;

  const { data, error } = await supabase
    .from('car_types')
    .update(updateData)
    .eq('id', id)
    .select();
  if (error) throw error;
  if (!data?.[0]) return null;
  return {
    id: data[0].id,
    name: data[0].name,
    slug: data[0].slug,
    description: data[0].description,
    image: data[0].img_url
  } as CarType;
}

// Xóa loại xe
export async function deleteCarType(id: number) {
  const { error } = await supabase
    .from('car_types')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}
