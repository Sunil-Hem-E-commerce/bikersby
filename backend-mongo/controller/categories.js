const { Category } = require("../model/category");
const { api } = require("../utils/config");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const products = await Category.find();
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res
      .status(500)
      .json({ message: "The category with given id id not found" });
  }
  res.status(200).send(category);
});

router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    const product = new Category(newProduct);
    await product.save();
    res.send(product);
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).send({ error: error, success: false });
  }
});

router.put("/", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });

    if (!category) {
      res.status(404).json({ message: "Category not found!" });
      return;
    }

    res.status(200).json({ message: "Category updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating category !" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const myCategory = Category.findByIdAndDelete(req.params.id);
    if (myCategory) {
      res
        .status(200)
        .json({ success: true, message: "the category is deleted" });
    }
  } catch (error) {
    res.json({ success: false, error: error });
  }
});

module.exports = router;
