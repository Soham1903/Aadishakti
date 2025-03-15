import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '/assets/aadishaktipng.png'; // Import the logo from your old code

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // For login/signup dropdown

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-[#921a40] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Name */}
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <img
                src={logo} 
                alt="Gurukul Logo"
                className="relative h-12 w-12 rounded-full border-2 border-white/50"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-pink-200 text-transparent bg-clip-text">
              Gurukulin
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="group relative px-2 py-1">
              <span className="relative z-10">HOME</span>
              <div className="absolute inset-0 h-full w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left bg-white/10 rounded-lg"></div>
            </a>
            <a href="/about" className="group relative px-2 py-1">
              <span className="relative z-10">ABOUT US</span>
              <div className="absolute inset-0 h-full w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left bg-white/10 rounded-lg"></div>
            </a>
            <a href="/courses" className="group relative px-2 py-1">
              <span className="relative z-10">COURSES</span>
              <div className="absolute inset-0 h-full w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left bg-white/10 rounded-lg"></div>
            </a>
            <a href="/contact" className="group relative px-2 py-1">
              <span className="relative z-10">CONTACT</span>
              <div className="absolute inset-0 h-full w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left bg-white/10 rounded-lg"></div>
            </a>
            <a href="/dashboard" className="group relative px-2 py-1">
              <span className="relative z-10">MY DASHBOARD</span>
              <div className="absolute inset-0 h-full w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left bg-white/10 rounded-lg"></div>
            </a>

            {/* Login/Signup Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="relative group px-6 py-2 overflow-hidden rounded-full bg-white/10 transition duration-300"
              >
                <div className="absolute inset-0 w-full h-full transition-all duration-300 scale-x-0 transform group-hover:scale-x-100 group-hover:bg-white/20"></div>
                <span className="relative">LOGIN/SIGNUP</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg">
                  <a
                    href="/login"
                    className="block px-4 py-2 text-[#921a40] hover:bg-gray-200"
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="block px-4 py-2 text-[#921a40] hover:bg-gray-200"
                  >
                    Signup
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition duration-300"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-[#921a40] border-t border-white/10">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <a
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition duration-300"
              >
                HOME
              </a>
              <a
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition duration-300"
              >
                ABOUT US
              </a>
              <a
                href="/courses"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition duration-300"
              >
                COURSES
              </a>
              <a
                href="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition duration-300"
              >
                CONTACT
              </a>
              <a
                href="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition duration-300"
              >
                MY DASHBOARD
              </a>
              <button
                onClick={toggleDropdown}
                className="w-full mt-4 mb-2 px-3 py-2 text-center rounded-md bg-white/10 hover:bg-white/20 transition duration-300"
              >
                LOGIN/SIGNUP
              </button>
              {dropdownOpen && (
                <div className="mt-2 space-y-1">
                  <a
                    href="/login"
                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-md"
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-md"
                  >
                    Signup
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;