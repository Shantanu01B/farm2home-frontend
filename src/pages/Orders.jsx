import React, { useEffect } from "react";
import { useOrder } from "../context/OrderContext"; // Use OrderContext instead of CartContext
import axios from "axios";

const Orders = () => {
  const { orders, setOrders, cancelOrder } = useOrder();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://farm2home-backend-2qly.onrender.com/api/orders/user-orders",{
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchOrders();
  }, [setOrders]);

  if (orders.length === 0) {
    return <div className="text-center mt-10 text-lg">No orders yet.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">My Orders</h2>
      {orders.map((order) => (
        <div
          key={order._id}
          className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow"
        >
          <div className="mb-2 text-sm text-gray-600">
            Ordered on: {new Date(order.createdAt).toLocaleDateString()}
          </div>
          <ul className="space-y-2">
            {order.items.map((item) => (
              <li key={item.product._id} className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-contain rounded"
                />
                <div>
                  <h4 className="font-semibold">{item.product.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.price * item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-2 font-bold">Total: ₹{order.totalPrice}</div>
          <button
            onClick={() => cancelOrder(order._id)}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Cancel Order
          </button>
        </div>
      ))}
    </div>
  );
};

export default Orders;
