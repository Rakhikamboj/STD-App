import { useState } from 'react';
import { Trophy, CheckCircle, XCircle, Info, ArrowRight } from 'lucide-react';
import styles from './Challengetab.module.css';
import QuizCompletion from '../components/QuizCompletion.jsx';

const ChallengeTab = ({ quizzesCompleted, setQuizzesCompleted }) => {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

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

  const handleStartQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestion(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (index) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      // Update score immediately if correct
      if (index === currentQuiz.questions[currentQuestion].correctAnswer) {
        setQuizScore(quizScore + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz completed - mark as completed and show completion screen
      if (!completedQuizzes.includes(currentQuiz.id)) {
        setCompletedQuizzes([...completedQuizzes, currentQuiz.id]);
        setQuizzesCompleted(quizzesCompleted + 1);
      }
      setQuizCompleted(true);
    }
  };

  const handleQuizComplete = () => {
    // Reset all quiz states and go back to quiz list
    setCurrentQuiz(null);
    setQuizCompleted(false);
    setQuizScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
  };

  // Quiz Completion View
  if (currentQuiz && quizCompleted) {
    return (
      <div className={styles.quizView}>
        <button onClick={handleQuizComplete} className={styles.backButton}>
          ← Back to Quizzes
        </button>
        <QuizCompletion
          score={quizScore}
          totalQuestions={currentQuiz.questions.length}
          onContinue={handleQuizComplete}
          quizTitle={currentQuiz.title}
        />
      </div>
    );
  }

  // Quiz Questions View
  if (currentQuiz && !quizCompleted) {
    return (
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
              const showResult = selectedAnswer !== null;

              return (
                <div
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  className={`${styles.optionButton} ${
                    showResult && isSelected && isCorrect ? styles.optionCorrect : ''
                  } ${
                    showResult && isSelected && !isCorrect ? styles.optionIncorrect : ''
                  }
                  ${
                    showResult && !isSelected && isCorrect ? styles.optionCorrect : ''
                  }
                   ${
                    selectedAnswer !== null ? styles.disabled : ''
                  }`}
                >
                  {option}
                  {showResult && isSelected && isCorrect && (
                    <CheckCircle size={20} color="#10b981" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle size={20} color="#ef4444" />
                  )}
                
                  {showResult && !isSelected && isCorrect && (

                      <CheckCircle size={16} color="#10b981" />
                     
              
                  )}
                </div>
              );
            })}
          </div>

          {/* Feedback */}
          {selectedAnswer !== null && (
            <div className={`${styles.feedback} ${
              selectedAnswer === currentQuiz.questions[currentQuestion].correctAnswer 
                ? styles.feedbackCorrect 
                : styles.feedbackIncorrect
            }`}>
              <div className={styles.feedbackHeader}>
                <Info className={styles.infoIcon} size={20} color="#3b82f6" />
                <span className={styles.feedbackTitle}>
                  {selectedAnswer === currentQuiz.questions[currentQuestion].correctAnswer
                    ? 'Correct!'
                    : 'Not quite!'}
                </span>
              </div>
              <p className={styles.feedbackText}>
                {currentQuiz.questions[currentQuestion].feedback}
              </p>
            </div>
          )}

          {/* Next Question Button */}
          {selectedAnswer !== null && (
            <button onClick={handleNextQuestion} className={styles.nextButton}>
              {currentQuestion < currentQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Quiz List View
  return (
    <div className={styles.content}>
      {/* Header Card */}
      <div className={styles.challengeHeader}>
        <div className={styles.challengeHeaderContent}>
          <div className={styles.challengeIcon}><Trophy size={52} /></div>
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
                <div
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
                </div>
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
  );
};

export default ChallengeTab;