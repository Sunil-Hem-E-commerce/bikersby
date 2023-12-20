import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";

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
    // axios call here.

    dispatch({
      type: "ADD_TO_CART",
      payload: { id, qty, color, product },
    });
  };

  //! Increment or Decrement the product
  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  const setIncrement = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  //! To clear the Cart
  const clearCart = () => {
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
