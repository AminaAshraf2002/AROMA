import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { RotateCcw, CheckCircle } from 'lucide-react';

// Image imports
import logoImage from '../assets/AROMA.png';
import headerBg from '../assets/image.jpeg';
import './PolicyPages.css';

const CancellationRefundPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            mirror: true,
            easing: 'ease-out',
        });

        // Scroll to top on component mount
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="policy-page refund-page">
            {/* Header Section with Logo and Navigation */}
            <header className="site-header">
                <div className="container">
                    <div className="header-content">
                        <div className="logo">
                            <img src={logoImage} alt="Aroma Research Centre Logo" />
                            <span>AROMA RESEARCH</span>
                        </div>
                        <nav className="main-nav">
                            <ul>
                                <li><Link to="/about" className="nav-link">Home</Link></li>
                                <li><Link to="/about-detailed" className="nav-link">About</Link></li>
                                <li><Link to="/contact-us" className="nav-link">Contact</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="background-container">
                    <img src={headerBg} alt="" className="background-image" />
                    <div className="overlay"></div>
                </div>
                <div className="container">
                    <div className="hero-content" data-aos="fade-up">
                        <h1>CANCELLATION & REFUND POLICY</h1>
                        <p className="subtitle">Understanding our course and payment policies</p>
                        <div className="divider"></div>
                        <div className="policy-icon">
                            <RotateCcw size={40} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Cancellation & Refund Content Section */}
            <section className="policy-content-section">
                <div className="container">
                    <div className="policy-content" data-aos="fade-up">
                        <div className="policy-last-updated">
                            <p>Last Updated: May 1, 2025</p>
                        </div>

                        <div className="policy-section">
                            <h2>1. Introduction</h2>
                            <p>
                                At AROMA RESEARCH CENTRE, we value your satisfaction with our courses and services. 
                                This Cancellation & Refund Policy outlines the terms and conditions regarding cancellations, 
                                refunds, and course transfers. By enrolling in our courses or using our services, 
                                you agree to be bound by this policy.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>2. Level 1 Assessment Enrollment</h2>
                            <p>
                                The Level 1 Introductory Assessment is a self-paced online evaluation designed to assess 
                                your basic knowledge of perfumery concepts. The following terms apply specifically to this assessment:
                            </p>
                            <ul className="policy-list">
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Assessment Fee:</strong> The fee for Level 1 Assessment is non-refundable once payment is processed, as access to the assessment is granted immediately.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Assessment Validity:</strong> Once purchased, you have access to the Level 1 Assessment for a period of 90 days from the date of enrollment.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Retake Policy:</strong> If you do not achieve a passing score on your first attempt, you may retake the assessment once more within the 90-day access period at no additional cost.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="policy-section">
                            <h2>3. Advanced Course Enrollments (Level 2 and Level 3)</h2>
                            <p>
                                For our advanced course enrollments (which become available after successful completion of 
                                prerequisite levels), the following cancellation and refund policies apply:
                            </p>
                            <ul className="policy-list">
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Cancellation Before Course Access:</strong> Full refund if cancellation is requested within 48 hours of purchase AND before accessing any course materials.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Cancellation After Accessing Materials:</strong> No refunds will be provided once you have accessed any course materials, including video lectures, downloadable content, or quizzes.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Course Transfers:</strong> Course enrollments cannot be transferred to another individual.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="policy-section">
                            <h2>4. Refund Process</h2>
                            <p>
                                If you are eligible for a refund based on the terms outlined above, please follow these steps:
                            </p>
                            <ul className="policy-list">
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Submit a refund request by emailing <strong>support@aromaresearch.com</strong> with the subject line "Refund Request: [Your Name]".
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Include your full name, email address used for purchase, order ID, and reason for requesting a refund.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        All refund requests will be processed within 7-10 business days from the date of approval.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Refunds will be credited back to the original method of payment used for the purchase.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="policy-section">
                            <h2>5. Payment Processing</h2>
                            <p>
                                All payments are processed through secure third-party payment processors, including Razorpay. 
                                Please note the following:
                            </p>
                            <ul className="policy-list">
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Payment processing fees are non-refundable, even in cases where a refund is approved.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        For international payments, currency conversion rates are determined by your bank or card issuer, not by AROMA RESEARCH CENTRE.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        We do not store your payment information on our servers. All payment data is securely handled by our payment processors.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="policy-section">
                            <h2>6. Technical Issues</h2>
                            <p>
                                If you experience technical issues that significantly impact your ability to access or complete our courses, 
                                please contact our support team at <strong>support@aromaresearch.com</strong>. We will work to resolve the 
                                issue promptly and may consider extending access periods or providing partial refunds on a case-by-case basis.
                            </p>
                            <p>
                                Please note that technical issues deemed to be caused by factors outside our control 
                                (such as your internet connection, device compatibility, or browser settings) may not qualify for refunds.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>7. Course Cancellation by AROMA RESEARCH CENTRE</h2>
                            <p>
                                In the rare event that AROMA RESEARCH CENTRE needs to cancel or significantly modify a course, 
                                the following policies apply:
                            </p>
                            <ul className="policy-list">
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        If we cancel a course before it begins, enrolled students will receive a full refund.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        If significant changes are made to course content after enrollment, students will be notified and given the option to continue with the modified course or receive a proportional refund.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        AROMA RESEARCH CENTRE reserves the right to make minor adjustments to course content, schedules, or instructors without providing refunds.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="policy-section">
                            <h2>8. Certificate Reissuance</h2>
                            <p>
                                For certificate-related matters, the following policies apply:
                            </p>
                            <ul className="policy-list">
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Digital certificates are provided upon successful completion of assessments and courses at no additional cost.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Requests for name corrections on certificates due to errors in your registration information must be submitted within 30 days of certificate issuance and may be subject to a processing fee.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="policy-section">
                            <h2>9. Exceptional Circumstances</h2>
                            <p>
                                We understand that exceptional circumstances may arise that prevent you from completing a course. 
                                In cases of serious illness, bereavement, or other significant life events, we may consider requests 
                                for extensions or partial refunds on a case-by-case basis.
                            </p>
                            <p>
                                Such requests must be accompanied by relevant documentation (such as medical certificates) 
                                and submitted to <strong>support@aromaresearch.com</strong> as soon as reasonably possible.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>10. Changes to This Policy</h2>
                            <p>
                                AROMA RESEARCH CENTRE reserves the right to update or modify this Cancellation & Refund Policy at any time. 
                                Any changes will be posted on this page with a revised "Last Updated" date. 
                                Continued use of our services after such modifications constitutes your acceptance of the updated policy.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>11. Contact Information</h2>
                            <p>
                                If you have any questions about this Cancellation & Refund Policy, please contact us at:
                            </p>
                            <p>
                                <strong>Email:</strong> support@aromaresearch.com<br />
                                <strong>Phone:</strong> +91 98765 43211<br />
                                <strong>Address:</strong> 123 Fragrance Avenue, Kochi, Kerala 682001, India
                            </p>
                        </div>

                        <div className="policy-acceptance">
                            <p>
                                By enrolling in our courses or using our services, you acknowledge that you have read, 
                                understood, and agree to be bound by this Cancellation & Refund Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content" data-aos="zoom-in">
                        <h2>Join Our Fragrance Community</h2>
                        <p>Begin your journey into the fascinating world of perfumery with the AROMA RESEARCH CENTRE</p>
                        
                        {/* Policy Links */}
                        <div className="policy-links">
                            <Link to="/contact-us" className="policy-link">Contact Us</Link>
                            <Link to="/terms-and-conditions" className="policy-link">Terms and Conditions</Link>
                            <Link to="/privacy-policy" className="policy-link">Privacy Policy</Link>
                            <Link to="/cancellation-refund" className="policy-link">Cancellation & Refund</Link>
                        </div>

                        {/* Copyright Information */}
                        <div className="copyright-container">
                            <div className="copyright">
                                © 2025 AROMA RESEARCH CENTRE. All Rights Reserved
                            </div>
                            <div className="powered-by">
                                Run by <a href="https://aprcgroups.in/" target="_blank" rel="noopener noreferrer">APRCGROUPS</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CancellationRefundPage;