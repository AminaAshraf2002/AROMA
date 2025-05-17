import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, Clock, Shield, DollarSign, TagIcon } from 'lucide-react';
import './PaymentPage.css';
import logo from '../assets/AROMA.png';

// Import payment service
import * as paymentService from '../services/paymentService';
// Import quiz service - for checking quiz status
import * as quizService from '../services/quizService';

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
  
  // Original and discounted price
  const originalPrice = 2500;
  const discountPercent = 50;
  const discountAmount = originalPrice * (discountPercent / 100);
  const finalPrice = originalPrice - discountAmount;
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // Start by checking if quiz is completed
    checkQuizCompletionStatus()
      .finally(() => {
        // Load Razorpay script
        paymentService.loadRazorpayScript()
          .finally(() => {
            // Set loading to false when all operations are complete
            setIsLoading(false);
          });
      });
  }, []);
  
  // Check quiz completion from all available sources
  const checkQuizCompletionStatus = async () => {
    try {
      // Method 1: Check local storage for user data that indicates completion
      if (checkLocalStorageForQuizCompletion()) {
        return true;
      }
      
      // Method 2: Try to get quiz questions - if this fails with "already completed", then quiz is done
      try {
        await quizService.getQuizQuestions();
        // If we get here without error, quiz is not completed
        console.log('Quiz not yet completed - questions loaded successfully');
        return false;
      } catch (error) {
        console.log('Error from quiz questions:', error);
        // Check if error indicates quiz completion
        const errorStr = error.toString();
        if (errorStr.includes('already completed') || errorStr.includes('Quiz already completed')) {
          console.log('Quiz completion detected from quiz service error');
          setQuizCompleted(true);
          return true;
        }
      }
      
      // Method 3: Check for payment history - if user has paid, assume they've completed the quiz
      try {
        const paymentHistory = await paymentService.getPayments();
        console.log('Payment history:', paymentHistory);
        
        if (paymentHistory && paymentHistory.payments && paymentHistory.payments.length > 0) {
          // If there's at least one successful payment, mark as completed
          const hasSuccessfulPayment = paymentHistory.payments.some(
            payment => payment.status === 'paid' || payment.status === 'completed'
          );
          
          if (hasSuccessfulPayment) {
            console.log('Quiz marked as completed based on payment history');
            setQuizCompleted(true);
            return true;
          }
        }
      } catch (paymentError) {
        console.log('Error fetching payment history:', paymentError);
      }
      
      return false;
    } catch (error) {
      console.error('Error checking quiz completion status:', error);
      return false;
    }
  };
  
  // Check localStorage for quiz completion indicators
  const checkLocalStorageForQuizCompletion = () => {
    try {
      // First check user data
      const userString = localStorage.getItem('user');
      if (userString) {
        const userData = JSON.parse(userString);
        console.log('User data from localStorage:', userData);
        
        // Check for various fields that might indicate quiz completion
        if (userData && (
            userData.quizCompleted === true || 
            userData.hasPaid === true || 
            userData.level > 1 || 
            userData.passed === true ||
            userData.quizPassed === true
        )) {
          console.log('Quiz completion indicators found in localStorage');
          setQuizCompleted(true);
          return true;
        }
      }
      
      // Also check for quiz result in localStorage
      const quizResultString = localStorage.getItem('quizResult');
      if (quizResultString) {
        try {
          const quizResult = JSON.parse(quizResultString);
          if (quizResult && (quizResult.passed === true || quizResult.completed === true)) {
            console.log('Quiz completion found in stored quiz result');
            setQuizCompleted(true);
            setQuizData(quizResult);
            return true;
          }
        } catch (e) {
          console.log('Error parsing quiz result from localStorage:', e);
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error checking localStorage:', error);
      return false;
    }
  };
  
  // Handle 500 error from Razorpay
  const handle500Error = async () => {
    console.log('Handling 500 error from payment gateway');
    
    // First check if we now have any indication of quiz completion
    if (await checkQuizCompletionStatus()) {
      return true;
    }
    
    // Ask user if they want to proceed to level 2
    const shouldProceed = window.confirm(
      "We encountered an issue with the payment. This might be because you've already completed the quiz. " +
      "Would you like to proceed to Level 2?"
    );
    
    if (shouldProceed) {
      setQuizCompleted(true);
      
      // Save quiz completed status to localStorage for future reference
      try {
        const userString = localStorage.getItem('user');
        if (userString) {
          const userData = JSON.parse(userString);
          userData.quizCompleted = true;
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } catch (e) {
        console.error('Error updating localStorage:', e);
      }
      
      return true;
    }
    
    return false;
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
      await checkQuizCompletionStatus();
      
      if (quizCompleted) {
        console.log('Quiz completion detected before payment, redirecting');
        setIsLoading(false);
        navigate('/level2');
        return;
      }
      
      if (paymentMethod === 'razorpay') {
        try {
          // Create Razorpay order with the discounted price
          const orderData = await paymentService.createRazorpayOrder(finalPrice, 'INR', paymentMethod);
          
          if (!orderData || !orderData.order || !orderData.key) {
            throw new Error('Invalid order data received from server');
          }
          
          const { order, key } = orderData;
          
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
                
                // Update local storage to indicate payment completed
                try {
                  const userString = localStorage.getItem('user');
                  if (userString) {
                    const userData = JSON.parse(userString);
                    userData.hasPaid = true;
                    localStorage.setItem('user', JSON.stringify(userData));
                  }
                } catch (e) {
                  console.error('Error updating localStorage:', e);
                }
                
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
                } else if (errorStr.includes('500') || errorStr.includes('Internal Server Error')) {
                  // Try 500 error handler
                  const isCompletedAfter500 = await handle500Error();
                  if (isCompletedAfter500) {
                    navigate('/level2');
                    return;
                  } else {
                    setError('Payment verification failed. Please try again.');
                  }
                  setIsLoading(false);
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
          razorpay.on('payment.failed', async function (response) {
            const errorDescription = response.error?.description || '';
            
            if (errorDescription.includes('already completed') || errorDescription.includes('Quiz already completed')) {
              console.log('Quiz completion detected during payment failure');
              setQuizCompleted(true);
              setTimeout(() => navigate('/level2'), 1000);
              return;
            } else if (errorDescription.includes('500') || errorDescription.includes('Internal Server Error') || 
                       response.error?.code === 'BAD_REQUEST_ERROR') {
              // Try 500 error handler
              const isCompletedAfter500 = await handle500Error();
              if (isCompletedAfter500) {
                navigate('/level2');
                return;
              }
            }
            
            setError(`Payment failed: ${errorDescription}`);
            setIsLoading(false);
          });
        } catch (paymentError) {
          // Special handling for 500 (Internal Server Error)
          const errorStr = typeof paymentError === 'string' ? 
            paymentError : JSON.stringify(paymentError);
          
          if (errorStr.includes('500') || errorStr.includes('Internal Server Error')) {
            const isCompletedAfter500 = await handle500Error();
            if (isCompletedAfter500) {
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
          await paymentService.processDirectPayment(finalPrice, paymentMethod);
          
          // Update local storage to indicate payment completed
          try {
            const userString = localStorage.getItem('user');
            if (userString) {
              const userData = JSON.parse(userString);
              userData.hasPaid = true;
              localStorage.setItem('user', JSON.stringify(userData));
            }
          } catch (e) {
            console.error('Error updating localStorage:', e);
          }
          
          navigate('/quiz');
        } catch (error) {
          // Check if payment error indicates quiz completion
          const errorStr = typeof error === 'string' ? error : JSON.stringify(error);
          
          if (errorStr.includes('already completed') || errorStr.includes('Quiz already completed')) {
            console.log('Quiz completion detected during direct payment');
            setQuizCompleted(true);
            setIsLoading(false);
            navigate('/level2');
          } else if (errorStr.includes('500') || errorStr.includes('Internal Server Error')) {
            // Try 500 error handler
            const isCompletedAfter500 = await handle500Error();
            if (isCompletedAfter500) {
              setIsLoading(false);
              navigate('/level2');
              return;
            }
            throw error;
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
            <p>You can now proceed to Level 2 </p>
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
                  <span>₹{originalPrice}</span>
                </div>
                <div className="price-row discount">
                  <span className="discount-label">
                    <TagIcon size={16} className="discount-icon" />
                    Special Discount (50%)
                  </span>
                  <span className="discount-value">-₹{discountAmount}</span>
                </div>
                <div className="price-row total">
                  <span>Total</span>
                  <span>₹{finalPrice}</span>
                </div>
              </div>
              
              {/* Coupon badge */}
              
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