import Carrito from "../models/carrito.model.js";
import Producto from "../models/producto.model.js";
import mongoose from "mongoose";

export const armarCarritoService = async (usuarioId, productoId, cantidad = 1) => {

    // Validar que los IDs sean válidos
    if (!mongoose.Types.ObjectId.isValid(productoId)) {
        const err = new Error("ID de producto inválido");
        err.status = 400;
        throw err;
    }

    if (usuarioId && !mongoose.Types.ObjectId.isValid(usuarioId)) {
        const err = new Error("ID de usuario inválido");
        err.status = 400;
        throw err;
    }

    // Buscar el producto
    const producto = await Producto.findById(productoId);
    if (!producto) {
        const err = new Error("El producto no existe");
        err.status = 404;
        throw err;
    }

    // Buscar carrito abierto del usuario
    let carrito = await Carrito.findOne({ usuario: usuarioId, estado: "abierto" });

    // Si no existe, crear uno
    if (!carrito) {
        carrito = new Carrito({
            usuario: usuarioId,
            productos: [],
            total: 0
        });
    }

    // Revisar si el producto ya está en el carrito
    const itemExistente = carrito.productos.find(
        (item) => item.producto.toString() === productoId
    );

    if (itemExistente) {
        // Sumar cantidad si ya existe
        itemExistente.cantidad += cantidad;
    } else {
        // Agregar nuevo
        carrito.productos.push({
            producto: productoId,
            cantidad
        });
    }

    // Recalcular total
    carrito.total = await calcularTotalCarrito(carrito.productos);

    // Guardar carrito
    await carrito.save();

    return carrito;
};

// Función auxiliar para sumar los precios de los productos del carrito
const calcularTotalCarrito = async (items) => {
    let total = 0;

    for (const item of items) {
        const producto = await Producto.findById(item.producto);
        if (producto) {
            total += producto.precio * item.cantidad;
        }
    }

    return total;
};


//QUITAR PRODUCTO
export const quitarProductoService = async (usuarioId, productoId) => {
    if (!mongoose.Types.ObjectId.isValid(productoId)) {
        const err = new Error("ID de producto inválido");
        err.status = 400;
        throw err;
    }

    const carrito = await Carrito.findOne({ usuario: usuarioId, estado: "abierto" });

    if (!carrito) {
        const err = new Error("No existe un carrito abierto para este usuario");
        err.status = 404;
        throw err;
    }

    const cantidadInicial = carrito.productos.length;

    carrito.productos = carrito.productos.filter(
        item => item.producto.toString() !== productoId
    );

    if (carrito.productos.length === cantidadInicial) {
        const err = new Error("El producto no está en el carrito");
        err.status = 404;
        throw err;
    }

    // Recalcular total
    carrito.total = await calcularTotalCarrito(carrito.productos);

    await carrito.save();

    return carrito;
};

// VACIAR CARRITO

export const vaciarCarritoService = async (usuarioId) => {
    if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
        const err = new Error("ID de usuario inválido");
        err.status = 400;
        throw err;
    }

    const carrito = await Carrito.findOne({ usuario: usuarioId, estado: "abierto" });

    if (!carrito) {
        const err = new Error("No existe un carrito abierto para este usuario");
        err.status = 404;
        throw err;
    }

    carrito.productos = [];
    carrito.total = 0;

    await carrito.save();

    return carrito;
};


//Actualizar cantidad

export const actualizarCantidadService = async (usuarioId, productoId, nuevaCantidad) => {
    if (!mongoose.Types.ObjectId.isValid(productoId)) {
        const err = new Error("ID de producto inválido");
        err.status = 400;
        throw err;
    }

    if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
        const err = new Error("ID de usuario inválido");
        err.status = 400;
        throw err;
    }

    if (typeof nuevaCantidad !== "number" || nuevaCantidad < 1) {
        const err = new Error("La cantidad debe ser un número mayor o igual a 1");
        err.status = 400;
        throw err;
    }

    const carrito = await Carrito.findOne({ usuario: usuarioId, estado: "abierto" });

    if (!carrito) {
        const err = new Error("No existe un carrito abierto para este usuario");
        err.status = 404;
        throw err;
    }

    // Buscar el producto dentro del carrito
    const item = carrito.productos.find(
        (p) => p.producto.toString() === productoId
    );

    if (!item) {
        const err = new Error("El producto no está en el carrito");
        err.status = 404;
        throw err;
    }

    // Actualizar cantidad
    item.cantidad = nuevaCantidad;

    // Recalcular total
    carrito.total = await calcularTotalCarrito(carrito.productos);

    await carrito.save();

    return carrito;
};

export const cerrarCarritoService = async (usuarioId) => {

    if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
        const err = new Error("ID de usuario inválido");
        err.status = 400;
        throw err;
    }

    // Buscar carrito abierto
    const carrito = await Carrito.findOne({ usuario: usuarioId, estado: "abierto" }).populate("productos.producto");

    if (!carrito) {
        const err = new Error("No existe un carrito abierto para este usuario");
        err.status = 404;
        throw err;
    }

    if (carrito.productos.length === 0) {
        const err = new Error("No se puede cerrar un carrito vacío");
        err.status = 400;
        throw err;
    }

    // Cambiar estado del carrito
    carrito.estado = "cerrado";
    carrito.fechaCierre = new Date();

    // Guardar carrito
    await carrito.save();

    return carrito;
};
