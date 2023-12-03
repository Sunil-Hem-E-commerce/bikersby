import axios from "axios";

const baseUrl = "/api/users";

const postUser = async (sigin) => {
  const response = await axios.post(baseUrl, sigin, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("Checking response", response);
  return response;
};

export { postUser };
