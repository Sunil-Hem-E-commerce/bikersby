import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";
import { Button } from "../styles/Button";

const ListView = ({ products }) => {
  return (
    <section className="py-[9rem]">
      <div className="max-w-[120rem] mx-auto grid gap-[3.2rem]">
        {products.map((curElem) => {
          const { id, name, image, price, description } = curElem;
          return (
            <div className="border border-gray-300/40 grid grid-cols-2 gap-[3.2rem] items-center p-[2rem] max-md:grid-cols-1" key={curElem.id}>
              <figure className="relative overflow-hidden w-auto flex justify-center items-center group transition-all duration-500">
                <img 
                  src={image} 
                  alt={name} 
                  className="max-w-[90%] mt-[1.5rem] h-[20rem] object-cover transition-all duration-200 group-hover:scale-120"
                />
                <div className="absolute top-0 left-0 w-0 h-full bg-black/50 transition-all duration-200 cursor-pointer group-hover:w-full"></div>
              </figure>

              <div className="p-[2rem]">
                <h3 className="my-[2rem] font-light text-[2.4rem] capitalize">{name}</h3>
                <p>
                  <FormatPrice price={price} />
                </p>
                <p>{description.slice(0, 90)}...</p>

                <NavLink to={`/singleproduct/${id}`} className="btn-main">
                  <Button className="my-[2rem] bg-transparent border border-[#6254F3] text-[#6254F3] hover:bg-[#6254F3] hover:text-white">
                    Read More
                  </Button>
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ListView;
