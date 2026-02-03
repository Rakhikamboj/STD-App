import { useState, useEffect } from 'react';
import { MessageCircle, Send, ThumbsUp, Eye, Filter, Plus, AlertCircle } from 'lucide-react';
import api from '../utils/api';
import styles from './Community.module.css';

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

const Community = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAskModal, setShowAskModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Sexual Health',
    tags: ''
  });

  useEffect(() => {
    fetchQuestions();
  }, [selectedCategory]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const params = selectedCategory !== 'All' ? { category: selectedCategory } : {};
      console.log("params-------------->", params, selectedCategory,  )
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
      
      setShowAskModal(false);
      setFormData({ title: '', content: '', category: 'Sexual Health', tags: '' });
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
      // Refresh the question details
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
    <div className={styles.container}>
      <div className={styles.community}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Community Q&A</h1>
            <p className={styles.subtitle}>
              Ask questions anonymously and get answers from verified healthcare professionals
            </p>
          </div>
          <button 
            onClick={() => setShowAskModal(true)}
            className="btn btn-primary"
          >
            <Plus size={20} />
            Ask a Question
          </button>
        </div>

        {/* Category Filter */}
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

        {error && (
          <div className="alert alert-danger">{error}</div>
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
              <span className={`badge ${styles.categoryBadge}`}>
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
        ) : (
          <div className={styles.questionsList}>
            {loading ? (
              <div className={styles.loading}>
                <div className="spinner" />
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
                    <span className={`badge ${styles.categoryBadge}`}>
                      {question.category}
                    </span>
                    <span className={`badge ${question.status === 'answered' ? 'badge-success' : 'badge-warning'}`}>
                      {question.status}
                    </span>
                  </div>
                  
                  <h3 className={styles.cardTitle}>{question.title}</h3>
                  <p className={styles.cardPreview}>
                    {question.content.substring(0, 150)}
                    {question.content.length > 150 ? '...' : ''}
                  </p>
                  
                  <div className={styles.cardFooter}>
                    <span><MessageCircle size={16} /> {question.answers.length} answers</span>
                    <span><Eye size={16} /> {question.views} views</span>
                    <span>{formatDate(question.createdAt)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Ask Question Modal */}
        {showAskModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>Ask a Question</h2>
                <button 
                  onClick={() => setShowAskModal(false)}
                  className={styles.closeButton}
                >
                  ×
                </button>
              </div>
              
              <div className={styles.anonymousNotice}>
                <AlertCircle size={20} />
                <span>Your question will be posted anonymously</span>
              </div>

              <form onSubmit={handleSubmitQuestion}>
                <div className="form-group">
                  <label className="form-label">Question Title *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    maxLength={200}
                    placeholder="Brief summary of your question"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Detailed Question *</label>
                  <textarea
                    className="form-textarea"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    required
                    minLength={20}
                    placeholder="Provide details about your question (minimum 20 characters)"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tags (optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="Separate tags with commas (e.g., testing, prevention)"
                  />
                </div>

                <div className={styles.modalActions}>
                  <button 
                    type="button" 
                    onClick={() => setShowAskModal(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Send size={20} />
                    Submit Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
