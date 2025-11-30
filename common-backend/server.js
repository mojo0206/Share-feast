import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import providerRoutes from "./routes/providerRoutes.js";
import collectorRoutes from "./routes/collectorRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// health
app.get("/", (req, res) => res.send("ShareFeast Backend running 🚀"));

// API routes
app.use("/api/provider", providerRoutes);
app.use("/api/collector", collectorRoutes);

// global error handler (simple)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
