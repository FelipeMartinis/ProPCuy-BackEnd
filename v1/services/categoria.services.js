import Categoria from "../models/categoria.model.js"

export const crearCategoriaService = async({
    nombre})=> {
        
        const categoriaExistente = await Categoria.findOne({ nombre });
        if (categoriaExistente) {
                const error = new Error("La Categoria ya existe");
                error.status = 409; // Conflict
                throw error;
                } 
        else{
            const nuevaCategoria = new Categoria({nombre})
                await nuevaCategoria.save();
                return {nuevaCategoria}
    }
    }