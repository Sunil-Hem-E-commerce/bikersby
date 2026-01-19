const router = require("express").Router();
const userController = require("../controllers/users");
const loginController = require("../controllers/login");
const productController = require("../controllers/products");
const adminController = require("../controllers/product_admin");
const testingController = require("../controllers/testing");
const cartController = require("../controllers/cart");
const {
  userExtractor,
  tokenExtractor,
  requireAuth,
} = require("../utils/middleware");

router.get("/", (req, res, next) => {
  res.send("Hello Healthy-Living users!!");
});

router.get("/users/", userController.list);
router.post("/users/", userController.addUser);
router.get("/users/verify-email", userController.verifyEmail);
router.get("/users/:id", userController.listOne);
router.delete("/users/:id", userController.deleteUser);
// router.get("/users/login/:token", userController.userByToken);

router.post("/login/", loginController.loginUser);
router.post("/login/google", loginController.googleLogin);
router.post("/login/facebook", loginController.facebookLogin);

router.get("/products/", productController.list);
router.get("/products/:id", productController.listOne);

router.post(
  "/admin/products/",
  tokenExtractor,
  userExtractor,
  requireAuth,
  adminController.addProduct,
);
router.put(
  "/admin/products/:id",
  tokenExtractor,
  userExtractor,
  requireAuth,
  adminController.updateProduct,
);
router.post(
  "/admin/products/bulk",
  tokenExtractor,
  userExtractor,
  requireAuth,
  adminController.addBulkProducts,
);
router.delete(
  "/admin/products/:id",
  tokenExtractor,
  userExtractor,
  requireAuth,
  adminController.deleteProduct,
);

router.use(tokenExtractor, userExtractor);
// below routes require authentication
router.post("/cart/inx/:id", cartController.inxCart);
router.post("/cart/dec/:id", cartController.decCart);
router.post("/cart/add/:id", cartController.addToCart);
router.put("/cart/remove", cartController.delCart);
router.put("/cart/remove/:id", cartController.updateCart);

if (process.env.NODE_ENV === "test") {
  router.get("/test/deleteProducts", testingController.deleteAllProduct);
}
module.exports = router;
