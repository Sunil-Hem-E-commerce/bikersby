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

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res
        .status(404)
        .json({ message: "The product with the given id is not found!" });
      return;
    }

    res.status(200).send(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Product not available for provided id !" });
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

router.put("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,

      { new: true },
    );
    console.log(product);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (product) {
      res.status(200).json({ message: "Product deleted successfully!" });
    } else {
      res.status(404).json({ message: "Product not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error while deleting product!" });
  }
});

module.exports = router;
