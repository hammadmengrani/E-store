'use client';

import { loginUser } from '@/graphql/user';
import React, { useState } from 'react';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      setLoading(true);
      setError(null); // Reset any previous error

      try {

        const user = await loginUser(username, password);

        if (user) {
          // On success, redirect to dashboard
          window.location.href = '/dashboard';
        } else {
          // Handle login failure (wrong credentials)
          setError('Invalid username or password');
        }
      } catch (error) {
        console.error('❌ Error Logging in:', error);
        setError('An error occurred while logging in');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please fill in both fields');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <img src="/logo.png" alt="" className="flex justify-center items-center pb-5 mx-auto" />

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
