const router = require("express").Router();
const userController = require("../controllers/users");
const loginController = require("../controllers/login");
const productController = require("../controllers/products");
const adminController = require("../controllers/product_admin");
const testingController = require("../controllers/testing");
const cartController = require("../controllers/cart");
const { userExtractor, tokenExtractor } = require("../utils/middleware");
const user = require("../models/user");

router.get("/", (req, res, next) => {
  res.send("Hello 2-pangre users!!");
});

router.get("/users/", userController.list);
router.post("/users/", userController.addUser);
router.get("/users/:id", userController.listOne);
router.delete("/users/:id", userController.deleteUser);
// router.get("/users/login/:token", userController.userByToken);

router.post("/api/login/", loginController.loginUser);

router.post("/login/", loginController.loginUser);

router.get("/products/", productController.list);
router.get("/products/:id", productController.listOne);

router.post("/admin/products/", adminController.addProduct);
router.put("/admin/products/:id", adminController.updateProduct);
router.delete("/admin/products/:id", adminController.deleteProduct);

router.use(tokenExtractor, userExtractor);
// below routes require authentication
router.post("/api/cart/inx/:id", cartController.inxCart);
router.post("/api/cart/dec/:id", cartController.decCart);
router.post("/api/cart/add/:id", cartController.addToCart);
router.put("/api/cart/remove", cartController.delCart);
router.put("/api/cart/remove/:id", cartController.updateCart);

if (process.env.NODE_ENV === "test") {
  router.get("/test/deleteProducts", testingController.deleteAllProduct);
}
module.exports = router;
