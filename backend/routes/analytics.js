const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Returns count of scheduled and posted posts per day (last 7 days)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();

    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return date.toISOString().split("T")[0];
    });

    const stats = last7Days.reverse().map((dateStr) => {
      const scheduledCount = posts.filter(p => p.scheduledAt.toISOString().startsWith(dateStr)).length;
      const postedCount = posts.filter(p => p.postedAt && p.postedAt.toISOString().startsWith(dateStr)).length;
      return {
        date: dateStr,
        scheduled: scheduledCount,
        posted: postedCount,
      };
    });

    res.json({ success: true, stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
