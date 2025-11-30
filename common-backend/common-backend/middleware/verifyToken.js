// middleware/verifyToken.js
import { auth } from "../services/firebase.js";

export default async function verifyToken(req, res, next) {
  try {
    const authorization = req.headers.authorization || "";
    const token = authorization.split("Bearer ")[1] || authorization.split(" ")[1];

    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = await auth.verifyIdToken(token);
    req.user = decoded; // { uid, email, ... }
    return next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(403).json({ error: "Unauthorized or invalid token" });
  }
}
