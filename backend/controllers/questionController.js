import Question from '../models/Question.js';

export const createQuestion = async (req, res) => {
  const { text, options, correctAnswer } = req.body;

  try {
    const question = new Question({ text, options, correctAnswer });
    await question.save();

    res.status(201).json({ message: 'Question created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
