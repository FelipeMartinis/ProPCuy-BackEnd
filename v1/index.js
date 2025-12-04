import express from "express";
import usuariosRouter from "./routes/usuarios.routes.js";
import authRouter from "./routes/auth.routes.js";
import productosRouter from "./routes/productos.routes.js"
import categoriasRouter from "./routes/categorias.routes.js"
import subCategoriasRouter from "./routes/subCategorias.routes.js"
import { authenticate } from "./middlewares/auth.middleware.js";
import  diferencialRouter  from "./routes/diferenciales.routes.js";
import carritoRouter from "./routes/carrito.routes.js"

const router = express.Router({mergeParams: true});


router.use("/carrito", carritoRouter)
router.use("/diferencial", diferencialRouter)
router.use("/subCategorias", subCategoriasRouter)
router.use("/categorias", categoriasRouter)
router.use("/productos", productosRouter)
router.use("/usuarios", usuariosRouter)
router.use("/auth", authRouter)

//router.use(authenticate)



export default router;

