import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupForm from "./components/SignupForm"; // Adjust the path as needed
import LoginForm from "./components/LoginForm";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import UploadImage from "./components/Uploadimg";
import Carousel from "./components/imageCarousel";
import CourseForm from "./components/CourseForm";
import Courses from "./components/Courses";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Ensure you have a login form component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/uploadimg" element={<UploadImage />} />
        <Route path="/carousel" element={<Carousel />} />
        <Route path="/courseform" element={<CourseForm />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </Router>
  );
}

export default App;
