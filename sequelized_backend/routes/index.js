const router = require("express").Router();
const userController = require("../controllers").user;

router.get("/", (req, res, next) => {
  res.send("Bikersby backend homepage");
});

router.get("/api/users", userController.list);

module.exports = router;
