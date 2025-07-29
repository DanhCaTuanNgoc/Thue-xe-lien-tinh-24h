import React from 'react';

export type Car = {
  id: string;
  start_location: string;
  end_location: string;
  time?: string;
  distance?: number;
  car_type?: string;
  price?: number;
};

interface CarListProps {
  cars: Car[];
}

const CarList: React.FC<CarListProps> = ({ cars }) => {
  if (!cars.length) return <div>Không có xe nào để hiển thị.</div>;
  return (
    <div className="grid gap-4">
      {cars.map(car => (
        <div key={car.id} className="border rounded p-4 shadow">
          <div><b>Điểm đi:</b> {car.start_location}</div>
          <div><b>Điểm đến:</b> {car.end_location}</div>
          {car.time && <div><b>Thời gian:</b> {car.time}</div>}
          {car.distance && <div><b>Quãng đường:</b> {car.distance} km</div>}
          {car.car_type && <div><b>Loại xe:</b> {car.car_type}</div>}
          {car.price && <div><b>Giá:</b> {car.price.toLocaleString()} VNĐ</div>}
        </div>
      ))}
    </div>
  );
};

export default CarList; 