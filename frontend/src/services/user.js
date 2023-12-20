import axios from "axios";

const baseUrl = "/api/users";
const getUsers = async ({ email, username, password }) => {
  const response = await axios.get(baseUrl);
  const user = response.data;
  const filtereduser = user.filter((user) => user.username === username);
  return filtereduser[0];
};

const postUser = async (register) => {
  const response = await axios.post(baseUrl, register, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export { getUsers, postUser };
