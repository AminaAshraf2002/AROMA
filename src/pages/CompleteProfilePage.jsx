// CompleteProfilePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronRight } from 'lucide-react';
import './CompleteProfilePage.css';

import backgroundImg from '../assets/image.jpeg';
import logo from '../assets/AROMA.png';

// Define the API base URL - same as in your LoginPage.jsx
const API_BASE_URL = 'http://localhost:3000';

const CompleteProfilePage = () => {
  const [countryCode, setCountryCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if token exists, if not redirect to login
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      console.log('Sending profile update with token:', token ? token.substring(0, 10) + '...' : 'None');
      console.log('Country code:', countryCode);
      
      // Send country code to backend with the correct URL
      const response = await fetch(`${API_BASE_URL}/api/auth/complete-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ countryCode })
      });
      
      // Try to get response text regardless of status
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      // Try to parse as JSON if possible
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        throw new Error(`Server response was not valid JSON: ${responseText}`);
      }
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}${data ? ` - ${data.message || ''}` : ''}`);
      }
      
      // If we got here, we successfully parsed the response
      if (data.success) {
        // Store updated user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Navigate to main page after profile completion
        navigate('/about');
      } else {
        setError(data.message || 'Failed to update profile');
        console.error('Failed to update profile:', data.message);
      }
    } catch (error) {
      setError(error.message || 'Error updating profile. Please try again.');
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="country-page">
      {/* Background like login page */}
      <div className="country-background">
        <img src={backgroundImg} alt="" className="country-bg-image" />
        <div className="country-overlay"></div>
      </div>
      
      <div className="country-content">
        <div className="country-card-container">
          <div className="country-card">
            <div className="country-header">
              <div className="country-logo">
                <img src={logo} alt="AROMA Logo" />
              </div>
              <h2>Complete Your Profile</h2>
              <p>Please select your country to continue</p>
            </div>
            
            {error && <div className="country-error">{error}</div>}
            
            <form onSubmit={handleSubmit} className="country-form">
              <div className="country-input-group">
                <MapPin className="country-input-icon" size={18} />
                <select
                  className="country-select"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  required
                >
                  <option value="">Select your country</option>
                  <option value="US">United States</option>
                  <option value="IN">India</option>
                  <option value="GB">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                  <option value="BR">Brazil</option>
                  <option value="SG">Singapore</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="ZA">South Africa</option>
                  <option value="IT">Italy</option>
                  <option value="MX">Mexico</option>
                </select>
              </div>
              
              <button 
                type="submit" 
                className="country-submit-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="country-spinner"></span>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            </form>
            
            <div className="country-note">
              <p>This helps us provide location-specific content for your perfumery journey</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfilePage;