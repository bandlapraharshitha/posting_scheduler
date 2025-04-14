const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const scheduleRoutes = require("./routes/schedule");

dotenv.config();

const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api", scheduleRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(4000, () => console.log("✅ Listening on port 4000"));
  })
  .catch((err) => console.log("❌ MongoDB connection error:", err));
