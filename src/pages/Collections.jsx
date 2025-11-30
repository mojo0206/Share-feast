export default function Collections() {
  const items = [
    {
      rest: "Spicy Kitchen",
      food: "20 Plates Biryani",
      time: "Pickup in 10 mins",
    },
    {
      rest: "Fresh Bakes",
      food: "12 Bread Loaves",
      time: "Ready now",
    },
  ];

  return (
    <div className="page">
      <h1 style={{ color: "#FF6D1F" }}>Available Collections</h1>

      {items.map((item, i) => (
        <div className="box" key={i}>
          <h3>{item.rest}</h3>
          <p>{item.food}</p>
          <p>{item.time}</p>

          <button className="btn" style={{ marginTop: "10px" }}>
            Collect
          </button>
        </div>
      ))}
    </div>
  );
}
