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
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Carousel />} />  Set Carousel as Home Page */}
        <Route path="/" element={<Home />} /> Set Carousel as Home Page
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/upload" element={<UploadImage />} />
        <Route path="/courses" element={<CoursesSection />} />
        <Route path="/course-form" element={<CourseForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
