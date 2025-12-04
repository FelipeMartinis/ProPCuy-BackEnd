import Diferencial from "../models/diferencial.model.js"

export const crearDiferencialService = async({
    nombre})=> {
        
        const diferencialExistente = await Diferencial.findOne({ nombre });
        if (diferencialExistente) {
                const error = new Error("El diferencial ya existe");
                error.status = 409; // Conflict
                throw error;
                } 
        else{
            const nuevoDiferencial = new Diferencial({nombre})
                await nuevoDiferencial.save();
                return {nuevoDiferencial}
    }
    }