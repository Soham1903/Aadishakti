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
import { UserProvider } from "./UserContext.jsx";

function App() {
  return (
    <UserProvider>
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
          <Route path="/courses" element={<Courses />} />
          <Route path="/course-form" element={<CourseForm />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/upload-course" element={<UploadCourse />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
