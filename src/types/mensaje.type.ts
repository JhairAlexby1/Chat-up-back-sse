export interface MensajeType
{
  _id: number;
  texto: string;
  usuario: string;
  chat: string;
}

export interface MensajeInputType
{
  texto: string;
  usuario: string;
  chat: string;
}