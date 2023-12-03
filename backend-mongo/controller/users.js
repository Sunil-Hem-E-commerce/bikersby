const { User } = require("../model/user");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validateTokenHandler = require("../middleware/validateTokenHandler");

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ error: error });
  }
});

router.post("/users", async (req, res) => {
  try {
    const { email, username, password, role_id } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      return res.status(400).send({ message: "Email already registered" });
    }

    //! Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new User({
      username,
      email,
      password: hashedPassword,
      role_id,
    });
    await user.save();

    res.json({ message: "User registered successfully !" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error saving user", error, success: false });
  }
});

module.exports = router;
