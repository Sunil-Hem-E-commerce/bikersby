import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { FaRocket } from "react-icons/fa";

const HeroSection = ({ myData }) => {
  const { name, description } = myData;

  return (
    <section className="py-[12rem] max-md:py-[6rem] bg-[#F6F8FA] dark:bg-gray-900">
      <div className="max-w-[120rem] mx-auto px-[3.2rem]">
        <div className="grid grid-cols-2 gap-[9rem] max-md:grid-cols-1 max-md:gap-[10rem] items-center">
          <div className="flex flex-col justify-center">
            <p className="mb-0 text-[#8490ff] uppercase font-medium">
              Welcome to{" "}
            </p>
            <h2 className="text-[4.4rem] font-bold capitalize text-[#1d1d1d] dark:text-white my-[1rem]">
              {" "}
              {name}{" "}
            </h2>
            <p className="my-[2rem] text-[1.65rem] text-[#1d1d1d] dark:text-white leading-relaxed">
              {description}
            </p>
            <NavLink to="/products">
              <Button>show now</Button>
            </NavLink>
            <div className="mt-[1.6rem] text-[2.4rem] text-[#8490ff] animate-bounce">
              <FaRocket />
            </div>
          </div>
          <div className="w-full h-auto flex justify-center items-center relative">
            <figure className="relative w-full max-md:after:content-[''] max-md:after:absolute max-md:after:w-1/2 max-md:after:h-full max-md:after:left-0 max-md:after:top-[10%] max-md:after:bg-[#5138ee]/40 max-md:after:z-[-1]">
              <img
                src="https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="hero-section"
                className="w-full h-auto min-w-[10rem] rounded-lg shadow-lg"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
