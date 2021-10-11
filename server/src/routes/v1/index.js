const usersController = require("../../controllers/v1/users-controller");
const videoController = require("../../controllers/v1/video-controller");
const likeController = require("../../controllers/v1/likes-controller");

const createRoutesV1 = (app) => {
  app.post("/api/v1/user", usersController.createUser);
  app.get("/api/v1/users", usersController.getUsers);

  app.get("/api/v1/videos/", videoController.getVideos);
  app.post("/api/v1/video/", videoController.createVideo);

  app.post("/api/v1/like/", likeController.toggleLike);
};

module.exports = createRoutesV1;
