import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, Clock, Shield, DollarSign } from 'lucide-react';
import './PaymentPage.css';
import logo from '../assets/AROMA.png';

// Import payment service
import * as paymentService from '../services/paymentService';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load Razorpay script on component mount
    paymentService.loadRazorpayScript()
      .catch(error => {
        console.error('Failed to load Razorpay script:', error);
        setError('Failed to load payment gateway. Please try again later.');
      });
  }, []);
  
  const handleInputChange = (e, field) => {
    if (field.startsWith('card.')) {
      const cardField = field.split('.')[1];
      setCardDetails({ ...cardDetails, [cardField]: e.target.value });
    } else if (field === 'upiId') {
      setUpiId(e.target.value);
    }
  };
  
  const handleProceedToPayment = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      if (paymentMethod === 'razorpay') {
        // Create Razorpay order
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
              setError('Payment verification failed. Please try again.');
              setIsLoading(false);
            }
          },
          prefill: {
            name: cardDetails.name || user.name || '',
            email: user.email || '',
          },
          theme: {
            color: '#3399cc'
          }
        };
        
        // Open Razorpay checkout
        const razorpay = await paymentService.openRazorpayCheckout(options);
        
        // Handle payment failure
        razorpay.on('payment.failed', function (response) {
          setError(`Payment failed: ${response.error.description}`);
          setIsLoading(false);
        });
      } else {
        // Process direct payment for card and UPI options
        await paymentService.processDirectPayment(99, paymentMethod);
        navigate('/quiz');
      }
    } catch (error) {
      let errorMessage = 'Payment processing failed. Please try again.';
      
      // Try to extract more detailed error message
      if (error.message) {
        try {
          const parsedError = JSON.parse(error.message);
          errorMessage = parsedError.message || errorMessage;
        } catch (e) {
          errorMessage = error.message;
        }
      }
      
      setError(errorMessage);
      console.error('Payment error:', error);
    } finally {
      // For non-Razorpay methods, we set isLoading to false here
      if (paymentMethod !== 'razorpay') {
        setIsLoading(false);
      }
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
            <div className="payment-method-section">
              <h2>Payment Method</h2>
              
              {/* <div className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`} onClick={() => setPaymentMethod('card')}>
                <div className="option-select">
                  <div className={`radio-button ${paymentMethod === 'card' ? 'active' : ''}`}></div>
                </div>
                <div className="option-text">
                  <CreditCard size={20} />
                  <span>Credit/Debit Card</span>
                </div>
                <div className="option-icon">VISA</div>
              </div>
               */}
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
              
              {/* <div className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`} onClick={() => setPaymentMethod('upi')}>
                <div className="option-select">
                  <div className={`radio-button ${paymentMethod === 'upi' ? 'active' : ''}`}></div>
                </div>
                <div className="option-text">
                  <DollarSign size={20} />
                  <span>UPI</span>
                </div>
                <div className="option-icon">UPI</div>
              </div> */}

              {paymentMethod === 'card' && (
                <div className="card-details">
                  <div className="form-group">
                    <label>Card Number</label>
                    <input 
                      type="text" 
                      placeholder="1234 5678 9012 3456" 
                      value={cardDetails.number}
                      onChange={(e) => handleInputChange(e, 'card.number')}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input 
                        type="text" 
                        placeholder="MM/YY" 
                        value={cardDetails.expiryDate}
                        onChange={(e) => handleInputChange(e, 'card.expiryDate')}
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input 
                        type="text" 
                        placeholder="123" 
                        value={cardDetails.cvv}
                        onChange={(e) => handleInputChange(e, 'card.cvv')}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      value={cardDetails.name}
                      onChange={(e) => handleInputChange(e, 'card.name')}
                    />
                  </div>
                </div>
              )}

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

              {paymentMethod === 'upi' && (
                <div className="upi-details">
                  <div className="form-group">
                    <label>UPI ID</label>
                    <input 
                      type="text" 
                      placeholder="yourname@upi" 
                      value={upiId}
                      onChange={(e) => handleInputChange(e, 'upiId')}
                    />
                  </div>
                  <p className="payment-notice">Enter your UPI ID to make a direct payment.</p>
                </div>
              )}
            </div>
            
            <button 
              className="proceed-button" 
              onClick={handleProceedToPayment}
              disabled={isLoading}
            >
              {isLoading ? 'PROCESSING...' : 'PROCEED TO PAY'}
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