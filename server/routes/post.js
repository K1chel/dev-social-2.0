import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  createPost,
  getAllPosts,
  likeUnlikePost,
  replyPost,
} from "../controllers/post.js";

const router = express.Router();

router.get("/all-posts", getAllPosts);
router.post("/create", protectRoute, createPost);
router.put("/like/:id", protectRoute, likeUnlikePost);
router.put("/reply/:id", protectRoute, replyPost);

export default router;
