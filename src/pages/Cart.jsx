import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-lg mx-auto p-8 text-center">
        <div className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800">Your Cart is Empty</h2>
          <p className="text-gray-600 mt-4 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link 
            to="/" 
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Shopping Cart</h2>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <li key={item._id || item.id} className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-green-600 font-medium mt-1">₹{item.price.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item._id || item.id, Math.max(1, item.quantity - 1))}
                      className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item._id || item.id, Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-12 text-center border-0 focus:ring-0"
                    />
                    <button
                      onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  <button
  onClick={() => removeFromCart(item._id || item.id)}
  className="text-red-500 hover:text-red-700 transition-colors"
>
  Remove
</button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <span className="font-medium text-gray-700">Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items):</span>
            <span className="font-bold text-lg">₹{totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={clearCart}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Clear Cart
            </button>
            <Link
              to="/checkout"
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-center transition-colors duration-200"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;