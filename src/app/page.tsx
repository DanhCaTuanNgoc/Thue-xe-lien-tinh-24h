'use client';

import CarList from '../components/CarList';
import { fetchCars } from '../lib/repositories/carApi';
import React, { useEffect, useState } from 'react';
import type { Car } from '../components/CarList';

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCars()
      .then(data => setCars(data))
      .catch(err => setError('Lỗi tải dữ liệu xe!'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Danh sách xe cho thuê</h1>
      {loading && <div>Đang tải...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && <CarList cars={cars} />}
    </main>
  );
}