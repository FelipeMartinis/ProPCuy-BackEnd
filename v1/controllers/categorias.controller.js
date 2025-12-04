import { crearCategoriaService } from "../services/categoria.services.js";


export const crearCategoria= async (req, res) => {
    const {nombre} = req.body
    const nuevaCategoria = await crearCategoriaService(req.body)
    res.status(201).json(nuevaCategoria)
}