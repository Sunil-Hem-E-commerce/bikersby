import FormatPrice from "../Helpers/FormatPrice";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";

const CartItem = ({ id, name, image, price, color, qty }) => {
  const { removeItem, setIncrement, setDecrease } = useCartContext();

  return (
    <div className="grid grid-cols-[repeat(4,1fr)_0.3fr] text-center items-center">
      <div className="flex justify-start items-center gap-[2.4rem]">
        <div>
          <figure>
            <img src={image} alt={id} className="w-[8rem] h-[5rem] object-cover" />
          </figure>
        </div>
        <div>
          <p>{name}</p>
          <div className="flex items-center gap-[1rem]">
            <p>color:</p>
            <div
              className="w-[1.4rem] h-[1.4rem] rounded-full"
              style={{ backgroundColor: color, color: color }}
            ></div>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="hidden md:block">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>

      {/* Quantity */}
      <CartAmountToggle
        qty={qty}
        setDecrease={() => setDecrease(id)}
        setIncrease={() => setIncrement(id)}
      />

      {/* SubTotal */}
      <div className="hidden md:block">
        <p>
          <FormatPrice price={price * qty} />
        </p>
      </div>

      {/* Delete */}
      <div>
        <FaTrash className="text-[2rem] text-[#e74c3c] cursor-pointer hover:text-[#c0392b] transition-colors" onClick={() => removeItem(id)} />
      </div>
    </div>
  );
};

export default CartItem;
