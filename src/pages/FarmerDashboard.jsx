import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Replace with the actual logged-in farmer's email in production
const farmerEmail = 'farmer@example.com';

const ProductForm = ({
  product,
  onSubmit,
  isLoading,
  onCancel,
  formTitle = 'Add Product',
  submitText = 'Submit',
}) => {
  const [formData, setFormData] = useState(
    product || {
      name: '',
      category: '',
      price: '',
      image: '',
      description: '',
      stock: '',
    }
  );
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (product) {
      setFormData(product);
      setImagePreview(product.image || '');
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "image") {
      setImagePreview(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          image: '', // Clear image URL if file is uploaded
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, image: imagePreview });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto mt-6 border border-gray-100"
    >
      <h3 className="text-2xl font-bold mb-2 text-green-700">{formTitle}</h3>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Product Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          placeholder="Category (e.g., Fruits)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition"
        />
        <div className="flex gap-4">
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="Price"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition"
          />
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            placeholder="Stock"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition"
          />
        </div>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition"
        />
        {imagePreview && (
          <div className="flex justify-center mb-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-40 max-w-full rounded border border-gray-200 shadow"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150?text=No+Image";
              }}
            />
          </div>
        )}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition resize-none"
          rows={3}
        />
      </div>
      <div className="flex justify-end gap-3 mt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium shadow-sm"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className={`px-5 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-md hover:from-green-600 hover:to-green-800 transition font-semibold ${
            isLoading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Saving...' : submitText}
        </button>
      </div>
    </form>
  );
};

const FarmerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('products');

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`https://farm2home-backend-2qly.onrender.com/api/products/${farmerEmail}`);
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // ADD PRODUCT
  const handleAddProduct = async (formData) => {
    setIsLoading(true);
    try {
      const productData = { ...formData, addedBy: farmerEmail };
      await axios.post(
        "https://farm2home-backend-2qly.onrender.com/api/products/add",
        productData,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`, // Uncomment if needed
          },
        }
      );
      fetchProducts();
      setActiveTab('products');
    } catch (error) {
      console.error('Error adding product:', error.response?.data || error.message);
      alert(error.response?.data?.message || "Error adding product");
    } finally {
      setIsLoading(false);
    }
  };

  // UPDATE PRODUCT
  const handleUpdateProduct = async (formData) => {
    setIsLoading(true);
    try {
      await axios.put(
        `https://farm2home-backend-2qly.onrender.com/api/products/update/${editProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`, // Uncomment if needed
          },
        }
      );
      setEditProduct(null);
      fetchProducts();
      setActiveTab('products');
    } catch (error) {
      console.error('Error updating product:', error.response?.data || error.message);
      alert(error.response?.data?.message || "Error updating product");
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE PRODUCT
  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(
          `https://farm2home-backend-2qly.onrender.com/api/products/delete/${productId}`,
          {
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${localStorage.getItem("token")}`, // Uncomment if needed
            },
          }
        );
        setProducts((prev) => prev.filter((product) => product._id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error.response?.data || error.message);
        alert(error.response?.data?.message || "Error deleting product");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white shadow-md p-6 flex justify-between items-center border-b border-green-100">
        <h1 className="text-3xl font-extrabold text-green-700 tracking-tight">Farmer Dashboard</h1>
        <button
          onClick={() => {
            setEditProduct(null);
            setActiveTab('add');
          }}
          className="bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-6 rounded-lg font-semibold shadow hover:from-green-600 hover:to-green-800 transition"
        >
          + Add Product
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex space-x-6 py-6 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-2 text-lg font-semibold transition ${
              activeTab === 'products'
                ? 'text-green-700 border-b-4 border-green-500'
                : 'text-gray-500 hover:text-green-600'
            }`}
          >
            My Products
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`pb-2 text-lg font-semibold transition ${
              activeTab === 'add'
                ? 'text-green-700 border-b-4 border-green-500'
                : 'text-gray-500 hover:text-green-600'
            }`}
          >
            Add Product
          </button>
        </nav>

        {activeTab === 'add' && (
          <ProductForm
            product={editProduct}
            onSubmit={editProduct ? handleUpdateProduct : handleAddProduct}
            isLoading={isLoading}
            onCancel={() => {
              setEditProduct(null);
              setActiveTab('products');
            }}
            formTitle={editProduct ? 'Edit Product' : 'Add Product'}
            submitText={editProduct ? 'Update' : 'Add'}
          />
        )}

        {activeTab === 'products' && (
          <div>
            <h2 className="text-xl font-bold mb-5 text-green-700">Your Products</h2>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-200 group"
                  >
                    <div className="h-48 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
                      <img
                        src={product.image || 'https://via.placeholder.com/300'}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain rounded group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                      <div className="flex justify-between items-center text-base font-semibold mb-2">
                        <span className="text-green-700">₹{product.price}</span>
                        <span
                          className={
                            product.stock > 0
                              ? 'text-green-600'
                              : 'text-red-500 font-semibold'
                          }
                        >
                          {product.stock > 0
                            ? `${product.stock} in stock`
                            : 'Out of stock'}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setEditProduct(product);
                            setActiveTab('add');
                          }}
                          className="bg-blue-600 text-white py-1.5 px-5 rounded-lg font-medium shadow hover:bg-blue-700 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-600 text-white py-1.5 px-5 rounded-lg font-medium shadow hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-10">
                No products found. Click <span className="font-semibold text-green-700">"Add Product"</span> to start.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;
