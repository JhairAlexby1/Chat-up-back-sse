import ChatService from "../services/chat.service";

import { Request, Response } from "express";

const index = async (req: Request, res: Response) => {
    try{
        const chats = await ChatService.obtenerChats();
        return res.status(200).json(chats);
    }
    catch(error: any){
        res.status(500).json({error: error.message});
    }
}

const create = async (req: Request, res: Response) => {
    try{
        await ChatService.crearChat(req.body);
        return res.status(201).json({message: 'Chat creado correctamente'});
    }
    catch(error: any){
        res.status(500).json({error: error.message});
    }
}

export default {index, create};