// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState('');
  const [formData, setFormData] = useState({ name: '', role: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const profilePic = localStorage.getItem('profilePic');
    if (!storedUser) {
      window.location.href = '/login';
    } else {
      setUser(storedUser);
      setFormData({ name: storedUser.name, role: storedUser.role });
      if (profilePic) setPreview(profilePic);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      localStorage.setItem('profilePic', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const updatedUser = { ...user, name: formData.name, role: formData.role };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setEditing(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-md transition-all duration-300 hover:shadow-3xl">
        <div className="bg-green-600 py-4 px-6">
          <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <label className="group relative cursor-pointer">
              <img
                src={preview || "https://avatars.dicebear.com/api/initials/" + user.name + ".svg"}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-green-100 shadow-lg group-hover:border-green-300 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {editing ? (
            <div className="space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">Name</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">Role</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="user">User</option>
                  <option value="farmer">Farmer</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-300 shadow hover:shadow-md"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-lg font-semibold text-gray-800 px-2 py-1 rounded bg-gray-50">{user.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg font-semibold text-gray-800 px-2 py-1 rounded bg-gray-50">{user.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Role</p>
                <p className="text-lg font-semibold text-gray-800 px-2 py-1 rounded bg-gray-50 capitalize">{user.role}</p>
              </div>
              <button
                onClick={() => setEditing(true)}
                className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow hover:shadow-md"
              >
                Edit Profile
              </button>
            </div>
          )}

          <div className="mt-8 pt-4 border-t border-gray-100">
            <button
              onClick={() => {
                localStorage.removeItem('user');
                localStorage.removeItem('profilePic');
                window.location.href = '/login';
              }}
              className="w-full px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;