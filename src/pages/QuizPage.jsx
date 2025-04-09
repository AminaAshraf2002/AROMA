import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle } from 'lucide-react';
import './QuizPage.css';
import logo from '../assets/AROMA.png'; // Import the logo image

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(50).fill(null));
  const [timeLeft, setTimeLeft] = useState(60 * 30); // 30 minutes
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  // Sample questions - in a real application, you'd have all 50
  const questions = [
    {
      question: "Which of the following is a top note in perfumery?",
      options: ["Vanilla", "Bergamot", "Sandalwood", "Patchouli"],
      answer: 1
    },
    {
      question: "Which extraction method is most commonly used for citrus essential oils?",
      options: ["Steam distillation", "Cold pressing", "Solvent extraction", "CO2 extraction"],
      answer: 1
    },
    {
      question: "What is the main chemical component in lavender essential oil?",
      options: ["Limonene", "Linalool", "Eugenol", "Citral"],
      answer: 1
    },
    {
      question: "Which of these is NOT a basic fragrance family?",
      options: ["Floral", "Woody", "Metallic", "Oriental"],
      answer: 2
    },
    {
      question: "What determines how long a perfume will last on skin?",
      options: ["The concentration of oils", "The fragrance family", "The type of alcohol used", "All of the above"],
      answer: 3
    },
    // Additional questions would be added here to reach 50
  ];
  
  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      submitQuiz();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);
  
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
  
  const submitQuiz = () => {
    setIsSubmitting(true);
    
    // Calculate score
    let correctAnswers = 0;
    selectedOptions.forEach((option, index) => {
      if (index < questions.length && option === questions[index].answer) {
        correctAnswers++;
      }
    });
    
    const percentage = Math.round((correctAnswers / questions.length) * 100);
    
    // In a real app, you would send this to a server
    setTimeout(() => {
      navigate('/certificate', { 
        state: { 
          score: percentage,
          correctAnswers,
          totalQuestions: questions.length
        } 
      });
    }, 1500);
  };
  
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
              <div className="progress-text">of {questions.length}</div>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="question-navigator">
            <h3>Question Navigator</h3>
            <div className="nav-grid">
              {Array.from({ length: questions.length }).map((_, index) => (
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
              {questions[currentQuestion].question}
            </p>
            
            <div className="options-container">
              {questions[currentQuestion].options.map((option, index) => (
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
              
              {currentQuestion < questions.length - 1 ? (
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