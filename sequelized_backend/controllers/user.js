const User = require("../models").User;
const Address = require("../models").Address;
const Role = require("../models").Role;
const District = require("../models").District;
const bcrypt = require("bcrypt");

module.exports = {
  // get all users
  async list(req, res) {
    const userList = await User.findAll({
      attributes: { exclude: ["address_id", "role_id", "pwd_hash"] },
      include: [
        {
          model: Role,
          as: "user_role",
          attributes: { exclude: ["id"] },
        },
        {
          model: Address,
          as: "address",
          attributes: { exclude: ["id"] },
          include: [
            {
              model: District,
              as: "district",
              attributes: { exclude: ["id"] },
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).send(userList);
  },

  // create user
  // completed
  async addUser(req, res) {
    const { email, username, password, role_id } = req.body;

    if (password.length < 8) {
      return res.status(400).send("Password cannot be less then 8 characters");
    }

    const userInDb = await User.findOne({ where: { user_email: email } });
    if (!userInDb) {
      const pwd_hash = await bcrypt.hash(password, 10);

      const addUser = await User.create({
        user_email: email,
        user_name: username,
        pwd_hash,
        role_id,
      });
      res.status(200).send(addUser);
    } else {
      res.status(412).send("User already exists");
    }
  },
};
