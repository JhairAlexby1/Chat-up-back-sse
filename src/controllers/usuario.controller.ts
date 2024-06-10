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
        notificarClientes();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const logout = async (req: Request, res: Response) => {
    try {
        const token = req.cookies['token'];
        if (!token) return res.status(401).json({ message: 'Usuario no logeaado' });
        const payload: any = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log(payload);

        await UsuarioService.logout(payload.id);

        res.clearCookie('token');
        notificarClientes();
        return  res.status(200).json({ message: 'Usuario deslogueado correctamente' });
        
    } catch (error: any) {
        return res.status(500).json({ error: error.message });

    }
};

const esperarNotificaciones = (req: Request, res: Response) => {
    conexionesPendientes.push(res);
};

const notificarClientes = async () => {
    const usuariosConectados = await UsuarioService.obtenerUsuariosConectados();
    while (conexionesPendientes.length > 0) {
        const res = conexionesPendientes.pop();
        res?.status(200).json({ usuariosConectados });
    }
};

export default { index, create, login, indexConected, logout, esperarNotificaciones };
