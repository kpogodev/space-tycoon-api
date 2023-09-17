import express from 'express';
import { registerUser, loginUser, logoutUser, checkUser } from '../controllers/auth';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(authMiddleware, logoutUser)
router.route('/check').post(authMiddleware, checkUser)

export default router;