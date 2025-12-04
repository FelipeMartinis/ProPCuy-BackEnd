import SubCategoria from "../models/subCategoria.model.js"

export const crearSubCategoriaService = async({
    nombre})=> {
        
        const categoriaExistente = await SubCategoria.findOne({ nombre });
        if (categoriaExistente) {
                const error = new Error("La Sub Categoria ya existe");
                error.status = 409; // Conflict
                throw error;
                } 
        else{
            const nuevaSubCategoria = new SubCategoria({nombre})
                await nuevaSubCategoria.save();
                return {nuevaSubCategoria}
    }
    }