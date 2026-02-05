const router = require("express").Router();
const userController = require("../controllers/users");
const loginController = require("../controllers/login");
const productController = require("../controllers/products");
const adminController = require("../controllers/product_admin");
const testingController = require("../controllers/testing");
const cartController = require("../controllers/cart");
const orderController = require("../controllers/orders");
const paymentController = require("../controllers/payments");
const {
  userExtractor,
  tokenExtractor,
  requireAuth,
  requireAdmin,
} = require("../utils/middleware");

router.use(tokenExtractor, userExtractor);

router.get("/", (req, res, next) => {
  res.send("Hello Healthy-Living users!!");
});

router.get("/users/", userController.list);
router.post("/users/", userController.addUser);
router.get("/users/verify-email", userController.verifyEmail);
router.get("/users/:id", userController.listOne);
router.delete(
  "/users/:id",
  requireAuth,
  requireAdmin,
  userController.deleteUser,
);
router.put("/users/:id", requireAuth, requireAdmin, userController.updateUser); // Admin only update
// router.get("/users/login/:token", userController.userByToken);

// Order Routes
router.post("/orders", requireAuth, orderController.createOrder);
router.get("/orders", requireAuth, orderController.getMyOrders);
router.get("/orders/:id", requireAuth, orderController.getOrderDetails);

// Admin Order Routes
router.get(
  "/admin/orders",
  requireAuth,
  requireAdmin,
  orderController.getAllOrders,
);
router.put(
  "/admin/orders/:id",
  requireAuth,
  requireAdmin,
  orderController.updateOrderStatus,
);

// Payment Routes
router.post("/payments/esewa/verify", paymentController.verifyEsewa);
router.post("/payments/khalti/verify", paymentController.verifyKhalti);
router.post("/payments/connectips/verify", paymentController.verifyConnectIPS);

router.post("/login/", loginController.loginUser);
router.post("/login/google", loginController.googleLogin);
router.post("/login/facebook", loginController.facebookLogin);

router.get("/products/", productController.list);
router.get("/products/:id", productController.listOne);

router.post(
  "/admin/products/",
  requireAuth,
  requireAdmin,
  adminController.addProduct,
);
router.put(
  "/admin/products/:id",
  requireAuth,
  requireAdmin,
  adminController.updateProduct,
);
router.post(
  "/admin/products/bulk",
  requireAuth,
  requireAdmin,
  adminController.addBulkProducts,
);
router.delete(
  "/admin/products/:id",
  requireAuth,
  requireAdmin,
  adminController.deleteProduct,
);

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
