const { Product } = require("../model/product");
const { api } = require("../utils/config");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ error: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    const product = new Product(newProduct);
    await product.save();
    res.send(product);
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).send({ error: error, success: false });
  }
});

module.exports = router;
