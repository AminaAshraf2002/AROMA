import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Droplet, Leaf, BookOpen } from 'lucide-react';

// Image imports
import backgroundImg from '../assets/image.jpeg';
import labImage from '../assets/image (1).jpg';
import ingredientsImage from '../assets/spray.jpeg';
import levelOneImage from '../assets/institute7.jpeg';
import logoImage from '../assets/AROMA.png';
import './AboutPage.css';

const AboutPage = () => {
    const navigate = useNavigate();

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

    const handleLevelOnePayment = () => {
        navigate('/payment');
    };

    const handleEnrollNow = () => {
        navigate('/payment');
    };

    return (
        <div className="about-page">
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
                                <li><Link to="/about" className="nav-link active">Home</Link></li>
                                <li><Link to="/about-detailed" className="nav-link">About</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Enhanced Hero section with course info */}
            <section className="hero-section">
                <div className="background-container">
                    <img src={backgroundImg} alt="" className="background-image" />
                    <div className="overlay"></div>
                </div>
                <div className="container">
                    <div className="hero-content" data-aos="fade-up">
                        <h1>AROMA RESEARCH CENTRE</h1>
                        <p className="subtitle">Where Science Meets the Art of Fragrance</p>
                        <div className="divider"></div>

                        {/* Course and Level Information */}
                        <div className="course-banner">
                            <div className="course-info">
                                <h3>Perfumery Fundamentals</h3>
                                <p>Master the art and science of creating captivating fragrances</p>
                                <div className="course-details">
                                    <div className="course-detail">
                                        <BookOpen size={16} />
                                        <span>Level 1 Course</span>
                                    </div>
                                    <div className="course-detail">
                                        <Droplet size={16} />
                                        <span>50 Questions</span>
                                    </div>
                                    <div className="course-detail">
                                        <Leaf size={16} />
                                        <span>Certificate Included</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={handleEnrollNow}
                                className="btn-enroll"
                            >
                                Enroll Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Concise Introduction section */}
            <section className="intro-section">
                <div className="container">
                    <div className="intro-wrapper">
                        <div className="intro-content" data-aos="fade-right">
                            <h2>About Our Centre</h2>
                            <p>
                                The AROMA RESEARCH CENTRE excels in fragrance by blending science, art, and business., deeply study plants for quality ingredients, use advanced tech to understand scents, and creatively design unique perfumes. We also create custom fragrances for clients, offer training in perfumery and marketing, and combine science, art, and psychology in their work. Sustainability and global collaboration are key, and AROMA RESEARCH CENTRE constantly experiment with new ideas to stay innovative.
                            </p>
                        </div>
                        <div className="intro-image" data-aos="fade-left">
                            <img src={labImage} alt="Aroma Research Laboratory" />
                            <div className="image-accent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Streamlined Education section */}
            <section className="education-section">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <h2>Education in Perfumery</h2>
                        <div className="divider"></div>
                    </div>

                    <div className="education-content">
                        <div className="education-image" data-aos="fade-right">
                            <img src={ingredientsImage} alt="Perfume Ingredients" />
                            <div className="image-accent"></div>
                        </div>
                        <div className="education-text" data-aos="fade-left">
                            <p>
                                AROMA RESEARCH CENTRE offers online perfumery training in three steps, like learning to bake. Level 1 is the basics: you'd learn about different smells (like flowers or fruits) and how perfumes are generally made. Level 2 gets a bit more involved: you'd start understanding how different scents blend together and last over time. Level 3 is the advanced stage where you'd learn to create more complex and unique perfumes, maybe even for specific purposes. Each level builds on the previous one to help you become a skilled perfume creator from your own home.
                            </p>

                        </div>
                    </div>
                </div>
            </section>

            {/* Learning pathway section - Visual focus */}
            <section className="learning-path-section">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <h2>Our Learning Pathway</h2>
                        <div className="divider"></div>
                    </div>

                    <div className="levels-container">
                        <div className="level-card" data-aos="fade-up">
                            <div className="level-image">
                                <img src={levelOneImage} alt="Level 1" />
                                <div className="level-badge">LEVEL 1</div>
                            </div>
                            <div className="level-content">
                                <h3>Introduction to Perfumery</h3>
                                <p>
                                LEVEL 1 is a simple entrance examination that includes your score and a certificate upon completion. This initial level is designed to improve your knowledge in perfumery science and build your confidence to continue your learning journey. Upon finishing the examination, you will receive a LEVEL 1 Certificate to keep. The test consists of 50 questions, and you can select your answer from the provided list. Your final score will be displayed on your certificate.

                                </p>
                               
                                <div className="level-action">
                                    <button
                                        onClick={handleLevelOnePayment}
                                        className="btn-level"
                                    >
                                        Start Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section with Copyright (Updated to match AboutDetailedPage) */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content" data-aos="zoom-in">
                        <h2>Begin Your Perfumery Journey</h2>
                        <div className="cta-buttons">
                            <Link to="/contact" className="btn-primary">Contact Now</Link>
                            <Link to="/about-detailed" className="btn-secondary">Learn More</Link>
                        </div>

                        {/* Copyright Information (Added to match AboutDetailedPage) */}
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

export default AboutPage;