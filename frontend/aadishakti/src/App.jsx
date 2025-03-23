import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
// import Carousel from "./components/Home/imageCarousel";  // Import Carousel
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import UploadImage from "./components/Uploadimg";
import CourseForm from "./components/CourseForm";
import Courses from "./components/Courses";
import CoursesSection from "./components/CourseSection";
import UploadCourse from "./components/UploadCourse";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import CourseDetails from "./components/CourseDetails";
import { UserProvider } from "./UserContext.jsx";
import { CartProvider } from "./contexts/CartContext";
import Dashboard from "./components/Dashboard";
import Cart from "./components/Cart.jsx";
import PromoCodeForm from "./components/PromoCodeForm.jsx";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            {/* Set Carousel as Home Page */}
            {/* <Route path="/" element={<Carousel />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/upload" element={<UploadImage />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:title" element={<CourseDetails />} />
            <Route path="/course-form" element={<CourseForm />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/upload-course" element={<UploadCourse />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/promocode-form" element={<PromoCodeForm />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
