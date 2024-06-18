import mongoose from "mongoose";

const webhookSchema = new mongoose.Schema({
    url: { type: String, required: true },
});

export default mongoose.model('Webhook', webhookSchema);