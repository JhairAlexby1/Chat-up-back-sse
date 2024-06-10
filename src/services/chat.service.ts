import ChatModel from "../models/chat.model";
import UsuarioModel from "../models/usuario.model";
import {ChatInputType, ChatType} from "../types/chat.type";

export default class ChatService
{
    public static async crearChat(chat: ChatInputType): Promise<void>
    {
        const nuevoChat = new ChatModel(chat);
        await nuevoChat.save();
        const usuario = await UsuarioModel.findById(chat.usuario);
        usuario?.chats.push(nuevoChat._id);
        await usuario?.save();
    }

    public static async obtenerChats(): Promise<ChatType[]>
    {
        return ChatModel.find();
    }
}