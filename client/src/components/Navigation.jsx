import { Link, useLocation } from 'react-router-dom';
import { Heart, UserPlus, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import styles from './Navigation.module.css';

const Navigation = () => {
  const location = useLocation();
  const isDoctorPath = location.pathname.startsWith('/doctor');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={styles.nav} ref={mobileMenuRef}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIconWrapper}>
            <Heart className={styles.logoIcon} />
          </div>
          <span className={styles.logoText}>HealthPath</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className={styles.desktopLinks}>
          {!isDoctorPath && (
            <>
              <Link 
                to="/" 
                className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}
              >
                <span>Home</span>
              </Link>
              <Link 
                to="/symptom-checker" 
                className={`${styles.link} ${location.pathname === '/symptom-checker' ? styles.active : ''}`}
              >
                <span>Symptom Checker</span>
              </Link>
              <Link 
                to="/education" 
                className={`${styles.link} ${location.pathname === '/education' ? styles.active : ''}`}
              >
                <span>Education</span>
              </Link>
              <Link 
                to="/community" 
                className={`${styles.link} ${location.pathname === '/community' ? styles.active : ''}`}
              >
                <span>Community</span>
              </Link>
              <Link 
                to="/faq" 
                className={`${styles.link} ${location.pathname === '/faq' ? styles.active : ''}`}
              >
                <span>FAQ</span>
              </Link>
            </>
          )}
          
          {/* Uncomment if needed */}
          {/* <Link 
            to="/doctor/login" 
            className={`${styles.doctorLink} ${isDoctorPath ? styles.active : ''}`}
          >
            <UserPlus size={18} />
            <span>For Doctors</span>
          </Link> */}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Menu */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          {/* Mobile Menu Header */}
          <div className={styles.mobileMenuHeader}>
            <Link to="/" className={styles.mobileMenuLogo} onClick={toggleMobileMenu}>
              <div className={styles.mobileLogoIconWrapper}>
                <Heart className={styles.mobileLogoIcon} />
              </div>
           
            </Link>
           
          </div>

          {/* Mobile Menu Links */}
          <div className={styles.mobileMenuContent}>
            {!isDoctorPath && (
              <>
                <Link 
                  to="/" 
                  className={`${styles.mobileLink} ${location.pathname === '/' ? styles.mobileActive : ''}`}
                >
                  <span>Home</span>
                </Link>
                <Link 
                  to="/symptom-checker" 
                  className={`${styles.mobileLink} ${location.pathname === '/symptom-checker' ? styles.mobileActive : ''}`}
                >
                  <span>Symptom Checker</span>
                </Link>
                <Link 
                  to="/education" 
                  className={`${styles.mobileLink} ${location.pathname === '/education' ? styles.mobileActive : ''}`}
                >
                  <span>Education</span>
                </Link>
                <Link 
                  to="/community" 
                  className={`${styles.mobileLink} ${location.pathname === '/community' ? styles.mobileActive : ''}`}
                >
                  <span>Community</span>
                </Link>
                <Link 
                  to="/faq" 
                  className={`${styles.mobileLink} ${location.pathname === '/faq' ? styles.mobileActive : ''}`}
                >
                  <span>FAQ</span>
                </Link>
              </>
            )}
            
            {/* Uncomment if needed */}
            {/* <Link 
              to="/doctor/login" 
              className={`${styles.mobileDoctorLink} ${isDoctorPath ? styles.mobileActive : ''}`}
            >
              <UserPlus size={20} />
              <span>For Doctors</span>
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;