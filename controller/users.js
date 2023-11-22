const { User } = require("../model/user");
const { api } = require("../utils/config");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ error: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = req.body;
    const user = new User(newProduct);
    await user.save();
    res.send(user);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send({ error: error, success: false });
  }
});

module.exports = router;
