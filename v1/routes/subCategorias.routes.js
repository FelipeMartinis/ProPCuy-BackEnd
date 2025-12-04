
import { Router } from "express";
import { crearSubCategoria } from '../controllers/subCategorias.controller.js';

const router = Router();


router.post("/", crearSubCategoria)

export default router;