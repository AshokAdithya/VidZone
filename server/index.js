import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from "./routes/User.js";
import VideoRoutes from "./routes/Video.js";
import CommentRoutes from "./routes/Comment.js";
import AuthRoutes from "./routes/Auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/video", VideoRoutes);
app.use("/api/comment", CommentRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something Wrong";
  return res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
});

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      throw err;
    });
};

app.listen(8080, () => {
  connect();
  console.log("Listening on port 8080");
});
