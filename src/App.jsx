// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Fruits from "./pages/Fruits";
import Vegetables from "./pages/Vegetables";
import Dairy from "./pages/Dairy";
import Grains from "./pages/Grains";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FarmerDashboard from './pages/FarmerDashboard';
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import FarmerLogin from './pages/FarmerLogin';
import GoogleLoginSuccess from "./pages/GoogleLoginSuccess";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from './pages/Profile';
import MyOrders from './pages/MyOrders';

const App = () => {
  return (
    <AuthProvider>
      <div className="bg-green-50 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fruits" element={<Fruits />} />
            <Route path="/vegetables" element={<Vegetables />} />
            <Route path="/dairy" element={<Dairy />} />
            <Route path="/grains" element={<Grains />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/farmer-login" element={<FarmerLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
            <Route path="/google-login-success" element={<GoogleLoginSuccess />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
};

export default App;
