import express from "express";
import {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  trend,
  random,
  sub,
  tags,
  search,
} from "../controllers/Video.js";
import { VerifyToken } from "../VerifyToken.js";

const router = express.Router();

router.post("/", VerifyToken, addVideo);
router.put("/:id", VerifyToken, updateVideo);
router.delete("/:id", VerifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", addView);
router.get("/random", random);
router.get("/trend", trend);
router.get("/sub", VerifyToken, sub);
router.get("/tags", tags);
router.get("/search", search);

export default router;
