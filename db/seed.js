const data = require("./data");
const Pose = require("./index").Pose;

data.forEach(pose => {
  Pose.updateOne(
    { sankrit_name: pose.sanskrit_name },
    {
      sankrit_name: pose.sanskrit_name,
      english_name: pose.english_name,
      img_url: pose.img_url
    },
    { upsert: true },
    (err, res) => {
      err ? console.log(err) : console.log(res);
    }
  );
});
