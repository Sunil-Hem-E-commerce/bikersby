import axios from "axios";

const baseUrl = "/api/cart";

const addToCart = async (id, qty) => {
  const response = await axios.post(
    `${baseUrl}/add/${id}`,
    { qtyToAdd: qty },
    {
      headers: {
        authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("loggedInUser")).accessToken,
      },
    }
  );
  return response;
};

export default { addToCart };
