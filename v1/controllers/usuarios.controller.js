import { obtenerUsuariosService, obtenerUsuarioPorIdService} from "../services/usuarios.services.js";


export const obtenerUsuarios = async (req, res) => {
    const usuarios = await obtenerUsuariosService();
    res.json({ message: 'Lista de usuarios', usuarios });
};

export const obtenerUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    const usuario = await obtenerUsuarioPorIdService(id);
    res.status(200).json(usuario);
}
