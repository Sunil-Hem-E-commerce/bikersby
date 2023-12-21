import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";
import cartService from "../services/cart";

const CartContext = createContext();

const getUserCart = () => {
  let localCartData = localStorage.getItem("localCartData");
  if (!localCartData || localCartData === "[]") {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};

const initialState = {
  cart: getUserCart(),
  total_item: 0,
  total_price: 0,
  shipping_fee: 50000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = async (id, qty, color, product) => {
    await cartService.addToCart(id, qty);
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, qty, color, product },
    });
  };

  //! Increment or Decrement the product
  const setDecrease = async (id) => {
    await cartService.decCart(id);
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  const setIncrement = async (id) => {
    await cartService.incCart(id);
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  const removeItem = async (id) => {
    await cartService.removeCartItem(id);
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  //! To clear the Cart
  const clearCart = async () => {
    await cartService.delCart();
    dispatch({ type: "CLEAR_CART" });
  };

  //! Add the data in localStorage
  useEffect(() => {
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });
    localStorage.setItem("localCartData", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrement,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
