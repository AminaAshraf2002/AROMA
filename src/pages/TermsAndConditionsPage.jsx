import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Book, CheckCircle } from 'lucide-react';

// Image imports
import logoImage from '../assets/AROMA.png';
import headerBg from '../assets/image.jpeg';
import './PolicyPages.css';

const TermsAndConditionsPage = () => {
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
        <div className="policy-page terms-page">
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
                                <li><Link to="/contact" className="nav-link">Contact</Link></li>
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
                        <h1>TERMS AND CONDITIONS</h1>
                        <p className="subtitle">Please read these terms carefully before using our services</p>
                        <div className="divider"></div>
                        <div className="policy-icon">
                            <Book size={40} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Terms Content Section */}
            <section className="policy-content-section">
                <div className="container">
                    <div className="policy-content" data-aos="fade-up">
                        <div className="policy-last-updated">
                            <p>Last Updated: May 1, 2025</p>
                        </div>

                        <div className="policy-section">
                            <h2>1. Introduction</h2>
                            <p>
                                Welcome to AROMA RESEARCH CENTRE. These Terms and Conditions govern your use of our website,
                                services, courses, and products. By accessing or using any part of our platform, you agree to be
                                bound by these Terms. If you do not agree to all the Terms, then you may not access or use our services.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>2. Definitions</h2>
                            <p>
                                Throughout these Terms, the following definitions apply:
                            </p>
                            <ul className="policy-list">
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>"Website"</strong> refers to AROMA RESEARCH CENTRE's online platform, including all pages, content, and functionality.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>"Services"</strong> refers to the educational courses, research materials, assessments, and other offerings provided by AROMA RESEARCH CENTRE.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>"User," "You," and "Your"</strong> refer to any individual or entity that accesses or uses our Website or Services.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>"We," "Us," and "Our"</strong> refer to AROMA RESEARCH CENTRE.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="policy-section">
                            <h2>3. Account Registration</h2>
                            <p>
                                To access certain features of our Website and Services, you may be required to register for an account.
                                When registering, you agree to provide accurate, current, and complete information about yourself.
                                You are responsible for maintaining the confidentiality of your account credentials and for all activities
                                that occur under your account.
                            </p>
                            <p>
                                You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
                                We cannot and will not be liable for any loss or damage arising from your failure to comply with the above requirements.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>4. Course Enrollment and Assessments</h2>
                            <p>
                                When you enroll in our courses or assessments, you agree to the following terms:
                            </p>
                            <ul className="policy-list">
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Payment for courses must be made in full before access is granted, unless otherwise specified.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Course materials, including videos, documents, and assessments, are for your personal use only and may not be shared, distributed, or reproduced without written permission.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Assessment results are provided for educational purposes and certification only. We reserve the right to verify your identity before issuing certificates.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Access to course content may be time-limited as specified in the course description.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="policy-section">
                            <h2>5. Intellectual Property Rights</h2>
                            <p>
                                All content, materials, logos, trademarks, and designs on our Website and in our courses
                                are the property of AROMA RESEARCH CENTRE or our licensors and are protected by copyright,
                                trademark, and other intellectual property laws.
                            </p>
                            <p>
                                You may not modify, reproduce, distribute, create derivative works or adaptations of,
                                publicly display, or in any way exploit any of our content in whole or in part except as
                                expressly authorized by us. If you download or print a copy of our content for personal use,
                                you must retain all copyright and other proprietary notices contained therein.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>6. User Conduct</h2>
                            <p>
                                When using our Website and Services, you agree not to:
                            </p>
                            <ul className="policy-list">
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Use our Website or Services in any way that violates any applicable local, state, national, or international law or regulation.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Impersonate or attempt to impersonate AROMA RESEARCH CENTRE, a staff member, or another user.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Engage in any conduct that restricts or inhibits anyone's use or enjoyment of our Website or Services.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of our Website, server, or any systems connected to our Website.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Use our Website or Services to transmit or upload any material that contains viruses, trojan horses, or other harmful components.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="policy-section">
                            <h2>7. Payment Terms</h2>
                            <p>
                                By making a purchase on our Website, you agree to the following payment terms:
                            </p>
                            <ul className="policy-list">
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        All payments are processed through secure third-party payment processors, including Razorpay.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Prices for courses and services are subject to change without notice. We reserve the right to modify or discontinue any course or service without notice.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        By providing your payment information, you represent and warrant that you have the legal right to use any payment method used in connection with any purchase.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        All payment information is subject to our Privacy Policy, and the terms and conditions of our payment processor.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="policy-section">
                            <h2>8. Refund Policy</h2>
                            <p>
                                Our refund policy is detailed in our separate Cancellation & Refund Policy document. By making a purchase,
                                you acknowledge that you have read and agree to the terms of our Cancellation & Refund Policy.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>9. Website Availability</h2>
                            <p>
                                We strive to ensure that our Website and Services are available 24/7. However, we do not guarantee that our
                                Website will be available at all times. We may experience hardware, software, or other issues that could result
                                in interruptions, delays, or errors.
                            </p>
                            <p>
                                We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify our Website or
                                Services at any time without notice. You agree that we have no liability for any loss, damage, or inconvenience
                                caused by your inability to access or use our Website or Services during any downtime or discontinuance.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>10. Disclaimer of Warranties</h2>
                            <p>
                                OUR WEBSITE AND SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES
                                OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO
                                IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                            </p>
                            <p>
                                WE DO NOT WARRANT THAT OUR WEBSITE OR SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE,
                                OR THAT ANY DEFECTS WILL BE CORRECTED. YOU USE OUR WEBSITE AND SERVICES AT YOUR OWN RISK.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>11. Limitation of Liability</h2>
                            <p>
                                IN NO EVENT SHALL AROMA RESEARCH CENTRE, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS,
                                OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                                INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES,
                                RESULTING FROM:
                            </p>
                            <ul className="policy-list">
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Your access to or use of or inability to access or use our Website or Services;
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Any conduct or content of any third party on our Website;
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Any content obtained from our Website or Services;
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Unauthorized access, use, or alteration of your transmissions or content.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="policy-section">
                            <h2>12. Indemnification</h2>
                            <p>
                                You agree to defend, indemnify, and hold harmless AROMA RESEARCH CENTRE, its affiliates, licensors, and service
                                providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers,
                                successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses,
                                or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your
                                use of our Website or Services.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>13. Termination</h2>
                            <p>
                                We may terminate or suspend your account and bar access to our Website or Services immediately, without prior
                                notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but
                                not limited to a breach of these Terms.
                            </p>
                            <p>
                                If you wish to terminate your account, you may simply discontinue using our Website and Services. All provisions
                                of these Terms which by their nature should survive termination shall survive termination, including, without
                                limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>14. Governing Law</h2>
                            <p>
                                These Terms shall be governed and construed in accordance with the laws of India, without regard to its
                                conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered
                                a waiver of those rights.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>15. Dispute Resolution</h2>
                            <p>
                                Any disputes arising out of or related to these Terms or our Website and Services shall be resolved through
                                binding arbitration in accordance with the Arbitration and Conciliation Act, 1996 of India. The arbitration
                                shall take place in Kochi, Kerala, and shall be conducted in English.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>16. Changes to Terms</h2>
                            <p>
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
                                material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a
                                material change will be determined at our sole discretion.
                            </p>
                            <p>
                                By continuing to access or use our Website or Services after any revisions become effective, you agree to be
                                bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use our
                                Website or Services.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>17. Contact Information</h2>
                            <p>
                                Questions about the Terms should be sent to us at info@aromaresearch.com or through our Contact Us page.
                            </p>
                        </div>

                        <div className="policy-acceptance">
                            <p>
                                By using our Website and Services, you acknowledge that you have read, understood, and agree to be
                                bound by these Terms and Conditions.
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

export default TermsAndConditionsPage;