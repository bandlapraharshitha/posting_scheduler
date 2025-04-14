const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const scheduleInstagramPost = require("../utils/schedulePost");

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

    await scheduleInstagramPost({ username, password, imagePath, caption, scheduledAt });

    res.status(200).json({ message: "Post scheduled successfully!" });
  } catch (error) {
    console.error("Error scheduling post:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
