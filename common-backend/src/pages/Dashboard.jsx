import React from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import ListingCard from "../components/ListingCard";

export default function Dashboard({ user }) {
  if (!user) return <p>You are not logged in</p>;
  const [listings, setListings] = React.useState([]);
  const [stats, setStats] = React.useState({ total: 0, completed: 0 });

  React.useEffect(() => {
    const q = query(
      collection(db, "food"),
      where("providerUid", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, snapshot => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setListings(docs);
      setStats({
        total: docs.length,
        completed: docs.filter(d => d.status === "completed").length
      });
    });
    return () => unsub();
  }, [user.uid]);

  return (
    <div>
      <section className="stats">
        <div className="stat-card">
          <h3>Total</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>
      </section>

      <section>
        <h2>Your listings</h2>
        <div className="grid">
          {listings.length ? listings.map(l => <ListingCard key={l.id} listing={l} user={user} />) : <p>No listings yet.</p>}
        </div>
      </section>
    </div>
  );
}
