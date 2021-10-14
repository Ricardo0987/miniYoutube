const express = require("express");
var cors = require("cors");
const { connectDB } = require("./db/connection");
const dotenv = require("dotenv");
const path = require('path');

dotenv.config();

const apiV1 = require("./routes/v1");

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/uploads', express.static(path.join(__dirname, '../uploads')));

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
