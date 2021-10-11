"use strict";

const { Schema, model } = require("mongoose");

const LikeSchema = Schema({
  idVideo: { type: Schema.ObjectId, ref: "Video", required: true },
  idUser: { type: Schema.ObjectId, ref: "User", required: true },
});

module.exports = model("Like", LikeSchema);
