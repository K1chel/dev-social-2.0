import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { createPost, getAllPosts } from "../controllers/post.js";

const router = express.Router();

router.get("/all-posts", getAllPosts);
router.post("/create", protectRoute, createPost);

export default router;
