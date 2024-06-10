import {ChatType} from './chat.type';
export interface UsuarioType
{
  _id: number;
  nombre: string;
  email: string;
  password: string;
  conectado: boolean;
  chats: ChatType[];
}
export interface UsuarioInputType
{
  nombre: string;
  email: string;
  password: string;
  chats: ChatType[];
}