import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <section>
        <section className="max-w-[60vw] mx-auto p-20 bg-[#F6F8FA] dark:bg-gray-800 rounded-[1rem] shadow-lg translate-y-1/2 max-md:max-w-[80vw] max-md:my-[4.8rem] max-md:mx-auto max-md:translate-y-0 max-md:text-center transition-all duration-300">
          <div className="grid grid-cols-2 gap-[9rem] max-md:grid-cols-1 max-md:gap-[3.2rem] items-center">
            <div>
              <h3 className="text-[1.8rem] font-medium mb-2 dark:text-white">
                Ready to get started?
              </h3>
              <h3 className="text-[1.8rem] font-medium dark:text-white">
                Talk to us today
              </h3>
            </div>

            <div className="justify-self-end max-md:justify-self-center">
              <NavLink to="/">
                <Button>Get Started</Button>
              </NavLink>
            </div>
          </div>
        </section>

        <footer className="pt-[14rem] pb-[9rem] bg-[#071029] max-md:pt-[9rem]">
          <div className="max-w-[120rem] mx-auto px-[3.2rem] grid grid-cols-4 gap-[9rem] max-md:grid-cols-1 max-md:gap-[3.2rem]">
            <div className="flex flex-col gap-4">
              <h3 className="text-[1.8rem] font-semibold mb-[2.4rem] text-white">
                Healthy Living
              </h3>
              <p className="text-white text-[1.65rem] leading-[1.5]">
                Healthy Living Nepal brings a wide range of health and wellness
                solutions to enhance the quality of people’s lives.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-[1.8rem] font-semibold mb-[2.4rem] text-white">
                Subscribe to get important updates
              </h3>
              <form action="#" className="flex flex-col gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="YOUR E-MAIL"
                  autoComplete="off"
                  className="max-w-[50rem] px-[2.4rem] py-[1.6rem] border border-gray-300 rounded-[0.8rem] shadow-sm"
                />

                <input
                  type="submit"
                  value="subscribe"
                  className="max-w-[16rem] mt-[2rem] bg-[rgb(98,84,243)] text-white px-[2.2rem] py-[1.4rem] border border-[rgb(98,84,243)] uppercase text-[1.8rem] cursor-pointer hover:bg-white hover:text-[rgb(98,84,243)] transition-all duration-300"
                />
              </form>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-[1.8rem] font-semibold mb-[2.4rem] text-white">
                Follow Us
              </h3>
              <div className="flex gap-[2rem]">
                <div className="p-[1rem] rounded-full border-2 border-white flex items-center justify-center cursor-pointer transition-all hover:bg-white group">
                  <a href="https://discord.com" target="blank">
                    <FaDiscord className="text-[2.4rem] text-white group-hover:text-[#071029]" />
                  </a>
                </div>
                <div className="p-[1rem] rounded-full border-2 border-white flex items-center justify-center cursor-pointer transition-all hover:bg-white group">
                  <a href="https://www.instagram.com" target="blank">
                    <FaInstagram className="text-[2.4rem] text-white group-hover:text-[#071029]" />
                  </a>
                </div>
                <div className="p-[1rem] rounded-full border-2 border-white flex items-center justify-center cursor-pointer transition-all hover:bg-white group">
                  <a href="https://www.youtube.com" target="blank">
                    <FaYoutube className="text-[2.4rem] text-white group-hover:text-[#071029]" />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-[1.8rem] font-semibold mb-[2.4rem] text-white">
                Call Us
              </h3>
              <h3 className="text-[1.8rem] font-medium text-white">
                +977 9860471144
              </h3>
              <h3 className="text-[1.8rem] font-medium text-white">
                +977 9867438444
              </h3>
            </div>
          </div>

          <div className="pt-[9rem] max-md:pt-[4.8rem]">
            <hr className="mb-[2rem] border-gray-600 h-[1px]" />
            <div className="max-w-[120rem] mx-auto px-[3.2rem] grid grid-cols-2 gap-[9rem] max-md:grid-cols-1 max-md:gap-[3.2rem]">
              <p className="text-white text-[1.65rem]">
                @{new Date().getFullYear()} Healthy Living Nepal. All Rights
                Reserved
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-white text-[1.65rem]">PRIVACY POLICY</p>
                <p className="text-white text-[1.65rem]">TERMS & CONDITIONS</p>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};

export default Footer;
