import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";

const Product = (curElem) => {
  const { id, name, image, price, category } = curElem;
  return (
    <NavLink to={`/singleproduct/${id}`}>
      <div className="card bg-white dark:bg-gray-800 rounded-[1rem] overflow-hidden shadow-sm hover:shadow-md transition-all group">
        <figure className="relative overflow-hidden w-auto flex justify-center items-center after:content-[''] after:absolute after:top-0 after:left-0 after:w-0 after:h-full after:bg-black/50 after:transition-all after:duration-200 after:cursor-pointer hover:after:w-full">
          <img 
            src={image} 
            alt={name} 
            className="max-w-[90%] mt-[1.5rem] h-[20rem] object-cover transition-transform duration-200 group-hover:scale-120" 
          />
          <figcaption className="absolute top-[15%] right-[10%] uppercase bg-[#F6F8FA] dark:bg-gray-900 text-[#8490ff] py-[0.8rem] px-[2rem] text-[1.2rem] rounded-[2rem]">
            {category}
          </figcaption>
        </figure>

        <div className="p-[2rem]">
          <div className="flex justify-between items-center my-[2rem]">
            <h3 className="text-[1.8rem] font-medium capitalize text-[#1d1d1d] dark:text-white">{name}</h3>
            <p className="text-[#8490ff]">{<FormatPrice price={price} />}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;
