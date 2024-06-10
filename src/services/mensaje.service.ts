import MensajeModel from "../models/mensaje.model";
import ChatModel from "../models/chat.model";
import {MensajeInputType, MensajeType} from "../types/mensaje.type";

export default class MensajeService
{
    public static async crearMensaje(mensaje: MensajeInputType): Promise<void>
    {
        const nuevoMensaje = new MensajeModel(mensaje);
        console.log(nuevoMensaje);
        await nuevoMensaje.save();
        const chat = await ChatModel.findById(mensaje.chat);
        console.log(chat);
        chat?.mensajes.push(nuevoMensaje._id);
        await chat?.save();
    }

    public static async obtenerMensajes(): Promise<MensajeType[]>
    {
        return MensajeModel.find();
    }
}