import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import ErrorPage from "./pages/ErrorPage";
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatbotWidget from "./components/ChatbotWidget";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OtpVerification from "./pages/OtpVerification";
import AdminDashboard from "./pages/AdminDashboard";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import Transactions from "./pages/Transactions";
import EmailVerification from "./pages/EmailVerification";
import { useEffect, useState } from "react";
import { useUserContext } from "../src/context/user_context";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const { user, setUser } = useUserContext();
  const [themeMode, setThemeMode] = useState("light");

  const toggleTheme = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    localStorage.setItem("themeMode", newTheme);
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
    const savedTheme = localStorage.getItem("themeMode");
    if (savedTheme) {
      setThemeMode(savedTheme);
    }
  }, []);

  const lightTheme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29,29,29,0.8)",
      white: "#fff",
      black: "#212529",
      helper: "#8490ff",
      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  const darkTheme = {
    colors: {
      heading: "#ffffff",
      text: "#ffffff",
      white: "#1a1d21",
      black: "#0d0f12",
      helper: "#8ab4f8",
      bg: "#0e1114",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(255, 255, 255, 0.12)",
      hr: "#2a2e33",
      gradient:
        "linear-gradient(0deg, rgb(57 67 180) 0%, rgb(98 189 252) 100%)",
      shadow: "rgba(0, 0, 0, 0.6) 0px 8px 24px, rgba(0, 0, 0, 0.4) 0px 2px 8px",
      shadowSupport: "rgba(0, 0, 0, 0.4) 0px 4px 16px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
      />
      <Router>
        <GlobalStyle />
        <Header themeMode={themeMode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/singleProduct/:id" element={<SingleProduct />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute user={user}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute user={user}>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failure" element={<PaymentFailure />} />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute user={user}>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ChatbotWidget />
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;

// Create Protected Route Function
export const ProtectedRoute = ({ user, children }) => {
  if (user) {
    return children;
  } else {
    toast.error("Log in to visit cart page!");
    return <Navigate to="/login" />;
  }
};
