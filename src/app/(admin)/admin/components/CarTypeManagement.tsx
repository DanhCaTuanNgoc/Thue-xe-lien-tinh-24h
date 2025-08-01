'use client';

import React from 'react';
import type { CarType } from '../../../../lib/models/car_type';

interface CarTypeManagementProps {
  carTypes: CarType[];
  carTypeForm: Partial<Omit<CarType, 'id'>>;
  editingCarTypeId: number | null;
  loading: boolean;
  onCarTypeFormChange: (form: Partial<Omit<CarType, 'id'>>) => void;
  onCarTypeSubmit: (e: React.FormEvent) => void;
  onCarTypeEdit: (carType: CarType) => void;
  onCarTypeDelete: (id: number) => void;
  onCancelEdit: () => void;
}

export default function CarTypeManagement({
  carTypes,
  carTypeForm,
  editingCarTypeId,
  loading,
  onCarTypeFormChange,
  onCarTypeSubmit,
  onCarTypeEdit,
  onCarTypeDelete,
  onCancelEdit
}: CarTypeManagementProps) {
  return (
    <div className="space-y-6">
      {/* Form thêm/sửa loại xe ở trên */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
          <span className="text-blue-600">🚙</span>
          {editingCarTypeId ? 'Sửa loại xe' : 'Thêm loại xe mới'}
        </h2>
        
        <form onSubmit={onCarTypeSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              required 
              placeholder="Tên loại xe" 
              className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500" 
              value={carTypeForm.name||''} 
              onChange={e=>onCarTypeFormChange({...carTypeForm,name:e.target.value})}
            />
            <input 
              required 
              placeholder="Slug (ví dụ: cars-4)" 
              className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500" 
              value={carTypeForm.slug||''} 
              onChange={e=>onCarTypeFormChange({...carTypeForm,slug:e.target.value})}
            />
            <input 
              required 
              placeholder="URL hình ảnh" 
              className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500" 
              value={carTypeForm.image||''} 
              onChange={e=>onCarTypeFormChange({...carTypeForm,image:e.target.value})}
            />
            <input 
              placeholder="Mô tả giá (ví dụ: 850.000đ)" 
              className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500" 
              value={carTypeForm.description||''} 
              onChange={e=>onCarTypeFormChange({...carTypeForm,description:e.target.value})}
            />
          </div>
          <textarea 
            placeholder="Mô tả chi tiết (tùy chọn)" 
            rows={3}
            className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500 resize-none" 
            value={carTypeForm.description||''} 
            onChange={e=>onCarTypeFormChange({...carTypeForm,description:e.target.value})}
          />
          <div className="flex gap-3">
            <button 
              type="submit" 
              className="bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50" 
              disabled={loading}
            >
              {loading ? '⏳ Đang xử lý...' : (editingCarTypeId ? '💾 Cập nhật' : '➕ Thêm mới')}
            </button>
            {editingCarTypeId && (
              <button 
                type="button" 
                className="bg-slate-500 text-white rounded-lg px-6 py-3 font-semibold hover:bg-slate-600 transition-colors" 
                onClick={onCancelEdit}
              >
                ❌ Hủy
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Danh sách loại xe ở dưới */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
          <span className="text-blue-600">📋</span>
          Danh sách loại xe ({carTypes.length})
        </h3>
        <div className="space-y-3">
          {carTypes.map(carType => (
            <div key={carType.id} className="border-2 border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-slate-50">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1">
                  <div className="font-semibold text-slate-800 flex items-center gap-3">
                    {carType.image && (
                      <img 
                        src={carType.image} 
                        alt={carType.name}
                        className="w-12 h-12 object-cover rounded-lg border border-slate-300"
                      />
                    )}
                    <span>{carType.name}</span>
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    Slug: <span className="font-mono bg-slate-200 px-2 py-1 rounded">{carType.slug}</span>
                    {carType.description && (
                      <span className="ml-3">• {carType.description}</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-semibold" 
                    onClick={() => onCarTypeEdit(carType)}
                  >
                    ✏️ Sửa
                  </button>
                  <button 
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold" 
                    onClick={() => onCarTypeDelete(carType.id)}
                  >
                    🗑️ Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
          {carTypes.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <div className="text-4xl mb-2">🚙</div>
              <div>Chưa có loại xe nào trong danh sách</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 