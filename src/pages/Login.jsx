import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="page">
      <h1 style={{ color: "#FF6D1F" }}>Collector Login</h1>

      <form
        onSubmit={handleLogin}
        style={{
          background: "white",
          padding: "20px",
          width: "300px",
          marginTop: "25px",
          borderRadius: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Enter name"
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        <button className="btn" style={{ width: "100%" }}>
          Login
        </button>
      </form>
    </div>
  );
}
