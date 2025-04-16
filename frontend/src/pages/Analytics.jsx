import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Analytics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/analytics")
      .then(res => res.json())
      .then(json => {
        if (json.success) setData(json.stats);
        else console.error("Failed to fetch analytics");
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Post Analytics (Last 7 Days)</h2>
      {data.length === 0 ? (
        <p>No analytics available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="scheduled" fill="#8884d8" name="Scheduled Posts" />
            <Bar dataKey="posted" fill="#82ca9d" name="Posted Posts" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Analytics;
