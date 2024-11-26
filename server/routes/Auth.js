import express from "express";
import { signup, signin, Logout } from "../controllers/Auth.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/logout", Logout);

router.post("/google");

export default router;
