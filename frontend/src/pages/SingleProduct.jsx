import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/productContext";
import PageNavigation from "../components/PageNavigation";
import MyImage from "../components/MyImage";
import FormatPrice from "../Helpers/FormatPrice";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import Star from "../components/Star";
import AddToCart from "../components/AddToCart";

const SingleProduct = () => {
  const { singleProduct, getSingleProduct, isSingleLoading } =
    useProductContext();
  const { id } = useParams();

  const {
    // id: alias,
    name,
    company,
    price,
    description,
    stock,
    stars,
    reviews,
    images,
  } = singleProduct;

  useEffect(() => {
    getSingleProduct(id);
  }, [id]);

  if (isSingleLoading) {
    return <div className="text-[3.2rem] flex justify-center items-center h-screen">Loading.....</div>;
  }

  return (
    <section className="overflow-hidden">
      <PageNavigation title={name} />
      <div className="max-w-[120rem] mx-auto px-[3.2rem] py-[9rem] max-md:px-[2.4rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[5rem]">
          {/* product Images  */}
          <div className="flex items-center justify-center">
            <MyImage imgs={images} />
          </div>

          {/* product dAta  */}
          <div className="flex flex-col items-start justify-center gap-[2rem]">
            <h2 className="text-[3rem] font-bold capitalize">{name}</h2>
            <Star stars={stars} reviews={reviews} />
            
            <p className="font-bold text-[1.6rem]">
              NPR:{" "}
              <del>
                <FormatPrice price={price + 2500} />
              </del>
            </p>
            <p className="font-bold text-[1.6rem] text-[#6254F3]">
              Deal of the Day: <FormatPrice price={price} />
            </p>
            <p className="text-[1.6rem] leading-[2.6rem]">{description}</p>
            
            <div className="w-full flex justify-between items-center border-b border-[#ccc] mb-[1rem] pb-[2rem]">
              <div className="text-center flex flex-col items-center">
                <TbTruckDelivery className="bg-[rgba(220,220,220,0.5)] rounded-full w-[4rem] h-[4rem] p-[0.6rem] mb-[0.5rem]" />
                <p className="text-[1.4rem]">Free Delivery</p>
              </div>

              <div className="text-center flex flex-col items-center">
                <TbReplace className="bg-[rgba(220,220,220,0.5)] rounded-full w-[4rem] h-[4rem] p-[0.6rem] mb-[0.5rem]" />
                <p className="text-[1.4rem]">Satisfaction Guarantee</p>
              </div>

              <div className="text-center flex flex-col items-center">
                <TbTruckDelivery className="bg-[rgba(220,220,220,0.5)] rounded-full w-[4rem] h-[4rem] p-[0.6rem] mb-[0.5rem]" />
                <p className="text-[1.4rem]">Healthy Living Delivered </p>
              </div>

              <div className="text-center flex flex-col items-center">
                <MdSecurity className="bg-[rgba(220,220,220,0.5)] rounded-full w-[4rem] h-[4rem] p-[0.6rem] mb-[0.5rem]" />
                <p className="text-[1.4rem]">Quality Assurance </p>
              </div>
            </div>

            <div className="flex flex-col gap-[1rem] text-[1.8rem]">
              <p>
                Available:
                <span className="font-bold"> {stock > 0 ? "In Stock" : "Not Available"}</span>
              </p>
              <p>
                ID : <span className="font-bold"> {id} </span>
              </p>
              <p>
                Brand :<span className="font-bold"> {company} </span>
              </p>
            </div>
            <hr className="max-w-full w-[90%] border-[0.1rem] border-[#000] text-red-500" />
            {stock > 0 && <AddToCart product={singleProduct} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
