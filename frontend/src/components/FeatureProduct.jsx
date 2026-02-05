import { useProductContext } from "../context/productContext";
import Product from "./Product";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const FeatureProduct = () => {
  const { isLoading, featureProducts } = useProductContext();
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || featureProducts.length === 0) return;
    let idx = 0;
    const timer = setInterval(() => {
      idx = (idx + 1) % featureProducts.length;
      setIndex(idx);
      el.scrollTo({
        left: idx * el.clientWidth,
        behavior: "smooth",
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [featureProducts]);

  if (isLoading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-[#f8fafc] dark:bg-gray-900">
      <div className="container">
        <div className="mb-12">
          <p className="text-indigo-600 font-bold uppercase tracking-widest mb-2 text-sm">Check Now!</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white capitalize">
            Our Featured Products
          </h2>
        </div>
        
        <div className="relative group" aria-label="Featured products">
          <button
            className="absolute top-1/2 -translate-y-1/2 left-[-2rem] md:left-[-3rem] w-14 h-14 bg-white text-indigo-600 rounded-full shadow-lg flex items-center justify-center text-2xl z-10 opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-600 hover:text-white hover:scale-110 focus:opacity-100"
            onClick={() =>
              trackRef.current.scrollBy({
                left: -trackRef.current.clientWidth,
                behavior: "smooth",
              })
            }
            aria-label="Previous slide"
          >
            <FaChevronLeft />
          </button>
          
          <div
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-8 pb-12 pt-4"
            ref={trackRef}
            style={{ scrollbarWidth: "none" }}
          >
            {featureProducts.map((curElem) => (
              <div
                className="min-w-full md:min-w-[calc(50%-2rem)] lg:min-w-[calc(33.333%-2rem)] snap-center flex justify-center"
                key={curElem.id}
              >
                <div className="w-full">
                  <Product {...curElem} />
                </div>
              </div>
            ))}
          </div>
          
          <button
            className="absolute top-1/2 -translate-y-1/2 right-[-2rem] md:right-[-3rem] w-14 h-14 bg-white text-indigo-600 rounded-full shadow-lg flex items-center justify-center text-2xl z-10 opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-600 hover:text-white hover:scale-110 focus:opacity-100"
            onClick={() =>
              trackRef.current.scrollBy({
                left: trackRef.current.clientWidth,
                behavior: "smooth",
              })
            }
            aria-label="Next slide"
          >
            <FaChevronRight />
          </button>
          
          <div
            className="flex justify-center gap-3 mt-4"
            role="tablist"
            aria-label="Slide pagination"
          >
            {featureProducts.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === index ? "bg-indigo-600 w-8" : "bg-gray-300 hover:bg-indigo-400"
                }`}
                onClick={() => {
                  setIndex(i);
                  trackRef.current.scrollTo({
                    left: i * trackRef.current.clientWidth,
                    behavior: "smooth",
                  });
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureProduct;
