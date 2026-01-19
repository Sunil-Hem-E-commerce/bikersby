import FeatureProduct from "../components/FeatureProduct";
import HeroSection from "../components/HeroSection";
import Services from "../components/Services";
import Trusted from "../components/Trusted";
import { FaWhatsapp } from "react-icons/fa";

const Home = () => {
  const data = {
    name: "Healthy Living Nepal",
    description:
      "Holistic wellness and healthy living are considered as the best methods of preventive healthcare globally. In Nepal, the demand for high-end, effective and world-class products that help to enhance the quality of life has increased manifold in the last few years.",
  };

  const openWhatsApp = () => {
    const phone = "9779800000000";
    const message = encodeURIComponent("Hello! I’d like to know more.");
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <HeroSection myData={data} />
      <FeatureProduct />
      <Services />
      <Trusted />
      <button
        onClick={openWhatsApp}
        aria-label="Chat on WhatsApp"
        className="fixed right-8 bottom-8 w-[5.2rem] h-[5.2rem] rounded-full border-none flex items-center justify-center text-[2.4rem] cursor-pointer bg-[#25d366] text-white shadow-md transition-all duration-200 ease-in-out z-[1000] hover:-translate-y-0.5 hover:shadow-lg"
      >
        <FaWhatsapp />
      </button>
    </>
  );
};

export default Home;
