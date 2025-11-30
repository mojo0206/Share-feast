import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar">
      <h2>Collector Panel</h2>

      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/collections">Collections</Link>
        <Link to="/login">Logout</Link>
      </div>
    </div>
  );
}
