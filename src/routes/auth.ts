import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/auth';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(authMiddleware, logoutUser)


export default router;