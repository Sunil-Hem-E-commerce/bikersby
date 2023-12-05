const { route } = require("../app");

const router = require("express").Router();
const userController = require("../controllers").user;
const loginController = require("../controllers").login;
const productController = require("../controllers").product;
const cartController = require("../controllers").cart;

router.get("/", (req, res, next) => {
  res.send("Bikersby backend homepage");
});

router.get("/api/users/", userController.list);
router.post("/api/users/", userController.addUser);

router.post("/api/login/", loginController.loginUser);

router.get("/api/products/", productController.list);
router.get("/api/products/v2", productController.listV2);

router.get("/api/carts", cartController.list);
module.exports = router;
