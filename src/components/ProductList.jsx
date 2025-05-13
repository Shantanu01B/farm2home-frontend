// File: src/components/ProductList.jsx
import React from "react";
import products from "../data/products";

const ProductList = () => {
  const featuredProducts = products.slice(0, 4); // Show first 4 as featured

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold text-center text-green-700 mb-8">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-green-700">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{product.description}</p>
              <p className="mt-2 font-bold text-green-800">₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
