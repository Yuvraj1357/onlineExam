import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import testRoutes from './routes/testRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is connected!' });
  });
app.use('/api/users', userRoutes);  
app.use('/api/tests', testRoutes);
app.use('/api/questions', questionRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
