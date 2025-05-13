import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Decorative header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 py-6 px-8 text-center">
          <svg 
            className="w-16 h-16 mx-auto text-white animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Thank you for your purchase! Your order #12345 has been received and is being processed.
            We've sent a confirmation email with all the details.
          </p>
          
          <div className="mb-8">
            <div className="inline-flex items-center justify-center bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Estimated delivery: 2-3 business days
            </div>
          </div>

          <Link 
            to="/" 
            className="inline-block w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg shadow-md transition-all transform hover:scale-105"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Footer note */}
        <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? <a href="#" className="text-green-600 hover:underline">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;