import { supabase } from '../supabaseClient';
import type { Car } from '../../components/CarList';

export async function fetchCars(): Promise<Car[]> {
  const { data, error } = await supabase
    .from('car_rental_prices')
    .select('*')
    .order('start_location');
  if (error) throw error;
  return data as Car[];
}

export async function addCar(car: Omit<Car, 'id'>) {
  const { data, error } = await supabase
    .from('car_rental_prices')
    .insert([car])
    .select();
  if (error) throw error;
  return data?.[0];
}

export async function updateCar(id: string, car: Partial<Omit<Car, 'id'>>) {
  const { data, error } = await supabase
    .from('car_rental_prices')
    .update(car)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data?.[0];
}

export async function deleteCar(id: string) {
  const { error } = await supabase
    .from('car_rental_prices')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
} 