import {MensajeType} from "./mensaje.type";

export interface ChatType
{
  _id: number;
  usuario: string;
  mensajes: MensajeType[];
}

export interface ChatInputType
{
  usuario: string;
  mensajes: MensajeType[];
}
