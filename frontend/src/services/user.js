import axios from "axios";

const baseUrl = "/api/users";

const addUser = async (register) => {
  const response = await axios.post(baseUrl, register, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export { addUser };
