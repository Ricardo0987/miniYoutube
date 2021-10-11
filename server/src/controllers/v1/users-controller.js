"use strict";

const User = require("../../db/schemas/user");

const createUser = (req, res) => {
  const { userName, pass } = req.body;
  const user = new User();
  user.userName = userName;
  user.pass = pass;
  user.save();
  res.send(req.body);
};

const getUsers = async (req, res) => {
  const users = await User.find();

  res.send(users);
};

module.exports = {
  createUser,
  getUsers,
};
