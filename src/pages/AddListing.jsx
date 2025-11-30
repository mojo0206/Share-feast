// src/pages/AddListing.jsx
import React from "react";
import { db, storage, serverTimestamp } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

/**
 * AddListing with address/autocomplete (OSM) + detect location (reverse geocode).
 * - No external packages required
 * - Stores: title, quantity, address, city, (lat,lng optional), photoUrl, createdAt
 */

export default function AddListing({ user }) {
  const [title, setTitle] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [lat, setLat] = React.useState("");
  const [lng, setLng] = React.useState("");
  const [photo, setPhoto] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // autocomplete suggestions from Nominatim
  const [suggestions, setSuggestions] = React.useState([]);
  const [suggestLoading, setSuggestLoading] = React.useState(false);

  const nav = useNavigate();
  const nominatimBase = "https://nominatim.openstreetmap.org";

  // debounce helper for queries
  const debounceRef = React.useRef(null);
  function searchAddress(q) {
    if (!q || q.length < 3) {
      setSuggestions([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSuggestLoading(true);
      try {
        const url = `${nominatimBase}/search?format=jsonv2&q=${encodeURIComponent(
          q
        )}&addressdetails=1&limit=6`;
        const res = await fetch(url, {
          headers: {
            // polite header; browsers may not allow UA override
            "Accept-Language": "en-US,en;q=0.9",
          },
        });
        const data = await res.json();
        setSuggestions(data || []);
      } catch (err) {
        console.error("Autocomplete error", err);
        setSuggestions([]);
      } finally {
        setSuggestLoading(false);
      }
    }, 300);
  }

  // when user clicks a suggestion, fill fields
  function pickSuggestion(item) {
    setAddress(item.display_name || "");
    // try to extract city from address details
    const addr = item.address || {};
    const resolvedCity =
      addr.city || addr.town || addr.village || addr.county || "";
    setCity(resolvedCity);
    setLat(item.lat || "");
    setLng(item.lon || "");
    setSuggestions([]);
  }

  // reverse geocode for detectLocation
  async function reverseGeocode(latVal, lonVal) {
    try {
      const url = `${nominatimBase}/reverse?format=jsonv2&lat=${encodeURIComponent(
        latVal
      )}&lon=${encodeURIComponent(lonVal)}&addressdetails=1`;
      const res = await fetch(url);
      const data = await res.json();
      if (data) {
        setAddress(data.display_name || "");
        const addr = data.address || {};
        const resolvedCity =
          addr.city || addr.town || addr.village || addr.county || "";
        setCity(resolvedCity);
      }
    } catch (err) {
      console.error("Reverse geocode error", err);
      // silent fallback
    }
  }

  async function detectLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    try {
      const getPos = () =>
        new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
          })
        );
      const pos = await getPos();
      const latVal = pos.coords.latitude;
      const lonVal = pos.coords.longitude;
      setLat(latVal);
      setLng(lonVal);
      await reverseGeocode(latVal, lonVal);
    } catch (err) {
      console.error("Detect location failed", err);
      alert("Unable to detect location. Please allow location access or enter address manually.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let photoUrl = null;
      if (photo) {
        const fileRef = ref(storage, `food_photos/${user.uid}_${Date.now()}_${photo.name}`);
        await uploadBytes(fileRef, photo);
        photoUrl = await getDownloadURL(fileRef);
      }

      const payload = {
        title: title.trim(),
        quantity: Number(quantity),
        unit: "meals",
        providerUid: user.uid,
        status: "available",
        address: address || null,
        city: city || null,
        lat: lat ? Number(lat) : null,
        lng: lng ? Number(lng) : null,
        photoUrl: photoUrl || null,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "food"), payload);

      alert("Listing created!");
      nav("/");
    } catch (err) {
      console.error("Add listing error", err);
      alert("Failed to create listing: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2>Create Listing</h2>

      <form onSubmit={handleSubmit}>
        <input
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          required
          type="number"
          min="1"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <div style={{ marginTop: 12 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
            Address (type to search)
          </label>
          <input
            placeholder="Start typing an address or place..."
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              searchAddress(e.target.value);
            }}
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e6e8ee" }}
          />

          {suggestLoading && <div className="muted">Searching...</div>}

          {suggestions.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <div style={{ background: "#fff", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
                {suggestions.map((s) => (
                  <button
                    type="button"
                    key={s.place_id}
                    onClick={() => pickSuggestion(s)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 12px",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    {s.display_name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <input
            placeholder="City (auto-filled)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ flex: 1 }}
          />
          <input
            placeholder="Latitude (optional)"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            style={{ width: 160 }}
          />
          <input
            placeholder="Longitude (optional)"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            style={{ width: 160 }}
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <button type="button" className="btn" onClick={detectLocation} style={{ marginRight: 10 }}>
            Detect my location
          </button>
          <span className="muted" style={{ marginLeft: 8 }}>
            (fills address & city automatically)
          </span>
        </div>

        <div style={{ marginTop: 12 }}>
          <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
        </div>

        <div style={{ marginTop: 14 }}>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Publishing..." : "Publish listing"}
          </button>
        </div>
      </form>
    </div>
  );
}
