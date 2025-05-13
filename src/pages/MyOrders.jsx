// src/pages/MyOrders.jsx
import React, { useEffect, useState } from 'react';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      window.location.href = '/login';
    } else {
      setUser(storedUser);
    }

    // Sample orders (replace later with actual API call)
    setOrders([
      { id: 1, product: 'Fresh Apples', quantity: 2, price: 100, date: '2023-05-15', status: 'Delivered' },
      { id: 2, product: 'Organic Milk', quantity: 1, price: 60, date: '2023-05-18', status: 'Shipped' },
    ]);
  }, []);

  if (!user) return null; // avoid rendering before user is loaded

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-green-800 sm:text-4xl">
            Your Order History
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            All your recent purchases in one place
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-green-600 py-4 px-6">
            <h2 className="text-xl font-semibold text-white">
              {user.name}'s Orders ({orders.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-100">
            {orders.map((order) => (
              <div key={order.id} className="p-5 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{order.product}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm">
                      <span className="text-gray-600">Qty: {order.quantity}</span>
                      <span className="text-gray-600">Date: {order.date}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-xl font-bold text-green-700">₹{order.price}</p>
                    <button className="mt-2 text-sm font-medium text-green-600 hover:text-green-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {orders.length === 0 && (
            <div className="p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
              <p className="mt-1 text-gray-500">Your orders will appear here once you make a purchase.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;