import { useState, useEffect, useRef } from "react";
import { UserCircle2, Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { useCart } from "../contexts/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, setUser } = useUser();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const location = { pathname: window.location.pathname };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (dropdownOpen) setDropdownOpen(false);
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
    setIsOpen(false);
  };

  const handleDashboardClick = () => {
    if (!user) {
      navigate("/login");
    } else if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
    setIsOpen(false);
  };

  const handleCartClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/cart");
    }
    setIsOpen(false);
  };

  const handleNavLinkClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isActive = (path) => location.pathname === path;

  const NavItem = ({ href, isActive, children }) => (
    <a
      href={href}
      className={`px-4 py-2 text-sm font-medium rounded-full ${
        isActive ? "bg-white text-[#921a40]" : "text-white hover:bg-white/20"
      } transition-colors`}
      onClick={handleNavLinkClick}
    >
      {children}
    </a>
  );

  return (
    <nav className="bg-[#87161A] text-white shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo and Name */}
          <div className="flex items-center space-x-2">
            <a href="/" className="flex items-center space-x-2">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <img
                  src="/assets/aadishaktipng.png"
                  alt="Gurukul Logo"
                  className="relative h-8 w-8 md:h-10 md:w-10"
                />
              </div>
              <img
                src="/assets/Adishakti TEXT logo.png"
                alt="Aadishakti Text"
                className="h-6 md:h-8 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex space-x-1 bg-white/10 backdrop-blur-sm border border-white/20 px-1 py-1 rounded-full">
              <NavItem href="/" isActive={isActive("/")}>HOME</NavItem>
              <NavItem href="/about" isActive={isActive("/about")}>ABOUT</NavItem>
              <NavItem href="/courses" isActive={isActive("/courses")}>COURSES</NavItem>
              <NavItem href="/books" isActive={isActive("/books")}>BOOKS</NavItem>
              <NavItem href="/contact" isActive={isActive("/contact")}>CONTACT</NavItem>
              <NavItem href="/gallery" isActive={isActive("/gallery")}>GALLERY</NavItem>
            </div>
          </div>

          {/* Cart and User Icons */}
          <div className="hidden md:flex items-center space-x-2 pl-4 border-l border-white/20">
            <button
              onClick={handleCartClick}
              className="relative p-1.5 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1 p-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <UserCircle2 className="w-5 h-5" />
                {user && (
                  <>
                    <span className="text-sm font-medium max-w-[80px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg py-1 z-50 animate-fadeIn">
                  {user ? (
                    <>
                      <div className="px-3 py-2 text-sm text-gray-700 border-b">
                        <p className="font-medium truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={handleDashboardClick}
                        className="block w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Login
                      </a>
                      <a
                        href="/signup"
                        className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign up
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={handleCartClick}
              className="relative p-1.5 rounded-full hover:bg-white/10"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-white/10 animate-slideDown">
            <div className="py-2 space-y-1">
              {user && (
                <div className="px-4 py-2 mb-2 bg-white/5 rounded-md">
                  <div className="flex items-center space-x-2">
                    <UserCircle2 className="w-5 h-5" />
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-white/70">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}
              <a href="/" onClick={handleNavLinkClick} className="block px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors rounded-md">HOME</a>
              <a href="/about" onClick={handleNavLinkClick} className="block px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors rounded-md">ABOUT</a>
              <a href="/courses" onClick={handleNavLinkClick} className="block px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors rounded-md">COURSES</a>
              <a href="/books" onClick={handleNavLinkClick} className="block px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors rounded-md">BOOKS</a>
              <a href="/contact" onClick={handleNavLinkClick} className="block px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors rounded-md">CONTACT</a>
              <a href="/gallery" onClick={handleNavLinkClick} className="block px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors rounded-md">GALLERY</a>

              {user ? (
                <>
                  <button
                    onClick={handleDashboardClick}
                    className="block w-full text-left px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors rounded-md"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm font-medium text-red-300 hover:bg-white/10 transition-colors rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" onClick={handleNavLinkClick} className="block px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors rounded-md">Login</a>
                  <a href="/signup" onClick={handleNavLinkClick} className="block px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors rounded-md">Sign up</a>
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