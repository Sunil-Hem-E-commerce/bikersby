import axios from "axios";

const baseUrl = "/api/users";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAllUsers = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const createUser = async (register) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, register, config);
  return response.data;
};

const updateUser = async (id, userData) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, userData, config);
  return response.data;
};

const deleteUser = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { setToken, getAllUsers, updateUser, deleteUser, createUser };
