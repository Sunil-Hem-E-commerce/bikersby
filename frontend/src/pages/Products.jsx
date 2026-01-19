import React from "react";
import FilterSection from "../components/FilterSection";
import ProductList from "../components/ProductList";
import Sort from "../components/Sort";
// import { useFilterContext } from "../context/filter_context";

const Product = () => {
  return (
    <section>
      <div className="max-w-[120rem] mx-auto px-[3.2rem] grid grid-cols-[0.2fr_1fr] gap-[2rem] max-md:grid-cols-1">
        <div>
          <FilterSection />
        </div>

        <section className="product-view--sort">
          <div className="sort-filter">
            <Sort />
          </div>
          <div className="main-product">
            <ProductList />
          </div>
        </section>
      </div>
    </section>
  );
};

export default Product;
