import express from "express";
import "dotenv/config";
import "colors";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/connectDB.js";

import userRoutes from "./routes/user.js";

const app = express();
connectDB();

const SERVER_ORIGIN =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.yourdomain.com";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: SERVER_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => res.send("Hello Worlddd!"));

// Routes
app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => console.log("Server running...".rainbow));
