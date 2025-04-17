import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, Clock, Shield, DollarSign } from 'lucide-react';
import './PaymentPage.css';
import logo from '../assets/AROMA.png'; // Import the logo image

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const navigate = useNavigate();
  
  const handleProceedToPayment = () => {
    // Navigate to the quiz page
    navigate('/quiz');
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

        <div className="payment-columns">
          <div className="payment-column">
            <div className="order-summary-box">
              <h2>Order Summary</h2>
              <div className="order-details">
                <div className="course-image-container">
                  <div className="course-image"></div>
                </div>
                <div className="course-info">
                  <h3> Perfumery learning - Entrance Level 1 
                  </h3>
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
                  <span>$99.00</span>
                </div>
                <div className="price-row">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="price-row total">
                  <span>Total</span>
                  <span>$99.00</span>
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
              
              <div className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`} onClick={() => setPaymentMethod('card')}>
                <div className="option-select">
                  <div className={`radio-button ${paymentMethod === 'card' ? 'active' : ''}`}></div>
                </div>
                <div className="option-text">
                  <CreditCard size={20} />
                  <span>Credit/Debit Card</span>
                </div>
                <div className="option-icon">VISA</div>
              </div>
              
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
              
              <div className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`} onClick={() => setPaymentMethod('upi')}>
                <div className="option-select">
                  <div className={`radio-button ${paymentMethod === 'upi' ? 'active' : ''}`}></div>
                </div>
                <div className="option-text">
                  <DollarSign size={20} />
                  <span>UPI</span>
                </div>
                <div className="option-icon">UPI</div>
              </div>

              {paymentMethod === 'card' && (
                <div className="card-details">
                  <div className="form-group">
                    <label>Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input type="text" placeholder="MM/YY" />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input type="text" placeholder="123" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input type="text" placeholder="John Doe" />
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
                    <input type="text" placeholder="yourname@upi" />
                  </div>
                  <p className="payment-notice">Enter your UPI ID to make a direct payment.</p>
                </div>
              )}
            </div>
            
            <button className="proceed-button" onClick={handleProceedToPayment}>
              PROCEED TO PAY
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