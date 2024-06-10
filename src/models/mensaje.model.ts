import mongoose from 'mongoose';

const mensajeSchema = new mongoose.Schema({
    texto: { type: String, required: true},
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat'},
});

export default mongoose.model('Mensaje', mensajeSchema);