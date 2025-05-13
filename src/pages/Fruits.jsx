// src/pages/Fruits.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import localProducts from "../data/products";

// ⭐ Helper function to render stars
const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={`full-${i}`} className="text-yellow-400">★</span>);
  }

  if (hasHalfStar) {
    stars.push(<span key="half" className="text-yellow-400">☆</span>);
  }

  while (stars.length < 5) {
    stars.push(<span key={`empty-${stars.length}`} className="text-gray-300">★</span>);
  }

  return <div className="text-sm mt-1">{stars}</div>;
};

const Fruits = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [mongoProducts, setMongoProducts] = useState([]);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const res = await axios.get("https://farm2home-backend-2qly.onrender.com/api/products");
        const fruitsFromMongo = res.data.filter(p => p.category === "Fruits");
        setMongoProducts(fruitsFromMongo);
      } catch (err) {
        console.error("Failed to fetch fruits from MongoDB:", err);
      }
    };

    fetchFruits();
  }, []);

  const localFruits = localProducts.filter(p => p.category === "Fruits");
  const allFruits = mongoProducts;

  const filteredFruits = allFruits.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = priceFilter ? p.price <= parseInt(priceFilter) : true;
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Fresh Fruits</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
        <input
          type="text"
          placeholder="Search fruits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-green-300 rounded-md px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="border border-green-300 rounded-md px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Filter by Price</option>
          <option value="50">Under ₹50</option>
          <option value="100">Under ₹100</option>
          <option value="200">Under ₹200</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFruits.length > 0 ? (
          filteredFruits.map((p, i) => {
            const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0 to 5.0
            return (
              <Link to={`/product/${p._id || p.id}`} key={i} className="block group">
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100 transform transition duration-300 group-hover:scale-105">
                  <div className="h-40 w-full flex items-center justify-center bg-gray-50">
                    <img src={p.image} alt={p.name} className="h-full w-full object-contain p-2" />
                  </div>
                  <div className="p-4 h-44 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 truncate">{p.name}</h3>
                      {renderStars(Number(rating))}
                      <p className="text-gray-500 text-sm mt-1 line-clamp-2">{p.description}</p>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-green-700 font-bold">₹{p.price}</span>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full uppercase font-medium">
                        {p.category}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-red-500 font-medium col-span-full text-center">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Fruits;
