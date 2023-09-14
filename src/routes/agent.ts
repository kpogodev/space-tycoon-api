import express from 'express';
import { createAgent} from '../controllers/agent';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(authMiddleware, createAgent)


export default router;