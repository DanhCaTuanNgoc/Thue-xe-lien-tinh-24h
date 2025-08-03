'use client';

import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (password: string) => void;
  error: string;
  loading?: boolean;
}

export default function LoginForm({ onLogin, error, loading = false }: LoginFormProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading && password.trim()) {
      onLogin(password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Mật khẩu Admin</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading || !password.trim()}
            className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Đang đăng nhập...
              </div>
            ) : (
              'Đăng nhập'
            )}
          </button>
          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}