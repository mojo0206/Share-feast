// controllers/collectorController.js
import { db } from "../services/firebase.js";

/**
 * getAvailableFood - returns listings where status == "available"
 */
export const getAvailableFood = async (req, res) => {
  try {
    const snap = await db.collection("food").where("status", "==", "available").get();
    const listings = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return res.json(listings);
  } catch (err) {
    console.error("getAvailableFood error:", err);
    return res.status(500).json({ error: err.message });
  }
};

/**
 * requestPickup - collector requests to pick up a listing
 * body may include note, preferred pickup time, etc.
 */
export const requestPickup = async (req, res) => {
  try {
    const collectorUid = req.user.uid;
    const listingId = req.params.id;

    // create a request record
    const payload = {
      listingId,
      collectorUid,
      status: "pending", // pending -> approved -> collected
      createdAt: new Date().toISOString(),
      ...req.body
    };
    const ref = await db.collection("requests").add(payload);

    // Optionally update listing to reflect a pending request
    await db.collection("food").doc(listingId).update({ status: "pending" });

    return res.status(201).json({ requestId: ref.id });
  } catch (err) {
    console.error("requestPickup error:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const getRequestsForCollector = async (req, res) => {
  try {
    const collectorUid = req.user.uid;
    const snap = await db.collection("requests").where("collectorUid", "==", collectorUid).get();
    const requests = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return res.json(requests);
  } catch (err) {
    console.error("getRequestsForCollector error:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const markCollected = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    // mark request record collected
    await db.collection("requests").doc(requestId).update({ status: "collected", collectedAt: new Date().toISOString() });

    // get request to find listing id and update listing
    const reqDoc = await db.collection("requests").doc(requestId).get();
    const listingId = reqDoc.data().listingId;
    await db.collection("food").doc(listingId).update({ status: "collected", collectedAt: new Date().toISOString() });

    return res.json({ success: true });
  } catch (err) {
    console.error("markCollected error:", err);
    return res.status(500).json({ error: err.message });
  }
};
