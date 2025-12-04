import express from 'express';
import connectDB from './config/db.js';
import v1Router from "./index.js";
import dotenv from "dotenv";
import cors from 'cors';
import { notFoundMiddleware } from './middlewares/notFound.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { validateObjectIdMiddleware } from './middlewares/validateObjetId.middleware.js';

dotenv.config();

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());



app.get("/", (req, res) => {
  res.send("API funcionando en Render 🚀");
});


//middleware 
app.use("/v1", v1Router);

//middleware de Ruta no encontrada
app.use(notFoundMiddleware);
//middleware de errores
app.use(errorMiddleware);

//app.use(validateObjectIdMiddleware);



export default app;

