import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import CartAmountToggle from "./CartAmountToggle";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { useCartContext } from "../context/cart_context";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();

  const { id, colors, stock } = product;

  const [color, setColor] = useState(colors[0]);
  const [qty, setQty] = useState(1);

  const setDecrease = () => {
    setQty((prevqty) => (prevqty > 1 ? prevqty - 1 : 1));
  };

  const setIncrease = () => {
    setQty((prevqty) => (prevqty < stock ? prevqty + 1 : stock));
  };

  const handleAddToCart = () => {
    addToCart(id, qty, color, product);
  };

  return (
    <section>
      <div className="flex justify-start items-center">
        <p className="flex items-center">
          Color:
          {colors.map((curColor, index) => {
            return (
              <button
                key={index}
                style={{ backgroundColor: curColor }}
                className={`w-[2rem] h-[2rem] rounded-full ml-[1rem] border-none outline-none cursor-pointer hover:opacity-100 ${
                  color === curColor ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => setColor(curColor)}
              >
                {color === curColor ? (
                  <FaCheck className="text-[1rem] text-white mx-auto" />
                ) : null}
              </button>
            );
          })}
        </p>
      </div>

      {/* add to cart  */}
      <CartAmountToggle
        qty={qty}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />

      <NavLink to="/cart" onClick={handleAddToCart}>
        <Button className="btn">Add To Cart</Button>
      </NavLink>
    </section>
  );
};

export default AddToCart;
