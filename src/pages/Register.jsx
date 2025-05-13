// src/pages/Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2 } from 'lucide-react';

const Register = () => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await register(name, email, password, role);
    setIsLoading(false);

    if (response.success) {
      // ✅ Save to localStorage
      const user = {
        name,
        email,
        role
      };
      localStorage.setItem('user', JSON.stringify(user));

      setSuccessMessage(`You have successfully registered as a ${role === 'user' ? 'Normal User' : 'Farmer'}.`);
      setName('');
      setEmail('');
      setPassword('');
      setRole('user');

      // ✅ Redirect to home or dashboard
      setTimeout(() => {
        window.location.href = '/'; // You can redirect to '/profile' if needed
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md mx-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 py-6 px-8 text-center">
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
        </div>

        <div className="p-8">
          {successMessage && (
            <div className="flex items-center gap-2 text-green-700 bg-green-100 border border-green-200 rounded-lg p-3 mb-6">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="role" className="block text-sm font-medium text-gray-600">
                Account Type
              </label>
              <select
                id="role"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">Normal User</option>
                <option value="farmer">Farmer</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${isLoading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {isLoading ? 'Creating Account...' : 'Register Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
