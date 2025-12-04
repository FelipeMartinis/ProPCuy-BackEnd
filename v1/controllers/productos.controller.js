import {
    crearProductoService,
    obtenerProductosService,
    obtenerProductosPorCategoriaService,
    editarProductoService,
    eliminarProductoService
} from "../services/productos.services.js";


// Crear producto
export const crearProducto = async (req, res, next) => {
    try {
        const nuevoProducto = await crearProductoService(req.body);
        return res.status(201).json(nuevoProducto);
    } catch (error) {
        next(error);
    }
};


// Obtener todos los productos
export const obtenerProductos = async (req, res, next) => {
    try {
        const productos = await obtenerProductosService();
        return res.status(200).json(productos);
    } catch (error) {
        next(error);
    }
};


// Obtener productos por categoría
export const obtenerProductosPorCategoria = async (req, res, next) => {
    try {
        const { categoriaId } = req.params;

        const productos = await obtenerProductosPorCategoriaService(categoriaId);

        return res.status(200).json(productos);
    } catch (error) {
        next(error);
    }
};


// Editar producto
export const editarProducto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const datosNuevos = req.body;

        const productoModificado = await editarProductoService(id, datosNuevos);

        return res.status(200).json(productoModificado);
    } catch (error) {
        next(error);
    }
};


// Eliminar producto
export const eliminarProducto = async (req, res, next) => {
    try {
        const { id } = req.params;

        const productoEliminado = await eliminarProductoService(id);

        if (!productoEliminado) {
            return res.status(404).json({ message: "El producto no existe" });
        }

        return res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};
