import styles from './Footer.module.css';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>

        {/* Brand Column */}
        <div className={styles.brandCol}>
          <div className={styles.logoWrapper}>
            <div className={styles.logoIcon}>
              <Heart size={20}/>
            </div>
            <span className={styles.brandName}>HealthPath</span>
          </div>
          <p className={styles.tagline}>
            Reducing stigma and improving health literacy,<br />
            one person at a time.
          </p>
        </div>

        {/* Resources Column */}
        <div className={styles.navCol}>
          <h3 className={styles.colTitle}>Resources</h3>
          <a className={styles.navLink} href="#">Education Hub</a>
          <a className={styles.navLink} href="#">Symptom Checker</a>
          <a className={styles.navLink} href="#">Community Support</a>
          <a className={styles.navLink} href="#">FAQ</a>
        </div>

        {/* Support Column */}
        <div className={styles.navCol}>
          <h3 className={styles.colTitle}>Support</h3>
          <a className={styles.navLink} href="#">Crisis Hotline: 988</a>
          <a className={styles.navLink} href="#">CDC STI Hotline: 1-800-CDC-INFO</a>
          <a className={styles.navLink} href="#">Find a Clinic</a>
        </div>

        {/* Legal Column */}
        <div className={styles.navCol}>
          <h3 className={styles.colTitle}>Legal</h3>
          <a className={styles.navLink} href="#">Privacy Policy</a>
          <a className={styles.navLink} href="#">Terms of Service</a>
          <a className={styles.navLink} href="#">Medical Disclaimer</a>
        </div>

      </div>

      <hr className={styles.divider} />

      <div className={styles.bottomSection}>
        <p className={styles.disclaimer}>
          This platform provides educational information only and is not a substitute for professional medical advice.
          Always consult with a qualified healthcare provider for diagnosis and treatment.
        </p>
        <p className={styles.copyright}>© 2024 HealthPath. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;