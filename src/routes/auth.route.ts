import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

router.post(
	'/customer/google',
	authController.customerGoogleSignIn
);
export { router as authRoutes };
