import React, { useState } from "react";

const SchedulePost = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !username || !password || !date || !time) {
      alert("Please fill in all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("caption", caption);
    formData.append("date", date);
    formData.append("time", time);

    try {
      const response = await fetch("http://localhost:4000/api/schedule", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Post scheduled successfully!");
        // Optional: Reset form
        setUsername("");
        setPassword("");
        setCaption("");
        setImage(null);
        setDate("");
        setTime("");
      } else {
        alert("❌ Error scheduling post: " + data.message);
      }
    } catch (error) {
      console.error("❌ Error scheduling post:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Schedule Instagram Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Instagram Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="password"
          placeholder="Instagram Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
          className="border p-2 w-full"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Schedule Post
        </button>
      </form>
    </div>
  );
};

export default SchedulePost;
