import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TestPage.css'; // Make sure your CSS file is correctly named and imported
import { useNavigate } from 'react-router-dom';
const TestPage = () => {
  const navigate=useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submittedAnswers, setSubmittedAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get('/api/questions/getQues');
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setSubmittedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    
    try {
      // Ensure the submittedAnswers is in the correct format
      const formattedAnswers = Object.entries(submittedAnswers).map(([questionId, answer]) => ({
        questionId,
        answer,
      }));
      await axios.post('/api/tests/submit', { testId:formattedAnswers.questionId, submittedAnswers: formattedAnswers.answer });
      // alert('Test submitted successfully');
    } catch (error) {
      console.error('Error submitting test:', error.response ? error.response.data : error.message);
      // alert('Error submitting test. Please check the console for details.');
    }
    navigate('/finish');
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mt-sm-5 my-1">
      {currentQuestion ? (
        <div className="question ml-sm-5 pl-sm-5 pt-2">
          <div className="py-2 h5"><b>Q. {currentQuestion.text}</b></div>
          <div className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
            {currentQuestion.options.map((option) => (
              <label className="options" key={option}>
                {option}
                <input
                  type="radio"
                  name={currentQuestion._id}
                  value={option}
                  checked={submittedAnswers[currentQuestion._id] === option}
                  onChange={() => handleAnswerChange(currentQuestion._id, option)}
                />
                <span className="checkmark"></span>
              </label>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
      <div className="d-flex align-items-center pt-3">
        <div id="prev">
          <button className="btn btn-primary" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
            Previous
          </button>
        </div>
        <div className="ml-auto mr-sm-5">
          <button className="btn btn-success" onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
            Next
          </button>
        </div>
      </div>
      {questions.length > 0 && currentQuestionIndex === questions.length - 1 && (
        <div className="text-center mt-4">
          <button className="btn btn-success" onClick={handleSubmit}>
            Submit Test
          </button>
        </div>
      )}
    </div>
  );
};

export default TestPage;
