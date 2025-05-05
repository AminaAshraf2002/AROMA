import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CompleteProfilePage from './pages/CompleteProfilePage';
import AboutPage from './pages/AboutPage';
import AboutDetailedPage from './pages/AboutDetailedPage';
import PaymentPage from './pages/PaymentPage';
import QuizPage from './pages/QuizPage';
import CertificatePage from './pages/CertificatePage';
import Level2Page from './pages/Level2Page';
import ContactPage from './pages/ContactPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CancellationRefundPage from './pages/CancellationRefundPage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/complete-profile" element={<CompleteProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about-detailed" element={<AboutDetailedPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/quiz" element={<QuizPage />} /> 
          <Route path="/certificate" element={<CertificatePage />} />
          <Route path="/level2" element={<Level2Page />} />
          <Route path="/contact-us" element={<ContactPage />} />TermsAndConditionsPage
          <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cancellation-refund" element={<CancellationRefundPage />} />


          
        </Routes>
      </div>
    </Router>
  );
}

export default App;