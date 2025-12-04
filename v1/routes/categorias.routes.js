import express from 'express';
import { Router } from "express";
import { crearCategoria } from '../controllers/categorias.controller.js';

const router = Router();


router.post("/", crearCategoria)

export default router;