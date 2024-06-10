import express from "express";

import ChatController from "../controllers/chat.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", verifyToken, ChatController.index);
router.post("/", verifyToken, ChatController.create);

export default router;