import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
} from "../controllers/User.js";
import { VerifyToken } from "../VerifyToken.js";

const router = express.Router();

router.put("/:id", VerifyToken, updateUser);

router.delete("/:id", VerifyToken, deleteUser);

router.get("/find/:id", getUser);

router.put("/sub/:id", VerifyToken, subscribe);

router.put("/unsub/:id", VerifyToken, unsubscribe);

router.put("/like/:videoId", VerifyToken, like);

router.put("/dislike/:videoId", VerifyToken, dislike);

export default router;
