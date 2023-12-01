const User = require("../models").User;
const Address = require("../models").Address;
const Role = require("../models").Role;

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
};
