const usersController = require("../../controllers/v1/users-controller");
const videoController = require("../../controllers/v1/video-controller");
const likeController = require("../../controllers/v1/likes-controller");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const createRoutesV1 = (app) => {
  app.post("/api/v1/user", usersController.createUser);
  app.get("/api/v1/users", usersController.getUsers);

  app.get("/api/v1/videos/", videoController.getVideos);
  app.post("/api/v1/videos/search", videoController.searchVideos);
  app.post("/api/v1/video/", upload.single("file"), videoController.createVideo);

  app.post("/api/v1/like/", likeController.toggleLike);
};

module.exports = createRoutesV1;
