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
    <nav className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center text-2xl font-extrabold tracking-tight text-white hover:text-green-100 transition-colors duration-200"
            >
              <span className="bg-white text-green-800 px-2 py-1 rounded-lg shadow font-black mr-2">F2H</span>
              <span className="hidden sm:inline">Farm2Home</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg text-base font-semibold hover:bg-green-600 hover:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
            >
              Home
            </Link>
            {/* Categories Dropdown */}
            <div className="relative" ref={categoryMenuRef}>
              <button
                onClick={toggleCategoryMenu}
                className={`px-4 py-2 rounded-lg text-base font-semibold flex items-center gap-1 hover:bg-green-600 hover:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-300 transition ${isCategoryOpen ? "bg-green-700" : ""}`}
              >
                Categories
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`} />
              </button>
              {isCategoryOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-10 z-50 animate-fadeIn">
                  <div className="py-1">
                    <Link
                      to="/fruits"
                      onClick={closeAllMenus}
                      className="block px-4 py-2 text-green-800 hover:bg-green-100 rounded transition"
                    >
                      Fruits
                    </Link>
                    <Link
                      to="/vegetables"
                      onClick={closeAllMenus}
                      className="block px-4 py-2 text-green-800 hover:bg-green-100 rounded transition"
                    >
                      Vegetables
                    </Link>
                    <Link
                      to="/dairy"
                      onClick={closeAllMenus}
                      className="block px-4 py-2 text-green-800 hover:bg-green-100 rounded transition"
                    >
                      Dairy
                    </Link>
                    <Link
                      to="/grains"
                      onClick={closeAllMenus}
                      className="block px-4 py-2 text-green-800 hover:bg-green-100 rounded transition"
                    >
                      Grains
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link
              to="/about"
              className="px-4 py-2 rounded-lg text-base font-semibold hover:bg-green-600 hover:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 rounded-lg text-base font-semibold hover:bg-green-600 hover:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className="px-4 py-2 rounded-lg text-base font-semibold flex items-center gap-1 hover:bg-green-600 hover:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
            >
              <ShoppingCart className="h-5 w-5 mr-1" />
              Cart
            </Link>
            {user?.role === "farmer" && (
              <Link
                to="/farmer-dashboard"
                className="px-4 py-2 rounded-lg text-base font-semibold bg-green-600 hover:bg-green-500 transition text-white shadow"
              >
                Dashboard
              </Link>
            )}
            {/* Profile Dropdown */}
            <div className="relative ml-1" ref={profileDropdownRef}>
              <button
                onClick={toggleProfileDropdown}
                className={`flex items-center justify-center p-2 rounded-full bg-green-700 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition ${isProfileDropdownOpen ? "ring-2 ring-green-400" : ""}`}
                aria-expanded={isProfileDropdownOpen}
                aria-haspopup="true"
              >
                <User className="h-5 w-5" />
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isProfileDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {isProfileDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-10 z-50 animate-fadeIn">
                  <div className="py-1">
                    {user ? (
                      <>
                        <div className="px-4 py-2 text-green-800 border-b border-gray-100 font-semibold">
                          {user.name || user.email}
                        </div>
                        <Link
                          to="/profile"
                          onClick={closeAllMenus}
                          className="block px-4 py-2 text-green-800 hover:bg-green-100 rounded transition"
                        >
                          Your Profile
                        </Link>
                        <Link
                          to="/my-orders"
                          onClick={closeAllMenus}
                          className="block px-4 py-2 text-green-800 hover:bg-green-100 rounded transition"
                        >
                          Your Orders
                        </Link>
                        <div className="border-t border-gray-100 my-1" />
                        <button
                          onClick={() => {
                            logout();
                            closeAllMenus();
                          }}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center rounded transition"
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
                          className="block px-4 py-2 text-green-800 hover:bg-green-100 rounded transition"
                        >
                          Farmer Login
                        </Link>
                        <Link
                          to="/login"
                          onClick={closeAllMenus}
                          className="block px-4 py-2 text-green-800 hover:bg-green-100 rounded transition"
                        >
                          User Login
                        </Link>
                        <Link
                          to="/register"
                          onClick={closeAllMenus}
                          className="block px-4 py-2 text-green-800 hover:bg-green-100 rounded transition"
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link
              to="/cart"
              className="p-2.5 mr-2 rounded-full bg-green-700 hover:bg-green-600 transition-colors duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="block h-7 w-7" />
              ) : (
                <Menu className="block h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-gradient-to-b from-green-800 via-green-700 to-green-600 text-white animate-slideDown shadow-2xl"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={closeAllMenus}
              className="block px-3 py-3 rounded-lg text-base font-semibold hover:bg-green-600 transition"
            >
              Home
            </Link>
            <div className="relative">
              <button
                onClick={toggleCategoryMenu}
                className="w-full text-left px-3 py-3 rounded-lg text-base font-semibold flex justify-between items-center hover:bg-green-600 transition"
              >
                Categories
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`} />
              </button>
              {isCategoryOpen && (
                <div className="pl-4 mt-1 space-y-1 bg-green-700 rounded-xl shadow-inner">
                  <Link
                    to="/fruits"
                    onClick={closeAllMenus}
                    className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-green-600 transition"
                  >
                    Fruits
                  </Link>
                  <Link
                    to="/vegetables"
                    onClick={closeAllMenus}
                    className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-green-600 transition"
                  >
                    Vegetables
                  </Link>
                  <Link
                    to="/dairy"
                    onClick={closeAllMenus}
                    className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-green-600 transition"
                  >
                    Dairy
                  </Link>
                  <Link
                    to="/grains"
                    onClick={closeAllMenus}
                    className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-green-600 transition"
                  >
                    Grains
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/about"
              onClick={closeAllMenus}
              className="block px-3 py-3 rounded-lg text-base font-semibold hover:bg-green-600 transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={closeAllMenus}
              className="block px-3 py-3 rounded-lg text-base font-semibold hover:bg-green-600 transition"
            >
              Contact
            </Link>
            {user?.role === "farmer" && (
              <Link
                to="/farmer-dashboard"
                onClick={closeAllMenus}
                className="block px-3 py-3 rounded-lg text-base font-semibold bg-green-600 hover:bg-green-500 transition text-white shadow"
              >
                Dashboard
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-green-600">
            {user ? (
              <div className="px-5 space-y-2">
                <div className="text-base font-semibold text-white px-3 py-2">{user.name || user.email}</div>
                <Link
                  to="/profile"
                  onClick={closeAllMenus}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-green-100 hover:text-white hover:bg-green-600 transition"
                >
                  Your Profile
                </Link>
                <Link
                  to="/my-orders"
                  onClick={closeAllMenus}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-green-100 hover:text-white hover:bg-green-600 transition"
                >
                  Your Orders
                </Link>
                <div className="border-t border-green-600 pt-2">
                  <button
                    onClick={() => {
                      logout();
                      closeAllMenus();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-red-300 hover:text-white hover:bg-red-500 flex items-center transition"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/farmer-login"
                  onClick={closeAllMenus}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-green-100 hover:text-white hover:bg-green-600 transition"
                >
                  Farmer Login
                </Link>
                <Link
                  to="/login"
                  onClick={closeAllMenus}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-green-100 hover:text-white hover:bg-green-600 transition"
                >
                  User Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeAllMenus}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-green-100 hover:text-white hover:bg-green-600 transition"
                >
                  Register
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
            from { opacity: 0; transform: translateY(-10px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.18s cubic-bezier(.4,0,.2,1);
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-16px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-slideDown {
            animation: slideDown 0.22s cubic-bezier(.4,0,.2,1);
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
