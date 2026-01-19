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
    },
  );
  return response;
};

const incCart = async (id) => {
  const response = await axios.post(`${baseUrl}/inx/${id}`, null, {
    headers: {
      authorization:
        "Bearer " +
        JSON.parse(localStorage.getItem("loggedInUser")).accessToken,
    },
  });
  return response;
};

const decCart = async (id) => {
  const response = await axios.post(`${baseUrl}/dec/${id}`, null, {
    headers: {
      authorization:
        "Bearer " +
        JSON.parse(localStorage.getItem("loggedInUser")).accessToken,
    },
  });
  return response;
};

const delCart = async () => {
  const response = await axios.put(`${baseUrl}/remove`, null, {
    headers: {
      authorization:
        "Bearer " +
        JSON.parse(localStorage.getItem("loggedInUser")).accessToken,
    },
  });
  return response;
};

const removeCartItem = async (id) => {
  const response = await axios.put(`${baseUrl}/remove/${id}`, null, {
    headers: {
      authorization:
        "Bearer " +
        JSON.parse(localStorage.getItem("loggedInUser")).accessToken,
    },
  });
  return response;
};

export default { addToCart, incCart, decCart, delCart, removeCartItem };
