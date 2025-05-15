import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';
import './LoginPage.css';

// Import images directly
import perfumeBottleImg from '../assets/img1.jpg';
import backgroundImg from '../assets/image.jpeg';
import logo from '../assets/AROMA.png';

// Use your backend URL - could also be set from an environment variable
const API_BASE_URL = 'https://aroma-server.onrender.com';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isGoogleButtonVisible, setIsGoogleButtonVisible] = useState(true);
  const [showManualSignIn, setShowManualSignIn] = useState(false);

  // Initialize AOS and Google Sign-In
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true
    });

    // Load Google Sign-In API
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      
      script.onload = initializeGoogleSignIn;
    };

    loadGoogleScript();

    // Cleanup function
    return () => {
      // Remove any lingering Google sign-in elements
      const googleSignInElements = document.querySelectorAll('[data-google-signin]');
      googleSignInElements.forEach(el => el.remove());
    };
  }, []);

  // Show instructions to reset permissions when needed
  const showPermissionResetInstructions = () => {
    setLoginError(
      'Sign-in prompt was previously dismissed. To enable Google Sign-In, click the lock icon in the address bar and reset the "Third-party sign-in" permission, then refresh the page.'
    );
    setShowManualSignIn(true);
  };

  // Initialize Google Sign-In
  const initializeGoogleSignIn = useCallback(() => {
    if (window.google) {
      try {
        window.google.accounts.id.initialize({
          client_id: '86399339078-e84i02so8c1ass4bsb752s6ofvb962lk.apps.googleusercontent.com',
          callback: handleGoogleSignIn,
          auto_select: false,
          cancel_on_tap_outside: true,
          use_fedcm_for_prompt: true, // Enable FedCM for One Tap
          use_fedcm_for_button: true, // Enable FedCM for Button
          context: 'signin', // Explicitly set the context to sign-in
          ux_mode: 'redirect',
          login_uri: 'https://aromareserch.com/api/auth/callback/google',
          itp_support: true,
          onError: (error) => {
            console.error('Google Sign-In initialization error:', error);
            showPermissionResetInstructions();
          }
        });
        
        // Render Google Sign-In button
        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          { 
            type: 'standard',
            theme: 'outline',
            size: 'large',
            shape: 'rectangular',
            text: 'continue_with',
            width: 300,
            locale: 'en',
            logo_alignment: 'center'
          }
        );

        // Prompt for sign-in with proper error handling
        window.google.accounts.id.prompt((notification) => {
          if (notification) {
            if (notification.isDisplayMoment && notification.isDisplayMoment()) {
              console.log('Google Sign-In UI displayed');
            } else if (notification.isSkippedMoment && notification.isSkippedMoment()) {
              console.log('Google Sign-In UI skipped');
              // If skipped or in cooldown period, show instructions to reset
              showPermissionResetInstructions();
            } else if (notification.isDismissedMoment && notification.isDismissedMoment()) {
              console.log('Google Sign-In UI dismissed');
              // User explicitly dismissed the prompt
              showPermissionResetInstructions();
            } else if (notification.isNotDisplayed && notification.isNotDisplayed()) {
              console.log('Google Sign-In not displayed');
              // Maybe FedCM is disabled
              showPermissionResetInstructions();
            }
          }
        });
      } catch (error) {
        console.error('Google Sign-In initialization error:', error);
        setLoginError('Failed to initialize Google Sign-In. Please try again later.');
        setShowManualSignIn(true);
      }
    } else {
      console.error('Google Sign-In script not loaded');
      setLoginError('Google Sign-In service unavailable. Please try again later.');
      setShowManualSignIn(true);
    }
  }, []);

  // Handle Google Sign-In
  const handleGoogleSignIn = async (response) => {
    setIsLoading(true);
    setLoginError('');

    try {
      // Validate response
      if (!response || !response.credential) {
        throw new Error('No credentials received');
      }

      const token = response.credential;
      console.log('Google Sign-In Token received');
      
      // Send token to backend - use full URL
      const result = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });
      
      // Check response
      if (!result.ok) {
        const errorData = await result.text();
        console.error('Server Error Response:', errorData);
        throw new Error(errorData || 'Authentication failed');
      }
      
      const data = await result.json();
      console.log('Auth Success:', data.success);
      
      if (data.success) {
        // Store authentication details
        localStorage.setItem('token', data.token);
        
        // Handle first-time vs returning users
        if (data.isFirstTimeUser) {
          console.log('First time user - redirecting to complete profile');
          navigate('/complete-profile');
        } else {
          console.log('Returning user - redirecting to about');
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/about');
        }
      } else {
        throw new Error(data.message || 'Login unsuccessful');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setLoginError(error.message || 'An unexpected error occurred during sign-in');
      setShowManualSignIn(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Manual sign-in with Google by clicking button
  const handleManualGoogleSignIn = () => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      try {
        // Show the Google Sign-In button if hidden
        setIsGoogleButtonVisible(true);
        
        // Force prompt to appear again (user must have reset permissions)
        window.google.accounts.id.prompt((notification) => {
          if (notification && notification.isNotDisplayed && notification.isNotDisplayed()) {
            setLoginError('Please reset the "Third-party sign-in" permission in your browser settings and try again.');
          }
        });
      } catch (error) {
        console.error('Failed to prompt Google Sign-In:', error);
      }
    }
  };

  // Help link to explain third-party sign-in settings
  const handleHelp = () => {
    window.open('https://support.google.com/chrome/answer/95472', '_blank');
  };

  return (
    <div className="login-page">
      <div className="background-container">
        <img src={backgroundImg} alt="" className="background-image" />
        <div className="blur-overlay"></div>
      </div>
      
      <div className="content-container">
        <div className="card-container" data-aos="zoom-in" data-aos-delay="300">
          <div className="login-card">
            <div className="card-inner">
              {/* Left side image */}
              <div className="card-image-side" data-aos="fade-right" data-aos-delay="600">
                <img src={perfumeBottleImg} alt="Perfume Bottle" className="card-perfume-image" />
                <div className="image-overlay"></div>
                <div className="image-content">
                  <h3>Experience the Art of Fragrance</h3>
                  <p>Where science meets nature</p>
                </div>
              </div>
              
              {/* Login form side */}
              <div className="card-form-side">
                <div className="card-header">
                  <div className="card-logo-container">
                    <img src={logo} alt="AROMA Logo" className="card-logo-image" />
                  </div>
                  <h2>Sign In</h2>
                  <p>Welcome back! Please sign in with Google to continue</p>
                </div>
                
                {/* Error Message */}
                {loginError && (
                  <div className="error-message" data-aos="fade-up">
                    {loginError}
                  </div>
                )}
                
                {/* Google Sign-In Button */}
                <div className="google-button-container" data-aos="fade-up" data-aos-delay="350">
                  {isGoogleButtonVisible && <div id="google-signin-button"></div>}
                  {showManualSignIn && (
                    <div className="reset-instructions">
                      <button 
                        onClick={handleManualGoogleSignIn}
                        className="submit-button try-again-button"
                        data-aos="fade-up" 
                        data-aos-delay="450"
                      >
                        Try Google Sign-In Again
                      </button>
                      <button 
                        onClick={handleHelp}
                        className="help-button"
                        data-aos="fade-up" 
                        data-aos-delay="500"
                      >
                        Need Help?
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="loading-indicator" data-aos="fade-up">
                    <div className="spinner"></div>
                    <p>Signing in with Google...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="floating-element elem1" data-aos="fade-right" data-aos-delay="900"></div>
        <div className="floating-element elem2" data-aos="fade-left" data-aos-delay="1000"></div>
        <div className="floating-element elem3" data-aos="fade-up" data-aos-delay="1100"></div>
      </div>
    </div>
  );
};

export default LoginPage;