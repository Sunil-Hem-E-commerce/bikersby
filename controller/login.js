const { User } = require("../model/user");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validateTokenHandler = require("../middleware/validateTokenHandler");

const secret = process.env.ACCESS_TOKEN_SECRET;

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ error: error });
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      return res.status(400).send({ message: "User already registered" });
    }

    //! Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new User({ username, email, password: hashedPassword });
    await user.save();
    res.send(user);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error saving user", error: error, success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({ message: "Provide username and password" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).send({ message: "Invalid username or password" });
    }

    //! Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Wrong credentials !" });
    }

    //! Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      secret,
      { expiresIn: 5 * 60 },
    );

    //! Return the token along with any other user data
    res.send({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error logging in!", error: error, success: false });
  }
});

//! To check the current user who used the token
router.get("/current", validateTokenHandler, (req, res) => {
  const currentUser = req.user;
  res.send({
    message: "Current user information",
    user: currentUser.username,
  });
});

module.exports = router;
