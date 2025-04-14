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

      await Post.updateOne({ imagePath }, { postedAt: new Date(), status: "posted" });

      console.log("✅ Instagram post published");
    } catch (err) {
      console.error("❌ Failed to post on Instagram:", err.message);
    }
  });

  // ✅ Avoid duplicate entry
  const existing = await Post.findOne({ imagePath });
  if (!existing) {
    await Post.create({ username, imagePath, caption, scheduledAt });
  }

  task.start();
};

module.exports = scheduleInstagramPost;
