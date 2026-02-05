import React from "react";
import { NavLink } from "react-router-dom";
import { FaDiscord, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import { Button } from "../styles/Button";

const Footer = () => {
  return (
    <footer className="bg-slate-900 pt-24 pb-12 mt-auto">
      <div className="container">
        {/* Newsletter Section - Floating Card */}
        <div className="relative -top-32 bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 transform hover:-translate-y-1 transition-transform duration-300">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              Ready to get started?
            </h3>
            <p className="text-slate-500">Talk to us today</p>
          </div>
          <div className="flex gap-4">
            <NavLink to="/contact">
              <Button className="btn">Get Started</Button>
            </NavLink>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 -mt-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-2xl font-bold">Healthy Living</h3>
            <p className="text-slate-400 text-base leading-relaxed">
              Premium organic products for your holistic wellness journey.
              Sourced from the Himalayas.
            </p>
          </div>

          {/* Subscribe Column */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-2xl font-bold">Stay Updated</h3>
            <p className="text-slate-400 text-base">
              Subscribe to get important updates
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="YOUR E-MAIL"
                className="w-full py-3 px-4 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <input
                type="submit"
                value="Subscribe"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-indigo-700 font-bold text-sm uppercase tracking-wide transition-colors"
              />
            </form>
          </div>

          {/* Social Column */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-2xl font-bold">Follow Us</h3>
            <div className="flex gap-6">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all duration-300"
              >
                <FaDiscord className="text-xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-white hover:bg-pink-600 hover:border-pink-600 transition-all duration-300"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300"
              >
                <FaFacebook className="text-xl" />
              </a>
            </div>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-2xl font-bold">Call Us</h3>
            <a
              href="tel:+9112345678978"
              className="text-white text-xl hover:text-indigo-400 transition-colors font-medium"
            >
              +977 9800000000
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            @{new Date().getFullYear()} Healthy Living Nepal. All Rights
            Reserved
          </p>
          <div className="flex gap-8">
            <NavLink
              to="/privacy"
              className="text-slate-500 hover:text-white text-sm uppercase transition-colors"
            >
              Privacy Policy
            </NavLink>
            <NavLink
              to="/terms"
              className="text-slate-500 hover:text-white text-sm uppercase transition-colors"
            >
              Terms & Conditions
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
