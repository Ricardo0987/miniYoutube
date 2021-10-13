"use strict";

const User = require("../../db/schemas/user");

const createUser = async (req, res) => {
  const { userName } = req.body;
  const inUseName = await User.find({ userName: userName });
  if (inUseName.length === 0) {
    const user = new User();
    user.userName = userName;
    user.save();
    res.send({ userName: userName, idUser: user._id });
  } else {
    res.send({ userName: inUseName[0].userName, idUser: inUseName[0]._id });
  }
};

const getUsers = async (req, res) => {
  const users = await User.find();

  res.send(users);
};

module.exports = {
  createUser,
  getUsers,
};
