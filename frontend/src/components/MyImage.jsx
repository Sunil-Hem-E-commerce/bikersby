import React, { useState } from "react";

const MyImage = ({ imgs = [{ url: "" }] }) => {
  const [mainImage, setMainImage] = useState(imgs[0]);

  return (
    <section className="grid grid-cols-[0.4fr_1fr] gap-[1rem] max-md:flex max-md:flex-col">
      <div className="grid grid-cols-1 grid-rows-4 gap-[1rem] w-full justify-items-center items-center max-md:grid-cols-4 max-md:grid-rows-1">
        {imgs.map((curElm, index) => {
          return (
            <figure key={index}>
              <img
                src={curElm.url}
                alt={curElm.filename}
                className="max-w-full max-h-full bg-cover object-contain cursor-pointer shadow-md"
                onClick={() => setMainImage(curElm)}
                aria-hidden="true"
              />
            </figure>
          );
        })}
      </div>
      {/* 2nd column  */}

      <div className="grid place-items-center order-1">
        <img 
          src={mainImage.url} 
          alt={mainImage.filename} 
          className="max-w-full h-auto shadow-md"
        />
      </div>
    </section>
  );
};

export default MyImage;
