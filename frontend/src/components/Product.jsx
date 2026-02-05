import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";
import { FaEye, FaShoppingCart } from "react-icons/fa";

const Product = (curElem) => {
  const { id, name, image, price, category } = curElem;
  return (
    <NavLink to={`/singleproduct/${id}`} className="group block h-full">
      <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-100 dark:border-gray-700">
        <figure className="relative overflow-hidden pt-[75%]">
          <img
            src={image}
            alt={name}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded-full shadow-sm">
            {category}
          </div>

          {/* Hover Overlay Actions */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <div className="bg-white text-slate-800 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-indigo-600 hover:text-white">
              <FaEye />
            </div>
          </div>
        </figure>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold capitalize text-slate-800 dark:text-white line-clamp-2 group-hover:text-indigo-600 transition-colors">
              {name}
            </h3>
          </div>
          <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-indigo-600 font-bold text-xl">
              <FormatPrice price={price} />
            </p>
            <span className="text-sm text-slate-400 group-hover:text-indigo-500 transition-colors">
              View Details &rarr;
            </span>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;
