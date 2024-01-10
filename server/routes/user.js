import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getProfileByUsername,
} from "../controllers/user.js";

const router = express.Router();

router.get("/profile/:username", getProfileByUsername);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update/:id", protectRoute, updateUser);

export default router;
