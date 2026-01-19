import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { addUser } from "../services/user";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [register, setRegister] = useState({
    email: "",
    username: "",
    password: "",
    role_id: "",
  });
  const [uiMsg, setUiMsg] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addUser({
        username: register.username,
        email: register.email,
        password: register.password,
      });
      if (response && response.status === 201) {
        toast.success("User Registered Successfully !");
        setUiMsg({
          type: "success",
          text: "Registration successful. Please check your email to verify your account.",
        });
        navigate("/login");
      } else {
        const msg = "Registration failed. Please try again.";
        toast.error(msg);
        setUiMsg({ type: "error", text: msg });
      }
    } catch (error) {
      const msg =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Error occurred. Please try again.";
      toast.error(msg);
      setUiMsg({ type: "error", text: msg });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/80 dark:bg-slate-900/80 shadow-xl border border-slate-200 dark:border-slate-700 backdrop-blur">
        <div className="px-8 pt-8 pb-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400 mb-3">
            Create an account
          </h2>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-4">
            Join Healthy Living and start your wellness journey today.
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
                htmlFor="username"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Full Name
              </label>
              <input
                type="text"
                value={register.username}
                name="username"
                onChange={handleChange}
                required
                className="block w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Email
              </label>
              <input
                type="email"
                value={register.email}
                name="email"
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
                  value={register.password}
                  name="password"
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
              className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900"
            >
              Create account
            </button>
          </form>
          <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Log in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
