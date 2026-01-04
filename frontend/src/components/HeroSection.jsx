import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { FaRocket } from "react-icons/fa";
// import duke from "../images/duke.png";

const HeroSection = ({ myData }) => {
  const { name, description } = myData;

  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          <div className="hero-section-data">
            <p className="intro-data">Welcome to </p>
            <h2> {name} </h2>
            <p>{description}</p>
            <NavLink to="/products">
              <Button>show now</Button>
            </NavLink>
            <div className="rocket">
              <FaRocket />
            </div>
          </div>
          <div className="hero-section-image">
            <figure>
              <img
                src="https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="hero-section"
                className="img-style"
              />
            </figure>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 12rem 0;

  img {
    min-width: 10rem;
    height: 10rem;
  }

  .hero-section-data {
    p {
      margin: 2rem 0;
    }

    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }

    .intro-data {
      margin-bottom: 0;
    }
    .rocket {
      margin-top: 1.6rem;
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.helper};
      animation: fly 3s ease-in-out infinite;
    }
    @keyframes fly {
      0% { transform: translateY(0) rotate(-10deg); }
      50% { transform: translateY(-10px) rotate(0deg); }
      100% { transform: translateY(0) rotate(-10deg); }
    }
  }

  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  figure {
    position: relative;
  }
  .img-style {
    width: 100%;
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 10rem;
    }

    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: rgba(81, 56, 238, 0.4);
    }
  }
`;

export default HeroSection;
