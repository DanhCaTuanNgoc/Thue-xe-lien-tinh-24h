'use client'

import React from 'react'

interface TabNavigationProps {
  currentTab: 'car' | 'post' | 'car_type' | 'featured_locations'
  onTabChange: (tab: 'car' | 'post' | 'car_type' | 'featured_locations') => void
  onLogout: () => void
  onChangePassword: () => void
}

export default function TabNavigation({ currentTab, onTabChange, onLogout, onChangePassword }: TabNavigationProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTabChange('car')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentTab === 'car'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Quản lý xe
          </button>
          <button
            onClick={() => onTabChange('car_type')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentTab === 'car_type'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Loại xe
          </button>
          <button
            onClick={() => onTabChange('post')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentTab === 'post'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Bài viết
          </button>
          <button
            onClick={() => onTabChange('featured_locations')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentTab === 'featured_locations'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Địa điểm nổi bật
          </button>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={onChangePassword}
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Đổi mật khẩu
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  )
}
