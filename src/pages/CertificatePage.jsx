import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, Share, Home, Award } from 'lucide-react';
import './CertificatePage.css';
import logo from '../assets/AROMA.png'; // Import the logo image
// Import the green certificate background image
import greenCertificateBackground from '../assets/aromcerti.jpeg'; // You'll need to add this file

const CertificatePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('John Doe'); // In a real app, get from user profile
    const [date, setDate] = useState('');
    const [certificateId, setCertificateId] = useState('');
    const [showMobileActions, setShowMobileActions] = useState(false);

    // Get score data from previous page or use default values
    const score = location.state?.score || 85;
    const correctAnswers = location.state?.correctAnswers || 42;
    const totalQuestions = location.state?.totalQuestions || 50;

    // Generate current date and certificate ID
    useEffect(() => {
        const currentDate = new Date();
        setDate(currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }));

        // Generate a random certificate ID
        const randomId = Math.floor(100000 + Math.random() * 900000);
        setCertificateId(`ARC-${randomId}-L1`);

        // Check if we're on mobile for responsive actions
        const checkMobile = () => {
            setShowMobileActions(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleDownload = () => {
        // In a real app, this would trigger certificate PDF download
        alert('Certificate download started');
    };

    const handleShare = () => {
        // In a real app, this would open sharing options
        alert('Share options opened');
    };

    const handleGoHome = () => {
        navigate('/about');
    };

    return (
        <div className="certificate-page">
            <div className="certificate-header">
                <div className="logo">
                    <img src={logo} alt="Aroma Logo" className="logo-image" />
                    <span className="logo-text">Aroma Research Center</span>
                </div>
                <div className="header-actions">
                    <button className="action-button" onClick={handleDownload}>
                        <Download size={18} />
                        <span>Download</span>
                    </button>
                   
                    <button className="action-button" onClick={handleGoHome}>
                        <Home size={18} />
                        <span>Home</span>
                    </button>
                </div>
            </div>

            <div className="certificate-content">
                <div className="results-summary">
                    <h2>Quiz Completed Successfully!</h2>
                    <div className="score-container">
                        <div className="score-circle">
                            <div className="score-inner">
                                <span className="score-percentage">{score}%</span>
                                <span className="score-label">Score</span>
                            </div>
                        </div>
                        <div className="score-details">
                            <div className="detail-row">
                                <span className="detail-label">Correct Answers:</span>
                                <span className="detail-value">{correctAnswers} / {totalQuestions}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Date Completed:</span>
                                <span className="detail-value">{date}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Certificate ID:</span>
                                <span className="detail-value">{certificateId}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Status:</span>
                                <span className="detail-value status-passed">
                                    {score >= 70 ? 'Passed' : 'Failed'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="congratulations-message">
                        {score >= 70 ? (
                            <p>Congratulations! You have successfully completed Level 1 of the Aroma institution course. You are now eligible to proceed to Level 2.</p>
                        ) : (
                            <p>You've completed Level 1 of the Aroma institution course. We recommend reviewing the material and retaking the quiz to improve your score.</p>
                        )}
                    </div>

                    <div className="next-steps">
                        <h3>Next Steps</h3>
                        <div className="steps-container">
                            {score >= 70 ? (
                                <button className="next-button" onClick={() => navigate('/level2')}>
                                    Continue to Level 2
                                </button>
                            ) : (
                                <p className="retry-message">
                                    You need a score of at least 70% to advance to Level 2.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Responsive certificate container with the green design */}
                <div className="certificate-container">
                    <div className="certificate green-certificate">
                        {/* Background image container */}
                        <div className="certificate-background">
                            <img src={greenCertificateBackground} alt="Certificate Background" className="green-certificate-bg" />
                        </div>
                        
                        {/* Certificate content overlaid on the background */}
                        <div className="certificate-content-overlay">
                            <div className="certificate-title">
                                <h2></h2>
                            </div>

                            <div className="certificate-body">
                                <p className="certificate-course">Level 1: Fundamentals of Aroma Research</p>
                                <p className="certificate-text">has successfully completed</p>
                                <p className="certificate-name">{userName}</p>
                                <p className="certificate-text">with a score of</p>
                                <p className="certificate-score">{score}%</p>
                            </div>

                            <div className="certificate-footer">
                                <div className="certificate-date">{date}</div>
                                <div className="certificate-signatures">
                                    <div className="signature">
                                        <div className="signature-line"></div>
                                        <p className="signature-name">Dr. Sarah Johnson</p>
                                        <p className="signature-title">Director, Aroma Research Centre</p>
                                    </div>
                                    <div className="certificate-seal">
                                        <div className="seal-circle">
                                            <img src={logo} alt="Aroma Logo" className="seal-logo" />
                                        </div>
                                    </div>
                                    <div className="signature">
                                        <div className="signature-line"></div>
                                        <p className="signature-name">Prof. Michael Lee</p>
                                        <p className="signature-title">Chief Academic Officer</p>
                                    </div>
                                </div>
                                <div className="certificate-id">Certificate ID: {certificateId}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile actions for better responsiveness */}
            {showMobileActions && (
                <div className="header-actions-mobile">
                    <button className="action-button action-button-mobile" onClick={handleDownload}>
                        <Download size={18} />
                        <span>Download</span>
                    </button>
                    
                    <button className="action-button action-button-mobile" onClick={handleGoHome}>
                        <Home size={18} />
                        <span>Home</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default CertificatePage;