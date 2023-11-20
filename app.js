const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();

const api = process.env.API_URL;
const PORT = process.env.PORT;
app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: "Hemlal Dulal",
    image: "myImg",
  };
  res.send(product);
});

app.post(`${api}/products`, (req, res) => {
  const newProduct = req.body;
  console.log(newProduct);
  res.send(newProduct);
});

app.listen(3000, () => {
  console.log("Server is running at PORT 3000");
});
