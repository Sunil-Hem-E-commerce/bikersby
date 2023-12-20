import axios from "axios";

const baseUrl = "/api/login";

const loginUser = async (signin) => {
  const response = await axios.post(baseUrl, signin, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export { loginUser };
