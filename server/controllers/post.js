import Post from "../models/post.js";
import User from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";

const MAX_TEXT_LENGTH = 600;

const createPost = async (req, res) => {
  try {
    const { postedBy, text } = req.body;
    let { image } = req.body;

    if (!postedBy || !text)
      return res.status(400).json({ message: "Please fill all the fields" });

    const user = await User.findById(postedBy);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized to create post" });
    }

    if (text.length > MAX_TEXT_LENGTH)
      return res.status(400).json({
        message: `Text must be less than ${MAX_TEXT_LENGTH} characters`,
      });

    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image);
      image = uploadedImage.secure_url;
    }

    const newPost = new Post({
      postedBy,
      text,
      image,
    });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.log(`Error in creating post: ${error}`);
    res.status(500).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: "desc" });

    res.status(200).json(posts);
  } catch (error) {
    console.log(`Error in getting all posts: ${error}`);
    res.status(500).json({ message: error.message });
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ error: "Post not found" });

    const isUserLikedPost = post.likes.includes(userId);

    if (isUserLikedPost) {
      // unlike post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({ message: "Post unliked successfully" });
    } else {
      // like post
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: "Post liked successfully" });
    }
  } catch (error) {
    console.log(`Error in like/unlike  post: ${error}`);
    res.status(500).json({ message: error.message });
  }
};

const replyPost = async (req, res) => {
  try {
  } catch (error) {
    console.log(`Error in replying to post: ${error}`);
    res.status(500).json({ message: error.message });
  }
};

export { createPost, getAllPosts, likeUnlikePost, replyPost };
