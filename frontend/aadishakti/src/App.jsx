import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Gallery from "./components/Gallery/gallery.jsx";

import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import UploadImage from "./components/Uploadimg";
import CourseForm from "./components/CourseForm";
import Courses from "./components/Courses";
import CourseDetails from "./components/CourseDetails";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Cart from "./components/Cart.jsx";
import PromoCodeForm from "./components/PromoCodeForm.jsx";
import { UserProvider } from "./UserContext.jsx";
import { CartProvider } from "./contexts/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import BuyPage from "./components/BuyPage.jsx";
import CourseLinks from "./components/CourseLinks.jsx";
import TransactionsDashboard from "./components/TransactionDashboard.jsx";
import AdminRoutesDashboard from "./components/AdminRoutesDashboard.jsx";
import "./styles/animations.css";
import Appointment from "./pages/Appointment.jsx";
import BooksList from "./components/Books/BooksList";
import BookDetails from "./components/Books/BooksDetails";
import CheckoutPage from "./components/CheckoutPage.jsx";
import BuyBook from "./components/Books/BuyBook.jsx";
import Certificate from "./components/Certificate.jsx";
import CertificateWrapper from "./components/CertificateWrapper.jsx";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:title" element={<CourseDetails />} />
            <Route path="/courses/:title/buy" element={<BuyPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/dashboard/" element={<Dashboard />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/books" element={<BooksList />} />
            <Route path="/buybook" element={<BuyBook />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route
              path="/certificate"
              element={
                <Certificate
                  name="Soham Ladgaonkar"
                  course="रेकी लेव्हल टू - डिस्टन्स रेकी"
                  date="June 8, 2025"
                />
              }
            />

            <Route
              path="/courses/:courseId/details"
              element={<CourseLinks />}
            />

            <Route
              path="/courses/:courseId/certificate"
              element={<CertificateWrapper />}
            />

            {/* Admin Panel Route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminRoutesDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <UploadImage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactiondashboard"
              element={
                <ProtectedRoute>
                  <TransactionsDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/course-form"
              element={
                <ProtectedRoute>
                  <CourseForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/promocode-form"
              element={
                <ProtectedRoute>
                  <PromoCodeForm />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
