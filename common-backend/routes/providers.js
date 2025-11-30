// routes/providerRoutes.js
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  addFoodListing,
  getProviderListings,
  getListingById,
  updateListingStatus
} from "../controllers/providerController.js";

const router = express.Router();

router.post("/add", verifyToken, addFoodListing);               // create listing
router.get("/listings", verifyToken, getProviderListings);      // all provider listings for logged-in provider
router.get("/listing/:id", verifyToken, getListingById);        // single listing
router.patch("/listing/:id/status", verifyToken, updateListingStatus); // update status

export default router;
