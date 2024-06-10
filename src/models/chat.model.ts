import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, required: true },
    mensajes: {default: [], type: [mongoose.Schema.Types.ObjectId]} 
});

export default mongoose.model('Chat', chatSchema);