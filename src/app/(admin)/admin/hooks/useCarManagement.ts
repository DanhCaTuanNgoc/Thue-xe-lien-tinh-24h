import { useState, useEffect } from 'react';
import { fetchCars, addCar, updateCar, deleteCar } from '../../../../lib/repositories/carApi';
import type { Car } from '../../../../lib/models/car';

export function useCarManagement() {
  const [cars, setCars] = useState<Car[]>([]);
  const [carForm, setCarForm] = useState<Partial<Omit<Car, 'id'>>>({});
  const [editingCarId, setEditingCarId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadCars = async () => {
    try {
      const data = await fetchCars();
      setCars(data);
    } catch (error) {
      console.error('Error loading cars:', error);
    }
  };

  const handleCarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingCarId) {
        await updateCar(editingCarId, carForm);
      } else {
        await addCar(carForm as Omit<Car, 'id'>);
      }
      setCarForm({});
      setEditingCarId(null);
      await loadCars();
    } catch (err) {
      alert('Lỗi thao tác xe!');
    } finally {
      setLoading(false);
    }
  };

  const handleCarEdit = (car: Car) => {
    setCarForm(car);
    setEditingCarId(car.id);
  };

  const handleCarDelete = async (id: string) => {
    if (!window.confirm('Xóa xe này?')) return;
    setLoading(true);
    try {
      await deleteCar(id);
      await loadCars();
    } catch {
      alert('Lỗi xóa xe!');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setCarForm({});
    setEditingCarId(null);
  };

  return {
    cars,
    carForm,
    editingCarId,
    loading,
    setCarForm,
    handleCarSubmit,
    handleCarEdit,
    handleCarDelete,
    handleCancelEdit,
    loadCars
  };
} 