import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderConfirmed(true);
    setShowPopup(true);
    clearCart();
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleCancelOrder = () => {
    setOrderConfirmed(false);
    clearCart();
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm text-center">
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
        <p className="text-gray-600 mb-6">Thank you for your purchase. We'll notify you when your order ships.</p>
        <button
          onClick={handleCancelOrder}
          className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
        >
          Back to Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Checkout</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Review Cart Items */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Your Order</h3>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="py-4 flex items-center">
                <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden mr-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="text-green-600 font-medium">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
            <span className="font-semibold text-gray-700">Total:</span>
            <span className="text-xl font-bold text-gray-800">₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Shipping Details Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Shipping Details</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">Shipping Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>

      {/* Order Confirmation Popup */}
      {showPopup && (
        <div className="fixed top-5 right-5 bg-white border border-green-200 shadow-lg rounded-lg p-4 flex items-center gap-3 text-green-700 z-50 animate-fadeIn">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span className="font-medium">Order confirmed successfully!</span>
        </div>
      )}
    </div>
  );
};

export default Checkout;