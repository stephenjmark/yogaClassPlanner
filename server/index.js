const express = require("express");
const morgan = require("morgan");
const parser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3333;

//models
const Class = require("../db/index").Class;
const Pose = require("../db/index").Pose;

//middleware
app.use(parser.json());
app.use(cors());
app.use(morgan("dev"));

//serve up static files
app.use(express.static(path.join(__dirname + "/../client/dist")));

app.get("/poses", (req, res) => {
  Pose.find({}).then(data => {
    res.send(data);
    res.end();
  });
});

app.get("/classes", (req, res) => {
  Class.find({}).then(data => {
    res.send(data);
    res.end();
  });
});

//
app.post("/classes", () => {
  Class.updateOne({}).then(data => {
    res.send(data);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!!`);
});
