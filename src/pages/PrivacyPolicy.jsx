import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Shield, CheckCircle } from 'lucide-react';

// Image imports
import logoImage from '../assets/AROMA.png';
import headerBg from '../assets/image.jpeg';
import './PolicyPages.css';

const PrivacyPolicyPage = () => {
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
        <div className="policy-page privacy-page">
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
                        <h1>PRIVACY POLICY</h1>
                        <p className="subtitle">How we collect, use, and protect your information</p>
                        <div className="divider"></div>
                        <div className="policy-icon">
                            <Shield size={40} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Privacy Policy Content Section */}
            <section className="policy-content-section">
                <div className="container">
                    <div className="policy-content" data-aos="fade-up">
                        <div className="policy-last-updated">
                            <p>Last Updated: May 1, 2025</p>
                        </div>

                        <div className="policy-section">
                            <h2>1. Introduction</h2>
                            <p>
                                At AROMA RESEARCH CENTRE, we respect your privacy and are committed to protecting your personal data.
                                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website,
                                use our services, or participate in our courses.
                            </p>
                            <p>
                                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
                                please do not access our website or use our services.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>2. Information We Collect</h2>
                            <p>
                                We collect several types of information from and about users of our website and services, including:
                            </p>
                            <ul className="policy-list">
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Personal Identifiable Information:</strong> Name, email address, postal address, phone number, and payment information when you register for an account, purchase a course, or contact us.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Non-Personal Information:</strong> Browser type, device information, operating system, and usage data.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Course-Related Information:</strong> Assessment responses, quiz results, course progress, and certification data.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Cookies and Tracking Technologies:</strong> Information collected through cookies, web beacons, and other tracking technologies.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="policy-section">
                            <h2>3. How We Collect Information</h2>
                            <p>
                                We collect information from you in the following ways:
                            </p>
                            <ul className="policy-list">
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Direct Collection:</strong> Information you provide to us when you create an account, purchase a course, complete forms, or communicate with us.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Automated Collection:</strong> Information collected automatically as you navigate through our website using cookies and similar technologies.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Third-Party Sources:</strong> Information we receive from third-party service providers, such as payment processors and analytics providers.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="policy-section">
                            <h2>4. How We Use Your Information</h2>
                            <p>
                                We use the information we collect for various purposes, including:
                            </p>
                            <ul className="policy-list">
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Providing, maintaining, and improving our website and services
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Processing transactions and sending related information
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Managing your account and providing customer support
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Sending administrative information, such as changes to our terms, conditions, and policies
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Facilitating course enrollment, assessment, and certification
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Sending promotional materials and newsletters (with your consent)
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Analyzing usage patterns to improve user experience
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Protecting against fraudulent, unauthorized, or illegal activity
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="policy-section">
                            <h2>5. Disclosure of Your Information</h2>
                            <p>
                                We may disclose your personal information in the following circumstances:
                            </p>
                            <ul className="policy-list">
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Service Providers:</strong> To trusted third parties who assist us in operating our website, conducting our business, or providing services to you (e.g., payment processors, cloud service providers).
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Legal Requirements:</strong> To comply with any court order, law, or legal process, including responding to any government or regulatory request.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Protection of Rights:</strong> To enforce our rights arising from any contracts, and to protect our rights, property, or safety, or that of our users or others.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>With Your Consent:</strong> In any other circumstance where we have your explicit consent.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="policy-section">
                            <h2>6. Data Security</h2>
                            <p>
                                We implement appropriate technical and organizational measures to protect the security of your personal information.
                                However, no method of transmission over the Internet or electronic storage is 100% secure.
                                While we strive to use commercially acceptable means to protect your personal information,
                                we cannot guarantee its absolute security.
                            </p>
                            <p>
                                We take the following security measures to protect your data:
                            </p>
                            <ul className="policy-list">
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Secure Socket Layer (SSL) technology for secure data transmission
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Regular security assessments and updates
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Restricted access to personal information on a need-to-know basis
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        Employee training on data security practices
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="policy-section">
                            <h2>7. Cookies and Tracking Technologies</h2>
                            <p>
                                We use cookies and similar tracking technologies to track activity on our website and hold certain information.
                                Cookies are files with a small amount of data that may include an anonymous unique identifier.
                            </p>
                            <p>
                                We use the following types of cookies:
                            </p>
                            <ul className="policy-list">
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Essential Cookies:</strong> Necessary for the basic functionality of our website.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Analytical/Performance Cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around our website.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Functionality Cookies:</strong> Enable us to personalize content based on your preferences.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Targeting Cookies:</strong> Record your visit to our website, the pages you have visited, and the links you have followed to improve relevance of advertisements.
                                    </div>
                                </li>
                            </ul>
                            <p>
                                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                                However, if you do not accept cookies, you may not be able to use some portions of our website.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>8. Third-Party Links</h2>
                            <p>
                                Our website and services may contain links to third-party websites, plugins, and applications.
                                Clicking on those links or enabling those connections may allow third parties to collect or share data about you.
                                We do not control these third-party websites and are not responsible for their privacy statements.
                            </p>
                            <p>
                                When you leave our website, we encourage you to read the privacy policy of every website you visit.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>9. Your Data Protection Rights</h2>
                            <p>
                                Depending on your location, you may have the following rights regarding your personal information:
                            </p>
                            <ul className="policy-list">
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Right to Access:</strong> Request access to your personal information.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Right to Rectification:</strong> Request correction of inaccurate personal information.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Right to Erasure:</strong> Request deletion of your personal information.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Right to Restrict Processing:</strong> Request restriction of processing of your personal information.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Right to Data Portability:</strong> Request transfer of your personal information to another organization.
                                    </div>
                                </li>
                                <li>
                                    <span className="check-icon"><CheckCircle size={16} /></span>
                                    <div>
                                        <strong>Right to Object:</strong> Object to processing of your personal information.
                                    </div>
                                </li>
                            </ul>
                            <p>
                                To exercise any of these rights, please contact us using the information provided in the "Contact Information" section.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>10. Data Retention</h2>
                            <p>
                                We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy.
                                We will retain and use your information to the extent necessary to comply with our legal obligations,
                                resolve disputes, and enforce our policies.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>11. Children's Privacy</h2>
                            <p>
                                Our services are not intended for individuals under the age of 18 ("Children").
                                We do not knowingly collect personal information from Children.
                                If you are a parent or guardian and you are aware that your Child has provided us with personal information,
                                please contact us. If we become aware that we have collected personal information from Children without
                                verification of parental consent, we take steps to remove that information from our servers.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>12. International Data Transfers</h2>
                            <p>
                                Your information may be transferred to and maintained on computers located outside of your state, province,
                                country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.
                            </p>
                            <p>
                                If you are located outside India and choose to provide information to us, please note that we transfer the data,
                                including personal information, to India and process it there. Your consent to this Privacy Policy followed by your
                                submission of such information represents your agreement to that transfer.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>13. Changes to This Privacy Policy</h2>
                            <p>
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                                We will update the "Last Updated" date at the top of this Privacy Policy and may also provide additional notification methods.
                            </p>
                            <p>
                                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h2>14. Contact Information</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at:
                            </p>
                            <p>
                                <strong>Email:</strong> privacy@aromaresearch.com<br />
                                <strong>Phone:</strong> +91 98765 43210<br />
                                <strong>Address:</strong> 123 Fragrance Avenue, Kochi, Kerala 682001, India
                            </p>
                        </div>

                        <div className="policy-acceptance">
                            <p>
                                By using our website and services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
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

export default PrivacyPolicyPage;