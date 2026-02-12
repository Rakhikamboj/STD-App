import { useState, useEffect } from 'react';
import { MessageCircle, Send, ThumbsUp, Eye, Filter, AlertTriangle, Dot,Shield } from 'lucide-react';
import api from '../utils/api';
import styles from './AskDoctor.module.css';

const CATEGORIES = [
  'All',
  'Sexual Health',
  'Mental Health',
  'General Health',
  'Reproductive Health',
  'STI/STD',
  'Contraception',
  'Other'
];

const AskADoctor = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAskForm, setShowAskForm] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General Questions',
    tags: ''
  });

  useEffect(() => {
    fetchQuestions();
  }, [selectedCategory]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const params = selectedCategory !== 'All' ? { category: selectedCategory } : {};
      const { data } = await api.get('/questions/community', { params });
      setQuestions(data.questions);
    } catch (err) {
      setError('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const tags = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      await api.post('/questions', {
        ...formData,
        tags
      });
      
      setShowAskForm(false);
      setFormData({ title: '', content: '', category: 'General Questions', tags: '' });
      fetchQuestions();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit question');
    }
  };

  const handleViewQuestion = async (questionId) => {
    try {
      const { data } = await api.get(`/questions/${questionId}`);
      setSelectedQuestion(data);
    } catch (err) {
      setError('Failed to load question details');
    }
  };

  const handleMarkHelpful = async (questionId, answerId) => {
    try {
      await api.put(`/questions/${questionId}/answers/${answerId}/helpful`);
      handleViewQuestion(questionId);
    } catch (err) {
      console.error('Failed to mark as helpful');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className={styles.doctorSection}>
      <div className={styles.doctorHeader}>
        <p className={styles.doctorSubtitle}>
          Ask questions anonymously and get answers from verified healthcare professionals
        </p>
      </div>

      <div className={styles.infoBoxes}>
        <div className={styles.privacyBox}>
          <div className={styles.boxIcon}>
            <Shield size={24} />
          </div>
          <div className={styles.boxContent}>
            <strong>Your Privacy & Safety</strong>
            <ul>
              <li>All posts are completely anonymous</li>
              <li>Only verified healthcare professionals can respond</li>
              <li>Content is moderated for safety and accuracy</li>
              <li>This is for educational purposes only, not medical advice</li>
            </ul>
          </div>
        </div>

        <div className={styles.disclaimerBox}>
          <div className={styles.boxIcon}>
            <AlertTriangle size={24} />
          </div>
          <div className={styles.boxContentDisclaimer}>

            <strong>Important Disclaimer</strong>
            <p>The information provided here is for educational purposes only and should not be considered medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment. If you have a medical emergency, call 911.</p>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setShowAskForm(!showAskForm)}
        className={styles.askButton}
      >
        <MessageCircle size={20} />
        Ask a Question Anonymously
      </button>

      {/* Ask Question Form - Inline */}
      {showAskForm && (
        <div className={styles.askForm}>
          <h3 className={styles.formTitle}>Ask Your Question</h3>
          
          <form onSubmit={handleSubmitQuestion}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Category</label>
              <select
                className={styles.formSelect}
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
              >
                <option value="General Questions">General Questions</option>
                {CATEGORIES.filter(c => c !== 'All').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Question Title</label>
              <input
                type="text"
                className={styles.formInput}
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                placeholder="Brief summary of your question..."
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Details</label>
              <textarea
                className={styles.formTextarea}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                required
                placeholder="Provide more details about your question... (Do not include identifying personal information)"
              />
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton}>
                <Send size={20} />
                Post Question
              </button>
              <button 
                type="button" 
                onClick={() => setShowAskForm(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {error && (
        <div className={styles.errorAlert}>{error}</div>
      )}

      {/* Category Filter */}
      {!selectedQuestion && !showAskForm && (
        <div className={styles.filterBar}>
          <Filter size={20} />
          <div className={styles.categories}>
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${styles.categoryTab} ${selectedCategory === category ? styles.active : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Questions List or Selected Question */}
      {selectedQuestion ? (
        <div className={styles.questionDetail}>
          <button 
            onClick={() => setSelectedQuestion(null)}
            className={styles.backButton}
          >
            ← Back to Questions
          </button>

          <div className={styles.questionHeader}>
            <span className={styles.categoryBadge}>
              {selectedQuestion.category}
            </span>
            <h2 className={styles.questionTitle}>{selectedQuestion.title}</h2>
            <div className={styles.questionMeta}>
              <span><Eye size={16} /> {selectedQuestion.views} views</span>
              <span>{formatDate(selectedQuestion.createdAt)}</span>
            </div>
          </div>

          <div className={styles.questionContent}>
            <p>{selectedQuestion.content}</p>
            {selectedQuestion.tags && selectedQuestion.tags.length > 0 && (
              <div className={styles.tags}>
                {selectedQuestion.tags.map((tag, idx) => (
                  <span key={idx} className={styles.tag}>{tag}</span>
                ))}
              </div>
            )}
          </div>

          {/* Answers */}
          <div className={styles.answers}>
            <h3 className={styles.answersTitle}>
              {selectedQuestion.answers.length} Answer{selectedQuestion.answers.length !== 1 ? 's' : ''}
            </h3>
            
            {selectedQuestion.answers.length === 0 ? (
              <div className={styles.noAnswers}>
                <MessageCircle size={48} />
                <p>No answers yet. Be the first to help!</p>
              </div>
            ) : (
              selectedQuestion.answers.map(answer => (
                <div key={answer._id} className={styles.answer}>
                  <div className={styles.answerHeader}>
                    <div className={styles.doctorInfo}>
                      <strong>{answer.doctor.name}</strong>
                      <span className={styles.specialization}>{answer.doctor.specialization}</span>
                      {answer.doctor.rating > 0 && (
                        <span className={styles.rating}>⭐ {answer.doctor.rating.toFixed(1)}</span>
                      )}
                    </div>
                    <span className={styles.answerDate}>
                      {formatDate(answer.createdAt)}
                    </span>
                  </div>
                  
                  <div className={styles.answerContent}>
                    {answer.content}
                  </div>
                  
                  <button
                    onClick={() => handleMarkHelpful(selectedQuestion._id, answer._id)}
                    className={styles.helpfulButton}
                  >
                    <ThumbsUp size={16} />
                    Helpful ({answer.helpful})
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      ) : !showAskForm && (
        <div className={styles.questionsList}>
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner} />
              <p>Loading questions...</p>
            </div>
          ) : questions?.length === 0 ? (
            <div className={styles.empty}>
              <MessageCircle size={64} />
              <h3>No questions yet</h3>
              <p>Be the first to ask a question in this category!</p>
            </div>
          ) : (
            questions.map(question => (
              <div
                key={question._id}
                onClick={() => handleViewQuestion(question._id)}
                className={styles.questionCard}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.categoryBadge}>
                    {question.category}
                  </span>
                </div>
                
                <h3 className={styles.cardTitle}>{question.title}</h3>
                <p className={styles.cardPreview}>
                  {question.content.substring(0, 100)}
                  {question.content.length > 100 ? '...' : ''}
                </p>
                
                <div className={styles.cardFooter}>
                  <span>Posted {formatDate(question.createdAt)}</span>
                 <Dot className={styles.dotIcon} color=' #868788'/> <span>{question.views} views</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AskADoctor;