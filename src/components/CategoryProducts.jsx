import { useEffect, useState } from 'react';

const CategoryProducts = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://farm2home-backend-2qly.onrender.com/api/products?category=${category}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [category]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map(product => (
        <div key={product._id} className="bg-white shadow-md rounded-xl p-4">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
          <h3 className="text-xl font-semibold text-green-800 mt-2">{product.name}</h3>
          <p className="text-gray-600">{product.category}</p>
          <p className="text-green-700 font-bold">₹{product.price} / kg</p>
          <p className="text-sm text-gray-500">{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryProducts;
