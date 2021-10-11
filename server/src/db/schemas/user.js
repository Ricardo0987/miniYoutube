"use strict";

const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  userName: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
});

module.exports = model("User", UserSchema);
