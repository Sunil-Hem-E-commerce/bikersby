import React from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";

import { useFilterContext } from "../context/filter_context";

const Sort = () => {
  const { filter_products, grid_view, setGridView, setListView, sorting } =
    useFilterContext();
  return (
    <section className="flex justify-between mt-[5rem] max-md:flex-col max-md:gap-[2rem] max-md:items-center">
      <div className="flex gap-[2rem]">
        <button
          className={
            grid_view
              ? "py-[0.8rem] px-[1rem] border-none flex justify-center items-center cursor-pointer bg-black text-white"
              : "py-[0.8rem] px-[1rem] border-none flex justify-center items-center cursor-pointer bg-[#F6F8FA]"
          }
          onClick={setGridView}
        >
          <BsFillGridFill className="text-[1.6rem]" />
        </button>

        <button
          className={
            !grid_view
              ? "py-[0.8rem] px-[1rem] border-none flex justify-center items-center cursor-pointer bg-black text-white"
              : "py-[0.8rem] px-[1rem] border-none flex justify-center items-center cursor-pointer bg-[#F6F8FA]"
          }
          onClick={setListView}
        >
          <BsList className="text-[1.6rem]" />
        </button>
      </div>
      <div className="product-data">
        <p>{`${filter_products.length} Product Available`}</p>
      </div>
      <div className="sort-section">
        <form action="#">
          <label htmlFor="sort"> {}</label>
          <select
            name="sort"
            id="sort"
            className="p-[0.5rem] cursor-pointer border border-gray-200 rounded-[0.5rem] outline-none"
            onClick={sorting}
          >
            <option value="lowest">Price(Lowest)</option>
            <option value="#" disabled></option>
            <option value="highest">Price(Highest)</option>
            <option value="#" disabled></option>
            <option value="a-z">Price(a-z)</option>
            <option value="#" disabled></option>
            <option value="z-a">Price(z-a)</option>
          </select>
        </form>
      </div>
    </section>
  );
};

export default Sort;
