import cron from 'node-cron';
import Test from '../models/Test.js';
import sendEmail from '../utils/sendEmail.js';

cron.schedule('0 * * * *', async () => {
  try {
    const tests = await Test.find({ evaluated: false });

    tests.forEach(async (test) => {
      const score = calculateScore(test);
      test.evaluated = true;
      test.score = score;
      await test.save();
      await sendEmail(test.user.email, 'Test Results', `Your score is: ${score}`);
    });
  } catch (error) {
    console.error('Error running cron job:', error.message);
  }
});

function calculateScore(test) {
  // Implement scoring logic here
  return Math.floor(Math.random() * 100); // Placeholder logic
}
