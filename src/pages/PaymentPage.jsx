import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, Clock, Shield, DollarSign } from 'lucide-react';
import './PaymentPage.css';
import logo from '../assets/AROMA.png';

// Import payment service
import * as paymentService from '../services/paymentService';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [error, setError] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');
  const navigate = useNavigate();
  
  // Base API URL - update this to match your actual API base URL
  const API_BASE_URL = 'https://aroma-server.onrender.com';
  
  useEffect(() => {
    // First check user profile to see if quiz is completed
    checkUserProfileForQuizCompletion()
      .then(() => {
        // If quiz isn't marked as completed from profile check,
        // check if there's an error when trying to load the quiz
        if (!quizCompleted) {
          return checkQuizApiForCompletion();
        }
      })
      .catch(error => {
        console.error('Error during startup checks:', error);
      })
      .finally(() => {
        // Load Razorpay script
        loadRazorpay()
          .finally(() => {
            // Set loading to false when all operations are complete
            setIsLoading(false);
          });
      });
  }, []);
  
  // Safe fetch wrapper to handle HTML responses
  const safeFetch = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
      
      // Check if response is HTML (not JSON)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        console.log('Received HTML response instead of JSON');
        throw new Error('Received HTML response from API');
      }
      
      // Parse as JSON
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      return { success: false, error };
    }
  };
  
  // Check user profile from server to see if quiz is completed
  const checkUserProfileForQuizCompletion = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No auth token found, redirecting to login');
        navigate('/');
        return false;
      }
      
      // Try to get user data from localStorage first as a fallback
      try {
        const userString = localStorage.getItem('user');
        if (userString) {
          const userData = JSON.parse(userString);
          console.log('User data from localStorage:', userData);
          
          if (userData && (userData.quizCompleted === true || userData.hasPaid === true)) {
            console.log('Quiz completed/paid status found in localStorage');
            setQuizCompleted(true);
            return true;
          }
        }
      } catch (localStorageError) {
        console.log('Error checking localStorage:', localStorageError);
      }
      
      // Fetch user profile from server
      const result = await safeFetch(`${API_BASE_URL}/api/user/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!result.success) {
        console.log('Failed to fetch profile from API, will try alternative methods');
        return false;
      }
      
      const userData = result.data;
      console.log('User profile data:', userData);
      
      // Check for quizCompleted field - exactly matching MongoDB field name
      if (userData && userData.quizCompleted === true) {
        console.log('Quiz marked as completed in user profile');
        setQuizCompleted(true);
        
        // If there's quiz result data available, save it
        if (userData.quizResult) {
          setQuizData(userData.quizResult);
        }
        
        return true;
      }
      
      // Also check for hasPaid field as seen in MongoDB
      if (userData && userData.hasPaid === true) {
        console.log('User has already paid according to profile');
        setQuizCompleted(true);
        return true;
      }
      
      console.log('Quiz not marked as completed in user profile');
      return false;
      
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return false;
    }
  };
  
  // Check quiz API to see if quiz is already completed
  const checkQuizApiForCompletion = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Try direct method: use the quiz load endpoint
      const result = await safeFetch(`${API_BASE_URL}/api/quiz/load`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!result.success) {
        // If we get an error that mentions 'already completed', it means the quiz is done
        const errorStr = result.error.toString();
        if (errorStr.includes('already completed') || errorStr.includes('Quiz already completed')) {
          console.log('Quiz completion detected from API error');
          setQuizCompleted(true);
          return true;
        }
        return false;
      }
      
      const data = result.data;
      console.log('Quiz load response:', data);
      
      // Check for "already completed" message in response
      if (data && !data.success && data.message && 
          (data.message.includes('already completed') || data.message === 'Quiz already completed')) {
        console.log('Quiz already completed according to API response');
        setQuizCompleted(true);
        
        // If there's result data in the response, save it
        if (data.result) {
          setQuizData(data.result);
        }
        
        return true;
      }
      
      // Alternative approach: Try to check quiz results if they exist
      try {
        const resultsResponse = await safeFetch(`${API_BASE_URL}/api/quiz/results`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (resultsResponse.success && resultsResponse.data) {
          const resultsData = resultsResponse.data;
          console.log('Quiz results data:', resultsData);
          
          // If we have valid results, the quiz must be completed
          if (resultsData.success && resultsData.result && 
              (resultsData.result.passed === true || resultsData.result.score)) {
            console.log('Quiz completed according to results endpoint');
            setQuizCompleted(true);
            setQuizData(resultsData.result);
            return true;
          }
        }
      } catch (resultsError) {
        console.log('Error checking quiz results:', resultsError);
      }
      
      return false;
      
    } catch (error) {
      console.error('Error checking quiz API:', error);
      return false;
    }
  };
  
  // Load Razorpay script
  const loadRazorpay = async () => {
    try {
      await paymentService.loadRazorpayScript();
    } catch (error) {
      console.error('Failed to load Razorpay script:', error);
      setError('Failed to load payment gateway. Please try again later.');
    }
  };
  
  const handleInputChange = (e, field) => {
    if (field.startsWith('card.')) {
      const cardField = field.split('.')[1];
      setCardDetails({ ...cardDetails, [cardField]: e.target.value });
    } else if (field === 'upiId') {
      setUpiId(e.target.value);
    }
  };
  
  const handleProceedToPayment = async () => {
    // If quiz is already completed, navigate to level2
    if (quizCompleted) {
      console.log('Quiz already completed, navigating to Level 2');
      navigate('/level2');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Check once more before proceeding with payment
      const isCompleted = await checkUserProfileForQuizCompletion();
      if (isCompleted || quizCompleted) {
        console.log('Quiz completion detected before payment, redirecting');
        setIsLoading(false);
        navigate('/level2');
        return;
      }
      
      if (paymentMethod === 'razorpay') {
        // Create Razorpay order
        try {
          const { order, key } = await paymentService.createRazorpayOrder(99, 'INR', paymentMethod);
          
          // Get user data for prefill
          const userString = localStorage.getItem('user');
          const user = userString ? JSON.parse(userString) : {};
          
          // Configure Razorpay options
          const options = {
            key,
            amount: order.amount,
            currency: order.currency,
            name: 'Aroma Research Center',
            description: 'Perfumery learning - Entrance Level 1',
            order_id: order.id,
            handler: async function (response) {
              try {
                // Verify payment
                await paymentService.verifyRazorpayPayment({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                });
                
                // Navigate to quiz page
                navigate('/quiz');
              } catch (error) {
                // Check if error indicates quiz is already completed
                const errorStr = typeof error === 'string' 
                  ? error 
                  : (error.message ? error.message : JSON.stringify(error));
                
                if (errorStr.includes('already completed') || errorStr.includes('Quiz already completed')) {
                  console.log('Quiz completion detected during payment verification');
                  setQuizCompleted(true);
                  setIsLoading(false);
                  navigate('/level2');
                } else {
                  setError('Payment verification failed. Please try again.');
                  setIsLoading(false);
                }
              }
            },
            prefill: {
              name: cardDetails.name || user.name || '',
              email: user.email || '',
            },
            theme: {
              color: '#3399cc'
            },
            modal: {
              ondismiss: function() {
                setIsLoading(false);
              }
            }
          };
          
          // Open Razorpay checkout
          const razorpay = await paymentService.openRazorpayCheckout(options);
          
          // Handle payment failure
          razorpay.on('payment.failed', function (response) {
            const errorDescription = response.error?.description || '';
            
            if (errorDescription.includes('already completed') || errorDescription.includes('Quiz already completed')) {
              console.log('Quiz completion detected during payment failure');
              setQuizCompleted(true);
              setTimeout(() => navigate('/level2'), 1000);
            } else {
              setError(`Payment failed: ${errorDescription}`);
              setIsLoading(false);
            }
          });
        } catch (paymentError) {
          // Special handling for 500 (Internal Server Error)
          if (paymentError.message && paymentError.message.includes('500')) {
            console.log('Razorpay returned a 500 error - checking if quiz is already completed');
            
            // After a 500 error, check if the quiz is now completed
            const isNowCompleted = await checkQuizApiForCompletion();
            if (isNowCompleted) {
              console.log('Quiz appears to be completed after payment attempt');
              setIsLoading(false);
              navigate('/level2');
              return;
            }
          }
          
          // Re-throw for general error handling
          throw paymentError;
        }
      } else {
        // Process direct payment for card and UPI options
        try {
          await paymentService.processDirectPayment(99, paymentMethod);
          navigate('/quiz');
        } catch (error) {
          // Check if payment error indicates quiz completion
          const errorStr = typeof error === 'string' ? error : JSON.stringify(error);
          
          if (errorStr.includes('already completed') || errorStr.includes('Quiz already completed')) {
            console.log('Quiz completion detected during direct payment');
            setQuizCompleted(true);
            setIsLoading(false);
            navigate('/level2');
          } else {
            throw error; // Re-throw if it's a different error
          }
        }
      }
    } catch (error) {
      let errorMessage = 'Payment processing failed. Please try again.';
      
      // Try to extract more detailed error message
      if (error.message) {
        try {
          // See if error message is JSON string
          const parsedError = JSON.parse(error.message);
          errorMessage = parsedError.message || errorMessage;
        } catch (e) {
          // If not JSON, use the raw message
          errorMessage = error.message;
        }
      }
      
      setError(errorMessage);
      console.error('Payment error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-header">
        <div className="logo">
          <img src={logo} alt="Aroma Logo" className="logo-image" />
          <span className="logo-text">Aroma Research Center</span>
        </div>
      </div>

      <div className="payment-content">
        <h1 className="payment-title">Payment Options</h1>
        
        <div className="payment-progress">
          <div className="progress-step completed">
            <div className="step-circle">
              <span className="step-indicator"></span>
            </div>
            <p>Authentication</p>
          </div>
          <div className="progress-line"></div>
          
          <div className="progress-step completed">
            <div className="step-circle">
              <span className="step-indicator"></span>
            </div>
            <p>Course Details</p>
          </div>
          <div className="progress-line"></div>
          
          <div className="progress-step completed">
            <div className="step-circle">
              <span className="step-indicator"></span>
            </div>
            <p>Level 1</p>
          </div>
          <div className="progress-line"></div>
          
          <div className="progress-step active">
            <div className="step-circle">
              <span className="step-indicator"></span>
            </div>
            <p>Payment</p>
          </div>
        </div>

        {error && <div className="payment-error">{error}</div>}
        
        {/* Quiz Completed Message */}
        {quizCompleted && (
          <div className="quiz-completed-message">
            <CheckCircle size={24} className="completion-icon" />
            <h3>You've already completed the Level 1 Quiz!</h3>
            <p>You can now proceed to Level 2 without additional payment.</p>
            {quizData && (
              <div className="quiz-result-info">
                {quizData.score && <div className="quiz-score">Score: {quizData.score}%</div>}
                {quizData.correctAnswers && quizData.totalQuestions && (
                  <div className="quiz-detail">
                    Correct answers: {quizData.correctAnswers}/{quizData.totalQuestions}
                  </div>
                )}
                {quizData.certificateId && (
                  <div className="certificate-id">Certificate ID: {quizData.certificateId}</div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="payment-columns">
          <div className="payment-column">
            <div className="order-summary-box">
              <h2>Order Summary</h2>
              <div className="order-details">
                <div className="course-image-container">
                  <div className="course-image"></div>
                </div>
                <div className="course-info">
                  <h3>Perfumery learning - Entrance Level 1</h3>
                  <ul className="course-features">
                    <li><CheckCircle size={16} /> 50 comprehensive quiz questions</li>
                    <li><CheckCircle size={16} /> Digital certification upon completion</li>
                    <li><CheckCircle size={16} /> Access to Level 2 upon passing</li>
                  </ul>
                </div>
              </div>
              <div className="price-details">
                <div className="price-row">
                  <span>Course Fee</span>
                  <span>₹1.00</span>
                </div>
                <div className="price-row">
                  <span>Tax</span>
                  <span>₹0.00</span>
                </div>
                <div className="price-row total">
                  <span>Total</span>
                  <span>₹1.00</span>
                </div>
              </div>
            </div>

            <div className="payment-info">
              <div className="info-item">
                <Clock size={20} />
                <div>
                  <h4>Immediate Access</h4>
                  <p>Start your test right after payment</p>
                </div>
              </div>
              <div className="info-item">
                <Shield size={20} />
                <div>
                  <h4>Secure Transaction</h4>
                  <p>Your payment information is encrypted</p>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-column">
            {!quizCompleted ? (
              <div className="payment-method-section">
                <h2>Payment Method</h2>
                
                <div className={`payment-option ${paymentMethod === 'razorpay' ? 'selected' : ''}`} onClick={() => setPaymentMethod('razorpay')}>
                  <div className="option-select">
                    <div className={`radio-button ${paymentMethod === 'razorpay' ? 'active' : ''}`}></div>
                  </div>
                  <div className="option-text">
                    <DollarSign size={20} />
                    <span>Razorpay</span>
                  </div>
                  <div className="option-icon">Razorpay</div>
                </div>
                
                {paymentMethod === 'razorpay' && (
                  <div className="razorpay-details">
                    <p className="payment-notice">You will be redirected to Razorpay's secure payment gateway to complete your transaction.</p>
                    <div className="razorpay-options">
                      <p>All payment options available:</p>
                      <ul className="payment-methods-list">
                        <li>Credit/Debit Cards</li>
                        <li>Net Banking</li>
                        <li>UPI</li>
                        <li>Wallets</li>
                        <li>EMI</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="completion-info-section">
                <h2>Level 1 Completed</h2>
                <p>You have successfully completed Level 1 of the Perfumery Learning course. You can now proceed to Level 2.</p>
                <div className="achievement-details">
                  <CheckCircle size={20} />
                  <span>Quiz completed</span>
                </div>
                <div className="achievement-details">
                  <CheckCircle size={20} />
                  <span>Certificate earned</span>
                </div>
                {quizData && quizData.certificateId && (
                  <div className="achievement-details">
                    <CheckCircle size={20} />
                    <span>Certificate ID: {quizData.certificateId}</span>
                  </div>
                )}
              </div>
            )}
            
            <button 
              className="proceed-button" 
              onClick={handleProceedToPayment}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  <span>PROCESSING...</span>
                </>
              ) : (
                quizCompleted ? 'GO TO LEVEL 2' : 'PROCEED TO PAY'
              )}
            </button>

            <div className="security-badge">
              <Shield size={18} />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;