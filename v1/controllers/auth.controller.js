import { agregarUsuarioService, ingresarUsuarioService } from "../services/auth.services.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const login = async (req, res) => {
    const { token, email, _id } = await ingresarUsuarioService(req.body);
    res.json({ message: 'Login exitoso', token, email, userId: _id});
};

export const register = async (req, res) => {
    
    const { email, password, rol } = req.body;
    const { token } = await agregarUsuarioService({ email, password, rol});
    res.status(201).json({ message: 'Usuario Registrado con éxito', token, email });
};