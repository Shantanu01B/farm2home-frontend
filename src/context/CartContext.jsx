// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
const ORDER_STORAGE_KEY = 'orders';

function getProductKey(product) {
  return product._id || product.id;
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  const [orders, setOrders] = useState(() => {
    const storedOrders = localStorage.getItem(ORDER_STORAGE_KEY);
    return storedOrders ? JSON.parse(storedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product, quantity = 1) => {
    const key = getProductKey(product);
    setCartItems((prev) => {
      const existing = prev.find((item) => getProductKey(item) === key);
      if (existing) {
        return prev.map((item) =>
          getProductKey(item) === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => getProductKey(item) !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        getProductKey(item) === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const confirmOrder = () => {
    const newOrder = {
      id: Date.now(),
      items: [...cartItems],
      total: totalPrice,
      date: new Date().toLocaleString(),
    };
    setOrders((prev) => [...prev, newOrder]);
    setCartItems([]);
    return newOrder;
  };

  const cancelOrder = (orderId) => {
    setOrders((prev) => prev.filter(order => order.id !== orderId));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        orders,
        confirmOrder,
        cancelOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
