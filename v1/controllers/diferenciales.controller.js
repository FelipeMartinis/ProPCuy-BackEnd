import { crearDiferencialService } from "../services/diferencial.services.js";


export const crearDiferencial= async (req, res) => {
    const {nombre} = req.body
    const nuevoDiferencial = await crearDiferencialService(req.body)
    res.status(201).json(nuevoDiferencial)
}