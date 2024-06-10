import MensajeService from "../services/mensaje.service";

import { Request, Response } from "express";

const index = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const mensajes = await MensajeService.obtenerMensajes(id);
        return res.status(200).json(mensajes);
    }
    catch(error: any){
        res.status(500).json({error: error.message});
    }
}

const create = async (req: Request, res: Response) => {
    try{
        const {texto, usuario, chat} = req.body;
        await MensajeService.crearMensaje({texto, usuario, chat});
        return res.status(201).json({message: 'Mensaje creado correctamente'});
    }
    catch(error: any){
        res.status(500).json({error: error.message});
    }
}

export default {index, create};