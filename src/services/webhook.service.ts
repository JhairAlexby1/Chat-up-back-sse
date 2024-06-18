import Webhook from '../models/webhook.model';
import { WebhookInputType, WebhookType } from '../types/webhook.type';
import UsuarioModel from "../models/usuario.model";

export default class WebhookService {
    public static async crearWebhook(webhook: WebhookInputType): Promise<WebhookType> {
        const nuevoWebhook = new Webhook(webhook);
        await nuevoWebhook.save();
        return nuevoWebhook;
    }

    public static async obtenerWebhooks(): Promise<WebhookType[]> {
        return Webhook.find();
    }

    public static async obtenerWebhookPorId(id: string): Promise<WebhookType | null> {
        return Webhook.findById(id);
    }
}


