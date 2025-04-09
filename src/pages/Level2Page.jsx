import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Award, BookOpen, Beaker, Lock } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Level2Page.css';

const Level2Page = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    });
    
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="level2-page">
      {/* Header Banner */}
      <section className="level2-header">
        <div className="background-container">
          <div className="overlay"></div>
        </div>
        <div className="container">
          <div className="header-content" data-aos="fade-up">
            <div className="level-badge locked">
              <Lock size={18} className="badge-icon" />
              <span>Level 2 Locked</span>
            </div>
            <h1>Advanced Level</h1>
            <p className="subtitle">Complete Level 1 to unlock advanced blending techniques</p>
          </div>
        </div>
        
        <div className="floating-elements">
          <div className="floating-bottle bottle1"></div>
          <div className="floating-bottle bottle2"></div>
          <div className="floating-leaf leaf1"></div>
          <div className="floating-leaf leaf2"></div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="introduction-section">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-content" data-aos="fade-right">
              <div className="intro-icon">
                <Award size={28} />
              </div>
              <h2>Advance to Level 2</h2>
              <p className="intro-description">
                Level 2 is our comprehensive advanced program that builds upon the foundational knowledge from Level 1.
                Once unlocked, you'll explore complex fragrance compositions, learn professional blending techniques, and gain deeper 
                insights into the chemistry of essential oils.
              </p>
              <p className="intro-description">
                Level 2 certification will open doors to various professional 
                opportunities in the fragrance industry. Complete Level 1 with at least 70% score to gain access to this advanced course.
              </p>
              
            </div>
            
            <div className="intro-image" data-aos="fade-left">
              <div className="image-container locked">
                <div className="lock-overlay">
                  <Lock size={64} className="big-lock-icon" />
                  <p>Complete Level 1 to Unlock</p>
                </div>
                <div className="pulse-circle"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>What You'll Learn</h2>
            <div className="divider"></div>
          </div>
          
          <div className="features-grid">
            <div className="feature-card locked" data-aos="zoom-in" data-aos-delay="100">
              <div className="feature-icon">
                <BookOpen size={24} />
              </div>
              <h3>Advanced Olfactory Training</h3>
              <p>Develop a refined sense of smell and learn to identify complex accords</p>
              <div className="lock-indicator"><Lock size={16} /></div>
            </div>
            
            <div className="feature-card locked" data-aos="zoom-in" data-aos-delay="200">
              <div className="feature-icon">
                <Beaker size={24} />
              </div>
              <h3>Chemistry of Fragrance</h3>
              <p>Explore molecular structures and understand chemical interactions in perfumery</p>
              <div className="lock-indicator"><Lock size={16} /></div>
            </div>
            
            <div className="feature-card highlight locked" data-aos="zoom-in" data-aos-delay="300">
              <div className="feature-icon">
                <Award size={24} />
              </div>
              <h3>Professional Blending</h3>
              <p>Master advanced formulation techniques used by professional perfumers</p>
              <div className="card-shine"></div>
              <div className="lock-indicator"><Lock size={16} /></div>
            </div>
            
            <div className="feature-card locked" data-aos="zoom-in" data-aos-delay="400">
              <div className="feature-icon">
                <BookOpen size={24} />
              </div>
              <h3>Commercial Applications</h3>
              <p>Understand market trends and industry standards for fragrance development</p>
              <div className="lock-indicator"><Lock size={16} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment CTA */}
      <section className="enrollment-section">
        <div className="container">
          <div className="enrollment-content" data-aos="fade-up">
            <div className="unlock-animation">
              <div className="lock-icon">
                <Lock size={32} />
              </div>
            </div>
            <h2>Ready to Unlock Level 2 ?</h2>
            <p>Complete Level 1 with at least 70% score to unlock advanced training</p>
            <div className="enrollment-details">
              <div className="detail-item">
                <span className="detail-label">Start Date</span>
                <span className="detail-value">June 15, 2025</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Investment</span>
                <span className="detail-value">$1,499</span>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="coming-soon-section">
        <div className="container">
          <div className="coming-soon-content" data-aos="zoom-in">
            <h2>Level 3: Master Perfumer</h2>
            <div className="coming-badge">Coming Soon</div>
            <p>Our most comprehensive program is currently in development. Complete Levels 1 and 2 to be among the first to access it.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Level2Page;