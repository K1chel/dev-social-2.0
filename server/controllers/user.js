import User from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import validator from "validator";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) return res.status(400).json({ error: "User already exists" });

    if (!username || !email || !password)
      return res.status(400).json({ error: "Please fill in all fields" });
    if (!validator.isEmail(email))
      return res.status(400).json({ error: "Invalid email" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    if (newUser) {
      generateToken(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        bio: newUser.bio,
        followers: newUser.followers,
        following: newUser.following,
        liked: newUser.liked,
        saved: newUser.saved,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log(`Error in registerUser: ${error.message}`.red.bold);
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isPasswordMatch = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordMatch)
      return res.status(400).json({ error: "Invalid username or password" });

    if (user) {
      generateToken(user._id, res);

      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        liked: user.liked,
        saved: user.saved,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log(`Error in loginUser: ${error.message}`.red.bold);
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "Logout user" });
  } catch (error) {
    console.log(`Error in logoutUser: ${error.message}`.red.bold);
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { username, email, bio } = req.body;
  let { avatar } = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (req.params.id !== userId.toString())
      return res.status(401).json({ error: "Unauthorized" });

    if (avatar) {
      if (user.avatar) {
        await cloudinary.uploader.destroy(
          user.avatar.split("/").pop().split(".")[0] // delete image from cloudinary
        );
      }

      const uploadedImage = await cloudinary.uploader.upload(avatar);
      avatar = uploadedImage.secure_url;
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.avatar = avatar || user.avatar;
    user.bio = bio || user.bio;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(`Error in updateUser: ${error.message}`.red.bold);
    res.status(500).json({ message: error.message });
  }
};

const getProfileByUsername = async (req, res) => {
  try {
    const { query } = req.params;

    let user;

    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await User.findOne({ _id: query })
        .select("-password")
        .select("-updatedAt");
    } else {
      user = await User.findOne({ username: query })
        .select("-password")
        .select("-updatedAt");
    }

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.log(`Error in getProfileByUsername: ${error.message}`.red.bold);
    res.status(500).json({ message: error.message });
  }
};

const suggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    const usersFollowedByYou = await User.findById(userId).select("following");

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      {
        $sample: { size: 10 },
      },
    ]);
    const filterredUsers = users.filter(
      (user) => !usersFollowedByYou.following.includes(user._id.toString())
    );
    const suggestedUsers = filterredUsers.slice(0, 5);

    suggestedUsers.forEach((user) => (user.password = null));

    res.status(200).json(suggestedUsers);
  } catch (error) {
    console.log(`Error in suggestedUsers: ${error.message}`.red.bold);
    res.status(500).json({ message: error.message });
  }
};

const followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToFollow = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString())
      return res.status(400).json({ error: "You cannot follow yourself" });

    if (!userToFollow || !currentUser)
      return res.status(404).json({ error: "User not found" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      // Unfollow user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(200).json({ message: "Successfuly unfollowed" });
    } else {
      // Follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      res.status(200).json({ message: "Successfuly followed" });
    }
  } catch (error) {
    console.log(`Error in followUser: ${error.message}`.red.bold);
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
    ]);

    res.status(200).json(users);
  } catch (error) {
    console.log(`Error in getAllUsers: ${error.message}`.red.bold);
    res.status(500).json({ message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getProfileByUsername,
  suggestedUsers,
  followUser,
  getAllUsers,
};
