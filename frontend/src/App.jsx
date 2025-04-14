import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SchedulePost from "./pages/SchedulePost";
import ScheduledPosts from "./pages/ScheduledPosts";
import History from "./pages/History";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SchedulePost />} />
        <Route path="/scheduled" element={<ScheduledPosts />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
