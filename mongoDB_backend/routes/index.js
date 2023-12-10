const router = require("express").Router();
const userController = require("../controllers/users");
const loginController = require("../controllers/login");
const productController = require("../controllers/products");
const adminController = require("../controllers/product_admin");
const testingController = require("../controllers/testing");

router.get("/", (req, res, next) => {
  res.send("Hello 2-pangre users!!");
});

router.get("/api/users/", userController.list);
router.post("/api/users/", userController.addUser);

router.post("/api/login/", loginController.loginUser);

router.get("/api/products/", productController.list);
router.get("/api/products/:id", productController.listOne);

router.post("/admin/products/", adminController.addProduct);
router.put("/admin/products/:id", adminController.updateProduct);
router.delete("/admin/products/:id", adminController.deleteProduct);

if (process.env.NODE_ENV === "test") {
  router.get("/test/deleteProducts", testingController.deleteAllProduct);
}
module.exports = router;
