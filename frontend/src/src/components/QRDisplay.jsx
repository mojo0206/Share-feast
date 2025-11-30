import React from "react";
import QRCode from "react-qr-code";

const QRDisplay = ({ value }) => {
  if (!value) return null;

  return (
    <div style={{ padding: "20px", background: "white", borderRadius: "10px" }}>
      <QRCode value={value} size={180} />
      <p style={{ marginTop: "10px", textAlign: "center" }}>
        Scan this code
      </p>
    </div>
  );
};

export default QRDisplay;
