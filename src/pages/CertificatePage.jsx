import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, Share, Home } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './CertificatePage.css';
import logo from '../assets/AROMA.png';
import greenCertificateBackground from '../assets/aromcerti.jpeg';
import * as quizService from '../services/quizService';

const CertificatePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [date, setDate] = useState('');
    const [certificateId, setCertificateId] = useState('');
    const [showMobileActions, setShowMobileActions] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [certificateData, setCertificateData] = useState(null);
    const [isDemoMode, setIsDemoMode] = useState(false);
    const certificateRef = useRef(null);

    useEffect(() => {
        const loadCertificate = async () => {
            try {
                // Try to get data from location state (passed from quiz page)
                const quizResult = location.state;
                
                if (quizResult) {
                    setCertificateData(quizResult);
                    setUserName(quizResult.userName || 'Student');
                    setCertificateId(quizResult.certificateId || '');
                    setIsDemoMode(quizResult.demoMode === true);
                    
                    // Set formatted date
                    const completedDate = quizResult.completedAt 
                        ? new Date(quizResult.completedAt) 
                        : new Date();
                    
                    setDate(completedDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }));
                    
                    setIsLoading(false);
                    return;
                }
                
                // If no data in location state, try to fetch from API
                setError('Certificate data not found. Please complete the quiz first.');
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to load certificate:', error);
                setError('Failed to load certificate. Please try again later.');
                setIsLoading(false);
            }
        };
        
        loadCertificate();
        
        // Check if we're on mobile for responsive actions
        const checkMobile = () => {
            setShowMobileActions(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [location.state]);

    // Fixed PDF generation for landscape certificate
    const handleDownload = async () => {
        // In demo mode, show alert instead of trying to download
        if (isDemoMode) {
            alert('Demo Mode: In a real deployment, a PDF certificate would be downloaded here.');
            return;
        }
        
        try {
            if (certificateRef.current) {
                // Show loading state
                const downloadBtn = document.querySelector('.download-btn');
                if (downloadBtn) {
                    downloadBtn.innerText = 'Generating...';
                    downloadBtn.disabled = true;
                }

                // Get certificate dimensions
                const certificateWidth = certificateRef.current.offsetWidth;
                const certificateHeight = certificateRef.current.offsetHeight;

                // Create canvas with landscape orientation
                const canvas = await html2canvas(certificateRef.current, {
                    scale: 3, // Higher scale for better quality
                    useCORS: true, // Enable CORS for images
                    allowTaint: true,
                    backgroundColor: 'white',
                    width: certificateWidth,
                    height: certificateHeight,
                    onclone: (document, element) => {
                        element.style.width = `${certificateWidth}px`;
                        element.style.height = `${certificateHeight}px`;
                        element.style.margin = '0';
                        element.style.padding = '0';
                        
                        // Force the background image to cover the entire area
                        const backgroundImg = element.querySelector('.landscape-certificate-bg');
                        if (backgroundImg) {
                            backgroundImg.style.width = '100%';
                            backgroundImg.style.height = '100%';
                            backgroundImg.style.objectFit = 'cover';
                        }
                    }
                });
                
                // Create PDF with landscape orientation
                const pdf = new jsPDF({
                    orientation: 'landscape',
                    unit: 'mm',
                    format: 'a4',
                    compress: true
                });
                
                // A4 landscape dimensions: 297mm x 210mm
                const pdfWidth = 297;
                const pdfHeight = 210;
                
                // Add the image to fill the entire PDF
                pdf.addImage({
                    imageData: canvas.toDataURL('image/png', 1.0),
                    x: 0,
                    y: 0,
                    width: pdfWidth,
                    height: pdfHeight,
                    compression: 'NONE'
                });
                
                // Save the PDF with a formatted filename
                const fileName = `${userName.replace(/\s+/g, '_')}_Certificate_${certificateId}.pdf`;
                pdf.save(fileName);
                
                // Reset button state
                if (downloadBtn) {
                    downloadBtn.innerText = 'Download';
                    downloadBtn.disabled = false;
                }
                
                console.log('Certificate downloaded:', fileName);
            } else {
                alert('Certificate element not found. Please try again.');
            }
        } catch (error) {
            console.error('Failed to download certificate:', error);
            alert('Error downloading certificate: ' + error.message);
            
            // Reset button state on error
            const downloadBtn = document.querySelector('.download-btn');
            if (downloadBtn) {
                downloadBtn.innerText = 'Download';
                downloadBtn.disabled = false;
            }
        }
    };

    const handleShare = () => {
        // In a real app, this would open sharing options
        if (navigator.share) {
            navigator.share({
                title: 'My Perfumery Certificate',
                text: `I scored ${certificateData?.score || 0}% on the Perfumery Quiz at Aroma Research Center!`,
                url: window.location.href
            }).catch(error => {
                console.error('Error sharing:', error);
                alert('Failed to share. You can take a screenshot instead.');
            });
        } else {
            alert('Sharing is not supported on this browser. You can take a screenshot instead.');
        }
    };

    const handleGoHome = () => {
        navigate('/about');
    };

    if (isLoading) {
        return (
            <div className="certificate-loading">
                <div className="logo">
                    <img src={logo} alt="Aroma Logo" className="logo-image" />
                    <span className="logo-text">Aroma Research Center</span>
                </div>
                <div className="loading-message">
                    <div className="spinner"></div>
                    <h2>Generating Your Certificate...</h2>
                    <p>Please wait while we prepare your certificate.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="certificate-error">
                <div className="logo">
                    <img src={logo} alt="Aroma Logo" className="logo-image" />
                    <span className="logo-text">Aroma Research Center</span>
                </div>
                <div className="error-message">
                    <h2>Oops! Something went wrong</h2>
                    <p>{error}</p>
                    <button className="retry-button" onClick={() => navigate('/quiz')}>
                        Back to Quiz
                    </button>
                </div>
            </div>
        );
    }

    // Extract data from certificate data
    const score = certificateData?.score || 0;
    const correctAnswers = certificateData?.correctAnswers || 0;
    const totalQuestions = certificateData?.totalQuestions || 50;
    const passed = certificateData?.passed !== undefined 
        ? certificateData.passed 
        : (score >= 70);

    return (
        <div className="certificate-page">
            <div className="certificate-header">
                <div className="logo">
                    <img src={logo} alt="Aroma Logo" className="logo-image" />
                    <span className="logo-text">Aroma Research Center</span>
                </div>
                <div className="header-actions">
                    <button className="action-button download-btn" onClick={handleDownload} disabled={isDemoMode}>
                        <Download size={18} />
                        <span>Download</span>
                    </button>
                    <button className="action-button" onClick={handleShare}>
                        <Share size={18} />
                        <span>Share</span>
                    </button>
                    <button className="action-button" onClick={handleGoHome}>
                        <Home size={18} />
                        <span>Home</span>
                    </button>
                </div>
            </div>

            {isDemoMode && (
                <div className="demo-mode-banner">
                    <p><strong>Demo Mode:</strong> This certificate is for demonstration purposes only.</p>
                </div>
            )}

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
                                <span className={`detail-value status-${passed ? 'passed' : 'failed'}`}>
                                    {passed ? 'Passed' : 'Failed'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="congratulations-message">
                        {passed ? (
                            <p>Congratulations! You have successfully completed Level 1 of the Aroma institution course. You are now eligible to proceed to Level 2.</p>
                        ) : (
                            <p>You've completed Level 1 of the Aroma institution course. We recommend reviewing the material and retaking the quiz to improve your score.</p>
                        )}
                    </div>

                    <div className="next-steps">
                        <h3>Next Steps</h3>
                        <div className="steps-container">
                            {passed ? (
                                <button className="next-button" onClick={() => navigate('/level2')}>
                                    Continue to Level 2
                                </button>
                            ) : (
                                <button className="retry-button" onClick={() => navigate('/quiz')}>
                                    Retake Quiz
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Landscape certificate container to match the template */}
                <div className="certificate-container">
                    <div className="landscape-certificate-wrapper">
                        <div ref={certificateRef} className="landscape-certificate">
                            {/* Background image container */}
                            <div className="certificate-background">
                                <img src={greenCertificateBackground} alt="Certificate Background" className="landscape-certificate-bg" />
                            </div>
                            
                            {/* Certificate content to match template exactly */}
                            <div className="certificate-content-overlay template-exact">
                               
                                
                                <div className="certificate-info">
                                    {/* This is Level 1 text at the top of the certificate */}
                                    <div className="certificate-level">
                                        Level 1: Fundamentals of Aroma Research
                                    </div>
                                    
                                    <div className="certificate-completed-text">
                                        has successfully completed
                                    </div>
                                </div>
                                
                                {/* User information */}
                                <div className="certificate-user-info">
                                    {/* Date above username */}
                                    <p className="certificate-date">{date}</p>
                                    
                                    {/* Username */}
                                    <p className="certificate-username">{userName}</p>
                                    
                                    <div className="certificate-score-section">
                                        <p className="with-score-text">with a score of</p>
                                        <p className="certificate-score-percentage">{score}%</p>
                                    </div>
                                </div>
                                
                                {/* Signatures section */}
                                <div className="signatures-section">
                                    <div className="signature-left">
                                        <div className="signature-img-container">
                                            {/* You can replace with actual signature images */}
                                            <div className="signature-placeholder"></div>
                                        </div>
                                        
                                    </div>
                                    
                                    
                                    <div className="signature-right">
                                        <div className="signature-img-container">
                                            {/* You can replace with actual signature images */}
                                            <div className="signature-placeholder"></div>
                                        </div>
                                       
                                    </div>
                                </div>
                                
                                {/* Center brand section */}
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile actions for better responsiveness */}
            {showMobileActions && (
                <div className="header-actions-mobile">
                    <button className="action-button action-button-mobile download-btn" onClick={handleDownload} disabled={isDemoMode}>
                        <Download size={18} />
                        <span>Download</span>
                    </button>
                    <button className="action-button action-button-mobile" onClick={handleShare}>
                        <Share size={18} />
                        <span>Share</span>
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