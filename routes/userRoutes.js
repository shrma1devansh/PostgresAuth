import express from "express";
import { registerUser } from "../controllers/userControllers.js";

const router = express.Router();

// POST /api/users
router.post("", registerUser);

export default router;