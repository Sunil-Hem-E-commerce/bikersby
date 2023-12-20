import axios from "axios";

const baseUrl = "/api/cart/";

const addToCart = async (cart) => {
  const response = await axios.post(baseUrl, cart, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
