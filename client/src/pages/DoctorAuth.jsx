import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, LogIn, Shield, Award } from 'lucide-react';
import api from '../utils/api';
import styles from './DoctorAuth.module.css';

const DoctorAuth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    credentials: '',
    licenseNumber: '',
    yearsOfExperience: '',
    bio: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const { data } = await api.post('/doctors/login', loginData);
      localStorage.setItem('doctorToken', data.token);
      localStorage.setItem('doctorInfo', JSON.stringify(data));
      navigate('/doctor/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      const { confirmPassword, ...dataToSend } = registerData;
      const { data } = await api.post('/doctors/register', {
        ...dataToSend,
        yearsOfExperience: parseInt(dataToSend.yearsOfExperience)
      });
      
      localStorage.setItem('doctorToken', data.token);
      localStorage.setItem('doctorInfo', JSON.stringify(data));
      navigate('/doctor/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.auth}>
        <div className={styles.info}>
          <h1 className={styles.infoTitle}>Join HealthPath as a Verified Doctor</h1>
          <p className={styles.infoText}>
            Help people make informed decisions about their sexual health by providing 
            evidence-based answers to their questions.
          </p>
          
          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <Shield size={32} />
              <h3>Verified Status</h3>
              <p>Your credentials will be verified to ensure trust and credibility</p>
            </div>
            <div className={styles.benefit}>
              <Award size={32} />
              <h3>Make an Impact</h3>
              <p>Help break down stigma and provide judgment-free healthcare information</p>
            </div>
          </div>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.tabs}>
            <button
              onClick={() => setIsLogin(true)}
              className={`${styles.tab} ${isLogin ? styles.active : ''}`}
            >
              <LogIn size={20} />
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`${styles.tab} ${!isLogin ? styles.active : ''}`}
            >
              <UserPlus size={20} />
              Register
            </button>
          </div>

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          {isLogin ? (
            <form onSubmit={handleLogin} className={styles.form}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%' }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className={styles.form}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-input"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  required
                />
              </div>

              <div className={styles.row}>
                <div className="form-group">
                  <label className="form-label">Password *</label>
                  <input
                    type="password"
                    className="form-input"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                    required
                    minLength={6}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Confirm Password *</label>
                  <input
                    type="password"
                    className="form-input"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Specialization *</label>
                <input
                  type="text"
                  className="form-input"
                  value={registerData.specialization}
                  onChange={(e) => setRegisterData({...registerData, specialization: e.target.value})}
                  placeholder="e.g., General Practitioner, Gynecologist, Urologist"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Medical Credentials *</label>
                <input
                  type="text"
                  className="form-input"
                  value={registerData.credentials}
                  onChange={(e) => setRegisterData({...registerData, credentials: e.target.value})}
                  placeholder="e.g., MD, MBBS, DO"
                  required
                />
                <small className="form-help">Your medical degree and certifications</small>
              </div>

              <div className="form-group">
                <label className="form-label">Medical License Number *</label>
                <input
                  type="text"
                  className="form-input"
                  value={registerData.licenseNumber}
                  onChange={(e) => setRegisterData({...registerData, licenseNumber: e.target.value})}
                  placeholder="Your state/national medical license number"
                  required
                />
                <small className="form-help">For verification purposes only</small>
              </div>

              <div className="form-group">
                <label className="form-label">Years of Experience *</label>
                <input
                  type="number"
                  className="form-input"
                  value={registerData.yearsOfExperience}
                  onChange={(e) => setRegisterData({...registerData, yearsOfExperience: e.target.value})}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Bio (Optional)</label>
                <textarea
                  className="form-textarea"
                  value={registerData.bio}
                  onChange={(e) => setRegisterData({...registerData, bio: e.target.value})}
                  placeholder="Brief description about yourself and your practice"
                  maxLength={500}
                  style={{ minHeight: '100px' }}
                />
              </div>

              <div className={styles.verificationNotice}>
                <Shield size={20} />
                <p>
                  Your credentials will be reviewed for verification. You'll be able to answer 
                  questions once your account is verified.
                </p>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%' }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAuth;
