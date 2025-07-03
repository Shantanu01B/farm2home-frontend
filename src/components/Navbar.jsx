import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, User, ShoppingCart, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const categoryMenuRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const { user, logout } = useAuth();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleCategoryMenu = () => setIsCategoryOpen((prev) => !prev);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen((prev) => !prev);
  const closeAllMenus = () => {
    setIsOpen(false);
    setIsCategoryOpen(false);
    setIsProfileDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Toggle menu"]')
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-green-800 to-green-700 text-white shadow-lg sticky top-0 z-50 border-b border-green-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center text-2xl font-extrabold tracking-tight text-white hover:text-green-100 transition-all duration-200"
              onClick={closeAllMenus}
            >
              <span className="bg-white text-green-800 px-2 py-1 rounded-lg shadow-lg font-black mr-2 transform hover:scale-105 transition-transform">
                F2H
              </span>
              <span className="hidden sm:inline text-transparent bg-clip-text bg-gradient-to-r from-white to-green-100">
                Farm2Home
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg text-base font-medium hover:bg-green-700/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200"
            >
              Home
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative" ref={categoryMenuRef}>
              <button
                onClick={toggleCategoryMenu}
                className={`px-4 py-2 rounded-lg text-base font-medium flex items-center gap-1 hover:bg-green-700/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200 ${
                  isCategoryOpen ? "bg-green-700/70 text-white" : ""
                }`}
              >
                Categories
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isCategoryOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl shadow-2xl bg-white ring-1 ring-green-200/50 backdrop-blur-sm bg-white/95 z-50 animate-fadeIn">
                  <div className="py-1">
                    {[
                      { name: "Fruits", path: "/fruits", emoji: "🍎" },
                      { name: "Vegetables", path: "/vegetables", emoji: "🥦" },
                      { name: "Dairy", path: "/dairy", emoji: "🥛" },
                      { name: "Grains", path: "/grains", emoji: "🌾" },
                    ].map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={closeAllMenus}
                        className="block px-4 py-2.5 text-green-800 hover:bg-green-50 rounded-lg transition-all duration-200 flex items-center"
                      >
                        <span className="mr-2 text-lg">{item.emoji}</span>
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/about"
              className="px-4 py-2 rounded-lg text-base font-medium hover:bg-green-700/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 rounded-lg text-base font-medium hover:bg-green-700/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200"
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className="px-3 py-2 rounded-lg text-base font-medium flex items-center gap-1 hover:bg-green-700/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-green-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>

            {user?.role === "farmer" && (
              <Link
                to="/farmer-dashboard"
                className="ml-2 px-4 py-2 rounded-lg text-base font-medium bg-green-600 hover:bg-green-500 transition-all text-white shadow-md hover:shadow-lg"
              >
                Dashboard
              </Link>
            )}

            {/* Profile Dropdown */}
            <div className="relative ml-2" ref={profileDropdownRef}>
              <button
                onClick={toggleProfileDropdown}
                className={`flex items-center justify-center p-2 rounded-full bg-green-700 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200 ${
                  isProfileDropdownOpen ? "ring-2 ring-green-400 bg-green-600" : ""
                }`}
                aria-expanded={isProfileDropdownOpen}
                aria-haspopup="true"
              >
                <User className="h-5 w-5" />
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    isProfileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isProfileDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-2xl bg-white ring-1 ring-green-200/50 backdrop-blur-sm bg-white/95 z-50 animate-fadeIn">
                  <div className="py-1">
                    {user ? (
                      <>
                        <div className="px-4 py-2.5 text-green-800 border-b border-green-100/50 font-medium">
                          <div className="font-semibold truncate">{user.name || user.email}</div>
                          <div className="text-xs text-green-600">Member since 2023</div>
                        </div>
                        <Link
                          to="/profile"
                          onClick={closeAllMenus}
                          className="block px-4 py-2.5 text-green-800 hover:bg-green-50 rounded-lg transition-all duration-200 flex items-center"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Your Profile
                        </Link>
                        <Link
                          to="/my-orders"
                          onClick={closeAllMenus}
                          className="block px-4 py-2.5 text-green-800 hover:bg-green-50 rounded-lg transition-all duration-200 flex items-center"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Your Orders
                        </Link>
                        <div className="border-t border-green-100/50 my-1" />
                        <button
                          onClick={() => {
                            logout();
                            closeAllMenus();
                          }}
                          className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 flex items-center rounded-lg transition-all duration-200"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/farmer-login"
                          onClick={closeAllMenus}
                          className="block px-4 py-2.5 text-green-800 hover:bg-green-50 rounded-lg transition-all duration-200"
                        >
                          Farmer Login
                        </Link>
                        <Link
                          to="/login"
                          onClick={closeAllMenus}
                          className="block px-4 py-2.5 text-green-800 hover:bg-green-50 rounded-lg transition-all duration-200"
                        >
                          User Login
                        </Link>
                        <Link
                          to="/register"
                          onClick={closeAllMenus}
                          className="block px-4 py-2.5 text-green-800 hover:bg-green-50 rounded-lg transition-all duration-200"
                        >
                          Create Account
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              to="/cart"
              className="p-2 rounded-full bg-green-700 hover:bg-green-600 transition-colors duration-200 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-green-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-gradient-to-b from-green-800 to-green-700 text-white animate-slideDown shadow-xl"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={closeAllMenus}
              className="block px-3 py-3 rounded-lg text-base font-medium hover:bg-green-700/50 transition-all duration-200"
            >
              Home
            </Link>
            <div className="relative">
              <button
                onClick={toggleCategoryMenu}
                className="w-full text-left px-3 py-3 rounded-lg text-base font-medium flex justify-between items-center hover:bg-green-700/50 transition-all duration-200"
              >
                Categories
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-200 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isCategoryOpen && (
  <div className="pl-4 mt-1 space-y-1 bg-green-700/30 rounded-lg shadow-inner backdrop-blur-sm">
    {[
      { name: "Fruits", path: "/fruits", emoji: "🍎" },
      { name: "Vegetables", path: "/vegetables", emoji: "🥦" },
      { name: "Dairy", path: "/dairy", emoji: "🥛" },
      { name: "Grains", path: "/grains", emoji: "🌾" },
    ].map((item) => (
      <Link
        key={item.name}
        to={item.path}
        onClick={() => setIsOpen(false)} // Only close the mobile menu, not all menus
        className="block px-3 py-2.5 rounded-lg text-base font-medium hover:bg-green-700/50 transition-all duration-200 flex items-center"
      >
        <span className="mr-2 text-lg">{item.emoji}</span>
        <span>{item.name}</span>
      </Link>
    ))}
  </div>
)}
            </div>
            <Link
              to="/about"
              onClick={closeAllMenus}
              className="block px-3 py-3 rounded-lg text-base font-medium hover:bg-green-700/50 transition-all duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={closeAllMenus}
              className="block px-3 py-3 rounded-lg text-base font-medium hover:bg-green-700/50 transition-all duration-200"
            >
              Contact
            </Link>
            {user?.role === "farmer" && (
              <Link
                to="/farmer-dashboard"
                onClick={closeAllMenus}
                className="block px-3 py-3 rounded-lg text-base font-medium bg-green-600 hover:bg-green-500 transition-all text-white shadow"
              >
                Dashboard
              </Link>
            )}
          </div>
          <div className="pt-2 pb-3 border-t border-green-600/30">
            {user ? (
              <div className="px-5 space-y-1">
                <div className="text-base font-semibold text-white px-3 py-2.5">
                  {user.name || user.email}
                </div>
                <Link
                  to="/profile"
                  onClick={closeAllMenus}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-green-100 hover:text-white hover:bg-green-700/50 transition-all duration-200"
                >
                  Your Profile
                </Link>
                <Link
                  to="/my-orders"
                  onClick={closeAllMenus}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-green-100 hover:text-white hover:bg-green-700/50 transition-all duration-200"
                >
                  Your Orders
                </Link>
                <div className="border-t border-green-600/30 pt-1">
                  <button
                    onClick={() => {
                      logout();
                      closeAllMenus();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-red-300 hover:text-white hover:bg-red-500/80 flex items-center transition-all duration-200"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-2 pt-1 pb-3 space-y-1">
                <Link
                  to="/farmer-login"
                  onClick={closeAllMenus}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-green-100 hover:text-white hover:bg-green-700/50 transition-all duration-200"
                >
                  Farmer Login
                </Link>
                <Link
                  to="/login"
                  onClick={closeAllMenus}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-green-100 hover:text-white hover:bg-green-700/50 transition-all duration-200"
                >
                  User Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeAllMenus}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-green-100 hover:text-white hover:bg-green-700/50 transition-all duration-200"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.15s ease-out forwards;
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideDown {
            animation: slideDown 0.2s ease-out forwards;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;