import express from 'express';
import { startTest, submitTest } from '../controllers/testController.js';
import authMiddleware from '../config/authMiddleware.js';

const router = express.Router();

router.post('/start', startTest);
router.post('/submit', submitTest);

export default router;
