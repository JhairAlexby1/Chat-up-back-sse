import UsuarioService from "../services/usuario.service";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

let conexionesPendientes: Response[] = [];

const index = async (req: Request, res: Response) => {
    try {
        const usuarios = await UsuarioService.obtenerUsuarios();
        return res.status(200).json(usuarios);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const indexConected = async (req: Request, res: Response) => {
    try {
        const usuarios = await UsuarioService.obtenerUsuariosConectados();
        return res.status(200).json(usuarios);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req: Request, res: Response) => {
    try {
        await UsuarioService.crearUsuario(req.body);
        notificarClientes(); // Notificar a los clientes cuando se crea un usuario
        return res.status(201).json({ message: "Usuario creado correctamente" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const token = await UsuarioService.login(req.body.email, req.body.password);
        if (!token)
            return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
        res.header("Set-Cookie", token);
        res.status(200).send();
        notificarClientes(); // Notificar a los clientes cuando un usuario inicia sesión
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const logout = async (req: Request, res: Response) => {
    try {
        const token = req.cookies['token'];
        if (!token) return res.status(401).json({ message: 'Usuario no logeado' });
        const payload: any = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log(payload);

        await UsuarioService.logout(payload.id);

        res.clearCookie('token');
        notificarClientes(); // Notificar a los clientes cuando un usuario cierra sesión
        return res.status(200).json({ message: 'Usuario deslogeado correctamente' });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

const esperarNotificaciones = (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    conexionesPendientes.push(res);
    req.on('close', () => {
        conexionesPendientes = conexionesPendientes.filter(client => client !== res);
    });
};

const notificarClientes = async () => {
    const usuariosTotales = await UsuarioService.obtenerUsuarios();
    conexionesPendientes.forEach(client => {
        client.write(`data: ${JSON.stringify({ totalUsuarios: usuariosTotales.length })}\n\n`);
    });
};

export default { index, create, login, indexConected, logout, esperarNotificaciones };
