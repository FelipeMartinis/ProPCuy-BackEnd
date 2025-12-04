import Joi from "joi";

export const diferencialSchema = Joi.object({
    nombre: Joi.string().min(2).max(50).required().messages({
        "string.base": "El nombre debe ser un texto",
        "string.empty": "El nombre no puede estar vacío",
        "string.min": "El nombre debe tener al menos {#limit} caracteres",
        "string.max": "El nombre debe tener como máximo {#limit} caracteres",
        "any.required": "El nombre es obligatorio"
    })
});
