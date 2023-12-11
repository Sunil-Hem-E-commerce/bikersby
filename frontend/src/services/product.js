import axios from "axios";

const baseUrl = "/api/products";
console.log(baseUrl, "checking baseURL");

const getAllProducts = async () => {
  const response = await axios.get(baseUrl);
  // console.log(response, "cheking response");

  return response.data;
};

const getOneProduct = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export { getAllProducts, getOneProduct };
