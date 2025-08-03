// Test function để kiểm tra tạo slug với bất kỳ ký tự nào
export function createSlug(name: string): string {
  return `car-${name
    .toLowerCase()
    .normalize('NFD') // Chuẩn hóa Unicode
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu tiếng Việt
    .replace(/[^a-z0-9\s]/g, '') // Chỉ giữ lại chữ cái, số và khoảng trắng
    .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu gạch ngang
    .replace(/^-+|-+$/g, '') // Loại bỏ dấu gạch ngang ở đầu và cuối
    .trim()}`
}

// Test cases
export function testSlugCreation() {
  const testCases = [
    'Xe 4 chỗ',
    'Xe khách',
    'Xe bus',
    'Xe tải',
    'Xe đạp',
    'Xe máy',
    'Xe hơi',
    'Xe lửa',
    'Xe buýt',
    'Xe taxi',
    'Xe 4 chỗ (VIP)',
    'Xe khách & Bus',
    'Xe tải + Container',
    'Xe máy (50cc)',
    'Xe hơi - Sedan',
    'Xe bus, xe khách',
    'Xe taxi & Grab',
    'Xe đạp điện (E-bike)',
    'Xe tải nhỏ & lớn',
    'Xe khách VIP+',
    '🚗 Xe siêu sang',
    'Xe @#$%^&*()',
    'Xe với emoji 🚙',
    'Xe có dấu: !@#$%^&*()_+',
    'Xe với số 123 và ký tự @#$%'
  ]

  console.log('🧪 Testing slug creation with any characters:')
  testCases.forEach(name => {
    const slug = createSlug(name)
    console.log(`"${name}" → "${slug}"`)
  })
}

// Khai báo type cho window
declare global {
  interface Window {
    testSlugCreation: () => void
  }
}

// Run test
if (typeof window !== 'undefined') {
  // Chỉ chạy trong browser
  window.testSlugCreation = testSlugCreation
} 