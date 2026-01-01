import FeatureProduct from "../components/FeatureProduct";
import HeroSection from "../components/HeroSection";
import Services from "../components/Services";
import Trusted from "../components/Trusted";

const Home = () => {
  const data = {
    name: "Healthy Living Nepal",
    description:
      "Holistic wellness and healthy living are considered as the best methods of preventive healthcare globally. In Nepal, the demand for high-end, effective and world-class products that help to enhance the quality of life has increased manifold in the last few years.",
  };

  return (
    <>
      <HeroSection myData={data} />
      <FeatureProduct />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
