import axios from "axios";

const baseUrl = "/api/products";

const getAllProducts = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOneProduct = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export { getAllProducts, getOneProduct };
