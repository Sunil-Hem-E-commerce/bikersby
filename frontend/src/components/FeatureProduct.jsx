import { useProductContext } from "../context/productContext";
import styled from "styled-components";
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
    <Wrapper className="section">
      <div className="container">
        <div className="intro-data">Check Now!</div>
        <div className="common-heading">Our Featured Products</div>
        <div className="carousel" aria-label="Featured products">
          <button
            className="nav prev"
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
          <div className="track" ref={trackRef}>
            {featureProducts.map((curElem) => (
              <div className="slide" key={curElem.id}>
                <div className="slide-inner">
                  <Product {...curElem} />
                </div>
              </div>
            ))}
          </div>
          <button
            className="nav next"
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
          <div className="dots" role="tablist" aria-label="Slide pagination">
            {featureProducts.map((_, i) => (
              <button
                key={i}
                className={i === index ? "dot active" : "dot"}
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
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;
  background-color: ${({ theme }) => theme.colors.bg};

  .container {
    max-width: 120rem;
  }

  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 90%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
    }

    .caption {
      position: absolute;
      top: 15%;
      right: 10%;
      text-transform: uppercase;
      background-color: ${({ theme }) => theme.colors.bg};
      color: ${({ theme }) => theme.colors.helper};
      padding: 0.8rem 2rem;
      font-size: 1.2rem;
      border-radius: 2rem;
    }
  }

  .carousel {
    position: relative;
    margin-top: 2rem;
    background: ${({ theme }) => theme.colors.gradient};
    border-radius: 1.2rem;
    padding: 1rem 0;
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
  }
  .track {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 100%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    height: 40rem;
  }
  .track::-webkit-scrollbar {
    display: none;
  }
  .slide {
    scroll-snap-align: start;
    padding: 2rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .slide-inner {
    width: 90%;
    max-width: 100rem;
    transform: scale(1.02);
  }
  .nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: rgba(255, 255, 255, 0.85);
    color: ${({ theme }) => theme.colors.text};
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    cursor: pointer;
    font-size: 2rem;
  }
  .nav.prev {
    left: -1.6rem;
  }
  .nav.next {
    right: -1.6rem;
  }
  .dots {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.6rem;
  }
  .dot {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    border: none;
    cursor: pointer;
  }
  .dot.active {
    background: #fff;
  }

  .card {
    background-color: #fff;
    border-radius: 1rem;

    .card-data {
      padding: 0 2rem;
    }

    .card-data-flex {
      margin: 2rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h3 {
      color: ${({ theme }) => theme.colors.text};
      text-transform: capitalize;
    }

    .card-data--price {
      color: ${({ theme }) => theme.colors.helper};
    }

    .btn {
      margin: 2rem auto;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(98 84 243);
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: rgb(98 84 243);
      }

      &:hover a {
        color: #fff;
      }
      a {
        color: rgb(98 84 243);
        font-size: 1.4rem;
      }
    }
  }
`;

export default FeatureProduct;
