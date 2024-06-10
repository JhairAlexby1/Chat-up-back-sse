import {WebSocketServer} from "ws";
import MensajeService from "../services/mensaje.service";


const wss = new WebSocketServer({port: 3030}, () => {console.log("WebSocketServer started")});

wss.on("connection", (ws) => {
    ws.on("message", async (message: any) => {
        const messageParsed = JSON.parse(message);
        console.log(`Received message => ${messageParsed}`);
        console.log(messageParsed.event);
        if (messageParsed.event === "message"){
            console.log(messageParsed.data);
            await MensajeService.crearMensaje({texto: messageParsed.data.texto, usuario: messageParsed.data.usuario, chat: messageParsed.data.chat})
            const mensajes = await MensajeService.obtenerMensajes();
            ws.send(JSON.stringify({event: "messages", data: mensajes}))
        }
        if (messageParsed.event === "listening")
            {
                console.log("Listening");
                const mensajes = await MensajeService.obtenerMensajes();
                ws.send(JSON.stringify({event: "messages", data: mensajes}))
            }
    });
});