import axios from "axios";

const baseUrl = "/api/users";
const getUsers = async ({ user_email, user_name, password, role_id }) => {
  const response = await axios.get(baseUrl);
  const user = response.data;
  console.log("checking user", user);
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
