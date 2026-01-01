import HeroSection from "../components/HeroSection";
import { useProductContext } from "../context/productContext";

const About = () => {
  const { myName } = useProductContext();

  const data = {
    name: "Healthy Living Nepal",
    description: (
      <>
        <p>
          Holistic wellness and healthy living are considered as the best
          methods of preventive healthcare globally. In Nepal, the demand for
          high-end, effective and world-class products that help to enhance the
          quality of life has increased manifold in the last few years. Due to
          this, Healthy Living, an ethical direct selling company brings a wide
          range of health and wellness solutions to enhance the quality of
          people’s lives.
        </p>
        <br />
        <p>
          Healthy Living is an organisation that aims at spreading holistic
          wellness throughout Nepal with the help of world-class health,
          wellness, personal care, cosmetics and other products from different
          categories that are manufactured in GMP and ISO-certified
          state-of-the-art manufacturing facilities, these products are of
          superior quality and they exalt the consumer experience.
        </p>
        <br />
        <p>
          Striving to enhance the consumer experience, Healthy Living is a
          responsive and extremely responsible organisation. The focus of the
          company is in providing excellent support and service to every
          consumer and ensure they can celebrate the joy of living a healthy
          life with everyone in society.
        </p>
      </>
    ),
  };

  return (
    <>
      {myName}
      <HeroSection myData={data} />
    </>
  );
};

export default About;
