import { Link } from 'react-router-dom';
import { Heart, Shield, Users, BookOpen, ArrowRight, CheckCircle } from 'lucide-react';
import styles from './HomePage.module.css';
import QuickPoll from '../components/QuickPoll';

const HomePage = () => {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroIcon}>
            <Heart className={styles.heartIcon} />
          </div>
          
          <h1 className={styles.heroTitle}>
            Your Health Journey, <span className={styles.heroAccent}>Without the Stigma</span>
          </h1>
          
          <p className={styles.heroSubtitle}>
            We reduce delayed care by lowering stigma and improving health literacy. Get 
            personalized insights, education, and support in a judgment-free space.
          </p>
          
          <Link to="/symptom-checker" className={styles.primaryCta}>
            Start Your Assessment
            <ArrowRight className={styles.ctaArrow} />
          </Link>
          
          <p className={styles.heroNote}>
            Completely anonymous • Takes 3-5 minutes
          </p>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className={styles.trustSection}>
        <div className={styles.trustGrid}>
          <div className={styles.trustCard}>
            <div className={styles.trustIconWrapper} style={{ backgroundColor: 'rgba(13, 148, 136, 0.1)' }}>
              <Shield className={styles.trustIcon} style={{ color: '#0d9488' }} />
            </div>
            <h3 className={styles.trustTitle}>100% Anonymous</h3>
            <p className={styles.trustText}>
              No signup required. Your privacy is protected.
            </p>
          </div>
          
          <div className={styles.trustCard}>
            <div className={styles.trustIconWrapper} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
              <BookOpen className={styles.trustIcon} style={{ color: '#3b82f6' }} />
            </div>
            <h3 className={styles.trustTitle}>Evidence-Based</h3>
            <p className={styles.trustText}>
              All content reviewed by healthcare professionals.
            </p>
          </div>
          
          <div className={styles.trustCard}>
            <div className={styles.trustIconWrapper} style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
              <Heart className={styles.trustIcon} style={{ color: '#22c55e' }} />
            </div>
            <h3 className={styles.trustTitle}>Stigma-Free</h3>
            <p className={styles.trustText}>
              No judgment. Just caring, accurate information.
            </p>
          </div>
          
          <div className={styles.trustCard}>
            <div className={styles.trustIconWrapper} style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}>
              <Users className={styles.trustIcon} style={{ color: '#a855f7' }} />
            </div>
            <h3 className={styles.trustTitle}>Expert Support</h3>
            <p className={styles.trustText}>
              Ask questions, get answers from real doctors.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper} style={{ backgroundColor: 'rgba(13, 148, 136, 0.1)' }}>
              <Heart className={styles.featureIcon} style={{ color: '#0d9488' }} />
            </div>
            <h3 className={styles.featureTitle}>Symptom Checker</h3>
            <p className={styles.featureText}>
              Answer a few questions to understand possible causes and get testing recommendations.
            </p>
            <Link to="/symptom-checker" className={styles.featureLink}>
              Get Started <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
              <BookOpen className={styles.featureIcon} style={{ color: '#3b82f6' }} />
            </div>
            <h3 className={styles.featureTitle}>Education Hub</h3>
            <p className={styles.featureText}>
              Explore evidence-based articles, bust myths, and learn about prevention and treatment.
            </p>
            <Link to="/education" className={styles.featureLink}>
              Learn More <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper} style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}>
              <Users className={styles.featureIcon} style={{ color: '#a855f7' }} />
            </div>
            <h3 className={styles.featureTitle}>Ask a Doctor</h3>
            <p className={styles.featureText}>
              Post anonymous questions and get answers from verified healthcare professionals.
            </p>
            <Link to="/community" className={styles.featureLink}>
              Ask Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className={styles.whyMatters}>
        <div className={styles.whyMattersContent}>
          <h2 className={styles.whyMattersTitle}>Why This Matters</h2>
          
          <div className={styles.whyMattersGrid}>
            <div className={styles.whyMattersColumn}>
              <h3 className={styles.columnTitle}>The Problem</h3>
              <ul className={styles.problemList}>
                <li>Many people delay getting tested due to stigma and shame</li>
                <li>Most STIs have no symptoms but can cause serious complications</li>
                <li>Misinformation and myths prevent people from seeking care</li>
              </ul>
            </div>
            
            <div className={styles.whyMattersColumn}>
              <h3 className={styles.columnTitle}>Our Solution</h3>
              <ul className={styles.solutionList}>
                <li>
                  <CheckCircle className={styles.checkIcon} />
                  <span>Anonymous, judgment-free space for questions and concerns</span>
                </li>
                <li>
                  <CheckCircle className={styles.checkIcon} />
                  <span>Evidence-based education that empowers informed decisions</span>
                </li>
                <li>
                  <CheckCircle className={styles.checkIcon} />
                  <span>Clear pathways to testing and treatment without barriers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaContent}>
          <h2 className={styles.finalCtaTitle}>Ready to Take the First Step?</h2>
          <p className={styles.finalCtaText}>
            Knowledge is power. Understanding your body and health is the first step 
            toward better care and peace of mind.
          </p>
          <Link to="/symptom-checker" className={styles.primaryCta}>
            Start Your Assessment
            <ArrowRight className={styles.ctaArrow} />
          </Link>
        </div>
      </section>

      {/* Quick Poll Component */}
      <QuickPoll />
    </div>
  );
};

export default HomePage;