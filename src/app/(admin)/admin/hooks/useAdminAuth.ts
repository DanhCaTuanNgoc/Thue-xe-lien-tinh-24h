import { useState } from 'react';
import { ADMIN_PASSWORD } from '../components/LoginForm';

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
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