const mongoose = require("mongoose");

const scheduledPostSchema = new mongoose.Schema({
  username: String,
  image: String,
  caption: String,
  scheduledTime: String,
  postedTime: Date
});

module.exports = mongoose.model("ScheduledPost", scheduledPostSchema);
