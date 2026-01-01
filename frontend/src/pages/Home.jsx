import FeatureProduct from "../components/FeatureProduct";
import HeroSection from "../components/HeroSection";
import Services from "../components/Services";
import Trusted from "../components/Trusted";
import styled from "styled-components";
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
      <ChatButton onClick={openWhatsApp} aria-label="Chat on WhatsApp">
        <FaWhatsapp />
      </ChatButton>
    </>
  );
};

export default Home;

const ChatButton = styled.button`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 5.2rem;
  height: 5.2rem;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
  cursor: pointer;
  background-color: #25d366;
  color: #fff;
  box-shadow: ${({ theme }) => theme.colors.shadowSupport};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  z-index: 1000;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.colors.shadow};
  }
`;
