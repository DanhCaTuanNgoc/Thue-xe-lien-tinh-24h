import { useState } from 'react';
import { AdminPassword } from '@/lib/repositories/adminApi';

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (password: string) => {
    const adminPassword = await AdminPassword(password);
    if (adminPassword) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Sai mật khẩu!');
    }
  };

  const logout = () => {
    setAuthenticated(false);
    setError('');
  };

  return {
    authenticated,
    error,
    handleLogin,
    logout
  };
} 