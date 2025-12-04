import Usuario from "../models/usuario.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const agregarUsuarioService = async ({ email, password, rol }) => {
    // Verificar si el usuario ya existe

    const usuarioExistente = await Usuario.findOne({ email });
    
    
    if (usuarioExistente) {
        const error = new Error("El usuario ya existe");
        error.status = 409; // Conflict
        throw error;
    }


    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new Usuario({ email, password: hashedPassword, rol});
        await newUser.save();

        const token = jwt.sign({ _id: newUser._id, rol }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return { token, email };
    } catch (error) {
        error.status = 500;
        error.message = error.message || "Error al crear usuario";
        throw error;
    }
};

export const ingresarUsuarioService = async ({email, password }) => {
    try {
        const user = await Usuario.findOne({ email });
        if (!user) {
            const error = new Error("Credenciales inválidas");
            error.status = 401; 
            throw error;
        }
        const passwordValido = bcrypt.compareSync(password, user.password);
        if (!passwordValido) {
            const error = new Error("Credenciales inválidas");
            error.status = 401; 
            throw error;
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return { token, email, _id: user._id };

    } catch (error) {
        error.details = "contraseña y/o usuario incorrecto";
        if (!error.status) error.status = 500;
        if (!error.message) error.message = 'Internal server error';
        throw error;
    }
};