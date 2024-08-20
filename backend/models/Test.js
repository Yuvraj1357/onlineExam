import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  submittedAnswers: [{ questionId: String, answer: String }],
  evaluated: { type: Boolean, default: false },
  score: { type: Number },
});

const Test = mongoose.model('Test', testSchema);
export default Test;
