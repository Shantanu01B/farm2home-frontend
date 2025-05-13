// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import localProducts from "../data/products";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { CheckCircle, ChevronLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const localProduct = localProducts.find((p) => p.id === id);
      if (localProduct) {
        setProduct(localProduct);
        return;
      }
      try {
        const res = await axios.get(`https://farm2home-backend-2qly.onrender.com/api/products/item/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error loading product:", err);
        setProduct(null);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const parsedQuantity = parseInt(quantity);
    if (product && parsedQuantity > 0) {
      addToCart(product, parsedQuantity);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <p className="text-red-500 text-lg mt-16 font-semibold">Product not found.</p>
        <Link
          to="/"
          className="inline-flex items-center mt-6 text-green-600 hover:text-green-800 transition-colors font-medium"
        >
          <ChevronLeft className="inline mr-1" /> Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 bg-gradient-to-br from-green-50 to-white min-h-[90vh]">
      <Link
        to="/"
        className="flex items-center text-green-600 hover:text-green-800 mb-6 font-medium transition-colors group"
      >
        <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to Products
      </Link>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-shadow hover:shadow-2xl">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-10">
          {/* Product Image */}
          <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-green-50 to-gray-50 rounded-xl p-8">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-96 object-contain drop-shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col justify-between space-y-6">
            <div>
              <span className="inline-block px-4 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full mb-3 uppercase tracking-wide shadow-sm">
                {product.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2 leading-tight">
                {product.name}
              </h1>
              <p className="text-gray-600 text-base sm:text-lg mt-2">{product.description}</p>
            </div>

            <div className="border-t border-gray-200 pt-5">
              <p className="text-3xl font-bold text-green-700 tracking-tight">₹{product.price}</p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-gray-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-lg bg-gray-100 text-gray-600 hover:bg-green-100 focus:bg-green-200 transition-colors font-bold outline-none"
                  aria-label="Decrease quantity"
                >
                  –
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-14 text-center border-0 bg-transparent text-lg font-medium focus:ring-0 outline-none"
                  aria-label="Quantity"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-lg bg-gray-100 text-gray-600 hover:bg-green-100 focus:bg-green-200 transition-colors font-bold outline-none"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed top-7 right-7 bg-white border border-green-200 shadow-2xl rounded-xl p-4 flex items-center gap-3 text-green-700 font-semibold animate-fadeIn z-50 transition-all duration-300">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <span>Added to Cart</span>
        </div>
      )}

      {/* FadeIn animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s;
          }
        `}
      </style>
    </div>
  );
};

export default ProductDetail;
