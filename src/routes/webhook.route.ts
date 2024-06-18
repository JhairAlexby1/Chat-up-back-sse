import express  from "express";
import WebhookController from "../controllers/webhook.controller";
const router = express.Router();

router.get("/", WebhookController.index);
router.post("/", WebhookController.create);

export default router;