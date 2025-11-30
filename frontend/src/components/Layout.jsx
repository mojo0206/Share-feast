// src/components/Layout.jsx
export default function Layout({ children }) {
  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      {children}
    </div>
  );
}
