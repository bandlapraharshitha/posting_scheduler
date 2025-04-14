import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex gap-4">
      <Link to="/">Schedule Post</Link>
      <Link to="/scheduled">Scheduled Posts</Link>
      <Link to="/history">History</Link>
    </nav>
  );
}

export default Navbar;
