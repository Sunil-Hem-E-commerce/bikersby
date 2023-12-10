const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.send("Hello 2-pangre users!!");
});

module.exports = router;
