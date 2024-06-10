import express from "express";

import ChatController from "../controllers/chat.controller";

const router = express.Router();

router.get("/", ChatController.index);
router.post("/", ChatController.create);

export default router;