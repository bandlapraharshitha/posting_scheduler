const cron = require("node-cron");
const { IgApiClient } = require("instagram-private-api");
const fs = require("fs");
const path = require("path");
const Post = require("../models/Post");

const scheduleInstagramPost = async ({ username, password, imagePath, caption, scheduledAt }) => {
  const date = new Date(scheduledAt);
  const cronTime = `${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} *`;

  const task = cron.schedule(cronTime, async () => {
    try {
      const ig = new IgApiClient();
      ig.state.generateDevice(username);
      await ig.account.login(username, password);

      const imageBuffer = fs.readFileSync(path.join(__dirname, "../uploads", imagePath));

      await ig.publish.photo({
        file: imageBuffer,
        caption,
      });

      // ✅ Mark the post as "posted" and set postedAt
      await Post.updateOne(
        { imagePath },
        { $set: { status: "posted", postedAt: new Date() } }
      );

      console.log("✅ Instagram post published");
    } catch (err) {
      console.error("❌ Failed to post on Instagram:", err.message);
    }
  });

  // ✅ No need to recreate post if already exists
  const existing = await Post.findOne({ imagePath });
  if (!existing) {
    await Post.create({
      username,
      password,
      imagePath,
      caption,
      scheduledAt,
      status: "scheduled",
    });
  }

  task.start();
};

module.exports = scheduleInstagramPost;
