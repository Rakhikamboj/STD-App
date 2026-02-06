import { useState } from 'react';
import { BookOpen, Trophy, Calendar, Search, Clock, Eye, ChevronRight, CheckCircle, Lock, Video, MessageCircle, Users, MapPin } from 'lucide-react';
import styles from './EducationHub.module.css';

const EducationHub = () => {
  const [activeTab, setActiveTab] = useState('articles');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [quizzesCompleted, setQuizzesCompleted] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'prevention', label: 'Prevention' },
    { id: 'testing', label: 'Testing' },
    { id: 'treatment', label: 'Treatment' },
    { id: 'myths', label: 'Myth Busting' }
  ];

  const quizzes = [
    {
      id: 1,
      title: 'STI Myths vs Facts',
      description: 'Test your knowledge and bust common myths about STIs',
      difficulty: 'Easy',
      questions: [
        {
          question: 'You can tell if someone has an STI just by looking at them',
          options: [
            'True - there are always visible signs',
            'False - most STIs have no visible symptoms',
            'True - but only for certain STIs',
            'It depends on the person'
          ],
          correctAnswer: 1,
          feedback: 'False! Most STIs have no visible symptoms at all. Many people with STIs don\'t even know they have one, which is why regular testing is so important.'
        },
        {
          question: 'Which statement about STI testing is TRUE?',
          options: [
            'You only need to get tested if you have symptoms',
            'Regular testing is important even without symptoms',
            'STI tests are painful and invasive',
            'You can diagnose STIs at home without a doctor'
          ],
          correctAnswer: 1,
          feedback: 'Correct! Regular testing is crucial because many STIs are asymptomatic. Early detection allows for effective treatment and prevents transmission.'
        },
        {
          question: 'STIs only affect certain types of people',
          options: [
            'True - only people with many partners',
            'True - only young people',
            'False - anyone sexually active can get an STI',
            'True - only people who don\'t use protection'
          ],
          correctAnswer: 2,
          feedback: 'False! STIs don\'t discriminate. Anyone who is sexually active can get an STI, regardless of age, gender, sexual orientation, or number of partners.'
        }
      ]
    },
    {
      id: 2,
      title: 'Protection & Prevention',
      description: 'Learn the truth about staying safe and healthy',
      difficulty: 'Medium',
      questions: [
        {
          question: 'Which method provides the best protection against both pregnancy AND STIs?',
          options: [
            'Birth control pills',
            'Condoms',
            'Withdrawal method',
            'IUD'
          ],
          correctAnswer: 1,
          feedback: 'Correct! Condoms are the only contraceptive method that protects against both pregnancy and STIs when used correctly and consistently.'
        },
        {
          question: 'How effective are condoms at preventing STIs when used correctly?',
          options: [
            'About 50% effective',
            'About 70% effective',
            'Highly effective (85-98%)',
            'Not effective at all'
          ],
          correctAnswer: 2,
          feedback: 'Correct! When used correctly and consistently, condoms are highly effective at preventing most STIs, with effectiveness rates of 85-98%.'
        },
        {
          question: 'What is PrEP?',
          options: [
            'A type of STI',
            'Medication to prevent HIV infection',
            'A contraceptive pill',
            'A testing method'
          ],
          correctAnswer: 1,
          feedback: 'Correct! PrEP (Pre-Exposure Prophylaxis) is medication taken to prevent HIV infection before potential exposure. It\'s highly effective when taken as prescribed.'
        }
      ]
    },
    {
      id: 3,
      title: 'Testing & Treatment',
      description: 'Separate fact from fiction about STI testing',
      difficulty: 'Medium',
      questions: [
        {
          question: 'How long after potential exposure should you wait before getting tested for most STIs?',
          options: [
            'Test immediately',
            'Wait 1-2 weeks',
            'Wait 2-3 weeks for most accurate results',
            'Wait 6 months'
          ],
          correctAnswer: 2,
          feedback: 'Most STI tests are most accurate 2-3 weeks after potential exposure, though some may take longer. Consult with a healthcare provider for specific timing.'
        },
        {
          question: 'What happens if you test positive for an STI?',
          options: [
            'Nothing can be done',
            'Most STIs are treatable with medication',
            'You can never have sex again',
            'You must tell everyone you know'
          ],
          correctAnswer: 1,
          feedback: 'Correct! Most STIs are treatable with antibiotics or manageable with antiviral medications. Early detection and treatment are key to good outcomes.'
        },
        {
          question: 'Are STI tests confidential?',
          options: [
            'No, everyone will know',
            'Yes, medical privacy laws protect your information',
            'Only if you pay extra',
            'Only for adults over 21'
          ],
          correctAnswer: 1,
          feedback: 'Correct! STI testing is confidential and protected by medical privacy laws. Healthcare providers cannot share your information without your consent.'
        }
      ]
    }
  ];

  const workshops = [
    {
      id: 1,
      type: 'ama',
      category: 'ASK ME ANYTHING',
      title: 'AMA: Real Talk About Sexual Health',
      description: 'Join Dr. Rachel Martinez for an honest, no-judgment Q&A session. Ask anything about sexual health, testing, relationships, or prevention. All questions are anonymous!',
      date: 'Thursday, February 12',
      time: '5:26 PM',
      duration: '90 minutes',
      format: 'Live Video',
      questionsSubmitted: 0,
      instructor: {
        name: 'Dr. Rachel Martinez',
        title: 'MD, OB-GYN, Sexual Health Specialist, 15+ years experience',
        avatar: 'D',
        bio: 'Dr. Martinez is a board-certified OB-GYN specializing in adolescent and young adult sexual health. She has dedicated her career to providing stigma-free, comprehensive sexual health education and care. She believes that no question is too small or too embarrassing when it comes to your health.'
      }
    },
    {
      id: 2,
      type: 'ama',
      category: 'ASK ME ANYTHING',
      title: 'AMA: Mental Health & Sexual Wellness',
      description: 'Chat with licensed therapist Jordan Chen about the connection between mental health and sexual wellness. Discuss shame, anxiety, relationships, and self-care in a safe, anonymous space.',
      date: 'Friday, February 20',
      time: '5:26 PM',
      duration: '75 minutes',
      format: 'Chat Only',
      questionsSubmitted: 0,
      instructor: {
        name: 'Jordan Chen',
        title: 'LCSW, Sex Therapist, Mental Health Advocate',
        avatar: 'J',
        bio: 'Jordan Chen is a licensed clinical social worker and certified sex therapist with over 10 years of experience helping young adults navigate the emotional aspects of sexual health. They specialize in addressing shame, anxiety, and trauma in a compassionate, affirming environment.'
      }
    },
    {
      id: 3,
      type: 'ama',
      category: 'ASK ME ANYTHING',
      title: 'AMA: STI Prevention with Dr. James Kim',
      description: 'Got questions about prevention, condoms, PrEP, or vaccines? Dr. Kim is here to answer everything. This is your chance to learn from one of the top infectious disease experts in the field.',
      date: 'Friday, February 27',
      time: '5:26 PM',
      duration: '60 minutes',
      format: 'Live Video',
      questionsSubmitted: 0,
      instructor: {
        name: 'Dr. James Kim',
        title: 'MD, PhD, Infectious Disease Specialist',
        avatar: 'D',
        bio: 'Dr. Kim is a leading expert in STI prevention and public health. He has published over 50 research papers and works with organizations worldwide to improve sexual health education and access to preventive care.'
      }
    },
    {
      id: 4,
      type: 'workshop',
      category: 'Testing & Prevention',
      categoryColor: '#b2dfdb',
      title: 'First Time Testing 101',
      description: 'Everything you need to know about getting tested for the first time. We\'ll walk through the process, what to expect, and answer all your questions in a judgment-free space.',
      date: 'Tuesday, February 17',
      time: '5:12 PM',
      duration: '75 minutes',
      format: 'Online',
      registered: 0,
      spotsLeft: 100,
      instructor: {
        name: 'Dr. Sarah Chen',
        title: 'MD, Sexual Health Specialist, 10+ years experience',
        avatar: 'D'
      }
    },
    {
      id: 5,
      type: 'workshop',
      category: 'Safe Practices',
      categoryColor: '#b2dfdb',
      title: 'Let\'s Talk Condoms',
      description: 'An honest, shame-free conversation about condoms, consent, and communication. Learn how to talk about protection with partners confidently.',
      date: 'Tuesday, February 24',
      time: '5:12 PM',
      duration: '60 minutes',
      format: 'Hybrid',
      registered: 0,
      spotsLeft: 100,
      instructor: {
        name: 'Alex Rodriguez',
        title: 'MPH, Youth Health Educator',
        avatar: 'A'
      }
    },
    {
      id: 6,
      type: 'workshop',
      category: 'Treatment & Support',
      categoryColor: '#b2dfdb',
      title: 'Caring for Your Body After an STI',
      description: 'Diagnosed with an STI? You\'re not alone. Join us for practical advice on treatment, talking to partners, and maintaining your mental and physical health.',
      date: 'Monday, March 2',
      time: '5:12 PM',
      duration: '90 minutes',
      format: 'Online',
      registered: 0,
      spotsLeft: 100,
      instructor: {
        name: 'Dr. Maya Patel',
        title: 'MD, Infectious Disease Specialist',
        avatar: 'D'
      }
    },
    {
      id: 7,
      type: 'workshop',
      category: 'Communication',
      categoryColor: '#b2dfdb',
      title: 'Love, Sex & Shame: How to Talk About It',
      description: 'Break the silence around sexual health. Learn communication strategies for talking about STIs, testing, and sexual health with partners, friends, and healthcare providers.',
      date: 'Monday, March 9',
      time: '5:12 PM',
      duration: '75 minutes',
      format: 'Online',
      registered: 0,
      spotsLeft: 100,
      instructor: {
        name: 'Jordan Lee',
        title: 'LCSW, Relationship Therapist',
        avatar: 'J'
      }
    }
  ];

  const mythBusters = [
    {
      id: 1,
      tag: 'MYTH BUSTER',
      title: 'Myth: You Would Know If You Had an STI',
      description: 'Many STIs have no symptoms at all. That\'s why regular testing matters.',
      readTime: '4 min',
      views: 4
    },
    {
      id: 2,
      tag: 'MYTH BUSTER',
      title: 'Myth: STIs Only Affect "Certain Types" of People',
      description: 'STIs don\'t discriminate. Anyone who is sexually active can get an STI.',
      readTime: '5 min',
      views: 2
    }
  ];

  const articles = [
    {
      id: 1,
      category: 'prevention',
      tag: 'PREVENTION',
      tagColor: 'mint',
      title: 'Understanding PrEP and PEP for HIV Prevention',
      description: 'Learn about the medications that can prevent HIV infection before and after potential exposure.',
      readTime: '8 min',
      views: 2
    },
    {
      id: 2,
      category: 'myths',
      tag: 'MYTHS',
      tagColor: 'mint',
      title: 'Myth: You Would Know If You Had an STI',
      description: 'Many STIs have no symptoms at all. That\'s why regular testing matters.',
      readTime: '4 min',
      views: 4
    },
    {
      id: 3,
      category: 'prevention',
      tag: 'PREVENTION',
      tagColor: 'mint',
      title: 'How to Talk to Partners About STI Testing',
      description: 'Having "the talk" doesn\'t have to be awkward. Here\'s how to make it easier.',
      readTime: '6 min',
      views: 2
    },
    {
      id: 4,
      category: 'treatment',
      tag: 'TREATMENT',
      tagColor: 'mint',
      title: 'What Happens If You Test Positive',
      description: 'A positive test is not the end of the world. Here\'s what comes next.',
      readTime: '7 min',
      views: 2
    },
    {
      id: 5,
      category: 'testing',
      tag: 'TESTING',
      tagColor: 'mint',
      title: 'Understanding STI Testing: What to Expect',
      description: 'Getting tested is simple, quick, and nothing to worry about. Here\'s what the process looks like.',
      readTime: '5 min',
      views: 1
    },
    {
      id: 6,
      category: 'myths',
      tag: 'MYTHS',
      tagColor: 'mint',
      title: 'Myth: STIs Only Affect "Certain Types" of People',
      description: 'STIs don\'t discriminate. Anyone who is sexually active can get an STI.',
      readTime: '5 min',
      views: 2
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleStartQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestion(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswerSelect = (index) => {
    if (!showFeedback) {
      setSelectedAnswer(index);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === currentQuiz.questions[currentQuestion].correctAnswer) {
      setQuizScore(quizScore + 1);
    }

    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Quiz completed
      if (!completedQuizzes.includes(currentQuiz.id)) {
        setCompletedQuizzes([...completedQuizzes, currentQuiz.id]);
        setQuizzesCompleted(quizzesCompleted + 1);
      }
      setCurrentQuiz(null);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleSubmitAnswer = () => {
    setShowFeedback(true);
  };

  const workshopsUnlocked = quizzesCompleted >= 3;

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Education Hub</h1>
        <p className={styles.heroDescription}>
          Knowledge is power. Explore evidence-based information about sexual health, testing,
          and prevention in a judgment-free space.
        </p>

        {/* Ask Assistant Button */}
        <button className={styles.assistantButton}>
          <span className={styles.assistantIcon}><MessageCircle size={20} ></MessageCircle></span>
          Ask the Education Assistant
        </button>

        {/* Tabs */}
        <div className={styles.tabsContainer}>
          {[
            { id: 'articles', label: 'Articles', icon: BookOpen },
            { id: 'challenge', label: 'Challenge Yourself', icon: Trophy, badge: `${quizzesCompleted}/3` },
            { id: 'workshops', label: 'Workshops', icon: Calendar, locked: !workshopsUnlocked }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              >
                <Icon size={18} />
                {tab.label}
                {tab.locked && (
                  <span className={styles.tabLockedBadge}>Locked</span>
                )}
                {tab.badge && (
                  <span className={styles.tabBadge}>{tab.badge}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Tab Content */}
      {activeTab === 'articles' && (
        <div className={styles.content}>
          {/* Search Bar */}
          <div className={styles.searchBar}>
            <Search size={20} color="#999" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Category Filters */}
          <div className={styles.categoryFilters}>
            <div className={styles.filterIcon}>🔍</div>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`${styles.categoryButton} ${selectedCategory === cat.id ? styles.categoryButtonActive : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Myth Busting Section */}
          {selectedCategory === 'all' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                ✨ Myth Busting
              </h2>
              <div className={styles.mythGrid}>
                {mythBusters.map(myth => (
                  <div key={myth.id} className={styles.mythCard}>
                    <div className={styles.mythCardHeader}>
                      <span className={styles.mythTag}>{myth.tag}</span>
                      <div className={styles.readTime}>
                        <Clock size={14} />
                        {myth.readTime}
                      </div>
                    </div>
                    <h3 className={styles.mythTitle}>{myth.title}</h3>
                    <p className={styles.mythDescription}>{myth.description}</p>
                    <span className={styles.readMore}>Read More →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Articles Section */}
          <div>
            <h2 className={styles.sectionTitle}>All Articles</h2>
            <div className={styles.articlesGrid}>
              {filteredArticles.map(article => (
                <div key={article.id} className={styles.articleCard}>
                  <div className={styles.articleCardHeader}>
                    <span className={styles.articleTag}>{article.tag}</span>
                    <div className={styles.readTime}>
                      <Clock size={14} />
                      {article.readTime}
                    </div>
                  </div>
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                  <p className={styles.articleDescription}>{article.description}</p>
                  <div className={styles.articleFooter}>
                    <span className={styles.readArticle}>Read Article</span>
                    <div className={styles.views}>{article.views} views</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Approach Section */}
          <div className={styles.approachSection}>
            <h2 className={styles.approachTitle}>Our Approach to Education</h2>
            <div className={styles.approachGrid}>
              {[
                {
                  title: 'Evidence-Based',
                  description: 'All content is reviewed and based on current medical guidelines and research'
                },
                {
                  title: 'Inclusive Language',
                  description: 'We use gender-neutral and non-judgmental language that respects all identities'
                },
                {
                  title: 'Stigma-Free',
                  description: 'Sexual health is health. No shame, no judgment, just facts and support'
                }
              ].map((item, idx) => (
                <div key={idx}>
                  <h3 className={styles.approachItemTitle}>{item.title}</h3>
                  <p className={styles.approachItemDescription}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Challenge Yourself Tab */}
      {activeTab === 'challenge' && !currentQuiz && (
        <div className={styles.content}>
          {/* Header Card */}
          <div className={styles.challengeHeader}>
            <div className={styles.challengeHeaderContent}>
              <div className={styles.challengeIcon}>🏆</div>
              <div className={styles.challengeHeaderText}>
                <h2 className={styles.challengeTitle}>Challenge Yourself!</h2>
                <p className={styles.challengeDescription}>
                  Test your knowledge with our myth-busting quizzes. Complete 3 quizzes to unlock exclusive access to expert-led workshops!
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className={styles.progressContainer}>
              <div className={styles.progressHeader}>
                <span className={styles.progressLabel}>Your Progress</span>
                <span className={styles.progressCount}>{quizzesCompleted}/3 quizzes</span>
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: `${(quizzesCompleted / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Quiz Cards */}
          <div className={styles.quizGrid}>
            {quizzes.map((quiz, idx) => {
              const isCompleted = completedQuizzes.includes(quiz.id);
              return (
                <div key={quiz.id} className={styles.quizCard}>
                  <div className={styles.quizNumber}>{idx + 1}</div>
                  <h3 className={styles.quizTitle}>{quiz.title}</h3>
                  <p className={styles.quizDescription}>{quiz.description}</p>
                  <div className={styles.quizFooter}>
                    <span className={styles.quizDifficulty}>{quiz.difficulty}</span>
                    <button
                      onClick={() => handleStartQuiz(quiz)}
                      className={`${styles.startQuizButton} ${isCompleted ? styles.completedQuizButton : ''}`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle size={16} />
                          Retake Quiz
                        </>
                      ) : (
                        <>Start Quiz →</>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Approach Section */}
          <div className={styles.approachSection}>
            <h2 className={styles.approachTitle}>Our Approach to Education</h2>
            <div className={styles.approachGrid}>
              {[
                {
                  title: 'Evidence-Based',
                  description: 'All content is reviewed and based on current medical guidelines and research'
                },
                {
                  title: 'Inclusive Language',
                  description: 'We use gender-neutral and non-judgmental language that respects all identities'
                },
                {
                  title: 'Stigma-Free',
                  description: 'Sexual health is health. No shame, no judgment, just facts and support'
                }
              ].map((item, idx) => (
                <div key={idx}>
                  <h3 className={styles.approachItemTitle}>{item.title}</h3>
                  <p className={styles.approachItemDescription}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quiz View */}
      {activeTab === 'challenge' && currentQuiz && (
        <div className={styles.quizView}>
          <button onClick={() => setCurrentQuiz(null)} className={styles.backButton}>
            ← Back to Quizzes
          </button>

          <div className={styles.quizContainer}>
            {/* Progress */}
            <div className={styles.quizProgress}>
              <div className={styles.quizProgressHeader}>
                <span className={styles.quizProgressLabel}>
                  Question {currentQuestion + 1} of {currentQuiz.questions.length}
                </span>
                <span className={styles.quizProgressScore}>
                  Score: {quizScore}/{currentQuiz.questions.length}
                </span>
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: `${((currentQuestion + 1) / currentQuiz.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <h2 className={styles.question}>{currentQuiz.questions[currentQuestion].question}</h2>

            {/* Options */}
            <div className={styles.optionsContainer}>
              {currentQuiz.questions[currentQuestion].options.map((option, idx) => {
                const isCorrect = idx === currentQuiz.questions[currentQuestion].correctAnswer;
                const isSelected = idx === selectedAnswer;
                const showResult = showFeedback;

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    disabled={showFeedback}
                    className={`${styles.optionButton} ${
                      showResult && isSelected && isCorrect ? styles.optionCorrect : ''
                    } ${isSelected && !showResult ? styles.optionSelected : ''}`}
                  >
                    {showResult && isSelected && isCorrect && (
                      <CheckCircle size={20} color="#4caf50" />
                    )}
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={`${styles.feedback} ${
                selectedAnswer === currentQuiz.questions[currentQuestion].correctAnswer 
                  ? styles.feedbackCorrect 
                  : styles.feedbackIncorrect
              }`}>
                <div className={styles.feedbackHeader}>
                  <CheckCircle size={20} color="#4caf50" />
                  <span className={styles.feedbackTitle}>
                    {selectedAnswer === currentQuiz.questions[currentQuestion].correctAnswer
                      ? 'Correct!'
                      : 'Not quite right'}
                  </span>
                </div>
                <p className={styles.feedbackText}>
                  {currentQuiz.questions[currentQuestion].feedback}
                </p>
              </div>
            )}

            {/* Action Button */}
            {!showFeedback ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={`${styles.submitButton} ${selectedAnswer === null ? styles.submitButtonDisabled : ''}`}
              >
                Submit Answer
              </button>
            ) : (
              <button onClick={handleNextQuestion} className={styles.nextButton}>
                {currentQuestion < currentQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Workshops Tab */}
      {activeTab === 'workshops' && (
        <div className={styles.content}>
          {workshopsUnlocked ? (
            <>
              {/* Success Banner */}
              <div className={styles.successBanner}>
                <div className={styles.successEmoji}>🎉</div>
                <div>
                  <h3 className={styles.successTitle}>Workshops & Events Unlocked!</h3>
                  <p className={styles.successDescription}>
                    Great job completing 3 quizzes! You now have access to all our expert-led workshops and AMA sessions. Choose a session below and join anonymously with just a nickname.
                  </p>
                </div>
              </div>

              {/* Ask Me Anything Events */}
              <div className={styles.section}>
                <h2 className={styles.workshopSectionTitle}>
                  <MessageCircle size={28} color="#a855f7" />
                  Ask Me Anything Events
                </h2>
                
                <div className={styles.workshopList}>
                  {workshops.filter(w => w.type === 'ama').map(workshop => (
                    <div key={workshop.id} className={styles.workshopCard}>
                      <span className={styles.amaTag}>
                        💬 {workshop.category}
                      </span>

                      <h3 className={styles.workshopTitle}>{workshop.title}</h3>
                      <p className={styles.workshopDescription}>{workshop.description}</p>

                      {/* Event Details */}
                      <div className={styles.eventDetails}>
                        <div className={styles.eventDetail}>
                          <Calendar size={18} color="#a855f7" />
                          <div>
                            <div className={styles.eventDetailLabel}>Date</div>
                            <div className={styles.eventDetailValue}>{workshop.date}</div>
                            <div className={styles.eventDetailTime}>{workshop.time}</div>
                          </div>
                        </div>

                        <div className={styles.eventDetail}>
                          <Clock size={18} color="#a855f7" />
                          <div>
                            <div className={styles.eventDetailLabel}>Duration</div>
                            <div className={styles.eventDetailValue}>{workshop.duration}</div>
                          </div>
                        </div>

                        <div className={styles.eventDetail}>
                          {workshop.format === 'Live Video' ? (
                            <Video size={18} color="#a855f7" />
                          ) : (
                            <MessageCircle size={18} color="#a855f7" />
                          )}
                          <div>
                            <div className={styles.eventDetailLabel}>Format</div>
                            <div className={styles.eventDetailValue}>{workshop.format}</div>
                          </div>
                        </div>

                        <div className={styles.eventDetail}>
                          <ChevronRight size={18} color="#a855f7" />
                          <div>
                            <div className={styles.eventDetailLabel}>Questions</div>
                            <div className={styles.eventDetailValue}>{workshop.questionsSubmitted} questions submitted</div>
                          </div>
                        </div>
                      </div>

                      {/* Instructor Info */}
                      <div className={styles.instructorInfo}>
                        <div className={styles.instructorHeader}>
                          <div className={styles.instructorAvatarAma}>{workshop.instructor.avatar}</div>
                          <div>
                            <div className={styles.instructorName}>{workshop.instructor.name}</div>
                            <div className={styles.instructorTitleAma}>{workshop.instructor.title}</div>
                            <p className={styles.instructorBio}>{workshop.instructor.bio}</p>
                          </div>
                        </div>
                      </div>

                      {/* Register Button */}
                      <button className={styles.registerButtonAma}>
                        <MessageCircle size={18} />
                        Register for AMA
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expert-Led Workshops */}
              <div>
                <h2 className={styles.workshopSectionTitle}>
                  🎓 Expert-Led Workshops
                </h2>
                
                <div className={styles.workshopList}>
                  {workshops.filter(w => w.type === 'workshop').map(workshop => (
                    <div key={workshop.id} className={styles.workshopCard}>
                      <span className={styles.workshopTag}>{workshop.category}</span>

                      <h3 className={styles.workshopTitle}>{workshop.title}</h3>
                      <p className={styles.workshopDescription}>{workshop.description}</p>

                      {/* Event Details */}
                      <div className={styles.eventDetails}>
                        <div className={styles.eventDetail}>
                          <Calendar size={18} color="#00897b" />
                          <div>
                            <div className={styles.eventDetailLabel}>Date</div>
                            <div className={styles.eventDetailValue}>{workshop.date}</div>
                            <div className={styles.eventDetailTime}>{workshop.time}</div>
                          </div>
                        </div>

                        <div className={styles.eventDetail}>
                          <Clock size={18} color="#00897b" />
                          <div>
                            <div className={styles.eventDetailLabel}>Duration</div>
                            <div className={styles.eventDetailValue}>{workshop.duration}</div>
                          </div>
                        </div>

                        <div className={styles.eventDetail}>
                          {workshop.format === 'Online' ? (
                            <Video size={18} color="#00897b" />
                          ) : (
                            <MapPin size={18} color="#00897b" />
                          )}
                          <div>
                            <div className={styles.eventDetailLabel}>Format</div>
                            <div className={styles.eventDetailValue}>{workshop.format}</div>
                          </div>
                        </div>

                        <div className={styles.eventDetail}>
                          <Users size={18} color="#00897b" />
                          <div>
                            <div className={styles.eventDetailLabel}>Availability</div>
                            <div className={styles.eventDetailValue}>
                              {workshop.registered} registered · {workshop.spotsLeft} spots left
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Instructor */}
                      <div className={styles.workshopInstructor}>
                        <div className={styles.instructorAvatar}>{workshop.instructor.avatar}</div>
                        <div>
                          <div className={styles.instructorName}>{workshop.instructor.name}</div>
                          <div className={styles.instructorTitle}>{workshop.instructor.title}</div>
                        </div>
                      </div>

                      {/* Register Button */}
                      <button className={styles.registerButton}>
                        Register Anonymously
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Approach Section */}
              <div className={styles.approachSection}>
                <h2 className={styles.approachTitle}>Our Approach to Education</h2>
                <div className={styles.approachGrid}>
                  {[
                    {
                      title: 'Evidence-Based',
                      description: 'All content is reviewed and based on current medical guidelines and research'
                    },
                    {
                      title: 'Inclusive Language',
                      description: 'We use gender-neutral and non-judgmental language that respects all identities'
                    },
                    {
                      title: 'Stigma-Free',
                      description: 'Sexual health is health. No shame, no judgment, just facts and support'
                    }
                  ].map((item, idx) => (
                    <div key={idx}>
                      <h3 className={styles.approachItemTitle}>{item.title}</h3>
                      <p className={styles.approachItemDescription}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            // Locked State
            <div>
              {/* Lock Banner */}
              <div className={styles.lockedBanner}>
                <div className={styles.lockedIcon}>🔒</div>
                <h2 className={styles.lockedTitle}>Unlock Expert Workshops</h2>
                <p className={styles.lockedDescription}>
                  Complete 3 myth-busting quizzes to unlock access to our exclusive, expert-led workshops!
                </p>

                {/* Progress */}
                <div className={styles.lockedProgress}>
                  <div className={styles.progressHeader}>
                    <span className={styles.progressLabel}>Your Progress</span>
                    <span className={styles.lockedProgressCount}>{quizzesCompleted}/3 quizzes</span>
                  </div>
                  <div className={styles.lockedProgressBar}>
                    <div 
                      className={styles.lockedProgressFill}
                      style={{ width: `${(quizzesCompleted / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* What You'll Unlock */}
                <div className={styles.unlockList}>
                  <h3 className={styles.unlockListTitle}>
                    ✨ What you'll unlock:
                  </h3>
                  <div className={styles.unlockItems}>
                    {[
                      'Live sessions with healthcare professionals',
                      'Anonymous attendance with nickname-only participation',
                      'Interactive Q&A in a judgment-free space',
                      'Both online and in-person options',
                      'Monthly AMA sessions with renowned experts'
                    ].map((item, idx) => (
                      <div key={idx} className={styles.unlockItem}>
                        <CheckCircle size={20} color="#00897b" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('challenge')}
                  className={styles.startQuizzesButton}
                >
                  Start Taking Quizzes
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EducationHub;