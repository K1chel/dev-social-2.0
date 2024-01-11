import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getProfileByUsername,
  suggestedUsers,
  followUser,
  getAllUsers,
} from "../controllers/user.js";

const router = express.Router();

router.get("/profile/:username", getProfileByUsername);
router.get("/suggested", protectRoute, suggestedUsers);
router.get("/all-users", protectRoute, getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUser);
router.put("/update/:id", protectRoute, updateUser);

export default router;
