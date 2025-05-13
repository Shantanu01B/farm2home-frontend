// frontend/src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    if (userData.token) {
      localStorage.setItem('token', userData.token);
    }
  };

  const logout = async () => {
    try {
      await fetch('https://farm2home-backend-2qly.onrender.com/api/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }

    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const register = async (name, email, password, role) => {
    // Simulated registration logic
    console.log('Registered:', { name, email, password, role });

    // Set the user (simulated, in reality, you would send this to your server)
    const newUser = { name, email, role };

    // Save to localStorage (for demo purposes)
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));

    // Simulate success response
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
