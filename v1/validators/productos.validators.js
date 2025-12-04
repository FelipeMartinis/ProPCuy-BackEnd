import Joi from "joi";
import JoiObjectId from "joi-objectid";

Joi.objectId = JoiObjectId(Joi);

export const productoSchema = Joi.object({
    nombre: Joi.string().min(2).max(100).required().messages({
        "string.base": "El nombre debe ser un texto",
        "string.empty": "El nombre no puede estar vacío",
        "string.min": "El nombre debe tener al menos {#limit} caracteres",
        "string.max": "El nombre debe tener como máximo {#limit} caracteres",
        "any.required": "El nombre es obligatorio"
    }),

    descripcion: Joi.string().min(5).max(500).required().messages({
        "string.base": "La descripción debe ser un texto",
        "string.empty": "La descripción no puede estar vacía",
        "string.min": "La descripción debe tener al menos {#limit} caracteres",
        "string.max": "La descripción debe tener como máximo {#limit} caracteres",
        "any.required": "La descripción es obligatoria"
    }),

    precioCompraSinIva: Joi.number().positive().required().messages({
        "number.base": "El precio de compra sin IVA debe ser un número",
        "number.positive": "El precio debe ser mayor a 0",
        "any.required": "El precio de compra sin IVA es obligatorio"
    }),

    precioCompraConIva: Joi.number().positive().messages({
        "number.base": "El precio de compra con IVA debe ser un número",
        "number.positive": "El precio debe ser mayor a 0",
    }),

    precioVenta: Joi.number().positive().messages({
        "number.base": "El precio de venta debe ser un número",
        "number.positive": "El precio debe ser mayor a 0",
        
    }),

    categoria: Joi.objectId().required().messages({
        "any.required": "La categoría es obligatoria",
        "string.pattern.name": "La categoría debe ser un ObjectId válido"
    }),

    subCategoria: Joi.objectId().required().messages({
        "any.required": "La subcategoría es obligatoria",
        "string.pattern.name": "La subcategoría debe ser un ObjectId válido"
    }),

    diferencial: Joi.objectId().required().messages({
        "any.required": "El diferencial es obligatorio",
        "string.pattern.name": "El diferencial debe ser un ObjectId válido"
    }),

    estado: Joi.boolean().messages({
        "boolean.base": "El estado debe ser verdadero o falso"
    }),

    imagen: Joi.string().uri().required().messages({
        "string.base": "La imagen debe ser un texto",
        "string.empty": "La imagen no puede estar vacía",
        "string.uri": "La imagen debe ser una URL válida",
        "any.required": "La imagen es obligatoria"
    })
});
