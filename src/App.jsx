import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import PaymentPage from './pages/PaymentPage';
import QuizPage from './pages/QuizPage';
import CertificatePage from './pages/CertificatePage';
import Level2Page from './pages/Level2Page';


import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/quiz" element={<QuizPage />} /> 
          <Route path="/certificate" element={<CertificatePage />} />
          <Route path="/level2" element={<Level2Page />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;