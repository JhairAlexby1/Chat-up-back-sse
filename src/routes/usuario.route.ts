import express from "express";
import UsuarioController from "../controllers/usuario.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", UsuarioController.index);
router.post("/", UsuarioController.create);
router.post("/login", UsuarioController.login);
router.get("/conected", verifyToken, UsuarioController.indexConected);
router.post("/logout", verifyToken, UsuarioController.logout);
router.get("/esperarNotificaciones", verifyToken, UsuarioController.esperarNotificaciones);

export default router;
