import { useProductContext } from "../context/productContext";
import Product from "./Product";
import React, { useEffect, useRef, useState } from "react";

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
    return <div>...Loading</div>;
  }

  return (
    <section className="py-[9rem] bg-[#F6F8FA] dark:bg-gray-900">
      <div className="max-w-[120rem] mx-auto px-[3.2rem]">
        <div className="text-[#8490ff] uppercase mb-0">Check Now!</div>
        <div className="text-[3.8rem] font-semibold mb-[6rem] capitalize text-[#1d1d1d] dark:text-white">
          Our Featured Products
        </div>
        <div
          className="relative mt-[2rem] bg-white dark:bg-gray-800 rounded-[1.2rem] py-[1rem] shadow-sm"
          aria-label="Featured products"
        >
          <button
            className="absolute top-1/2 -translate-y-1/2 left-[-1.6rem] border-none bg-white/85 text-[#1d1d1d] shadow-md w-[4rem] h-[4rem] rounded-full cursor-pointer text-[2rem] z-10 flex items-center justify-center hover:bg-white transition-all"
            onClick={() =>
              trackRef.current.scrollBy({
                left: -trackRef.current.clientWidth,
                behavior: "smooth",
              })
            }
            aria-label="Previous slide"
          >
            ‹
          </button>
          <div
            className="grid grid-flow-col auto-cols-[100%] overflow-x-auto snap-x snap-mandatory scrollbar-hide h-[40rem] no-scrollbar"
            ref={trackRef}
            style={{ scrollbarWidth: "none" }}
          >
            {featureProducts.map((curElem) => (
              <div
                className="snap-start p-[2rem] flex items-center justify-center"
                key={curElem.id}
              >
                <div className="w-[90%] max-w-[100rem] scale-[1.02]">
                  <Product {...curElem} />
                </div>
              </div>
            ))}
          </div>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-[-1.6rem] border-none bg-white/85 text-[#1d1d1d] shadow-md w-[4rem] h-[4rem] rounded-full cursor-pointer text-[2rem] z-10 flex items-center justify-center hover:bg-white transition-all"
            onClick={() =>
              trackRef.current.scrollBy({
                left: trackRef.current.clientWidth,
                behavior: "smooth",
              })
            }
            aria-label="Next slide"
          >
            ›
          </button>
          <div
            className="absolute bottom-[1rem] left-1/2 -translate-x-1/2 flex gap-[0.6rem]"
            role="tablist"
            aria-label="Slide pagination"
          >
            {featureProducts.map((_, i) => (
              <button
                key={i}
                className={`w-[0.8rem] h-[0.8rem] rounded-full border-none cursor-pointer ${i === index ? "bg-[#8490ff]" : "bg-gray-300"}`}
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
