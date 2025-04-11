import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Droplet, Leaf, BookOpen } from 'lucide-react';

// Image imports
import backgroundImg from '../assets/image.jpeg';
import labImage from '../assets/img.jpeg';
import ingredientsImage from '../assets/img1.jpg';
import levelOneImage from '../assets/img1.jpg';
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
                                Founded by master perfumers, the AROMA RESEARCH CENTRE blends scientific innovation 
                                with artistic excellence to create extraordinary fragrances. We're committed to 
                                preserving traditional knowledge while pioneering sustainable practices for 
                                the future of perfumery.
                            </p>
                            <Link to="/about-detailed" className="btn-learn-more">Learn More</Link>
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
                                Our comprehensive program blends science with creativity. Students master fragrance 
                                chemistry, from plant properties to extraction methods and scent classification.
                            </p>
                            <p>
                                Hands-on training develops essential olfactory skills for creating balanced, 
                                signature fragrances that stand out in the competitive market.
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
                                    Begin your journey with our beginner-friendly approach to fragrance fundamentals.
                                </p>
                                <ul className="level-features">
                                    <li><span>✓</span> 50 question assessment with certificate</li>
                                    <li><span>✓</span> Scent families & identification</li>
                                    <li><span>✓</span> Blending essentials</li>
                                </ul>
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
            
            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content" data-aos="zoom-in">
                        <h2>Begin Your Perfumery Journey</h2>
                        <div className="cta-buttons">
                            <Link to="/contact" className="btn-primary">Contact Now</Link>
                            <Link to="/about-detailed" className="btn-secondary">Learn More</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;