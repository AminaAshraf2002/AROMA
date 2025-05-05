import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

// Image imports
import logoImage from '../assets/AROMA.png';
import headerBg from '../assets/image.jpeg';
import './ContactPage.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submitStatus, setSubmitStatus] = useState({
        submitted: false,
        success: false,
        message: ''
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitStatus({
            submitted: true,
            success: true,
            message: 'Thank you for your message. We will get back to you soon!'
        });

        // Reset form after submission
        setTimeout(() => {
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setSubmitStatus({
                submitted: false,
                success: false,
                message: ''
            });
        }, 5000);
    };

    return (
        <div className="contact-page">
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
                                <li><Link to="/contact" className="nav-link active">Contact</Link></li>
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
                        <h1>CONTACT US</h1>
                        <p className="subtitle">Get in Touch with AROMA RESEARCH CENTRE</p>
                        <div className="divider"></div>
                    </div>
                </div>
            </section>

            {/* Contact Information Section */}
            <section className="contact-info-section">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <h2>How to Reach Us</h2>
                        <div className="divider"></div>
                        <p className="section-intro">
                            We're here to answer any questions about our research, courses, or services.
                            Feel free to get in touch with us through any of the following methods.
                        </p>
                    </div>

                    <div className="contact-cards">
                        <div className="contact-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="card-icon">
                                <MapPin size={28} />
                            </div>
                            <h3>Our Location</h3>
                            <p>123 Fragrance Avenue</p>
                            <p>Kochi, Kerala 682001</p>
                            <p>India</p>
                        </div>

                        <div className="contact-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="card-icon">
                                <Phone size={28} />
                            </div>
                            <h3>Phone Numbers</h3>
                            <p>Main Office: +91 98765 43210</p>
                            <p>Customer Support: +91 98765 43211</p>
                            <p>Course Enquiries: +91 98765 43212</p>
                        </div>

                        <div className="contact-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="card-icon">
                                <Mail size={28} />
                            </div>
                            <h3>Email Addresses</h3>
                            <p>General Inquiries: info@aromaresearch.com</p>
                            <p>Support: support@aromaresearch.com</p>
                            <p>Careers: careers@aromaresearch.com</p>
                        </div>

                        <div className="contact-card" data-aos="fade-up" data-aos-delay="400">
                            <div className="card-icon">
                                <Clock size={28} />
                            </div>
                            <h3>Business Hours</h3>
                            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                            <p>Saturday: 9:00 AM - 1:00 PM</p>
                            <p>Sunday: Closed</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="contact-form-section">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <h2>Send Us a Message</h2>
                        <div className="divider"></div>
                        <p className="section-intro">
                            Have a specific question or inquiry? Fill out the form below,
                            and we'll get back to you as soon as possible.
                        </p>
                    </div>

                    
                </div>
            </section>

            {/* Map Section */}
           

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

export default ContactPage;