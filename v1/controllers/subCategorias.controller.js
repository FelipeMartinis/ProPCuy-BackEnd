import { crearSubCategoriaService } from "../services/subCategorias.services.js";


export const crearSubCategoria= async (req, res) => {
    const {nombre} = req.body
    const nuevaSubCategoria = await crearSubCategoriaService(req.body)
    res.status(201).json(nuevaSubCategoria)
}