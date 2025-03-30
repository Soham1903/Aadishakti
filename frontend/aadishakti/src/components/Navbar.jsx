import { useState } from "react";
import { UserCircle2, Menu, X, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { useCart } from "../contexts/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, setUser } = useUser();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    setDropdownOpen(false);
  };

  const handleDashboardClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  };

  const handleCartClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };

  return (
    <nav className="bg-[#921a40] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Name */}
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <img
                src="/assets/aadishaktipng.png"
                alt="Gurukul Logo"
                className="relative h-12 w-12 rounded-full border-2 border-white/50"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-pink-200 text-transparent bg-clip-text">
              Gurukulin
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <a
                href="/"
                className="nav-link relative group px-3 py-2 transition-colors duration-300 hover:bg-white/10 rounded-md"
              >
                <span className="relative z-10">HOME</span>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300"></div>
              </a>
              <a
                href="/courses"
                className="nav-link relative group px-3 py-2 transition-colors duration-300 hover:bg-white/10 rounded-md"
              >
                <span className="relative z-10">COURSES</span>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300"></div>
              </a>
              <a
                href="/about"
                className="nav-link relative group px-3 py-2 transition-colors duration-300 hover:bg-white/10 rounded-md"
              >
                <span className="relative z-10">ABOUT</span>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300"></div>
              </a>
              <a
                href="/contact"
                className="nav-link relative group px-3 py-2 transition-colors duration-300 hover:bg-white/10 rounded-md"
              >
                <span className="relative z-10">CONTACT</span>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300"></div>
              </a>
            </div>

            {/* Cart and User Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCartClick}
                className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </button>

              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <UserCircle2 className="w-6 h-6" />
                  {user && (
                    <span className="text-sm font-medium">{user.name}</span>
                  )}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    {user ? (
                      <>
                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                          Welcome back!
                        </div>
                        <button
                          onClick={handleDashboardClick}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Dashboard
                        </button>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <a
                          href="/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Login
                        </a>
                        <a
                          href="/signup"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign up
                        </a>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={handleCartClick}
              className="relative p-2 rounded-full hover:bg-white/10"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
              >
                HOME
              </a>
              <a
                href="/courses"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
              >
                COURSES
              </a>
              <a
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
              >
                ABOUT
              </a>
              <a
                href="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
              >
                CONTACT
              </a>
              {user ? (
                <>
                  <button
                    onClick={handleDashboardClick}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
                  >
                    Sign up
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;