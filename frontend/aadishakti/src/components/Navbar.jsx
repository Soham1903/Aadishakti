import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/aadishaktipng.png"; // Adjust the path if needed

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-[#C75B7A] border-gray-200 dark:bg-[#921A40]">
      <div className="max-w-screen-lg flex flex-wrap items-center justify-between mx-auto p-3">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Astrovidya Logo" className="h-14 w-auto" />
        </Link>

        {/* Right Side */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0">
          <Link
            to="/dashboard"
            className="text-white px-3 py-1 rounded-lg hover:bg-[#D9ABAB]"
          >
            My Dashboard
          </Link>

          {/* Login & Signup Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-white px-3 py-1 rounded-lg bg-[#D9ABAB] text-[#921A40] hover:bg-[#F4D9D0] focus:outline-none"
            >
              Login / Signup
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-[#921A40] hover:bg-gray-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-[#921A40] hover:bg-gray-200"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 w-8 h-8 text-white rounded-lg hover:bg-[#D9ABAB] focus:outline-none"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } md:flex w-full md:w-auto md:order-1`}
        >
          <ul className="flex flex-col font-medium p-3 md:p-0 mt-3 border border-gray-100 rounded-lg bg-[#F4D9D0] md:flex-row md:space-x-6 md:mt-0 md:border-0 md:bg-[#921A40]">
            <li>
              <Link to="/" className="block py-2 px-3 text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 px-3 text-white">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="block py-2 px-3 text-white">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block py-2 px-3 text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
