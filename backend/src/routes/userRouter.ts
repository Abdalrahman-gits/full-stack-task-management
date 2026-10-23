import express from "express";
import { login, signup, refreshToken } from "../controllers/authController.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/refresh-token").post(refreshToken);

export default router;
