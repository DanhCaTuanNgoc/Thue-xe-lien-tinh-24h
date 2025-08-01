import { supabase } from '../supabaseClient';
import type { Car } from '../models/car';

export async function fetchCars(): Promise<Car[]> {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .order('start_location');
  if (error) throw error;
  return data as Car[];
}

export async function addCar(car: Omit<Car, 'id'>) {
  // Generate a unique ID for the car
  const carId = `car_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const carData = {
    id: carId,
    ...car
  };

  const { data, error } = await supabase
    .from('cars')
    .insert([carData])
    .select();
  if (error) throw error;
  return data?.[0];
}

export async function updateCar(id: string, car: Partial<Omit<Car, 'id'>>) {
  const { data, error } = await supabase
    .from('cars')
    .update(car)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data?.[0];
}

export async function deleteCar(id: string) {
  const { error } = await supabase
    .from('cars')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
} 