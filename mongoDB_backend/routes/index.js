const router = require("express").Router();
const userController = require("../controllers/users");
const loginController = require("../controllers/login");
const productController = require("../controllers/products");
const adminController = require("../controllers/product_admin");
const testingController = require("../controllers/testing");
const cartController = require("../controllers/cart");
const { userExtractor, tokenExtractor } = require("../utils/middleware");

router.get("/", (req, res, next) => {
  res.send("Hello 2-pangre users!!");
});

router.get("/api/users/", userController.list);
router.post("/api/users/", userController.addUser);
router.get("/api/users/:id", userController.listOne);
router.delete("/api/users/:id", userController.deleteUser);
// router.get("/api/users/login/:token", userController.userByToken);

router.post("/api/login/", loginController.loginUser);

router.get("/api/products/", productController.list);
router.get("/api/products/:id", productController.listOne);

router.post(
  "/api/cart/inx/:id",
  tokenExtractor,
  userExtractor,
  cartController.inxCart
);
router.post(
  "/api/cart/dec/:id",
  tokenExtractor,
  userExtractor,
  cartController.decCart
);
router.post(
  "/api/cart/add/:id",
  tokenExtractor,
  userExtractor,
  cartController.addToCart
);

router.post("/admin/products/", adminController.addProduct);
router.put("/admin/products/:id", adminController.updateProduct);
router.delete("/admin/products/:id", adminController.deleteProduct);

if (process.env.NODE_ENV === "test") {
  router.get("/test/deleteProducts", testingController.deleteAllProduct);
}
module.exports = router;
