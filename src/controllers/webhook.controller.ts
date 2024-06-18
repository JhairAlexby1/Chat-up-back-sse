import WebhookService from "../services/webhook.service";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UsuarioService from "../services/usuario.service";

const index = async (req: Request, res: Response) => {
    try {
        const webhooks = await WebhookService.obtenerWebhooks();
        return res.status(200).json(webhooks);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const token = req.cookies['token'];
        if (!token) return res.status(401).json({ message: 'Usuario no logeado' });
        const payload: any = jwt.verify(token, process.env.JWT_SECRET as string);
        const usuario = await UsuarioService.obtenerUsuarioPorId(payload.id);
        if (!usuario) return res.status(401).json({ message: 'Usuario no logeado' });
        if (usuario.webHook) return res.status(400).json({ message: 'El usuario ya tiene un webhook' });
        const webhook = await WebhookService.crearWebhook(req.body);
        usuario.webHook = webhook._id;
        await usuario.save();
        return res.status(201).json({ message: "Webhook creado correctamente" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export default { index, create };