import { Link } from 'react-router-dom';
import { Heart, Shield, Users, CheckCircle, ArrowRight, MessageCircle, BookOpen, Activity, Lock, Sparkles, Star, TrendingUp, Award, Clock } from 'lucide-react';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.gradientOrb1}></div>
          <div className={styles.gradientOrb2}></div>
          <div className={styles.gradientOrb3}></div>
        </div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.badge}>
              <Sparkles size={16} />
              <span>100% Anonymous & Free</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              Your Health,
              <span className={styles.heroTitleAccent}> Your Privacy,</span>
              <span className={styles.heroTitleHighlight}> Our Priority</span>
            </h1>
            
            <p className={styles.heroSubtitle}>
              Break free from stigma. Access judgment-free sexual health information, 
              get your symptoms checked, and connect with verified healthcare professionals—all 
              without revealing your identity.
            </p>
            
            <div className={styles.heroCtas}>
              <Link to="/symptom-checker" className={styles.primaryButton}>
                <Activity size={20} />
                Check Your Symptoms
                <ArrowRight size={20} className={styles.arrowIcon} />
              </Link>
              <Link to="/community" className={styles.secondaryButton}>
                <MessageCircle size={20} />
                Ask Anonymously
              </Link>
            </div>
            
            <div className={styles.trustIndicators}>
              <div className={styles.trustItem}>
                <CheckCircle size={18} />
                <span>No Login Required</span>
              </div>
              <div className={styles.trustItem}>
                <Lock size={18} />
                <span>Completely Private</span>
              </div>
              <div className={styles.trustItem}>
                <Shield size={18} />
                <span>Verified Doctors</span>
              </div>
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.visualGrid}>
              <div className={`${styles.floatingCard} ${styles.card1}`}>
                <div className={styles.cardIcon}>
                  <Heart size={32} />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardLabel}>Safe Space</div>
                  <div className={styles.cardValue}>100% Confidential</div>
                </div>
              </div>
              
              <div className={`${styles.floatingCard} ${styles.card2}`}>
                <div className={styles.cardIcon}>
                  <Users size={32} />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardLabel}>Community</div>
                  <div className={styles.cardValue}>10K+ Helped</div>
                </div>
              </div>
              
              <div className={`${styles.floatingCard} ${styles.card3}`}>
                <div className={styles.cardIcon}>
                  <Star size={32} />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardLabel}>Expert Care</div>
                  <div className={styles.cardValue}>500+ Doctors</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breaking Stigma Section */}
      <section className={styles.stigmaSection}>
        <div className={styles.container}>
          <div className={styles.stigmaContent}>
            <div className={styles.stigmaText}>
              <h2 className={styles.stigmaTitle}>
                It's Time to Break the Silence
              </h2>
              <p className={styles.stigmaDescription}>
                Sexual health is healthcare. There's no shame in seeking information, 
                asking questions, or getting checked. Your concerns are valid, your 
                questions matter, and you deserve judgment-free support.
              </p>
              <div className={styles.stigmaStats}>
                <div className={styles.stigmaStat}>
                  <div className={styles.stigmaStatNumber}>1 in 5</div>
                  <div className={styles.stigmaStatLabel}>people have an STI</div>
                </div>
                <div className={styles.stigmaStat}>
                  <div className={styles.stigmaStatNumber}>50%</div>
                  <div className={styles.stigmaStatLabel}>are afraid to get tested</div>
                </div>
                <div className={styles.stigmaStat}>
                  <div className={styles.stigmaStatNumber}>You're</div>
                  <div className={styles.stigmaStatLabel}>not alone in this</div>
                </div>
              </div>
            </div>
            <div className={styles.stigmaVisual}>
              <div className={styles.stigmaIconGrid}>
                <div className={styles.stigmaIcon}>
                  <Shield size={40} />
                </div>
                <div className={styles.stigmaIcon}>
                  <Heart size={40} />
                </div>
                <div className={styles.stigmaIcon}>
                  <Users size={40} />
                </div>
                <div className={styles.stigmaIcon}>
                  <CheckCircle size={40} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>How HealthPath Works</h2>
            <p className={styles.sectionSubtitle}>
              Three simple steps to get the information and support you need
            </p>
          </div>
          
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>
                <span>01</span>
              </div>
              <div className={styles.stepIcon}>
                <Activity size={48} />
              </div>
              <h3 className={styles.stepTitle}>Check Your Symptoms</h3>
              <p className={styles.stepDescription}>
                Answer 19 quick questions about your symptoms, health history, and concerns. 
                Our smart assessment provides personalized insights instantly.
              </p>
              <Link to="/symptom-checker" className={styles.stepLink}>
                Start Assessment <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>
                <span>02</span>
              </div>
              <div className={styles.stepIcon}>
                <BookOpen size={48} />
              </div>
              <h3 className={styles.stepTitle}>Learn & Educate</h3>
              <p className={styles.stepDescription}>
                Browse our comprehensive library of articles covering STIs, contraception, 
                reproductive health, and more—all written in plain language.
              </p>
              <Link to="/education" className={styles.stepLink}>
                Explore Library <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>
                <span>03</span>
              </div>
              <div className={styles.stepIcon}>
                <MessageCircle size={48} />
              </div>
              <h3 className={styles.stepTitle}>Ask Questions</h3>
              <p className={styles.stepDescription}>
                Post your questions anonymously to our community. Get answers from 
                verified healthcare professionals within 24-48 hours.
              </p>
              <Link to="/community" className={styles.stepLink}>
                Ask Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whyChoose}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why People Trust HealthPath</h2>
          
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <Lock size={32} />
              </div>
              <h3 className={styles.benefitTitle}>Complete Anonymity</h3>
              <p className={styles.benefitText}>
                No registration, no tracking, no personal information. Your privacy is 
                guaranteed—we don't even store cookies.
              </p>
            </div>
            
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <Award size={32} />
              </div>
              <h3 className={styles.benefitTitle}>Verified Experts</h3>
              <p className={styles.benefitText}>
                Every doctor on our platform is verified with medical credentials. Get 
                accurate, evidence-based answers you can trust.
              </p>
            </div>
            
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <Heart size={32} />
              </div>
              <h3 className={styles.benefitTitle}>Judgment-Free Zone</h3>
              <p className={styles.benefitText}>
                No question is too embarrassing. We're here to help, not to judge. 
                Every concern is valid and deserves attention.
              </p>
            </div>
            
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <Clock size={32} />
              </div>
              <h3 className={styles.benefitTitle}>24/7 Access</h3>
              <p className={styles.benefitText}>
                Access information anytime, anywhere. Our resources and symptom checker 
                are available whenever you need them.
              </p>
            </div>
            
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <CheckCircle size={32} />
              </div>
              <h3 className={styles.benefitTitle}>Evidence-Based</h3>
              <p className={styles.benefitText}>
                All content is reviewed by healthcare professionals and backed by 
                current medical research and guidelines.
              </p>
            </div>
            
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <TrendingUp size={32} />
              </div>
              <h3 className={styles.benefitTitle}>Free Forever</h3>
              <p className={styles.benefitText}>
                Healthcare information should be accessible to everyone. HealthPath 
                will always be 100% free to use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Impact Section */}
      <section className={styles.impact}>
        <div className={styles.container}>
          <div className={styles.impactGrid}>
            <div className={styles.impactCard}>
              <TrendingUp size={48} className={styles.impactIcon} />
              <div className={styles.impactNumber}>10,000+</div>
              <div className={styles.impactLabel}>Questions Answered</div>
            </div>
            <div className={styles.impactCard}>
              <Users size={48} className={styles.impactIcon} />
              <div className={styles.impactNumber}>500+</div>
              <div className={styles.impactLabel}>Verified Doctors</div>
            </div>
            <div className={styles.impactCard}>
              <Heart size={48} className={styles.impactIcon} />
              <div className={styles.impactNumber}>98%</div>
              <div className={styles.impactLabel}>Satisfaction Rate</div>
            </div>
            <div className={styles.impactCard}>
              <Star size={48} className={styles.impactIcon} />
              <div className={styles.impactNumber}>4.8/5</div>
              <div className={styles.impactLabel}>Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.finalCta}>
        <div className={styles.ctaContainer}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Take the First Step Toward Better Health
            </h2>
            <p className={styles.ctaText}>
              You don't have to face your health concerns alone. Join thousands who've 
              found answers, support, and peace of mind through HealthPath.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/symptom-checker" className={styles.ctaPrimary}>
                <Activity size={20} />
                Check Symptoms Now
              </Link>
              <Link to="/education" className={styles.ctaSecondary}>
                <BookOpen size={20} />
                Browse Resources
              </Link>
            </div>
            <p className={styles.ctaNote}>
              <Lock size={16} />
              Remember: You're completely anonymous. No signup, no tracking, no judgment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;