const mongoose = require("mongoose");
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://localhost:27017/classPlanner", {
    useNewUrlParser: true
  });
}

const db = mongoose.connection;

mongoose.Promise = Promise;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to db...");
});

let classSchema = new mongoose.Schema({
  name: String,
  sequence: Object
});

let poseSchema = new mongoose.Schema({
  sankrit_name: String,
  english_name: String,
  img_url: String
});

let Class = mongoose.model("Class", classSchema);
let Pose = mongoose.model("Pose", poseSchema);

module.exports.db = db;
module.exports.Class = Class;
module.exports.Pose = Pose;
