import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';
import './LoginPage.css';

// Import images directly - you'll need to place these in your src/assets folder
import perfumeBottleImg from '../assets/img1.jpg';
import backgroundImg from '../assets/image.jpeg';
import logo from '../assets/AROMA.png'

const LoginPage = () => {
  const navigate = useNavigate(); // Add this line to use navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  }, []);

  const initializeGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Google Client ID
        callback: handleGoogleSignIn
      });
      
      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        { 
          type: 'standard',
          theme: 'outline',
          size: 'large',
          shape: 'rectangular',
          text: 'continue_with',
          width: document.getElementById('google-signin-button').offsetWidth
        }
      );
    }
  };

  const handleGoogleSignIn = async (response) => {
    try {
      setIsLoading(true);
      
      // Get ID token from Google response
      const token = response.credential;
      
      // Send token to your backend
      const result = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });
      
      const data = await result.json();
      
      if (data.success) {
        // Store user data and token
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        
        // Navigate to About page after successful login
        navigate('/about');
      } else {
        console.error('Google sign-in failed:', data.message);
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to About page after successful login
      navigate('/about');
    }, 1500);
  };

  const handleRegister = () => {
    navigate('/');
  };

  return (
    <div className="login-page">
      {/* Single background image with blur and overlay */}
      <div className="background-container">
        <img src={backgroundImg} alt="" className="background-image" />
        <div className="blur-overlay"></div>
      </div>
      
      <div className="content-container">
        {/* Login card section (removed branding section from here) */}
        <div className="card-container" data-aos="zoom-in" data-aos-delay="300">
          <div className="login-card">
            {/* Card with two columns layout */}
            <div className="card-inner">
              {/* Left column - perfume image side */}
              <div className="card-image-side" data-aos="fade-right" data-aos-delay="600">
                <img src={perfumeBottleImg} alt="Perfume Bottle" className="card-perfume-image" />
                <div className="image-overlay"></div>
                <div className="image-content">
                  <h3>Experience the Art of Fragrance</h3>
                  <p>Where science meets nature</p>
                </div>
              </div>
              
              {/* Right column - login form side */}
              <div className="card-form-side">
                <div className="card-header">
                  {/* Added logo above Sign In heading */}
                  <div className="card-logo-container">
                    <img src={logo} alt="AROMA Logo" className="card-logo-image" />
                  </div>
                  <h2>Sign In</h2>
                  <p>Welcome back! Please sign in to continue</p>
                </div>
                
                {/* Google Sign-In Button */}
                <div className="google-button-container" data-aos="fade-up" data-aos-delay="350">
                  <div id="google-signin-button"></div>
                  <div className="or-divider">
                    <span>or sign in with email</span>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="login-form">
                  <div className="input-group" data-aos="fade-up" data-aos-delay="400">
                    <User className="input-icon" size={18} />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="input-field"
                    />
                  </div>
                  
                  <div className="input-group" data-aos="fade-up" data-aos-delay="500">
                    <Lock className="input-icon" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="input-field"
                    />
                    <button 
                      type="button" 
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 
                        <EyeOff size={18} /> : 
                        <Eye size={18} />
                      }
                    </button>
                  </div>
                  
                  <div className="form-options" data-aos="fade-up" data-aos-delay="600">
                    <label className="remember-option">
                      <input type="checkbox" />
                      <span>Remember me</span>
                    </label>
                    <span className="forgot-link">Forgot password?</span>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isLoading}
                    data-aos="fade-up" 
                    data-aos-delay="700"
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner"></span>
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ChevronRight size={18} />
                      </>
                    )}
                  </button>
                  
                  <div className="card-footer" data-aos="fade-up" data-aos-delay="800">
                    <p>
                      Don't have an account? 
                      <button 
                        type="button" 
                        onClick={handleRegister} 
                        className="register-link"
                      >
                        Register now
                      </button>
                    </p>
                  </div>
                </form>
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