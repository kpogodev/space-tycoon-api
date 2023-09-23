import express from 'express';
import { createAgent, getAgents, getAgent, getAgentsList, getAgentToken} from '../controllers/agent';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(authMiddleware, createAgent).get(authMiddleware, getAgents);
router.route('/list').get(authMiddleware, getAgentsList);
router.route('/:id').get(authMiddleware, getAgent);
router.route('/token/:id').get(authMiddleware, getAgentToken);


export default router;