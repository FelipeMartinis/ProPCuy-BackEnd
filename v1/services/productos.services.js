import Producto from "../models/producto.model.js";
import Categoria from "../models/categoria.model.js"

export const crearProductoService = async({
    nombre, descripcion, precioCompraSinIva, categoria, subCategoria, diferencial, estado, imagen})=> {
        
        const precioCompraConIva = precioCompraSinIva * 1.22;
        const precioVenta = precioCompraConIva * 1.14;
        const productoExistente = await Producto.findOne({ nombre });
        if (productoExistente) {
                const error = new Error("El Producto ya existe");
                error.status = 409; // Conflict
                throw error;
                } 
        else{
            const nuevoProducto = new Producto({nombre, descripcion, precioCompraSinIva, precioCompraConIva, precioVenta, categoria, subCategoria, diferencial, estado, imagen})
                await nuevoProducto.save();
                return {nuevoProducto}
    }
    }


export const obtenerProductosService = async () => {
    const productos = await Producto.find();
    return productos;
    
}

export const obtenerProductosPorCategoriaService = async (categoriaId) => {


    const productos = await Producto.find({ categoria: categoriaId });

    if (!productos || productos.length === 0) {
        const err = new Error("No se encontraron productos para esa categoría");
        err.status = 404;
        throw err;
    }

    return productos;
};


export const editarProductoService = async (id, datosNuevos) => {

    // Si cambia el precio base, recalculamos los otros
    if (datosNuevos.precioCompraSinIva) {
        datosNuevos.precioCompraConIva = datosNuevos.precioCompraSinIva * 1.22;
        datosNuevos.precioVenta = datosNuevos.precioCompraConIva * 1.14;
    }

    const productoModificado = await Producto.findByIdAndUpdate(id, datosNuevos, { new: true });

    if (!productoModificado) {
        const err = new Error("No se encontró el producto");
        err.status = 404;
        throw err;
    }

    return productoModificado;
};


export const eliminarProductoService = async (id) => {
    const productoElim = await Producto.findByIdAndDelete(id)
    return productoElim;
}
