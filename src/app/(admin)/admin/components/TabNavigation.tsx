'use client';

import React from 'react';

type TabType = 'car' | 'post' | 'car_type';

interface TabNavigationProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function TabNavigation({ currentTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-200">
      <div className="flex gap-4 justify-center flex-wrap">
        <button
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
            currentTab === 'car' 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
          }`}
          onClick={() => onTabChange('car')}
        >
          🚗 Quản lý xe
        </button>
        <button
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
            currentTab === 'car_type' 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
          }`}
          onClick={() => onTabChange('car_type')}
        >
          🚙 Quản lý loại xe
        </button>
        <button
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
            currentTab === 'post' 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
          }`}
          onClick={() => onTabChange('post')}
        >
          📝 Quản lý bài viết
        </button>
      </div>
    </div>
  );
} 