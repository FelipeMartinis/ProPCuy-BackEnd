import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().email().min(3).max(30).required(),
    password: Joi.string().required()
});

export const registerSchema = Joi.object({
    email: Joi.string().email().min(3).max(30).required().messages({
        "string.base": "El nombre debe ser un texto",
        "string.empty": "El nombre no puede estar vacío",
        "string.email": "Se debe ingresar un email valido",
        "string.min": "El nombre debe tener al menos {#limit} caracteres",
        "string.max": "El nombre debe tener como máximo {#limit} caracteres",
        "any.required": "El nombre es obligatorio"
    }),
    password: Joi.string().min(6).required().messages({
            "string.base": "La contraseña debe ser un texto",
            "string.empty": "La contraseña no puede estar vacía",
            "string.min": "La contraseña debe tener al menos {#limit} caracteres",
            "any.required": "La contraseña es obligatoria"
        }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
            "any.only": "Las contraseñas no coinciden",
            "any.required": "Debe repetir la contraseña"
        }),
        rol: Joi.string(),

});
