import React, { useEffect, useState } from "react";

const ScheduledPosts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/scheduled-posts");
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
      } else {
        console.error("Error fetching posts:", data.error);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchPosts(); // Initial fetch

    const interval = setInterval(() => {
      fetchPosts(); // Auto-refresh every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Scheduled Posts</h2>
      {posts.length === 0 ? (
        <p>No scheduled posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="border rounded-xl shadow-md p-4 bg-white"
            >
              <img
                src={`http://localhost:4000/uploads/${post.imagePath}`}
                alt="Scheduled"
                className="w-full h-64 object-cover rounded-md mb-2"
              />
              <p className="text-gray-700 mb-1">
                <strong>Caption:</strong> {post.caption || "(No caption)"}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Scheduled at:</strong> {formatDateTime(post.scheduledAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduledPosts;
