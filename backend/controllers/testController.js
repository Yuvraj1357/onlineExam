import Test from '../models/Test.js';

export const startTest = async (req, res) => {
  const { userId, questions } = req.body;

  try {
    const test = new Test({ user: userId, questions });
    await test.save();
    res.status(201).json({ testId: test._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const submitTest = async (req, res) => {
  const { testId, submittedAnswers } = req.body;

  try {
    const test = await Test.findById(testId);
    test.submittedAnswers = submittedAnswers;
    await test.save();

    res.status(200).json({ message: 'Test submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
