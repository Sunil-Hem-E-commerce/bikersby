import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { FaRocket } from "react-icons/fa";

const HeroSection = ({ myData }) => {
  const { name, description } = myData;

  return (
    <section className="pt-[15rem] pb-[10rem] md:pt-[18rem] md:pb-[12rem] bg-gradient-to-br from-[#f8fafc] via-white to-indigo-50/50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="flex flex-col justify-center items-start animate-fade-in-up">
            <p className="text-indigo-600 font-bold tracking-wider uppercase mb-4 text-[1.4rem] bg-indigo-50 px-4 py-1 rounded-full">
              Welcome to Healthy Living
            </p>
            <h1 className="text-[4rem] md:text-[6rem] font-extrabold capitalize text-slate-900 dark:text-white leading-[1.1] mb-6 drop-shadow-sm">
              {name}
            </h1>
            <p className="mb-10 text-[1.8rem] text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {description}
            </p>
            <div className="flex gap-6 items-center">
              <NavLink to="/products">
                <Button className="btn shadow-xl shadow-indigo-200">Shop Now</Button>
              </NavLink>
              <div className="text-[2.4rem] text-indigo-500 animate-bounce">
                <FaRocket />
              </div>
            </div>
          </div>
          
          <div className="relative group perspective-1000">
            <div className="absolute inset-0 bg-indigo-500/10 rounded-3xl transform rotate-3 scale-105 transition-transform group-hover:rotate-6"></div>
            <figure className="relative z-10 overflow-hidden rounded-3xl shadow-2xl transition-transform transform group-hover:-translate-y-2 duration-500">
              <img
                src="https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="hero-section"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
