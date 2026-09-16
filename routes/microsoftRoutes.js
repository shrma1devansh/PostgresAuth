import express from "express";

import {
    microsoftLogin,
    microsoftCallback
} from "../controllers/microsoftAuthController.js";

const router = express.Router();

router.get("/login", microsoftLogin);

router.get("/callback", microsoftCallback);

export default router;