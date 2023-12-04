const { route } = require("../app");

const router = require("express").Router();
const userController = require("../controllers").user;
const loginController = require("../controllers").login;
const productController = require("../controllers").product;

router.get("/", (req, res, next) => {
  res.send("Bikersby backend homepage");
});

router.get("/api/users/", userController.list);
router.post("/api/users/", userController.addUser);

router.post("/api/login/", loginController.loginUser);

router.get("/api/products/", productController.list);
module.exports = router;
