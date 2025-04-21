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
      "question": "What is the primary solvent used in perfume production?",
      "options": ["Water", "Alcohol", "Oil", "Glycerin"],
      "answer": 1
    },
    {
      "question": "Which note evaporates the fastest?",
      "options": ["Base", "Middle", "Top", "Heart"],
      "answer": 3
    },
    {
      "question": "The process of diluting the concentrated fragrance oils with a solvent (usually alcohol) is crucial for:",
      "options": [
        "Enhancing the color of the perfume",
        "Making the fragrance safe for skin application and controlling its intensity",
        "Preserving the natural essential oils",
        "Increasing the perfume's shelf life indefinitely"
      ],
      "answer": 2
    },
    {
      "question": "The process of distillation, crucial for extracting essential oils, was significantly advanced by:",
      "options": ["The Egyptians", "The Romans", "Arab chemists", "The Chinese"],
      "answer": 3
    },
    {
      "question": "Chanel No. 5 was created in what year?",
      "options": ["1901", "1911", "1921", "1931"],
      "answer": 3
    },
    {
      "question": "Which flower is known as the 'Queen of Flowers' in perfumery?",
      "options": ["Lavender", "Rose", "Jasmine", "Violet"],
      "answer": 2
    },
    {
      "question": "Which spice is often used in oriental perfumes?",
      "options": ["Basil", "Cinnamon", "Dill", "Parsley"],
      "answer": 2
    },
    {
      "question": "The creator of the original 'Eau de Cologne' was:",
      "options": [
        "Jean-François Houbigant",
        "Johann Maria Farina",
        "Pierre-François Lubin",
        "François Coty"
      ],
      "answer": 2
    },
    {
      "question": "Which aromatic ingredient is derived from a whale?",
      "options": ["Musk", "Ambergris", "Civet", "Castoreum"],
      "answer": 2
    },
    {
      "question": "What is the primary reason for using synthetic aroma chemicals in modern perfumery?",
      "options": [
        "They are always cheaper than natural ingredients.",
        "They can replicate scents that are difficult or impossible to extract naturally.",
        "They are inherently safer for the skin than natural oils.",
        "They always provide a more complex and nuanced scent profile."
      ],
      "answer": 2
    },
    {
      "question": "What is the term for a fragrance that smells like the forest floor?",
      "options": ["Powdery", "Earthy", "Citrus", "Gourmand"],
      "answer": 2
    },
    {
      "question": "Which aromatic ingredient is known for its calming, herbaceous scent?",
      "options": ["Lemon", "Lavender", "Cinnamon", "Clove"],
      "answer": 2
    },
    {
      "question": "What is the term for a fragrance that smells like a campfire?",
      "options": ["Fruity", "Smoked", "Marine", "Floral"],
      "answer": 2
    },
    {
      "question": "A prominent Arab chemist credited with significant advancements in perfume making is:",
      "options": ["Avicenna (Ibn Sina)", "Al-Razi (Rhazes)", "Jabir ibn Hayyan (Geber)", "Al-Khwarizmi"],
      "answer": 1
    },
    {
      "question": "Which aromatic ingredient is known for its warm, spicy scent and is often used in winter fragrances?",
      "options": ["Sandalwood", "Ginger", "Vetiver", "Patchouli"],
      "answer": 2
    },
    {
      "question": "Which aromatic ingredient is derived from a grass root?",
      "options": ["Patchouli", "Vetiver", "Sandalwood", "Myrrh"],
      "answer": 2
    },
    {
      "question": "What is the term for a fragrance that smells like the sea?",
      "options": ["Fruity", "Marine/Aquatic", "Spicy", "Floral"],
      "answer": 2
    },
    {
      "question": "Sandalwood essential oil, valued for its creamy and woody scent, traditionally comes from:",
      "options": ["China", "Australia and India", "Argentina", "South Africa"],
      "answer": 2
    },
    {
      "question": "Gas chromatography-mass spectrometry (GC-MS) is a technique used in perfumery to:",
      "options": [
        "Visually analyze the color of perfume ingredients.",
        "Separate and identify the individual chemical components of a fragrance, both natural and synthetic.",
        "Determine the pH level of a perfume formulation.",
        "Measure the sillage and longevity of a perfume on the skin."
      ],
      "answer": 2
    },
    {
      "question": "What are 'essential oils'?",
      "options": [
        "Fatty oils used as a base for perfumes",
        "Concentrated, volatile aromatic compounds extracted from plants",
        "Synthetic aroma chemicals created in a laboratory",
        "Diluted perfume extracts sold at a lower price"
      ],
      "answer": 2
    },
    {
      "question": "Which flower is a key ingredient in many classic perfumes?",
      "options": ["Tulip", "Jasmine", "Daisy", "Sunflower"],
      "answer": 2
    },
    {
      "question": "One of the first commercially successful perfumes to heavily feature synthetic aldehydes was:",
      "options": ["Jicky by Guerlain", "Chanel No. 5", "L'Air du Temps by Nina Ricci", "Shalimar by Guerlain"],
      "answer": 2
    },
    {
      "question": "The evaluation and refinement of a perfume formula often involves a process called:",
      "options": ["Distillation", "Enfleurage", "Olfactive testing or smelling trials", "Maceration"],
      "answer": 3
    },
    {
      "question": "Which woody note is often used as a base note?",
      "options": ["Lime", "Cedarwood", "Mint", "Grapefruit"],
      "answer": 2
    },
    {
      "question": "What is the weakest concentration of perfume?",
      "options": ["Eau de parfum", "Parfum", "Eau de toilette", "Eau de cologne"],
      "answer": 4
    },
    {
      "question": "Applying perfume to which areas of the body tends to make it last longer due to natural body heat?",
      "options": ["Hair and clothing", "Hands and feet", "Pulse points (wrists, neck, behind ears)", " Areas exposed to the open air"],
      "answer": 3
    },
    {
      "question": "What is the meaning of 'eau de parfum'?",
      "options": ["Light perfume", "Strong perfume", "Perfumed water", "Perfumed oil"],
      "answer": 2
    },
    {
      "question": "Which citrus fruit is used for its fresh, zesty scent?",
      "options": ["Cherry", "Orange", "Plum", "Pear"],
      "answer": 2
    },
    {
      "question": "Which aromatic ingredient is known for its sweet, honey-like scent?",
      "options": ["Rose", "Benzoin", "Sandalwood", "Cedarwood"],
      "answer": 2
    },
    {
      "question": "What is the term for the tool used to test perfumes on paper?",
      "options": ["Beaker", "Pipette", "Blotter strip", "Atomizer"],
      "answer": 3
    },
    {
      "question": "Why is oud essential oil often considered a luxurious and highly valued ingredient in perfume creation?",
      "options": [
        "Because it is easily and cheaply synthesized in large quantities.",
        "Due to its light and universally appealing aroma that blends with everything.",
        "Because of its complex scent profile, rarity, and the labor-intensive extraction process.",
        "Because it is primarily used as a cost-effective fragrance extender."
      ],
      "answer": 3
    },
    {
      "question": "Which country is a major global exporter of Lavender essential oil, widely used in perfumery?",
      "options": ["Italy", "Bulgaria", "Spain", "Greece"],
      "answer": 2
    },
    {
      "question": "Patchouli essential oil, with its distinct earthy and musky aroma, is widely imported from:",
      "options": ["Russia", "Indonesia and India", "Canada", "Chile"],
      "answer": 2
    },
    {
      "question": "Lemon essential oil, another popular citrus top note, has significant production in:",
      "options": ["Greece and Italy", "Turkey and Syria", "Argentina and Uruguay", "Australia and New Zealand"],
      "answer": 1
    },
    {
      "question": "What is a primary role of oud essential oil when used as a note in perfumery?",
      "options": [
        "To provide a light and fleeting top note.",
        "To act as a strong and dominant floral heart note.",
        "To offer a deep, long-lasting base note that anchors other scents.",
        "To function as a volatile fixative that quickly evaporates."
      ],
      "answer": 3
    },
    {
      "question": "The sense of smell, which allows us to perceive fragrances, relies on which type of receptors in the nasal cavity?",
      "options": ["Photoreceptors", "Mechanoreceptors", "Chemoreceptors", "Thermoreceptors"],
      "answer": 3
    },
    {
      "question": "Which factor is increasingly influencing consumer choices in the perfume industry?",
      "options": [
        "Solely the brand name and celebrity endorsements.",
        "Primarily the lowest price point available.",
        "A combination of scent profile, brand values, sustainability efforts, and online reviews.",
        "Only traditional advertising through print media."
      ],
      "answer": 3
    },
    {
      "question": "Which aromatic ingredient is derived from a tree's resin and has a smoky scent?",
      "options": ["Lavender", "Frankincense", "Rosemary", "Thyme"],
      "answer": 2
    },
    {
      "question": "Which aromatic ingredient is known for its warm, spicy scent?",
      "options": ["Mint", "Clove", "Lemon", "Apple"],
      "answer": 2
    },
    {
      "question": "Which aromatic ingredient is known for its warm, nutty scent?",
      "options": ["Lemon", "Almond", "Mint", "Apple"],
      "answer": 2
    },
    {
      "question": "Which factor is increasingly influencing consumer choices in the perfume industry?",
      "options": [
        "Solely the brand name and celebrity endorsements.",
        "Primarily the lowest price point available.",
        "A combination of scent profile, brand values, sustainability efforts, and online reviews.",
        "Only traditional advertising through print media."
      ],
      "answer": 3
    },
    {
      "question": "Which aromatic ingredient is derived from a bulb?",
      "options": ["Rose", "Iris", "Lavender", "Violet"],
      "answer": 2
    },
    {
      "question": "Woody fragrance notes in perfumery are primarily derived from which part of plants?",
      "options": ["Flowers", "Fruits", "Bark, roots, and wood", "Leaves"],
      "answer": 3
    },
    {
      "question": "Which of these is a popular woody note used as a base note in many perfumes, known for its creamy and warm aroma?",
      "options": ["Lemon", "Rose", "Sandalwood", "Mint"],
      "answer": 3
    },
    {
      "question": "Which aromatic ingredient is known for its sweet, floral scent and is often used in high-end perfumes?",
      "options": ["Rose", "Ylang-Ylang", "Lavender", "Violet"],
      "answer": 2
    },
    {
      "question": "Which aromatic ingredient is derived from a flower and has a sweet, powdery scent?",
      "options": ["Rose", "Violet", "Lavender", "Iris"],
      "answer": 2
    },
    {
      "question": "The word 'perfume' comes from the Latin phrase:",
      "options": ["per aqua", "per ignis", "per fumum", "per terra"],
      "answer": 3
    },
    {
      "question": "What is a potential concern associated with the use of some synthetic aroma chemicals in perfumes?",
      "options": [
        "They are always more volatile and evaporate too quickly.",
        "Some individuals may experience skin sensitivity or allergic reactions.",
        "They are less stable and degrade the perfume over time.",
        "They cannot be blended effectively with natural ingredients."
      ],
      "answer": 2
    },
    {
      "question": "The use of synthetic aroma chemicals has significantly impacted the perfume industry by:",
      "options": [
        "Making fine fragrances less accessible to the general public.",
        "Limiting the creative palette available to perfumers.",
        "Enabling the creation of a wider range of scents and often making perfumes more affordable.",
        "Eliminating the need for skilled perfumers."
      ],
      "answer": 3
    },
    {
      "question": "Rubbing your wrists together after applying perfume can cause the scent to fade faster because it:",
      "options": [
        "Increases blood flow and evaporates the perfume quickly.",
        "Damages the fragrance molecules due to friction.",
        "Mixes the perfume with natural skin oils, altering the scent.",
        "Prevents the perfume from properly adhering to the skin."
      ],
      "answer": 2
    }
  
  ];
  
    // Additional questions would be added here to reach 50
  
  
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