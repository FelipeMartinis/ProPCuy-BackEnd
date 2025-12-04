import express from 'express';
import { obtenerUsuarioPorId, obtenerUsuarios} from '../controllers/usuarios.controller.js';
import { validateObjectIdMiddleware } from '../middlewares/validateObjetId.middleware.js';
const router = express.Router();


router.get("/", obtenerUsuarios);
router.get("/:id",validateObjectIdMiddleware , obtenerUsuarioPorId)


export default router;