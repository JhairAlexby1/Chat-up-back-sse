import MensajeService from "../services/mensaje.service";

import { Request, Response } from "express";
import UsuarioService from "../services/usuario.service";
import WebhookService from "../services/webhook.service";
import jwt from "jsonwebtoken";
import axios from "axios";

const index = async (req: Request, res: Response) => {
    try{

        const mensajes = await MensajeService.obtenerMensajes();
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
        const token = req.cookies['token'];
        const payload: any = jwt.verify(token, process.env.JWT_SECRET as string);
        const usuarioWebhook = await UsuarioService.obtenerUsuarioPorId(payload.id);
        if(usuarioWebhook.webHook){
            await enviarRespaldo(usuarioWebhook.webHook);
        }
        return res.status(201).json({message: 'Mensaje creado correctamente'});
    }
    catch(error: any){
        res.status(500).json({error: error.message});
    }
}

const enviarRespaldo = async (webhook: string) => {
    const webhookUrl =  await WebhookService.obtenerWebhookPorId(webhook);
    if (!webhookUrl) return;
    const mensajes = await MensajeService.obtenerMensajes();
    await axios.post(webhookUrl.url, mensajes);
}


export default {index, create};