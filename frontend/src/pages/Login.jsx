import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useUserContext } from "../context/user_context";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../services/login";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import axios from "axios";

const LoginForm = () => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [signin, setSignin] = useState({
    email: "",
    password: "",
    role_id: "",
  });
  const [uiMsg, setUiMsg] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setSignin({ ...signin, [e.target.name]: e.target.value });
  };

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.defer = true;
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });

  const handleGoogleSignIn = async () => {
    try {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId) {
        toast.error("Google Client ID not configured");
        return;
      }
      await loadScript("https://accounts.google.com/gsi/client");
      // Use Google Identity Services to get ID Token
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response) => {
          const idToken = response.credential;
          if (!idToken) {
            toast.error("Google sign-in failed");
            return;
          }
          try {
            const res = await axios.post("/api/login/google", { idToken });
            const payload = {
              email: res.data.email,
              accessToken: res.data.accessToken,
              id: res.data.user?.id,
            };
            setUser(payload);
            localStorage.setItem("loggedInUser", JSON.stringify(payload));
            toast.success("Logged in with Google!");
            navigate("/");
          } catch (err) {
            const msg =
              err?.response?.data?.error ||
              err?.response?.data?.message ||
              "Google login failed.";
            toast.error(msg);
          }
        },
      });
      window.google.accounts.id.prompt();
    } catch (e) {
      toast.error("Unable to load Google SDK");
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const appId = import.meta.env.VITE_FACEBOOK_APP_ID;
      if (!appId) {
        toast.error("Facebook App ID not configured");
        return;
      }
      await loadScript("https://connect.facebook.net/en_US/sdk.js");
      window.fbAsyncInit = function () {
        window.FB.init({
          appId,
          cookie: true,
          xfbml: false,
          version: "v16.0",
        });
        window.FB.login(
          async (response) => {
            if (response.authResponse) {
              try {
                const accessToken = response.authResponse.accessToken;
                const res = await axios.post("/api/login/facebook", {
                  accessToken,
                });
                const payload = {
                  email: res.data.email,
                  accessToken: res.data.accessToken,
                  id: res.data.user?.id,
                };
                setUser(payload);
                localStorage.setItem("loggedInUser", JSON.stringify(payload));
                toast.success("Logged in with Facebook!");
                navigate("/");
              } catch (err) {
                const msg =
                  err?.response?.data?.error ||
                  err?.response?.data?.message ||
                  "Facebook login failed.";
                toast.error(msg);
              }
            } else {
              toast.error("Facebook login cancelled");
            }
          },
          { scope: "email" },
        );
      };
    } catch (e) {
      toast.error("Unable to load Facebook SDK");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({
        email: signin.email,
        password: signin.password,
      });
      if (response.status === 200) {
        const payload = {
          email: response.data.email,
          accessToken: response.data.accessToken,
          id: response.data.user?.id,
        };
        setUser(payload);
        localStorage.setItem("loggedInUser", JSON.stringify(payload));
        toast.success("User Logged In successfully!");
        setUiMsg({ type: "success", text: "Welcome back! You're logged in." });
        navigate("/");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Login failed. Please check your email and password.";
      toast.error(msg);
      setUiMsg({ type: "error", text: msg });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/80 dark:bg-slate-900/80 shadow-xl border border-slate-200 dark:border-slate-700 backdrop-blur">
        <div className="px-8 pt-8 pb-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400 mb-3">
            Welcome back
          </h2>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-4">
            Sign in to continue your healthy lifestyle journey.
          </p>
          {uiMsg.text ? (
            <div
              className={`mb-4 rounded-lg px-3 py-2 text-sm border ${
                uiMsg.type === "success"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-rose-50 text-rose-700 border-rose-200"
              }`}
            >
              {uiMsg.text}
            </div>
          ) : null}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={signin.email}
                onChange={handleChange}
                required
                className="block w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={signin.password}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 pr-10 text-sm text-slate-900 dark:text-slate-100 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="mt-1 inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900"
            >
              Login
            </button>
          </form>
          <div className="mt-5">
            <div className="flex items-center text-xs text-slate-400 uppercase tracking-wide">
              <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
              <span className="px-3">or continue with</span>
              <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-100 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                onClick={handleGoogleSignIn}
              >
                <span className="text-red-500">
                  <FaGoogle />
                </span>
                <span>Google</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-100 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                onClick={handleFacebookSignIn}
              >
                <span className="text-blue-600">
                  <FaFacebook />
                </span>
                <span>Facebook</span>
              </button>
            </div>
          </div>
          <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
            New here?{" "}
            <NavLink
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Create an account
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
