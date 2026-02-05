import axios from "axios";

const baseUrl = "/api/orders";
const adminUrl = "/api/admin/orders";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const createOrder = async (orderData) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, orderData, config);
  return response.data;
};

const getMyOrders = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const getOrderDetails = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}/${id}`, config);
  return response.data;
};

// Admin functions
const getAllOrders = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(adminUrl, config);
  return response.data;
};

const updateOrderStatus = async (id, statusData) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${adminUrl}/${id}`, statusData, config);
  return response.data;
};

export default { 
    createOrder, 
    getMyOrders, 
    getOrderDetails, 
    getAllOrders, 
    updateOrderStatus, 
    setToken 
};
