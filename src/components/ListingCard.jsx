import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import QRCode from "react-qr-code";


export default function ListingCard({ listing, user }) {
  const confirmPicked = async () => {
    if (listing.providerUid !== user.uid) return alert("Not authorized");
    try {
      const ref = doc(db, "food", listing.id);
      await updateDoc(ref, { status: "completed", updatedAt: new Date() });
      alert("Marked completed");
    } catch (e) {
      console.error(e);
      alert("Failed to update");
    }
  };

  return (
    <div className="card listing-card">
      <div style={{display:"flex", gap:12}}>
        <div style={{flex:1}}>
          <h4>{listing.title}</h4>
          <p>Qty: {listing.quantity} {listing.unit}</p>
          <p>Status: <strong>{listing.status}</strong></p>
          {listing.photoUrl && <img src={listing.photoUrl} className="thumb" alt="food" />}
        </div>
        <div style={{width:160, textAlign:"center"}}>
          <QRCode value={JSON.stringify({ foodId: listing.id })} size={128} />
          <small>Scan to confirm pickup</small>
        </div>
      </div>

      {listing.providerUid === user.uid && (
        <div style={{marginTop:8}}>
          <button className="btn" onClick={confirmPicked}>Mark as picked up</button>
        </div>
      )}
    </div>
  );
}
