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

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const createProduct = async (productData) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post("/api/admin/products", productData, config);
  return response.data;
};

const updateProduct = async (id, productData) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `/api/admin/products/${id}`,
    productData,
    config,
  );
  return response.data;
};

const deleteProduct = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`/api/admin/products/${id}`, config);
  return response.data;
};

export {
  getAllProducts,
  getOneProduct,
  setToken,
  createProduct,
  updateProduct,
  deleteProduct,
};
