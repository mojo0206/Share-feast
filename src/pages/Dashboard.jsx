export default function Dashboard() {
  return (
    <div className="page">
      <h1 style={{ color: "#FF6D1F" }}>Dashboard</h1>

      <div className="box">
        <h3>Active Collections</h3>
        <p>Food ready for pickup today</p>
      </div>

      <div className="box">
        <h3>Completed Pickups</h3>
        <p>Your recent NGO deliveries</p>
      </div>
    </div>
  );
}
