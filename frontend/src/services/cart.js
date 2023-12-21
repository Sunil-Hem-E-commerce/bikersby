import axios from "axios";

const baseUrl = "/api/cart";

const addToCart = async (id, qty) => {
  id = id.slice(0, 24);
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

const incCart = async (id) => {
  id = id.slice(0, 24);
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
  id = id.slice(0, 24);
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
  id = id.slice(0, 24);
  const response = await axios.put(`${baseUrl}/remove/${id}`, null, {
    headers: {
      authorization:
        "Bearer " +
        JSON.parse(localStorage.getItem("loggedInUser")).accessToken,
    },
  });
  console.log("response:::", response);
  return response;
};

export default { addToCart, incCart, decCart, delCart, removeCartItem };
