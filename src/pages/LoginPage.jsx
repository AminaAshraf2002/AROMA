import React, { useState, useEffect, useCallback } from 'react';
import { Eye, EyeOff, User, Lock, ChevronRight } from 'lucide-react';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

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

  // Initialize Google Sign-In
  const initializeGoogleSignIn = useCallback(() => {
    if (window.google) {
      try {
        window.google.accounts.id.initialize({
          client_id: '86399339078-e84i02so8c1ass4bsb752s6ofvb962lk.apps.googleusercontent.com',
          callback: handleGoogleSignIn,
          auto_select: false,
          cancel_on_tap_outside: true,
          use_fedcm_for_prompt: true, // Enable FedCM
          context: 'signin' // Explicitly set the context to sign-in
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
            is_fedcm_supported: true // Add FedCM support flag
          }
        );

        // Update to FedCM compatible prompt handling
        window.google.accounts.id.prompt((notification) => {
          // Replace isNotDisplayed() with FedCM compatible methods
          if (notification.isDisplayMoment()) {
            console.log('Google Sign-In UI displayed');
          } else if (notification.isSkippedMoment()) {
            console.log('Google Sign-In UI skipped');
          } else if (notification.isDismissedMoment()) {
            console.log('Google Sign-In UI dismissed');
          } else if (notification.isNotDisplayed) {
            console.log('Google Sign-In not displayed');
          }
        });
      } catch (error) {
        console.error('Google Sign-In initialization error:', error);
        setLoginError('Failed to initialize Google Sign-In');
      }
    } else {
      console.error('Google Sign-In script not loaded');
      setLoginError('Google Sign-In service unavailable');
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
      setLoginError(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Standard email login handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      // Send email/password to backend
      const result = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      if (!result.ok) {
        const errorData = await result.text();
        throw new Error(errorData || 'Login failed');
      }
      
      const data = await result.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/about');
      } else {
        throw new Error(data.message || 'Login unsuccessful');
      }
    } catch (error) {
      setLoginError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate to registration
  const handleRegister = () => {
    navigate('/');
  };

  // Rest of the component remains the same
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
                  <p>Welcome back! Please sign in to continue</p>
                </div>
                
                {/* Error Message */}
                {loginError && (
                  <div className="error-message" data-aos="fade-up">
                    {loginError}
                  </div>
                )}
                
                {/* Google Sign-In Button */}
                <div className="google-button-container" data-aos="fade-up" data-aos-delay="350">
                  <div id="google-signin-button"></div>
                  <div className="or-divider">
                    <span>Sign in with Google</span>
                  </div>
                </div>
                
                {/* Email Login Form - Uncommented */}
               
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