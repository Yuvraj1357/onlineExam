import express from 'express';
import { createQuestion, getQuestions } from '../controllers/questionController.js';

const router = express.Router();

router.post('/create', createQuestion);
router.get('/getQues',getQuestions)

export default router;
