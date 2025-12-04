import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { validateBody } from '../middlewares/validateBody.middleware.js';
import { loginSchema, registerSchema } from '../validators/auth.validators.js';
const router = express.Router();

router.post('/login', validateBody(loginSchema), login);
router.post('/register', validateBody(registerSchema), register);

export default router;