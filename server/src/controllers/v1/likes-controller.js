"use strict";

const Like = require("../../db/schemas/like");
const Video = require("../../db/schemas/video");
const User = require("../../db/schemas/user");

const toggleLike = async (req, res) => {
  const { idVideo, idUser } = req.body;
  const like = new Like();
  like.idVideo = idVideo;
  like.idUser = idUser;
  let message = "";

  const userExists = await User.findById(idUser).exec();
  const videoExists = await Video.findById(idVideo).exec();
  !userExists && !videoExists && (message = "user or video not exist");

  const docLike = await Like.findOne({ idUser: idUser, idVideo: idVideo });
  if (!docLike && userExists && videoExists) {
    message = "add like";
    like.save();
  } else {
    message = "remove like";
    docLike.remove();
  }

  res.send({ msg: message, bodySended: req.body });
};

module.exports = {
  toggleLike,
};
