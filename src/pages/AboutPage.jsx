import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Droplet, Leaf, BookOpen } from 'lucide-react';

// Image imports
import backgroundImg from '../assets/image.jpeg';
import labImage from '../assets/img.jpeg';
import ingredientsImage from '../assets/img1.jpg';
import levelOneImage from '../assets/img1.jpg';
import levelTwoImage from '../assets/img1.jpg';
import levelThreeImage from '../assets/img1.jpg';
import './AboutPage.css';

const AboutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 800, // Reduced duration for faster animations
            once: false,
            mirror: true,
            easing: 'ease-out',
        });
    }, []);

    const handleLevelOnePayment = () => {
        navigate('/payment');
    };

    return (
        <div className="about-page">
            {/* Shorter Hero section */}
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

                        {/* <div className="level-card" data-aos="fade-up">
                            <div className="level-image">
                                <img src={levelTwoImage} alt="Level 2" />
                                <div className="level-badge">LEVEL 2</div>
                            </div>
                            <div className="level-content">
                                <h3>Advanced Techniques</h3>
                                <p>
                                    Elevate your skills with sophisticated composition methods and materials.
                                </p>
                                <ul className="level-features">
                                    <li><span>✓</span> Complex accord creation</li>
                                    <li><span>✓</span> Fragrance pyramid mastery</li>
                                </ul>
                                <div className="level-action">
                                    <a href="#" className="btn-level">Explore</a>
                                </div>
                            </div>
                        </div> */}

                        {/* <div className="level-card" data-aos="fade-up">
                            <div className="level-image">
                                <img src={levelThreeImage} alt="Level 3" />
                                <div className="level-badge">LEVEL 3</div>
                            </div>
                            <div className="level-content">
                                <h3>Master Perfumer</h3>
                                <p>
                                    Achieve professional expertise and develop your signature creations.
                                </p>
                                <ul className="level-features">
                                    <li><span>✓</span> Professional formulation</li>
                                    <li><span>✓</span> Market-ready compositions</li>
                                </ul>
                                <div className="level-action">
                                    <a href="#" className="btn-level">Discover</a>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>

            {/* Dynamic CTA section */}
            {/* <section className="cta-section">
                <div className="container">
                    <div className="cta-content" data-aos="zoom-in">
                        <h2>Begin Your Perfumery Journey</h2>
                        <div className="cta-buttons">
                            <a href="#" className="btn-primary">Enroll Today</a>
                            <a href="#" className="btn-secondary">Contact Us</a>
                        </div>
                    </div>
                </div>
            </section> */}
        </div>
    );
};

export default AboutPage;