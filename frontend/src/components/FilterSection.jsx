import React from "react";
import { useFilterContext } from "../context/filter_context";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "../Helpers/FormatPrice";
import { Button } from "../styles/Button";

const FilterSection = () => {
  const {
    filters: { text, category, color, price, minPrice, maxPrice },
    all_products,
    updateFilterValue,
    clearFilters,
  } = useFilterContext();

  //! To get the unique data of each field
  const getUniqueData = (data, attr) => {
    let newVal = data.map((curElem) => {
      return curElem[attr];
    });

    if (attr === "colors") {
      // return (newVal = ["All", ...new Set([].concat(...newVal))]);
      newVal = newVal.flat();
    }
    return (newVal = ["all", ...new Set(newVal)]);
  };

  //! We need a unique data
  const categoryOnlyData = getUniqueData(all_products, "category");
  const companyOnlyData = getUniqueData(all_products, "company");
  const colorsData = getUniqueData(all_products, "colors");

  return (
    <section className="flex flex-col gap-[3rem] py-[5rem]">
      <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            value={text}
            onChange={updateFilterValue}
            placeholder="SEARCH"
            className="px-[1rem] py-[0.6rem] w-[80%]"
          />
        </form>
      </div>
      <div className="filter-category">
        <h3 className="py-[2rem] font-bold">Category</h3>
        <div className="flex flex-col items-start gap-[1.4rem]">
          {categoryOnlyData.map((curElem, index) => {
            return (
              <button
                key={index}
                type="button"
                name="category"
                value={curElem}
                className={`border-none bg-white capitalize cursor-pointer hover:text-[#6254F3] ${
                  curElem === category
                    ? "border-b border-black text-[#6254F3]"
                    : ""
                }`}
                onClick={updateFilterValue}
              >
                {curElem}
              </button>
            );
          })}
        </div>
      </div>
      <div className="filter-company">
        <h3 className="py-[2rem] font-bold">Company</h3>
        <form action="#">
          <select
            name="company"
            id="company"
            className="px-[1.2rem] py-[0.3rem] text-[1.6rem] text-[rgba(29,29,29,0.8)] capitalize"
            value={category}
            onChange={updateFilterValue}
          >
            {companyOnlyData.map((curElem, index) => (
              <option key={index} value={curElem}>
                {curElem}
              </option>
            ))}
          </select>
        </form>
      </div>
      <div className="filter-colors colors">
        <h3 className="py-[2rem] font-bold">Colors</h3>
        <div className="flex justify-center">
          {colorsData.map((curColor, index) => {
            if (curColor === "all") {
              return (
                <button
                  key={index}
                  type="button"
                  value={curColor}
                  name="color"
                  className="bg-transparent capitalize border-none cursor-pointer"
                  onClick={updateFilterValue}
                >
                  all
                </button>
              );
            }
            return (
              <button
                key={index}
                type="button"
                value={curColor}
                name="color"
                style={{ backgroundColor: curColor }}
                className={`w-[2rem] h-[2rem] rounded-full ml-[1rem] border-none outline-none cursor-pointer hover:opacity-100 ${
                  color === curColor ? "opacity-100" : "opacity-50"
                }`}
                onClick={updateFilterValue}
              >
                {color === curColor ? (
                  <FaCheck className="text-[1rem] text-white mx-auto" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="filter_price">
        <h3 className="py-[2rem] font-bold">Price</h3>
        <p>
          <FormatPrice price={price} />
        </p>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          name="price"
          value={price}
          onChange={updateFilterValue}
          className="my-[0.5rem] p-0 shadow-none cursor-pointer"
        />
      </div>

      <div className="filter-clear">
        <Button className="btn bg-[#ec7063] text-white" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </section>
  );
};

export default FilterSection;
