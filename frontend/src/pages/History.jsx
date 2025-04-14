import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/history")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Posted History</h2>
      {posts.length === 0 ? <p>No posts in history.</p> :
        posts.map(post => (
          <div key={post._id} className="border p-4 rounded mb-3">
            <img src={`http://localhost:4000/${post.imagePath}`} className="w-48 h-48 object-cover" />
            <p className="mt-2"><strong>Caption:</strong> {post.caption}</p>
            <p><strong>Scheduled At:</strong> {post.date} {post.time}</p>
            <p><strong>Posted At:</strong> {post.postedAt}</p>
          </div>
        ))
      }
    </div>
  );
}

export default History;
