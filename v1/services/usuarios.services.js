import Usuario from "../models/usuario.model.js";

export const obtenerUsuariosService = async () => {
    const usuarios = await Usuario.find().populate("rol", "nombre");
    return usuarios;
};


export const obtenerUsuarioPorIdService = async (id) => {
       
    const usuario = await Usuario.findById(id);

    if(!usuario){
        let err = new Error("no se encontró el usuario")
        err.status = 404;
        throw err;
    }
    return usuario
}

