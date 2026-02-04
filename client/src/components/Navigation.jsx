import { Link, useLocation } from 'react-router-dom';
import { Heart, UserPlus } from 'lucide-react';
import styles from './Navigation.module.css';

const Navigation = () => {
  const location = useLocation();
  const isDoctorPath = location.pathname.startsWith('/doctor');

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIconWrapper}>
            <Heart className={styles.logoIcon} />
          </div>
          <span className={styles.logoText}>HealthPath</span>
        </Link>

        <div className={styles.links}>
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
          
          {/* <Link 
            to="/doctor/login" 
            className={`${styles.doctorLink} ${isDoctorPath ? styles.active : ''}`}
          >
            <UserPlus size={18} />
            <span>For Doctors</span>
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;