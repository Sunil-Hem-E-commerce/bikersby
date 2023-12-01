const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.send("Bikersby backend homepage");
});

module.exports = router;
