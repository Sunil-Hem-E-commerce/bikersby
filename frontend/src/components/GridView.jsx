import React from "react";
import Product from "./Product";

const GridView = ({ products }) => {
  return (
    <section className="py-[9rem]">
      <div className="max-w-[120rem] mx-auto grid grid-cols-3 gap-[3.2rem] max-md:grid-cols-1">
        {products.map((curElem) => {
          return <Product key={curElem.id} {...curElem} />;
        })}
      </div>
    </section>
  );
};

export default GridView;
