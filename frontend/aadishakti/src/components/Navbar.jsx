import { useState, useEffect, useRef } from "react";
import { UserCircle2, Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useUser } from "../UserContext";
import { useCart } from "../contexts/CartContext";
import coursesData from "../data/courses.json";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const { user, setUser } = useUser();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const coursesDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        coursesDropdownRef.current &&
        !coursesDropdownRef.current.contains(event.target)
      ) {
        setCoursesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
    setCoursesDropdownOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (dropdownOpen) setDropdownOpen(false);
    if (coursesDropdownOpen) setCoursesDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleCoursesDropdown = () => {
    setCoursesDropdownOpen(!coursesDropdownOpen);

    // Remove the navigation, simply toggle the dropdown
    // No need to navigate to /courses on mobile
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

  const handleCourseClick = (courseTitle) => {
    // Use correct casing from the actual data
    const course = coursesData.find(
      (c) => c.title.toLowerCase() === courseTitle.toLowerCase()
    );

    if (course) {
      navigate(`/courses/${course.title}`);
      setCoursesDropdownOpen(false);
      setIsOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isActive = (path) => location.pathname === path;
  const isCoursePage = location.pathname.includes("/courses");

  const NavItem = ({
    href,
    isActive,
    children,
    hasDropdown,
    onMouseEnter,
    onMouseLeave,
    dropdownRef,
  }) => (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={dropdownRef}
    >
      <a
        href={href}
        className={`px-4 py-2 text-sm font-medium rounded-full flex items-center ${
          isActive ? "bg-white text-[#921a40]" : "text-white hover:bg-white/20"
        } transition-colors`}
        onClick={hasDropdown ? (e) => e.preventDefault() : handleNavLinkClick}
      >
        {children}
        {hasDropdown && <ChevronDown className="w-4 h-4 ml-1" />}
      </a>
    </div>
  );

  return (
    <nav className="bg-[#87161A] text-white shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Name */}
          <div className="flex items-center space-x-3">
            <Link
              to="/"
              className="flex items-center space-x-3"
              onClick={handleNavLinkClick}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <img
                  src="/assets/aadishaktipng.png"
                  alt="Gurukul Logo"
                  className="relative h-12 w-12 md:h-14 md:w-14 object-contain"
                />
              </div>
              <img
                src="/assets/Adishakti TEXT logo.png"
                alt="Aadishakti Text"
                className="h-8 md:h-12 object-contain"
                style={{ maxWidth: 'none' }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex space-x-1 bg-white/10 backdrop-blur-sm border border-white/20 px-1 py-1 rounded-full">
              <NavItem href="/" isActive={isActive("/")}>
                HOME
              </NavItem>
              <NavItem href="/about" isActive={isActive("/about")}>
                ABOUT
              </NavItem>

              {/* Courses Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCoursesDropdownOpen(true)}
                onMouseLeave={() => setCoursesDropdownOpen(false)}
                ref={coursesDropdownRef}
              >
                <Link
                  to="/courses"
                  className={`px-4 py-2 text-sm font-medium rounded-full flex items-center ${
                    isCoursePage
                      ? "bg-white text-[#921a40]"
                      : "text-white hover:bg-white/20"
                  } transition-colors`}
                  onClick={handleNavLinkClick}
                >
                  COURSES <ChevronDown className="w-4 h-4 ml-1" />
                </Link>

                {/* Courses Dropdown Menu */}
                {coursesDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50 animate-fadeIn">
                    <div className="px-3 py-2 text-[#87161A] font-semibold border-b">
                      All Courses
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {coursesData.map((course) => (
                        <button
                          key={course.courseId}
                          onClick={() => handleCourseClick(course.title)}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-8 h-8 rounded object-cover mr-2"
                            />
                            <span className="truncate">{course.title}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="px-3 py-2 border-t">
                      <Link
                        to="/courses"
                        className="block text-center text-sm font-medium text-[#87161A] hover:underline"
                        onClick={handleNavLinkClick}
                      >
                        View All Courses
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <NavItem href="/books" isActive={isActive("/books")}>
                BOOKS
              </NavItem>
              <NavItem href="/contact" isActive={isActive("/contact")}>
                CONTACT
              </NavItem>
              <NavItem href="/gallery" isActive={isActive("/gallery")}>
                GALLERY
              </NavItem>
            </div>
          </div>

          {/* Cart and User Icons */}
          <div className="hidden md:flex items-center space-x-2 pl-4 border-l border-white/20">
            <button
              onClick={handleCartClick}
              className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <UserCircle2 className="w-6 h-6" />
                {user && (
                  <>
                    <span className="text-sm font-medium max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 animate-fadeIn">
                  {user ? (
                    <>
                      <div className="px-4 py-3 text-sm text-gray-700 border-b">
                        <p className="font-medium truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={handleDashboardClick}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleNavLinkClick}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleNavLinkClick}
                      >
                        Sign up
                      </Link>
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
              <Link
                to="/"
                onClick={handleNavLinkClick}
                className="block px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors rounded-md"
              >
                HOME
              </Link>
              <Link
                to="/about"
                onClick={handleNavLinkClick}
                className="block px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors rounded-md"
              >
                ABOUT
              </Link>

              {/* Simple Courses Link for Mobile */}
              <Link
                to="/courses"
                onClick={handleNavLinkClick}
                className="block px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors rounded-md"
              >
                COURSES
              </Link>

              <Link
                to="/books"
                onClick={handleNavLinkClick}
                className="block px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors rounded-md"
              >
                BOOKS
              </Link>
              <Link
                to="/contact"
                onClick={handleNavLinkClick}
                className="block px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors rounded-md"
              >
                CONTACT
              </Link>
              <Link
                to="/gallery"
                onClick={handleNavLinkClick}
                className="block px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors rounded-md"
              >
                GALLERY
              </Link>

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
                  <Link
                    to="/login"
                    onClick={handleNavLinkClick}
                    className="block px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors rounded-md"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={handleNavLinkClick}
                    className="block px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors rounded-md"
                  >
                    Sign up
                  </Link>
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