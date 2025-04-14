const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const scheduleInstagramPost = require("../utils/schedulePost");
const Post = require("../models/Post"); // ✅ Import Post model

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/schedule", upload.single("image"), async (req, res) => {
  try {
    const { username, password, caption, date, time } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    const imagePath = req.file.filename;
    const scheduledAt = new Date(`${date}T${time}`);

    // ✅ Save post to DB with status: "scheduled"
    const newPost = new Post({
      username,
      password,
      caption,
      imagePath,
      scheduledAt,
      status: "scheduled", // 👈 This is the key fix
    });

    await newPost.save();

    // ✅ Then schedule it (this part was already working)
    await scheduleInstagramPost({ username, password, imagePath, caption, scheduledAt });

    res.status(200).json({ message: "Post scheduled successfully!" });
  } catch (error) {
    console.error("Error scheduling post:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Fetch all scheduled posts
router.get("/scheduled-posts", async (req, res) => {
  try {
    const posts = await Post.find({ status: "scheduled" }).sort({ scheduledAt: 1 }); // This is where we sort by scheduledAt
    res.json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch scheduled posts" });
  }
});

module.exports = router;
