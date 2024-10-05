import { Router } from 'express';
import { register, login, forgotPassword, changePassword } from './auth.controller';

const router = Router();

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Forgot password
router.post('/forgot-password', forgotPassword);

// Change password
router.patch('/change-password', changePassword);

const authRoutes = router;
export default authRoutes;
