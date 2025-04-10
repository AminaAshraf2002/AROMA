import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Droplet, Leaf, BookOpen, Users, Beaker, Award, Globe, Zap } from 'lucide-react';

// Image imports
import backgroundImg from '../assets/image.jpeg';
import logoImage from '../assets/AROMA.png';
import labImage from '../assets/img.jpeg';
import teamImage from '../assets/img1.jpg';
import researchImage from '../assets/img1.jpg';
import botanicalImage from '../assets/img1.jpg';
import creativeImage from '../assets/img1.jpg';
import educationImage from '../assets/img1.jpg';
import './AboutDetailedPage.css';

const AboutDetailedPage = () => {
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

    const handleEnrollNow = () => {
        navigate('/payment');
    };

    return (
        <div className="about-detailed-page">
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
                                <li><a href="/about" className="nav-link active">Home</a></li>
                                <li><a href="/about-detailed" className="nav-link">About</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="background-container">
                    <img src={backgroundImg} alt="" className="background-image" />
                    <div className="overlay"></div>
                </div>
                <div className="container">
                    <div className="hero-content" data-aos="fade-up">
                        <h1>ABOUT AROMA RESEARCH CENTRE</h1>
                        <p className="subtitle">Excellence in Fragrance Science, Art & Education</p>
                        <div className="divider"></div>
                        
                        {/* Mission Banner */}
                        <div className="mission-banner">
                            <p>"Our mission is to advance the art and science of perfumery through innovative research, 
                            exceptional education, and sustainable practices that honor both tradition and future possibilities."</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="story-section">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <h2>Our Story</h2>
                        <div className="divider"></div>
                    </div>
                    
                    <div className="story-content">
                        <div className="story-text" data-aos="fade-right">
                            <p>
                                Founded in 2010 by a collaborative team of master perfumers and fragrance scientists, 
                                AROMA RESEARCH CENTRE emerged from a shared vision to create a hub where the ancient art 
                                of perfumery could meet cutting-edge scientific innovation.
                            </p>
                            <p>
                                What began as a small laboratory dedicated to essential oil research has evolved into 
                                a comprehensive center for fragrance development, education, and sustainable practices. 
                                Our founders combined centuries of traditional perfumery knowledge with modern analytical 
                                techniques to create a unique approach to scent creation.
                            </p>
                            <p>
                                Today, we stand as a bridge between heritage and innovation, continuing to push the 
                                boundaries of what's possible in the world of fragrance while honoring the rich history 
                                and time-tested methods that form the foundation of perfumery excellence.
                            </p>
                        </div>
                        <div className="story-image" data-aos="fade-left">
                            <img src={labImage} alt="Aroma Research Laboratory" />
                            <div className="image-accent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Methodology Section */}
            <section className="methodology-section">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <h2>Our Methodologies</h2>
                        <div className="divider"></div>
                        <p className="section-intro">
                            At AROMA RESEARCH CENTRE, we operate through a combination of specialized methodologies 
                            that blend scientific rigor with artistic sensibility.
                        </p>
                    </div>
                    
                    <div className="methodology-grid">
                        <div className="methodology-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="card-icon">
                                <Leaf size={30} />
                            </div>
                            <h3>Botanical Research</h3>
                            <p>
                                We conduct in-depth studies of aromatic plants and trees, ensuring sustainable 
                                sourcing and extraction of high-quality essences through traditional and modern methods.
                            </p>
                        </div>
                        
                        <div className="methodology-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="card-icon">
                                <Beaker size={30} />
                            </div>
                            <h3>Perfumery Science</h3>
                            <p>
                                Our laboratories employ cutting-edge analytical techniques to understand scent molecules 
                                and their interactions, creating the scientific foundation for exceptional fragrances.
                            </p>
                        </div>
                        
                        <div className="methodology-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="card-icon">
                                <Droplet size={30} />
                            </div>
                            <h3>Creative Fragrance Design</h3>
                            <p>
                                We blend traditional craftsmanship with modern innovation to craft unique olfactory experiences 
                                that evoke emotion and create lasting impressions.
                            </p>
                        </div>
                        
                        <div className="methodology-card" data-aos="fade-up" data-aos-delay="400">
                            <div className="card-icon">
                                <BookOpen size={30} />
                            </div>
                            <h3>Educational Excellence</h3>
                            <p>
                                Our structured training programs cover both theory and practical application, 
                                nurturing the next generation of perfumery professionals.
                            </p>
                        </div>
                        
                        <div className="methodology-card" data-aos="fade-up" data-aos-delay="500">
                            <div className="card-icon">
                                <Globe size={30} />
                            </div>
                            <h3>Global Collaboration</h3>
                            <p>
                                We maintain active partnerships with experts across continents, exchanging knowledge 
                                and techniques to enhance our collective understanding of fragrance.
                            </p>
                        </div>
                        
                        <div className="methodology-card" data-aos="fade-up" data-aos-delay="600">
                            <div className="card-icon">
                                <Zap size={30} />
                            </div>
                            <h3>Innovative Experimentation</h3>
                            <p>
                                Our experimental approach pushes boundaries by exploring novel scent combinations 
                                and advanced delivery systems, keeping us at the forefront of industry innovation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Research & Innovation Section */}
            <section className="research-section">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <h2>Research & Innovation</h2>
                        <div className="divider"></div>
                    </div>
                    
                    <div className="research-content">
                        <div className="research-image" data-aos="fade-right">
                            <img src={researchImage} alt="Research Activities" />
                            <div className="image-accent"></div>
                        </div>
                        
                        <div className="research-text" data-aos="fade-left">
                            <h3>Cutting-Edge Fragrance Technology</h3>
                            <p>
                                Our state-of-the-art laboratories are equipped with advanced analytical tools, 
                                including gas chromatography-mass spectrometry (GC-MS) and headspace analysis 
                                technology, allowing for precise identification and recreation of complex scent profiles.
                            </p>
                            
                            <h3>Sustainable Extraction Methods</h3>
                            <p>
                                We've pioneered eco-friendly extraction processes that preserve the integrity of 
                                natural materials while minimizing environmental impact, including low-temperature 
                                techniques and solvent-free methodologies.
                            </p>
                            
                            <h3>Olfactory Mapping</h3>
                            <p>
                                Our researchers have developed proprietary systems for mapping olfactory responses, 
                                creating a database that links molecular structures to perceived scent qualities and 
                                emotional responses.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Botanical Conservation Section */}
            <section className="conservation-section">
                <div className="container">
                    <div className="conservation-wrapper">
                        <div className="conservation-content" data-aos="fade-right">
                            <h2>Botanical Conservation</h2>
                            <div className="divider"></div>
                            <p>
                                The AROMA RESEARCH CENTRE is committed to preserving the botanical diversity that 
                                forms the foundation of natural perfumery. Our conservation initiatives include:
                            </p>
                            <ul className="conservation-list">
                                <li>
                                    <span className="check-icon">✓</span>
                                    <span>Maintaining a living library of over 200 aromatic plant species</span>
                                </li>
                                <li>
                                    <span className="check-icon">✓</span>
                                    <span>Partnering with sustainable farms across five continents</span>
                                </li>
                                <li>
                                    <span className="check-icon">✓</span>
                                    <span>Researching alternatives for endangered botanical ingredients</span>
                                </li>
                                <li>
                                    <span className="check-icon">✓</span>
                                    <span>Developing cultivation methods that preserve wild species</span>
                                </li>
                            </ul>
                        </div>
                        <div className="conservation-image" data-aos="fade-left">
                            <img src={botanicalImage} alt="Botanical Conservation" />
                            <div className="image-accent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section className="team-section">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <h2>Our Expert Team</h2>
                        <div className="divider"></div>
                        <p className="section-intro">
                            The AROMA RESEARCH CENTRE brings together world-class experts from diverse fields, 
                            creating a multidisciplinary team dedicated to excellence in fragrance.
                        </p>
                    </div>
                    
                    <div className="team-content">
                        <div className="team-text" data-aos="fade-right">
                            <h3>Diverse Expertise</h3>
                            <p>
                                Our team includes master perfumers with decades of experience, chemists specializing 
                                in molecular analysis, botanists focused on aromatic plants, and educators passionate 
                                about sharing knowledge.
                            </p>
                            
                            <h3>Collaborative Approach</h3>
                            <p>
                                We believe that the best innovations emerge when different perspectives converge. 
                                Our collaborative workflow ensures that scientific rigor meets artistic intuition 
                                at every stage of fragrance development.
                            </p>
                            
                            <h3>Continued Learning</h3>
                            <p>
                                Every team member engages in ongoing education and research, attending international 
                                symposiums, conducting field studies, and participating in cross-disciplinary projects 
                                to expand our collective expertise.
                            </p>
                        </div>
                        
                        <div className="team-image" data-aos="fade-left">
                            <img src={teamImage} alt="Our Expert Team" />
                            <div className="image-accent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Education Philosophy Section */}
            <section className="education-philosophy-section">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <h2>Our Education Philosophy</h2>
                        <div className="divider"></div>
                    </div>
                    
                    <div className="philosophy-content">
                        <div className="philosophy-image" data-aos="fade-right">
                            <img src={educationImage} alt="Education Philosophy" />
                            <div className="image-accent"></div>
                        </div>
                        
                        <div className="philosophy-text" data-aos="fade-left">
                            <p>
                                At AROMA RESEARCH CENTRE, we believe that excellence in perfumery education comes 
                                from balancing technical knowledge with creative exploration. Our educational 
                                programs are designed to build a strong foundation of scientific understanding 
                                while nurturing the artistic sensibility that distinguishes exceptional perfumers.
                            </p>
                            
                            <p>
                                We emphasize hands-on learning, providing students with direct experience working 
                                with both natural and synthetic materials. This practical approach is complemented 
                                by in-depth theoretical instruction that covers the chemistry, history, and cultural 
                                significance of fragrance.
                            </p>
                            
                            <p>
                                Our structured, progressive curriculum allows students to build skills methodically, 
                                from basic recognition of scent families to advanced composition techniques. We 
                                recognize that each learner brings unique sensibilities and strengths, and our 
                                approach accommodates different learning styles and professional goals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Creative Process Section */}
            <section className="creative-process-section">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <h2>Our Creative Process</h2>
                        <div className="divider"></div>
                    </div>
                    
                    <div className="process-content">
                        <div className="process-text" data-aos="fade-right">
                            <p>
                                At the heart of the AROMA RESEARCH CENTRE is our unique creative process that combines 
                                traditional artisanship with scientific precision. Each fragrance creation begins with 
                                inspiration—whether from nature, culture, memory, or abstract concept—that guides our 
                                exploration.
                            </p>
                            
                            <div className="process-steps">
                                <div className="process-step">
                                    <div className="step-number">01</div>
                                    <div className="step-content">
                                        <h3>Conceptualization</h3>
                                        <p>
                                            Defining the emotional and sensory goals of the fragrance, identifying key 
                                            notes and accords that will express the central concept.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="process-step">
                                    <div className="step-number">02</div>
                                    <div className="step-content">
                                        <h3>Material Selection</h3>
                                        <p>
                                            Choosing from our extensive library of natural and synthetic ingredients, 
                                            considering both olfactory quality and sustainability.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="process-step">
                                    <div className="step-number">03</div>
                                    <div className="step-content">
                                        <h3>Composition & Refinement</h3>
                                        <p>
                                            Creating initial formulations, followed by iterative testing and refinement 
                                            to achieve balance, longevity, and character.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="process-step">
                                    <div className="step-number">04</div>
                                    <div className="step-content">
                                        <h3>Evaluation & Finalization</h3>
                                        <p>
                                            Comprehensive testing across different conditions and on various mediums, 
                                            leading to final formulation and documentation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="process-image" data-aos="fade-left">
                            <img src={creativeImage} alt="Creative Process" />
                            <div className="image-accent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Education Programs Overview Section */}
            <section className="programs-section">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <h2>Education Programs Overview</h2>
                        <div className="divider"></div>
                        <p className="section-intro">
                            Our comprehensive education pathway offers structured learning for every level, 
                            from curious beginners to aspiring professional perfumers.
                        </p>
                    </div>
                    
                    <div className="programs-grid">
                        <div className="program-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="program-level">LEVEL 1</div>
                            <h3>Introduction to Perfumery</h3>
                            <p>
                                Begin your perfumery journey with our foundational assessment. This 50-question 
                                evaluation tests basic knowledge of scent families, fragrance notes, and blending 
                                essentials. Successful completion earns a certificate and unlocks access to advanced studies.
                            </p>
                            <div className="program-features">
                                <div className="feature"><span>✓</span> Self-paced learning</div>
                                <div className="feature"><span>✓</span> Certificate included</div>
                                <div className="feature"><span>✓</span> No prior experience needed</div>
                            </div>
                            <button onClick={handleEnrollNow} className="btn-program">Start Level 1</button>
                        </div>
                        
                        <div className="program-card locked" data-aos="fade-up" data-aos-delay="200">
                            <div className="program-level">LEVEL 2</div>
                            <div className="lock-overlay">
                                <div className="lock-icon">🔒</div>
                                <p>Complete Level 1 to unlock</p>
                            </div>
                            <h3>Perfumery Fundamentals</h3>
                            <p>
                                Build on your foundational knowledge with a comprehensive exploration of perfumery 
                                principles. Learn about raw materials, accord building, and formulation techniques 
                                through guided instruction and practical exercises.
                            </p>
                            <div className="program-features">
                                <div className="feature"><span>✓</span> Guided instructional content</div>
                                <div className="feature"><span>✓</span> Basic formula creation</div>
                                <div className="feature"><span>✓</span> Technical certification</div>
                            </div>
                            <button className="btn-program disabled">Locked</button>
                        </div>
                        
                        <div className="program-card locked" data-aos="fade-up" data-aos-delay="300">
                            <div className="program-level">LEVEL 3</div>
                            <div className="lock-overlay">
                                <div className="lock-icon">🔒</div>
                                <p>Complete Level 2 to unlock</p>
                            </div>
                            <h3>Advanced Perfumery</h3>
                            <p>
                                Master sophisticated techniques and develop your unique creative signature. 
                                This advanced program covers complex formulation, creative interpretation, 
                                and professional standards for fragrance development.
                            </p>
                            <div className="program-features">
                                <div className="feature"><span>✓</span> Professional-grade training</div>
                                <div className="feature"><span>✓</span> Mentorship opportunities</div>
                                <div className="feature"><span>✓</span> Portfolio development</div>
                            </div>
                            <button className="btn-program disabled">Locked</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content" data-aos="zoom-in">
                        <h2>Join Our Fragrance Community</h2>
                        <p>Begin your journey into the fascinating world of perfumery with the AROMA RESEARCH CENTRE</p>
                        <div className="cta-buttons">
                            <button onClick={handleEnrollNow} className="btn-primary">Enroll Now</button>
                            <a href="/about-detailed" className="btn-secondary">Contact Us</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutDetailedPage;