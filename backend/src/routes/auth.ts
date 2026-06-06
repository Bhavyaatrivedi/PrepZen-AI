import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { validateRequest } from '../middlewares/validateRequest';
import { asyncHandler } from '../middlewares/asyncHandler';
import { registerSchema, loginSchema } from '../validators/authValidator';

const router = Router();

router.post('/register', validateRequest(registerSchema), asyncHandler(register));
router.post('/login', validateRequest(loginSchema), asyncHandler(login));

export default router;
