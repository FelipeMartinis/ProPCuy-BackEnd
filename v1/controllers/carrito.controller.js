import {
    armarCarritoService,
    quitarProductoService,
    vaciarCarritoService,
    actualizarCantidadService,
    cerrarCarritoService
} from "../services/carrito.services.js";

import Carrito from "../models/carrito.model.js";


// 📌 Obtener carrito abierto del usuario (opcional pero MUY útil)
export const obtenerCarritoController = async (req, res, next) => {
    try {
        const usuarioId = req.user.id;

        const carrito = await Carrito.findOne({ usuario: usuarioId, estado: "abierto" })
            .populate("productos.producto");

        if (!carrito) {
            return res.json({
                message: "El usuario no tiene un carrito abierto",
                carrito: null
            });
        }

        res.json({ carrito });

    } catch (err) {
        next(err);
    }
};


// 🛒 Agregar producto
export const agregarProductoController = async (req, res, next) => {
    try {
        const usuarioId = req.user.id;
        const { productoId, cantidad } = req.body;

        const carrito = await armarCarritoService(usuarioId, productoId, cantidad);

        res.json({
            message: "Producto agregado al carrito",
            carrito
        });

    } catch (err) {
        next(err);
    }
};


// ❌ Quitar producto
export const quitarProductoController = async (req, res, next) => {
    try {
        const usuarioId = req.user.id;
        const { productoId } = req.params;

        const carrito = await quitarProductoService(usuarioId, productoId);

        res.json({
            message: "Producto eliminado del carrito",
            carrito
        });

    } catch (err) {
        next(err);
    }
};


// 🧹 Vaciar carrito entero
export const vaciarCarritoController = async (req, res, next) => {
    try {
        const usuarioId = req.user.id;

        const carrito = await vaciarCarritoService(usuarioId);

        res.json({
            message: "Carrito vaciado correctamente",
            carrito
        });

    } catch (err) {
        next(err);
    }
};


// 🔄 Actualizar cantidad de un producto
export const actualizarCantidadController = async (req, res, next) => {
    try {
        const usuarioId = req.user.id;
        const { productoId, nuevaCantidad } = req.body;

        const carrito = await actualizarCantidadService(usuarioId, productoId, nuevaCantidad);

        res.json({
            message: "Cantidad actualizada correctamente",
            carrito
        });

    } catch (err) {
        next(err);
    }
};


// ✔ Finalizar compra (cerrar carrito)
export const cerrarCarritoController = async (req, res, next) => {
    try {
        const usuarioId = req.user.id;

        const carrito = await cerrarCarritoService(usuarioId);

        res.json({
            message: "Compra finalizada con éxito",
            carrito
        });

    } catch (err) {
        next(err);
    }
};
