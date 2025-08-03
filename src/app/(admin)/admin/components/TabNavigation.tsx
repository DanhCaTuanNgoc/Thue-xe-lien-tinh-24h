'use client'

import React from 'react'

type TabType = 'car' | 'post' | 'car_type' | 'featured_locations'

interface TabNavigationProps {
   currentTab: TabType
   onTabChange: (tab: TabType) => void
}

export default function TabNavigation({ currentTab, onTabChange }: TabNavigationProps) {
   return (
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-200">
         <div className="flex gap-4 justify-center flex-wrap">
            <button
               className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
                  currentTab === 'car'
                     ? 'bg-blue-600 text-white shadow-lg'
                     : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
               }`}
               onClick={() => onTabChange('car')}
            >
               🚗 Quản lý chuyến xe
            </button>
            <button
               className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
                  currentTab === 'car_type'
                     ? 'bg-blue-600 text-white shadow-lg'
                     : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
               }`}
               onClick={() => onTabChange('car_type')}
            >
               🚙 Quản lý danh mục xe
            </button>
            <button
               className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
                  currentTab === 'post'
                     ? 'bg-blue-600 text-white shadow-lg'
                     : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
               }`}
               onClick={() => onTabChange('post')}
            >
               📝 Quản lý bài viết
            </button>
            <button
               className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
                  currentTab === 'featured_locations'
                     ? 'bg-blue-600 text-white shadow-lg'
                     : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
               }`}
               onClick={() => onTabChange('featured_locations')}
            >
               📍 Quản lý địa điểm nổi bật
            </button>
         </div>
      </div>
   )
}
