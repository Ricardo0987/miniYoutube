const express = require("express");
var cors = require("cors");
const { connectDB } = require("./db/connection");
const dotenv = require("dotenv");
dotenv.config();

const apiV1 = require("./routes/v1");

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

apiV1(app);

connectDB().then((connected) => {
  if (connected) {
    app.listen(PORT, () => {
      console.log("running on " + PORT);
    });
  } else {
    console.log("Error mongo db");
  }
});
