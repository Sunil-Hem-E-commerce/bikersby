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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect } from "react";
import { useUserContext } from "../src/context/user_context";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29,29,29,0.8)",
      white: "#fff",
      black: "#212529",
      helper: "#8490ff",
      bg: "#F6F8FA",
      footer_bg: "0a1435",
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

  return (
    <ThemeProvider theme={theme}>
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
        <Header />
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
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
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
