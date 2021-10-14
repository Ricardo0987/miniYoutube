"use strict";

const Video = require("../../db/schemas/video");
const Like = require("../../db/schemas/like");

const createVideo = (req, res) => {
  const { name, tags, idUser } = req.body;
  const video = new Video();
  video.name = name;
  video.tags = tags.replace(/\s+/g, "").split(",");
  video.file = req.file.filename;
  video.idUser = idUser;
  video.save();
  res.send(req.body);
};

const getVideos = async (req, res) => {
  const videos = await Video.find();
  const likes = await Like.find();
  const videosAndLikes = videos.map((video) => {
    let likeCount = 0;
    likes.forEach((like) => {
      if (like.idVideo.toString() === video.id) {
        likeCount++;
      }
    });
    return { ...video._doc, likes: likeCount };
  });
  res.send(videosAndLikes);
};

const searchVideos = async (req, res) => {
  const { strSearch } = req.body;
  const videos = await Video.find({ $or: [{ name: new RegExp(strSearch, "gi") }, { tags: { $in: new RegExp(strSearch, "gi") } }] });
  const likes = await Like.find();
  const videosAndLikes = videos.map((video) => {
    let likeCount = 0;
    likes.forEach((like) => {
      if (like.idVideo.toString() === video.id) {
        likeCount++;
      }
    });
    return { ...video._doc, likes: likeCount };
  });
  res.send(videosAndLikes);
};
module.exports = {
  createVideo,
  getVideos,
  searchVideos,
};
