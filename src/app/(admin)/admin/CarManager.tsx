import React, { useState, useEffect } from 'react';
import { fetchCars, addCar, updateCar, deleteCar } from '../../lib/repositories/carApi';
import type { Car } from '../../lib/models/car';

export default function CarManager() {
  const [cars, setCars] = useState<Car[]>([]);
  const [carForm, setCarForm] = useState<Partial<Omit<Car, 'id'>>>({});
  const [editingCarId, setEditingCarId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCars().then(setCars);
  }, []);

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
      setCars(await fetchCars());
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
      setCars(await fetchCars());
    } catch {
      alert('Lỗi xóa xe!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2 className="font-semibold mb-2">Danh sách xe</h2>
      <div className="grid gap-2 mb-4">
        {cars.map(car => (
          <div key={car.id} className="border rounded p-2 flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="flex-1">
              <b>{car.start_location}</b> → <b>{car.end_location}</b> | {car.car_type} | {car.price?.toLocaleString()} VNĐ
            </div>
            <div className="flex gap-2">
              <button className="px-2 py-1 bg-yellow-400 rounded" onClick={() => handleCarEdit(car)}>Sửa</button>
              <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleCarDelete(car.id)}>Xóa</button>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleCarSubmit} className="border rounded p-4 grid gap-2 bg-gray-50">
        <h3 className="font-semibold">{editingCarId ? 'Sửa xe' : 'Thêm xe mới'}</h3>
        <input required placeholder="Điểm đi" className="border rounded px-2 py-1" value={carForm.start_location||''} onChange={e=>setCarForm(f=>({...f,start_location:e.target.value}))}/>
        <input required placeholder="Điểm đến" className="border rounded px-2 py-1" value={carForm.end_location||''} onChange={e=>setCarForm(f=>({...f,end_location:e.target.value}))}/>
        <input placeholder="Thời gian" className="border rounded px-2 py-1" value={carForm.time||''} onChange={e=>setCarForm(f=>({...f,time:e.target.value}))}/>
        <input type="number" placeholder="Quãng đường (km)" className="border rounded px-2 py-1" value={carForm.distance||''} onChange={e=>setCarForm(f=>({...f,distance:Number(e.target.value)}))}/>
        <input placeholder="Loại xe" className="border rounded px-2 py-1" value={carForm.car_type||''} onChange={e=>setCarForm(f=>({...f,car_type:e.target.value}))}/>
        <input type="number" placeholder="Giá (VNĐ)" className="border rounded px-2 py-1" value={carForm.price||''} onChange={e=>setCarForm(f=>({...f,price:Number(e.target.value)}))}/>
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white rounded px-3 py-1" disabled={loading}>{editingCarId ? 'Cập nhật' : 'Thêm mới'}</button>
          {editingCarId && <button type="button" className="bg-gray-400 rounded px-3 py-1" onClick={()=>{setCarForm({});setEditingCarId(null);}}>Hủy</button>}
        </div>
      </form>
    </section>
  );
} 