import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle } from 'lucide-react';
import './QuizPage.css';
import logo from '../assets/AROMA.png'; // Import the logo image
import axios from 'axios'; // Import axios for making API requests

const API_BASE_URL = 'https://aroma-server.onrender.com/api';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(50).fill(null));
  const [timeLeft, setTimeLeft] = useState(60 * 30); // 30 minutes
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [quizId, setQuizId] = useState('');
  const navigate = useNavigate();
  
  // Fetch quiz questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/quiz`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setQuestions(response.data.questions);
          setQuizId(response.data.quizId);
          
          // If there's a started quiz, adjust the timer
          if (response.data.startedAt) {
            const startTime = new Date(response.data.startedAt);
            const currentTime = new Date();
            const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
            const remainingTime = Math.max(60 * 30 - elapsedSeconds, 60); // At least 1 minute
            setTimeLeft(remainingTime);
          }
          
          setIsLoading(false);
        } else {
          setError(response.data.message || 'Failed to load quiz');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load quiz:', error);
        if (error.response && error.response.status === 403) {
          // If payment is required
          navigate('/payment');
        } else {
          setError('Failed to load quiz. Please try again later.');
          setIsLoading(false);
        }
      }
    };

    fetchQuestions();
  }, [navigate]);
  
  // Timer effect
  useEffect(() => {
    if (isLoading || timeLeft <= 0) {
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
      
      // Auto-submit when time is up
      if (timeLeft <= 1) {
        submitQuiz();
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, isLoading]);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleOptionSelect = (optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };
  
  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const submitQuiz = async () => {
    try {
      setIsSubmitting(true);
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      
      // Calculate how many questions were answered
      const answeredCount = selectedOptions.filter(option => option !== null).length;
      
      // Show confirmation if less than 80% of questions answered and there's time left
      if (answeredCount < questions.length * 0.8 && timeLeft > 60) {
        const confirmSubmit = window.confirm(`You've only answered ${answeredCount} out of ${questions.length} questions. Are you sure you want to submit?`);
        
        if (!confirmSubmit) {
          setIsSubmitting(false);
          return;
        }
      }
      
      // Submit answers to server
      const response = await axios.post(
        `${API_BASE_URL}/quiz/submit`, 
        { 
          answers: selectedOptions.slice(0, questions.length),
          quizId 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.success) {
        // Navigate to certificate page with result
        navigate('/certificate', { 
          state: response.data.result
        });
      } else {
        setError(response.data.message || 'Failed to submit quiz');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Failed to submit quiz:', error);
      setError('Failed to submit quiz. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="quiz-loading">
        <div className="logo">
          <img src={logo} alt="Aroma Logo" className="logo-image" />
          <span className="logo-text">Aroma Research Center</span>
        </div>
        <div className="loading-message">
          <div className="spinner"></div>
          <h2>Loading Quiz Questions...</h2>
          <p>Please wait while we prepare your quiz.</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="quiz-error">
        <div className="logo">
          <img src={logo} alt="Aroma Logo" className="logo-image" />
          <span className="logo-text">Aroma Research Center</span>
        </div>
        <div className="error-message">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  // Use a local version of questions array if the backend didn't return questions
  const displayQuestions = questions.length > 0 ? questions : [
    {
      "question": "What is the primary solvent used in perfume production?",
      "options": ["Water", "Alcohol", "Oil", "Glycerin"]
    },
    // Add more questions as needed for fallback
  ];
  
  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <div className="logo">
          <img src={logo} alt="Aroma Logo" className="logo-image" />
          <span className="logo-text">Aroma Research Center</span>
        </div>
        <div className="timer">
          <Clock size={18} />
          <span className="time-label">Time Remaining:</span>
          <span className="time-value">{formatTime(timeLeft)}</span>
        </div>
      </div>
      
      <div className="quiz-container">
        <div className="quiz-sidebar">
          <div className="quiz-progress-info">
            <h3>Your Progress</h3>
            <div className="progress-circle">
              <div className="progress-number">{currentQuestion + 1}</div>
              <div className="progress-text">of {displayQuestions.length}</div>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentQuestion + 1) / displayQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="question-navigator">
            <h3>Question Navigator</h3>
            <div className="nav-grid">
              {Array.from({ length: displayQuestions.length }).map((_, index) => (
                <div
                  key={index}
                  className={`nav-item ${currentQuestion === index ? 'active' : ''} ${
                    selectedOptions[index] !== null ? 'answered' : ''
                  }`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="quiz-content">
          <div className="question-card">
            <h2 className="question-number">Question {currentQuestion + 1}</h2>
            <p className="question-text">
              {displayQuestions[currentQuestion]?.question}
            </p>
            
            <div className="options-container">
              {displayQuestions[currentQuestion]?.options.map((option, index) => (
                <div 
                  key={index}
                  className={`option ${selectedOptions[currentQuestion] === index ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <div className="option-selector">
                    <span className="option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <div className="option-text">{option}</div>
                  {selectedOptions[currentQuestion] === index && (
                    <CheckCircle className="check-icon" size={20} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="question-actions">
              <button 
                className="action-button" 
                onClick={goToPreviousQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              
              {currentQuestion < displayQuestions.length - 1 ? (
                <button 
                  className="action-button primary" 
                  onClick={goToNextQuestion}
                >
                  Next
                </button>
              ) : (
                <button 
                  className="action-button submit" 
                  onClick={submitQuiz}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;