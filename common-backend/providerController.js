// controllers/providerController.js
import { db } from "../services/firebase.js";

/**
 * addFoodListing
 * expects body: { title, quantity, address, city, lat, lng, photoUrl (optional) }
 */
export const addFoodListing = async (req, res) => {
  try {
    const providerUid = req.user.uid;
    const payload = {
      ...req.body,
      providerUid,
      status: "available",
      createdAt: new Date().toISOString(),
    };

    const ref = await db.collection("food").add(payload);
    return res.status(201).json({ id: ref.id, success: true });
  } catch (err) {
    console.error("addFoodListing error:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const getProviderListings = async (req, res) => {
  try {
    const providerUid = req.user.uid;
    const snap = await db.collection("food")
      .where("providerUid", "==", providerUid)
      .orderBy("createdAt", "desc")
      .get();

    const listings = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return res.json(listings);
  } catch (err) {
    console.error("getProviderListings error:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const getListingById = async (req, res) => {
  try {
    const doc = await db.collection("food").doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Not found" });
    return res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    console.error("getListingById error:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const updateListingStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    await db.collection("food").doc(id).update({ status, updatedAt: new Date().toISOString() });
    return res.json({ success: true, id });
  } catch (err) {
    console.error("updateListingStatus error:", err);
    return res.status(500).json({ error: err.message });
  }
};
