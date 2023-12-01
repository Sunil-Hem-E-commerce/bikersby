const User = require("../models").User;
const Address = require("../models").Address;
const Role = require("../models").Role;
const bcrypt = require("bcrypt");

module.exports = {
  // get all users
  async list(req, res) {
    const userList = await User.findAll({
      include: [
        {
          model: Address,
          as: "address",
        },
        {
          model: Role,
          as: "user_role",
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).send(userList);
  },

  // create user
  async addUser(req, res) {
    const { user_email, user_phone, user_name, password, role_id } = req.body;

    if (password.length < 8) {
      return res.status(400).send("Password cannot be less then 8 characters");
    }

    const pwd_hash = await bcrypt.hash(password, 13);

    const addUser = await User.create({
      user_email,
      user_phone,
      user_name,
      pwd_hash,
      role_id,
    });
    res.status(200).send(addUser);
  },
};
