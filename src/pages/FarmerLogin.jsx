import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FarmerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await fetch('https://farm2home-backend-2qly.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.status === 200) {
        navigate('/farmer-dashboard');
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred during login');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-200">
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-2xl border border-green-100">
        {/* Credentials visible for everyone */}
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-800 text-sm">
          <div><strong>Demo Credentials:</strong></div>
          <div>Username: <span className="font-mono">farmer@example.com</span></div>
          <div>Password: <span className="font-mono">password123</span></div>
        </div>
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6 tracking-tight drop-shadow-sm">
          Farmer Login
        </h2>
        {error && (
          <p className="text-red-600 text-sm mb-4 text-center bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </p>
        )}
        <form onSubmit={handleLogin} autoComplete="off">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 px-4 py-2 w-full border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              required
              autoFocus
            />
          </div>
          <div className="mb-7">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 px-4 py-2 w-full border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow hover:from-green-600 hover:to-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default FarmerLogin;
