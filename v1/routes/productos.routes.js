import { Router } from "express";
import {
    crearProducto,
    obtenerProductos,
    obtenerProductosPorCategoria,
    editarProducto,
    eliminarProducto
} from "../controllers/productos.controller.js";

const router = Router();

router.post("/", crearProducto);
router.get("/", obtenerProductos);
router.get("/:categoriaId", obtenerProductosPorCategoria);
router.put("/:id", editarProducto);
router.delete("/:id", eliminarProducto);

export default router;
