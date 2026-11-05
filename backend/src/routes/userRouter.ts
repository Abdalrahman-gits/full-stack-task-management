import express from "express";
import {
  login,
  signup,
  refreshToken,
  protect,
} from "../controllers/authController.js";
import { getMe } from "../controllers/userController.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/refresh-token").post(refreshToken);
router.route("/me").get(protect, getMe);

export default router;
