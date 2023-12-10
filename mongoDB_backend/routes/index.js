const router = require("express").Router();
const userController = require("../controllers/users");
const loginController = require("../controllers/login");

router.get("/", (req, res, next) => {
  res.send("Hello 2-pangre users!!");
});

router.get("/api/users/", userController.list);
router.post("/api/users/", userController.addUser);

router.post("/api/login/", loginController.loginUser);
module.exports = router;
