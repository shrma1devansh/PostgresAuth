import express from "express";
import { register } from "../controllers/authControllers.js";
import {login} from "../controllers/loginControllers.js";

const router = express.Router();

router.route("/register").post( register);
router.route("/Login").post(login)


export default router;