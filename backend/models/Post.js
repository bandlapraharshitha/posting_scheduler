const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  username: String,
  caption: String,
  imagePath: String,
  scheduledAt: Date,
  postedAt: Date,
  status: {
    type: String,
    enum: ["scheduled", "posted"],
    default: "scheduled"
  }
});

module.exports = mongoose.model("Post", postSchema);
