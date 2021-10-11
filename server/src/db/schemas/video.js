"use strict";

const { Schema, model } = require("mongoose");

const VideoSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  idUser: { type: Schema.ObjectId, ref: "User", required: true },
});

module.exports = model("Video", VideoSchema);
