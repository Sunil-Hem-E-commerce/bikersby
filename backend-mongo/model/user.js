const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please add the username"],
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please add the user email address"],
    unique: [true, "Email address already exists"],
  },
  password: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
