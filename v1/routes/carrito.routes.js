import { Router } from "express";
import {
    obtenerCarritoController,
    agregarProductoController,
    quitarProductoController,
    vaciarCarritoController,
    actualizarCantidadController,
    cerrarCarritoController
} from "../controllers/carrito.controller.js";

const router = Router();

// 🛒 Obtener carrito actual del usuario
router.get("/", obtenerCarritoController);

// ➕ Agregar producto al carrito
router.post("/agregar", agregarProductoController);

// ❌ Quitar producto del carrito
router.delete("/quitar/:productoId", quitarProductoController);

// 🧹 Vaciar carrito
router.delete("/vaciar", vaciarCarritoController);

// 🔄 Actualizar cantidad
router.put("/cantidad", actualizarCantidadController);

// ✔ Finalizar compra
router.post("/cerrar", cerrarCarritoController);

export default router;
