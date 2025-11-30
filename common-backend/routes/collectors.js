// routes/collectorRoutes.js
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  getAvailableFood,
  requestPickup,
  getRequestsForCollector,
  markCollected
} from "../controllers/collectorController.js";

const router = express.Router();

router.get("/available", getAvailableFood);               // public: list available food
router.post("/request/:id", verifyToken, requestPickup);  // collector requests a pickup for listing id
router.get("/my-requests", verifyToken, getRequestsForCollector); // collector's requests
router.post("/confirm/:requestId", verifyToken, markCollected); // provider confirms collection (or collector confirms)
export default router;
