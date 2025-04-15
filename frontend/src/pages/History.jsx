import React, { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/history")
      .then(res => {
        if (res.data.success) {
          setPosts(res.data.posts);
        } else {
          console.error("Failed to fetch history");
        }
      })
      .catch(err => console.error(err));
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
      <h2 className="text-2xl font-bold mb-4">Posted History</h2>
      {posts.length === 0 ? (
        <p>No posts in history.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(post => (
            <div key={post._id} className="border rounded-xl shadow-md p-4 bg-white">
              <img
                src={`http://localhost:4000/uploads/${post.imagePath}`}
                alt="Posted"
                className="w-full h-64 object-cover rounded-md mb-2"
              />
              <p className="text-gray-700 mb-1">
                <strong>Caption:</strong> {post.caption || "(No caption)"}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Scheduled at:</strong> {formatDateTime(post.scheduledAt)}
              </p>
              <p className="text-sm text-gray-500 font-semibold">
                <strong>Posted at:</strong> {formatDateTime(post.postedAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
