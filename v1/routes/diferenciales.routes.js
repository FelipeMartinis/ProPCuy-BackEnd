import express from 'express';
import { Router } from "express";
import { crearDiferencial } from '../controllers/diferenciales.controller.js';

const router = Router();


router.post("/", crearDiferencial)

export default router;