import Usuario from '../models/usuario.model';
import { UsuarioInputType, UsuarioType } from '../types/usuario.type';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { serialize } from "cookie";

export default class UsuarioService {
    public static async crearUsuario(usuario: UsuarioInputType): Promise<void> {
        const usuarioHashed = {
            ...usuario,
            password: await bcrypt.hash(usuario.password, 10),
        };
        const nuevoUsuario = new Usuario(usuarioHashed);
        await nuevoUsuario.save();
    }

    public static async obtenerUsuarioPorEmail(email: string): Promise<any | null> {
        return Usuario.findOne({ email });
    }

    public static async obtenerUsuarioPorId(id: string): Promise<UsuarioType | null> {
        return Usuario.findById(id);
    }

    public static async obtenerUsuarios(): Promise<UsuarioType[]> {
        return Usuario.find();
    }

    public static async obtenerUsuariosConectados(): Promise<UsuarioType[]> {
        return Usuario.find({ conectado: true });
    }

    public static async login(email: string, password: string): Promise<string | null> {
        const usuario = await this.obtenerUsuarioPorEmail(email);
        if (!usuario) return null;

        const esPasswordCorrecto = await bcrypt.compare(password, usuario.password);
        if (!esPasswordCorrecto) return null;

        usuario.conectado = true;
        await usuario.save();

        const secret: string = process.env.JWT_SECRET as string;
        const token = jwt.sign({ id: usuario._id, nombre: usuario.nombre, conectado: usuario.conectado, chats: usuario.chats }, secret, { expiresIn: '1d' });
        return serialize('token', token, {
            maxAge: 60 * 60 * 1000,
            path: '/',
        });
    }

    public static async logout(id: string): Promise<void> {
        await Usuario.findByIdAndUpdate(id, { conectado: false });
    }
}
