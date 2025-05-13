const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 p-4 flex flex-col items-center text-center">
      <div className="w-full h-44 overflow-hidden rounded-xl mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-green-800">{product.name}</h3>
      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
      <div className="mt-3 text-green-700 text-lg font-bold">₹{product.price}</div>
      <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 text-sm shadow">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
