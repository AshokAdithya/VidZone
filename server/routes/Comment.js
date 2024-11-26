import express from "express";
import { VerifyToken } from "../VerifyToken.js";
import {
  addComment,
  deleteComment,
  getComment,
} from "../controllers/Comment.js";

const router = express.Router();

router.post("/", VerifyToken, addComment);
router.delete("/:id", VerifyToken, deleteComment);
router.get("/:videoId", getComment);

export default router;
