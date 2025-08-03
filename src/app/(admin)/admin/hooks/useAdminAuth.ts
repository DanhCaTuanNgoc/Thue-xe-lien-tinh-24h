import { useState } from 'react';

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (password: string) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAuthenticated(true);
        setError('');
      } else {
        setError(data.error || 'Đăng nhập thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      setError('Lỗi kết nối server');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuthenticated(false);
    setError('');
  };

  return {
    authenticated,
    error,
    loading,
    handleLogin,
    logout
  };
} 