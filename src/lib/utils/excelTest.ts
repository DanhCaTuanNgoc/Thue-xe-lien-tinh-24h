// File test để kiểm tra chức năng Excel
// Có thể chạy trong browser console để test

import { createExcelTemplate, exportToExcel } from './excelUtils'
import type { Car } from '../models/car'

// Test data
const testCars: Car[] = [
  {
    id: 'test_1',
    province: 'Hà Nội',
    end_location: 'Hồ Chí Minh',
    distance: 1700,
    slug: 'xe-khach',
    price: '500000',
    time: 2
  },
  {
    id: 'test_2',
    province: 'Hà Nội',
    end_location: 'Đà Nẵng',
    distance: 800,
    slug: 'xe-khach',
    price: '300000',
    time: 1
  }
]

// Test functions
export function testCreateTemplate() {
  try {
    createExcelTemplate()
    console.log('✅ Template created successfully')
  } catch (error) {
    console.error('❌ Error creating template:', error)
  }
}

export function testExportExcel() {
  try {
    exportToExcel(testCars)
    console.log('✅ Excel export successful')
  } catch (error) {
    console.error('❌ Error exporting Excel:', error)
  }
}

// Run tests
export function runExcelTests() {
  console.log('🧪 Running Excel tests...')
  testCreateTemplate()
  testExportExcel()
  console.log('✅ All tests completed')
} 