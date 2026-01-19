import { useCartContext } from "../context/cart_context";
import CartItem from "../components/CartItem";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import FormatPrice from "../Helpers/FormatPrice";

const Cart = () => {
  const { cart, clearCart, total_price, shipping_fee } = useCartContext();

  if (cart.length === 0) {
    return (
      <div className="grid place-items-center h-[50vh]">
        <h3 className="text-[4.2rem] capitalize font-light">No Item in Cart</h3>
      </div>
    );
  }
  return (
    <section className="py-[9rem]">
      <div className="max-w-[120rem] mx-auto px-[3.2rem]">
        <div className="grid grid-cols-[repeat(4,1fr)_0.3fr] text-center items-center uppercase max-md:grid-cols-[1.5fr_1fr_0.5fr]">
          <p>Item</p>
          <p className="max-md:hidden">Price</p>
          <p>Quantity</p>
          <p className="max-md:hidden">SubTotal</p>
          <p>Remove</p>
        </div>
        <hr className="mt-[1rem]" />
        <div className="py-[3.2rem] flex flex-col gap-[3.2rem]">
          {cart.map((curElem) => {
            return <CartItem key={curElem.id} {...curElem} />;
          })}
        </div>
        <hr />
        <div className="mt-[2rem] flex justify-between max-md:gap-[2.2rem]">
          <NavLink to="/products">
            <Button>Continue Shopping</Button>
          </NavLink>
          <Button className="bg-[#e74c3c]" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>

        {/* Order total amount */}
        <div className="w-full my-[4.8rem] capitalize flex flex-col justify-end items-end max-md:justify-start max-md:items-start">
          <div className="border border-[#f0f0f0] flex flex-col gap-[1.8rem] p-[3.2rem] max-md:w-full">
            <div className="flex gap-[3.2rem] justify-between">
              <p>subtotal:</p>
              <p className="font-bold text-[#1d1d1d]">
                <FormatPrice price={total_price} />
              </p>
            </div>
            <div className="flex gap-[3.2rem] justify-between">
              <p>Shipping fee:</p>
              <p className="font-bold text-[#1d1d1d]">
                <FormatPrice price={shipping_fee} />
              </p>
            </div>
            <hr />
            <div className="flex gap-[3.2rem] justify-between">
              <p>order total:</p>
              <p className="font-bold text-[#1d1d1d]">
                <FormatPrice price={total_price + shipping_fee} />
              </p>
            </div>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <NavLink to="/checkout">
              <Button>Proceed to Checkout</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
