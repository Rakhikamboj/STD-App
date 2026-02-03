import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, MessageCircle, CheckCircle, Clock, TrendingUp, Send } from 'lucide-react';
import api from '../utils/api';
import styles from './DoctorDashboard.module.css';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('open');

  useEffect(() => {
    const doctorInfo = localStorage.getItem('doctorInfo');
    if (!doctorInfo) {
      navigate('/doctor/login');
      return;
    }
    setDoctor(JSON.parse(doctorInfo));
    fetchQuestions();
  }, [filter, navigate]);

  const fetchQuestions = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const { data } = await api.get('/questions', { params });
      setQuestions(data.questions);
    } catch (err) {
      setError('Failed to load questions');
    }
  };

  const handleSelectQuestion = async (questionId) => {
    try {
      const { data } = await api.get(`/questions/${questionId}`);
      setSelectedQuestion(data);
      setAnswer('');
    } catch (err) {
      setError('Failed to load question details');
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!answer.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      await api.post(`/questions/${selectedQuestion._id}/answers`, {
        content: answer
      });
      
      setAnswer('');
      setSelectedQuestion(null);
      fetchQuestions();
      
      // Update doctor info with new response count
      const { data } = await api.get('/doctors/profile');
      setDoctor(data);
      localStorage.setItem('doctorInfo', JSON.stringify(data));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit answer');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('doctorToken');
    localStorage.removeItem('doctorInfo');
    navigate('/doctor/login');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!doctor) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.welcomeText}>Welcome back, Dr. {doctor.name}</h1>
            <p className={styles.subtitle}>{doctor.specialization}</p>
            {!doctor.isVerified && (
              <div className={styles.verificationBanner}>
                <Clock size={20} />
                <span>Your account is pending verification</span>
              </div>
            )}
          </div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <MessageCircle size={32} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{doctor.responseCount || 0}</div>
              <div className={styles.statLabel}>Answers Provided</div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <TrendingUp size={32} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>
                {doctor.rating > 0 ? doctor.rating.toFixed(1) : 'N/A'}
              </div>
              <div className={styles.statLabel}>Average Rating</div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <CheckCircle size={32} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>
                {doctor.isVerified ? 'Verified' : 'Pending'}
              </div>
              <div className={styles.statLabel}>Account Status</div>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {!doctor.isVerified ? (
          <div className={styles.unverifiedMessage}>
            <Clock size={48} />
            <h2>Account Under Review</h2>
            <p>
              Your credentials are being verified. Once approved, you'll be able to answer 
              questions from the community. This usually takes 24-48 hours.
            </p>
          </div>
        ) : (
          <div className={styles.content}>
            {/* Questions List */}
            {!selectedQuestion ? (
              <div className={styles.questionsSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Community Questions</h2>
                  <div className={styles.filters}>
                    <button
                      onClick={() => setFilter('open')}
                      className={`${styles.filterButton} ${filter === 'open' ? styles.active : ''}`}
                    >
                      Open
                    </button>
                    <button
                      onClick={() => setFilter('answered')}
                      className={`${styles.filterButton} ${filter === 'answered' ? styles.active : ''}`}
                    >
                      Answered
                    </button>
                    <button
                      onClick={() => setFilter('all')}
                      className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
                    >
                      All
                    </button>
                  </div>
                </div>

                <div className={styles.questionsList}>
                  {questions.length === 0 ? (
                    <div className={styles.empty}>
                      <MessageCircle size={64} />
                      <p>No questions found</p>
                    </div>
                  ) : (
                    questions.map(question => (
                      <div
                        key={question._id}
                        onClick={() => handleSelectQuestion(question._id)}
                        className={styles.questionCard}
                      >
                        <div className={styles.questionHeader}>
                          <span className={`badge ${styles.categoryBadge}`}>
                            {question.category}
                          </span>
                          <span className={`badge ${question.status === 'answered' ? 'badge-success' : 'badge-warning'}`}>
                            {question.status}
                          </span>
                        </div>
                        <h3 className={styles.questionTitle}>{question.title}</h3>
                        <p className={styles.questionPreview}>
                          {question.content.substring(0, 150)}
                          {question.content.length > 150 ? '...' : ''}
                        </p>
                        <div className={styles.questionMeta}>
                          <span>{question.answers.length} answers</span>
                          <span>{question.views} views</span>
                          <span>{formatDate(question.createdAt)}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              /* Answer Form */
              <div className={styles.answerSection}>
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className={styles.backButton}
                >
                  ← Back to Questions
                </button>

                <div className={styles.questionDetail}>
                  <div className={styles.questionDetailHeader}>
                    <span className={`badge ${styles.categoryBadge}`}>
                      {selectedQuestion.category}
                    </span>
                    <h2 className={styles.questionDetailTitle}>{selectedQuestion.title}</h2>
                    <div className={styles.questionDetailMeta}>
                      <span>{selectedQuestion.views} views</span>
                      <span>{formatDate(selectedQuestion.createdAt)}</span>
                    </div>
                  </div>

                  <div className={styles.questionDetailContent}>
                    <p>{selectedQuestion.content}</p>
                    {selectedQuestion.tags && selectedQuestion.tags.length > 0 && (
                      <div className={styles.tags}>
                        {selectedQuestion.tags.map((tag, idx) => (
                          <span key={idx} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Existing Answers */}
                  {selectedQuestion.answers.length > 0 && (
                    <div className={styles.existingAnswers}>
                      <h3>Existing Answers ({selectedQuestion.answers.length})</h3>
                      {selectedQuestion.answers.map(ans => (
                        <div key={ans._id} className={styles.existingAnswer}>
                          <div className={styles.answerHeader}>
                            <strong>{ans.doctor.name}</strong>
                            <span>{ans.doctor.specialization}</span>
                          </div>
                          <p>{ans.content}</p>
                          <div className={styles.answerMeta}>
                            {ans.helpful} people found this helpful
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Answer Form */}
                  <form onSubmit={handleSubmitAnswer} className={styles.answerForm}>
                    <h3 className={styles.formTitle}>Your Answer</h3>
                    <textarea
                      className="form-textarea"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Provide a detailed, evidence-based answer..."
                      required
                      minLength={10}
                      rows={8}
                    />
                    <div className={styles.formActions}>
                      <button
                        type="button"
                        onClick={() => setSelectedQuestion(null)}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? 'Submitting...' : (
                          <>
                            <Send size={20} />
                            Submit Answer
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
