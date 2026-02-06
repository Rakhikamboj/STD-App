import { useState } from 'react';
import { BookOpen, Trophy, Calendar, Search, Clock, Eye, ChevronRight, CheckCircle, Lock, Video, MessageCircle, Users, MapPin } from 'lucide-react';

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
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
    

      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '4rem 2rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '700',
          color: '#1a1a1a',
          marginBottom: '1rem'
        }}>
          Education Hub
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#666',
          maxWidth: '700px',
          margin: '0 auto 2rem',
          lineHeight: '1.6'
        }}>
          Knowledge is power. Explore evidence-based information about sexual health, testing,
          and prevention in a judgment-free space.
        </p>

        {/* Ask Assistant Button */}
        <button style={{
          background: 'linear-gradient(135deg, #00897b, #1976d2)',
          color: 'white',
          border: 'none',
          padding: '14px 28px',
          borderRadius: '25px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '3rem',
          boxShadow: '0 4px 12px rgba(0, 137, 123, 0.3)'
        }}>
          <span style={{ fontSize: '20px' }}>💬</span>
          Ask the Education Assistant
        </button>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
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
                style={{
                  background: activeTab === tab.id 
                    ? 'linear-gradient(135deg, #00897b, #1976d2)'
                    : 'white',
                  color: activeTab === tab.id ? 'white' : '#666',
                  border: activeTab === tab.id ? 'none' : '2px solid #e0e0e0',
                  padding: '12px 24px',
                  borderRadius: '25px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  position: 'relative'
                }}
              >
                <Icon size={18} />
                {tab.label}
                {tab.locked && (
                  <span style={{
                    background: '#ff6b35',
                    color: 'white',
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontWeight: '700'
                  }}>
                    Locked
                  </span>
                )}
                {tab.badge && (
                  <span style={{
                    background: '#fbc02d',
                    color: '#5d4037',
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontWeight: '700'
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Tab Content */}
      {activeTab === 'articles' && (
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem 4rem'
        }}>
          {/* Search Bar */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '2px solid #f0f0f0'
          }}>
            <Search size={20} color="#999" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                flex: 1,
                fontSize: '15px',
                color: '#333'
              }}
            />
          </div>

          {/* Category Filters */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '3rem',
            overflowX: 'auto',
            paddingBottom: '8px'
          }}>
            <div style={{ color: '#666', fontSize: '20px' }}>🔍</div>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  background: selectedCategory === cat.id ? '#00897b' : 'white',
                  color: selectedCategory === cat.id ? 'white' : '#666',
                  border: selectedCategory === cat.id ? 'none' : '2px solid #e0e0e0',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Myth Busting Section */}
          {selectedCategory === 'all' && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                ✨ Myth Busting
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
                gap: '1.5rem'
              }}>
                {mythBusters.map(myth => (
                  <div
                    key={myth.id}
                    style={{
                      background: 'linear-gradient(135deg, #fff9e6, #fffbf0)',
                      border: '2px solid #ffd54f',
                      borderRadius: '16px',
                      padding: '24px',
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 193, 7, 0.2)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '12px'
                    }}>
                      <span style={{
                        background: '#fbc02d',
                        color: '#5d4037',
                        fontSize: '11px',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontWeight: '700',
                        letterSpacing: '0.5px'
                      }}>
                        {myth.tag}
                      </span>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: '#666',
                        fontSize: '14px'
                      }}>
                        <Clock size={14} />
                        {myth.readTime}
                      </div>
                    </div>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#1a1a1a',
                      marginBottom: '8px',
                      lineHeight: '1.4'
                    }}>
                      {myth.title}
                    </h3>
                    <p style={{
                      fontSize: '15px',
                      color: '#555',
                      lineHeight: '1.6',
                      marginBottom: '12px'
                    }}>
                      {myth.description}
                    </p>
                    <span style={{
                      color: '#00897b',
                      fontSize: '14px',
                      fontWeight: '600',
                      display: 'inline-block'
                    }}>
                      Read More →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Articles Section */}
          <div>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '1.5rem'
            }}>
              All Articles
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
              gap: '1.5rem'
            }}>
              {filteredArticles.map(article => (
                <div
                  key={article.id}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    border: '1px solid #f0f0f0'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px'
                  }}>
                    <span style={{
                      background: '#b2dfdb',
                      color: '#00695c',
                      fontSize: '11px',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontWeight: '700',
                      letterSpacing: '0.5px'
                    }}>
                      {article.tag}
                    </span>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#666',
                      fontSize: '14px'
                    }}>
                      <Clock size={14} />
                      {article.readTime}
                    </div>
                  </div>
                  <h3 style={{
                    fontSize: '19px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '8px',
                    lineHeight: '1.4'
                  }}>
                    {article.title}
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    color: '#555',
                    lineHeight: '1.6',
                    marginBottom: '16px'
                  }}>
                    {article.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      color: '#00897b',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      Read Article
                    </span>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#999',
                      fontSize: '13px'
                    }}>
                      {article.views} views
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Approach Section */}
          <div style={{
            background: 'linear-gradient(135deg, #00897b, #1976d2)',
            borderRadius: '20px',
            padding: '3rem',
            marginTop: '4rem',
            color: 'white'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '2rem',
              textAlign: 'left'
            }}>
              Our Approach to Education
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
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
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    marginBottom: '0.5rem'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    opacity: 0.95
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Challenge Yourself Tab */}
      {activeTab === 'challenge' && !currentQuiz && (
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem 4rem'
        }}>
          {/* Header Card */}
          <div style={{
            background: 'linear-gradient(135deg, #fff9e6, #fffbf0)',
            border: '2px solid #ffd54f',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '3rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#ff9800',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                flexShrink: 0
              }}>
                🏆
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  marginBottom: '0.5rem'
                }}>
                  Challenge Yourself!
                </h2>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  Test your knowledge with our myth-busting quizzes. Complete 3 quizzes to unlock exclusive access to expert-led workshops!
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                  Your Progress
                </span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#00897b' }}>
                  {quizzesCompleted}/3 quizzes
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '12px',
                background: '#e0e0e0',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(quizzesCompleted / 3) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #00897b, #26a69a)',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>
          </div>

          {/* Quiz Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {quizzes.map((quiz, idx) => {
              const isCompleted = completedQuizzes.includes(quiz.id);
              return (
                <div
                  key={quiz.id}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '28px',
                    border: '2px solid #f0f0f0',
                    position: 'relative',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #00897b, #26a69a)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '22px',
                    fontWeight: '700',
                    marginBottom: '1rem'
                  }}>
                    {idx + 1}
                  </div>
                  
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '0.5rem'
                  }}>
                    {quiz.title}
                  </h3>
                  
                  <p style={{
                    fontSize: '15px',
                    color: '#666',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem'
                  }}>
                    {quiz.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '13px',
                      color: '#999',
                      fontWeight: '500'
                    }}>
                      {quiz.difficulty}
                    </span>
                    
                    <button
                      onClick={() => handleStartQuiz(quiz)}
                      style={{
                        background: isCompleted ? '#4caf50' : 'linear-gradient(135deg, #00897b, #1976d2)',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle size={16} />
                          Retake Quiz
                        </>
                      ) : (
                        <>
                          Start Quiz →
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Approach Section */}
          <div style={{
            background: 'linear-gradient(135deg, #00897b, #1976d2)',
            borderRadius: '20px',
            padding: '3rem',
            marginTop: '4rem',
            color: 'white'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '2rem',
              textAlign: 'left'
            }}>
              Our Approach to Education
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
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
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    marginBottom: '0.5rem'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    opacity: 0.95
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quiz View */}
      {activeTab === 'challenge' && currentQuiz && (
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 2rem 4rem'
        }}>
          <button
            onClick={() => setCurrentQuiz(null)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#00897b',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            ← Back to Quizzes
          </button>

          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '3rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
          }}>
            {/* Progress */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <span style={{ fontSize: '14px', color: '#666' }}>
                  Question {currentQuestion + 1} of {currentQuiz.questions.length}
                </span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#00897b' }}>
                  Score: {quizScore}/{currentQuiz.questions.length}
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: '#e0e0e0',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${((currentQuestion + 1) / currentQuiz.questions.length) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #00897b, #1976d2)',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>

            {/* Question */}
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#1a1a1a',
              marginBottom: '2rem',
              lineHeight: '1.4'
            }}>
              {currentQuiz.questions[currentQuestion].question}
            </h2>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {currentQuiz.questions[currentQuestion].options.map((option, idx) => {
                const isCorrect = idx === currentQuiz.questions[currentQuestion].correctAnswer;
                const isSelected = idx === selectedAnswer;
                const showResult = showFeedback;

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    disabled={showFeedback}
                    style={{
                      background: showResult && isSelected
                        ? isCorrect ? '#c8e6c9' : 'white'
                        : isSelected ? '#f0f0f0' : 'white',
                      border: showResult && isSelected && isCorrect
                        ? '2px solid #4caf50'
                        : '2px solid #e0e0e0',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      fontSize: '15px',
                      color: '#333',
                      cursor: showFeedback ? 'default' : 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
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
              <div style={{
                background: selectedAnswer === currentQuiz.questions[currentQuestion].correctAnswer
                  ? '#c8e6c9'
                  : '#ffebee',
                border: selectedAnswer === currentQuiz.questions[currentQuestion].correctAnswer
                  ? '2px solid #4caf50'
                  : '2px solid #ef5350',
                borderRadius: '12px',
                padding: '16px 20px',
                marginBottom: '2rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <CheckCircle size={20} color="#4caf50" />
                  <span style={{ fontWeight: '700', color: '#1a1a1a' }}>
                    {selectedAnswer === currentQuiz.questions[currentQuestion].correctAnswer
                      ? 'Correct!'
                      : 'Not quite right'}
                  </span>
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#333',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {currentQuiz.questions[currentQuestion].feedback}
                </p>
              </div>
            )}

            {/* Action Button */}
            {!showFeedback ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                style={{
                  background: selectedAnswer !== null
                    ? 'linear-gradient(135deg, #00897b, #1976d2)'
                    : '#e0e0e0',
                  color: 'white',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: selectedAnswer !== null ? 'pointer' : 'not-allowed',
                  width: '100%'
                }}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                style={{
                  background: 'linear-gradient(135deg, #00897b, #1976d2)',
                  color: 'white',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {currentQuestion < currentQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Workshops Tab */}
      {activeTab === 'workshops' && (
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem 4rem'
        }}>
          {workshopsUnlocked ? (
            <>
              {/* Success Banner */}
              <div style={{
                background: 'linear-gradient(135deg, #c8e6c9, #e0f2f1)',
                border: '2px solid #4caf50',
                borderRadius: '16px',
                padding: '1.5rem 2rem',
                marginBottom: '3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{ fontSize: '32px' }}>🎉</div>
                <div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '0.25rem'
                  }}>
                    Workshops & Events Unlocked!
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    color: '#555',
                    margin: 0
                  }}>
                    Great job completing 3 quizzes! You now have access to all our expert-led workshops and AMA sessions. Choose a session below and join anonymously with just a nickname.
                  </p>
                </div>
              </div>

              {/* Ask Me Anything Events */}
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <MessageCircle size={28} color="#a855f7" />
                  Ask Me Anything Events
                </h2>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}>
                  {workshops.filter(w => w.type === 'ama').map(workshop => (
                    <div
                      key={workshop.id}
                      style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '2rem',
                        border: '2px solid #f0f0f0'
                      }}
                    >
                      <span style={{
                        background: '#e9d5ff',
                        color: '#7c3aed',
                        fontSize: '11px',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontWeight: '700',
                        letterSpacing: '0.5px',
                        display: 'inline-block',
                        marginBottom: '1rem'
                      }}>
                        💬 {workshop.category}
                      </span>

                      <h3 style={{
                        fontSize: '22px',
                        fontWeight: '700',
                        color: '#1a1a1a',
                        marginBottom: '0.75rem'
                      }}>
                        {workshop.title}
                      </h3>

                      <p style={{
                        fontSize: '15px',
                        color: '#666',
                        lineHeight: '1.6',
                        marginBottom: '1.5rem'
                      }}>
                        {workshop.description}
                      </p>

                      {/* Event Details */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1.5rem',
                        padding: '1rem 0',
                        borderTop: '1px solid #f0f0f0',
                        borderBottom: '1px solid #f0f0f0'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Calendar size={18} color="#a855f7" />
                          <div>
                            <div style={{ fontSize: '13px', color: '#999' }}>Date</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                              {workshop.date}
                            </div>
                            <div style={{ fontSize: '13px', color: '#666' }}>{workshop.time}</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Clock size={18} color="#a855f7" />
                          <div>
                            <div style={{ fontSize: '13px', color: '#999' }}>Duration</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                              {workshop.duration}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {workshop.format === 'Live Video' ? (
                            <Video size={18} color="#a855f7" />
                          ) : (
                            <MessageCircle size={18} color="#a855f7" />
                          )}
                          <div>
                            <div style={{ fontSize: '13px', color: '#999' }}>Format</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                              {workshop.format}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <ChevronRight size={18} color="#a855f7" />
                          <div>
                            <div style={{ fontSize: '13px', color: '#999' }}>Questions</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                              {workshop.questionsSubmitted} questions submitted
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Instructor Info */}
                      <div style={{
                        background: '#faf5ff',
                        borderRadius: '12px',
                        padding: '1rem',
                        marginBottom: '1.5rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                          <div style={{
                            width: '48px',
                            height: '48px',
                            background: '#a855f7',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '20px',
                            fontWeight: '700',
                            flexShrink: 0
                          }}>
                            {workshop.instructor.avatar}
                          </div>
                          <div>
                            <div style={{
                              fontSize: '16px',
                              fontWeight: '700',
                              color: '#1a1a1a',
                              marginBottom: '2px'
                            }}>
                              {workshop.instructor.name}
                            </div>
                            <div style={{
                              fontSize: '13px',
                              color: '#a855f7',
                              fontWeight: '600',
                              marginBottom: '8px'
                            }}>
                              {workshop.instructor.title}
                            </div>
                            <p style={{
                              fontSize: '14px',
                              color: '#555',
                              lineHeight: '1.5',
                              margin: 0
                            }}>
                              {workshop.instructor.bio}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Register Button */}
                      <button style={{
                        background: 'linear-gradient(135deg, #a855f7, #d946ef)',
                        color: 'white',
                        border: 'none',
                        padding: '14px 28px',
                        borderRadius: '25px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}>
                        <MessageCircle size={18} />
                        Register for AMA
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expert-Led Workshops */}
              <div>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  🎓 Expert-Led Workshops
                </h2>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}>
                  {workshops.filter(w => w.type === 'workshop').map(workshop => (
                    <div
                      key={workshop.id}
                      style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '2rem',
                        border: '2px solid #f0f0f0'
                      }}
                    >
                      <span style={{
                        background: workshop.categoryColor,
                        color: '#00695c',
                        fontSize: '11px',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontWeight: '700',
                        letterSpacing: '0.5px',
                        display: 'inline-block',
                        marginBottom: '1rem'
                      }}>
                        {workshop.category}
                      </span>

                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: '#1a1a1a',
                        marginBottom: '0.75rem'
                      }}>
                        {workshop.title}
                      </h3>

                      <p style={{
                        fontSize: '15px',
                        color: '#666',
                        lineHeight: '1.6',
                        marginBottom: '1.5rem'
                      }}>
                        {workshop.description}
                      </p>

                      {/* Event Details */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1.5rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Calendar size={18} color="#00897b" />
                          <div>
                            <div style={{ fontSize: '13px', color: '#999' }}>Date</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                              {workshop.date}
                            </div>
                            <div style={{ fontSize: '13px', color: '#666' }}>{workshop.time}</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Clock size={18} color="#00897b" />
                          <div>
                            <div style={{ fontSize: '13px', color: '#999' }}>Duration</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                              {workshop.duration}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {workshop.format === 'Online' ? (
                            <Video size={18} color="#00897b" />
                          ) : (
                            <MapPin size={18} color="#00897b" />
                          )}
                          <div>
                            <div style={{ fontSize: '13px', color: '#999' }}>Format</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                              {workshop.format}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Users size={18} color="#00897b" />
                          <div>
                            <div style={{ fontSize: '13px', color: '#999' }}>Availability</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                              {workshop.registered} registered · {workshop.spotsLeft} spots left
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Instructor */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 0',
                        borderTop: '1px solid #f0f0f0',
                        marginBottom: '1.5rem'
                      }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: '#b2dfdb',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#00695c',
                          fontSize: '18px',
                          fontWeight: '700'
                        }}>
                          {workshop.instructor.avatar}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '700', color: '#1a1a1a' }}>
                            {workshop.instructor.name}
                          </div>
                          <div style={{ fontSize: '13px', color: '#666' }}>
                            {workshop.instructor.title}
                          </div>
                        </div>
                      </div>

                      {/* Register Button */}
                      <button style={{
                        background: 'linear-gradient(135deg, #00897b, #1976d2)',
                        color: 'white',
                        border: 'none',
                        padding: '14px 28px',
                        borderRadius: '25px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}>
                        Register Anonymously
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Approach Section */}
              <div style={{
                background: 'linear-gradient(135deg, #00897b, #1976d2)',
                borderRadius: '20px',
                padding: '3rem',
                marginTop: '4rem',
                color: 'white'
              }}>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  marginBottom: '2rem',
                  textAlign: 'left'
                }}>
                  Our Approach to Education
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '2rem'
                }}>
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
                      <h3 style={{
                        fontSize: '22px',
                        fontWeight: '700',
                        marginBottom: '0.5rem'
                      }}>
                        {item.title}
                      </h3>
                      <p style={{
                        fontSize: '16px',
                        lineHeight: '1.6',
                        opacity: '0.95',
                      }}>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            // Locked State
            <div>
              {/* Lock Banner */}
              <div style={{
                background: 'linear-gradient(135deg, #fff9e6, #fffbf0)',
                border: '2px solid #ffd54f',
                borderRadius: '20px',
                padding: '3rem',
                marginBottom: '3rem',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: '#ff9800',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '40px',
                  margin: '0 auto 1.5rem'
                }}>
                  🔒
                </div>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  marginBottom: '1rem'
                }}>
                  Unlock Expert Workshops
                </h2>
                <p style={{
                  fontSize: '18px',
                  color: '#666',
                  lineHeight: '1.6',
                  maxWidth: '600px',
                  margin: '0 auto 2rem'
                }}>
                  Complete 3 myth-busting quizzes to unlock access to our exclusive, expert-led workshops!
                </p>

                {/* Progress */}
                <div style={{
                  maxWidth: '500px',
                  margin: '0 auto 2rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    <span style={{ fontSize: '15px', fontWeight: '600', color: '#333' }}>
                      Your Progress
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: '700', color: '#ff9800' }}>
                      {quizzesCompleted}/3 quizzes
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '14px',
                    background: '#e0e0e0',
                    borderRadius: '7px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${(quizzesCompleted / 3) * 100}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #ff9800, #ff6b35)',
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                </div>

                {/* What You'll Unlock */}
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '2rem',
                  textAlign: 'left',
                  maxWidth: '700px',
                  margin: '0 auto'
                }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    ✨ What you'll unlock:
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      'Live sessions with healthcare professionals',
                      'Anonymous attendance with nickname-only participation',
                      'Interactive Q&A in a judgment-free space',
                      'Both online and in-person options',
                      'Monthly AMA sessions with renowned experts'
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <CheckCircle size={20} color="#00897b" />
                        <span style={{ fontSize: '15px', color: '#333' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('challenge')}
                  style={{
                    background: 'linear-gradient(135deg, #00897b, #1976d2)',
                    color: 'white',
                    border: 'none',
                    padding: '16px 32px',
                    borderRadius: '25px',
                    fontSize: '17px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    marginTop: '2rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(0, 137, 123, 0.3)'
                  }}
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