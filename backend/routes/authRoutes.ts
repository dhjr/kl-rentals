import express from "express";
import { signup, signin } from "../controllers/Authentication.js";
import { protect } from "../middleware/Authorization.js";
import { authorize } from "../middleware/Authorization.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

// Add these to authRoutes.ts
router.get("/me", protect, (req: any, res) =>
  res.status(200).json({ message: "User profile fetched", user: req.user }),
);
router.get("/check-user", protect, (req, res) =>
  res.status(200).json({ authenticated: true }),
);
router.get("/check-admin", protect, authorize("admin"), (req, res) =>
  res.status(200).json({ admin: true }),
);
router.post("/logout", (req, res) =>
  res.status(200).json({ message: "Logged out" }),
);
export default router;
