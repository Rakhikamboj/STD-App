import { useState, useEffect } from 'react';
import { MessageCircle, Send, ThumbsUp, Eye, Filter, Plus, AlertCircle, Heart, Shield, Book, Users } from 'lucide-react';
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

const PEER_SUPPORT_TOPICS = [
  {
    id: 'first-time',
    icon: '✨',
    title: 'First-Time Testing',
    description: 'For those taking the brave step of getting tested for the first time',
    color: '#E0F2F1'
  },
  {
    id: 'living-with-sti',
    icon: '❤️',
    title: 'Living with an STI',
    description: 'Support and stories from people managing a recent or ongoing diagnosis',
    color: '#FCE4EC'
  },
  {
    id: 'partner-communication',
    icon: '💬',
    title: 'Partner Communication',
    description: 'Tips and experiences on talking to partners about testing or results',
    color: '#E3F2FD'
  },
  {
    id: 'real-stories',
    icon: '📖',
    title: 'Real Stories',
    description: 'Anonymous experiences from people who\'ve been where you are',
    color: '#E0F2F1'
  },
  {
    id: 'discussion-groups',
    icon: '👥',
    title: 'Discussion Groups',
    description: 'Join conversations with others on similar journeys',
    color: '#E8EAF6'
  },
  {
    id: 'zero-judgment',
    icon: '❤️',
    title: 'Zero Judgment',
    description: 'A compassionate community free from stigma and shame',
    color: '#FCE4EC'
  }
];

const Community = () => {
  const [activeTab, setActiveTab] = useState('doctor'); // 'peer' or 'doctor'
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
    if (activeTab === 'doctor') {
      fetchQuestions();
    }
  }, [selectedCategory, activeTab]);

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
          <h1 className={styles.title}>Community Support</h1>
          <p className={styles.subtitle}>
            Connect with peers and healthcare professionals in a safe, anonymous space
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={styles.tabNavigation}>
          <button
            onClick={() => setActiveTab('peer')}
            className={`${styles.tab} ${activeTab === 'peer' ? styles.activeTab : ''}`}
          >
            <Heart size={20} />
            Peer Support
          </button>
          <button
            onClick={() => setActiveTab('doctor')}
            className={`${styles.tab} ${activeTab === 'doctor' ? styles.activeTab : ''}`}
          >
            <MessageCircle size={20} />
            Ask a Doctor
          </button>
        </div>

        {/* Peer Support Tab Content */}
        {activeTab === 'peer' && (
          <div className={styles.peerSupport}>
            <div className={styles.peerHero}>
              <div className={styles.peerIcon}>
                <Heart size={48} />
              </div>
              <h2 className={styles.peerTitle}>Peer-Safe Companion</h2>
              <p className={styles.peerDescription}>
                You're not alone. Connect with others, read real stories, and find support on your journey.
              </p>
            </div>

            <div className={styles.safetyNotice}>
              <Shield size={20} />
              <div>
                <strong>This is a safe, anonymous space</strong>
                <p>Everyone here uses a nickname. No personal information is required or shared. All content is moderated to keep this space supportive and judgment-free.</p>
              </div>
            </div>

            <h3 className={styles.topicsHeading}>What brings you here today?</h3>
            
            <div className={styles.topicsGrid}>
              {PEER_SUPPORT_TOPICS.map(topic => (
                <div 
                  key={topic.id} 
                  className={styles.topicCard}
                  style={{ backgroundColor: topic.color }}
                >
                  <div className={styles.topicIcon}>{topic.icon}</div>
                  <h4 className={styles.topicTitle}>{topic.title}</h4>
                  <p className={styles.topicDescription}>{topic.description}</p>
                  <button className={styles.exploreButton}>
                    Explore →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ask a Doctor Tab Content */}
        {activeTab === 'doctor' && (
          <div className={styles.doctorSection}>
            <div className={styles.doctorHeader}>
              <p className={styles.doctorSubtitle}>
                Ask questions anonymously and get answers from verified healthcare professionals
              </p>
              <button 
                onClick={() => setShowAskModal(true)}
                className={styles.askButton}
              >
                <MessageCircle size={20} />
                Ask a Question Anonymously
              </button>
            </div>

            <div className={styles.infoBoxes}>
              <div className={styles.privacyBox}>
                <Shield size={24} />
                <div>
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
                <AlertCircle size={24} />
                <div>
                  <strong>Important Disclaimer</strong>
                  <p>The information provided here is for educational purposes only and should not be considered medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment. If you have a medical emergency, call 911.</p>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            {!selectedQuestion && (
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

            {error && (
              <div className={styles.errorAlert}>{error}</div>
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
            ) : (
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
                        <span>{question.views} views</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Ask Question Modal */}
        {showAskModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>Ask Your Question</h2>
                <button 
                  onClick={() => setShowAskModal(false)}
                  className={styles.closeButton}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmitQuestion} className={styles.questionForm}>
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

                <div className={styles.modalActions}>
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                  >
                    <Send size={20} />
                    Post Question
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowAskModal(false)}
                    className={styles.cancelButton}
                  >
                    Cancel
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