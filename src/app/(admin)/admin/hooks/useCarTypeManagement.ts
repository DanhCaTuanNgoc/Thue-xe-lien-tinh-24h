import { useState } from 'react';
import { fetchCarTypes, addCarType, updateCarType, deleteCarType } from '../../../../lib/repositories/car_typeApi';
import type { CarType } from '../../../../lib/models/car_type';

export function useCarTypeManagement() {
  const [carTypes, setCarTypes] = useState<CarType[]>([]);
  const [carTypeForm, setCarTypeForm] = useState<Partial<Omit<CarType, 'id'>>>({});
  const [editingCarTypeId, setEditingCarTypeId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const loadCarTypes = async () => {
    try {
      const data = await fetchCarTypes();
      setCarTypes(data);
    } catch (error) {
      console.error('Error loading car types:', error);
    }
  };

  const handleCarTypeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingCarTypeId) {
        await updateCarType(editingCarTypeId, carTypeForm);
      } else {
        await addCarType(carTypeForm as Omit<CarType, 'id'>);
      }
      setCarTypeForm({});
      setEditingCarTypeId(null);
      await loadCarTypes();
    } catch (err) {
      alert('Lỗi thao tác loại xe!');
    } finally {
      setLoading(false);
    }
  };

  const handleCarTypeEdit = (carType: CarType) => {
    setCarTypeForm(carType);
    setEditingCarTypeId(carType.id);
  };

  const handleCarTypeDelete = async (id: number) => {
    if (!window.confirm('Xóa loại xe này?')) return;
    setLoading(true);
    try {
      await deleteCarType(id);
      await loadCarTypes();
    } catch {
      alert('Lỗi xóa loại xe!');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setCarTypeForm({});
    setEditingCarTypeId(null);
  };

  return {
    carTypes,
    carTypeForm,
    editingCarTypeId,
    loading,
    setCarTypeForm,
    handleCarTypeSubmit,
    handleCarTypeEdit,
    handleCarTypeDelete,
    handleCancelEdit,
    loadCarTypes
  };
} 