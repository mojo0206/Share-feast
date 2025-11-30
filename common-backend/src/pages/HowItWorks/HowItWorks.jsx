import React from "react";
import "./HowItWorks.css";

export default function HowItWorks() {
  return (
    <div className="how-container">
      <h1 className="how-title">How It Works</h1>
      <p className="how-subtitle">Simple steps to make a difference in your community</p>

      <div className="how-cards">
        <div className="how-card">
          <div className="icon">➕</div>
          <h2>List Surplus Food</h2>
          <p>Add surplus items with photo, quantity, and expiry details in seconds.</p>
        </div>

        <div className="how-card">
          <div className="icon">🔳</div>
          <h2>QR Code Verification</h2>
          <p>Generate a unique QR code for secure pickup confirmation by NGOs.</p>
        </div>

        <div className="how-card">
          <div className="icon">📈</div>
          <h2>Track Impact</h2>
          <p>View real‑time analytics on meals donated, waste reduced, and CO₂ saved.</p>
        </div>
      </div>
    </div>
  );
}
