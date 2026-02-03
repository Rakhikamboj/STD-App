import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, ArrowRight, ArrowLeft, Loader } from 'lucide-react';
import styles from './SymptomChecker.module.css';
import MedicalDiagrams from './MedicalDiagrams';
import ReferenceImages from './ReferenceImages';
import ResultsScreen from './ResultsScreen';
import api from '../utils/api';


const SymptomChecker = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [showImages, setShowImages] = useState(false);
  const [imageType, setImageType] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
 
      const response = await api.get(`/symptoms/questions`);
      setQuestions(response.data);
    } catch (err) {
      setError('Failed to load questions. Please try again.');
      console.error(err);
    }
  };

  const handleAnswer = (answer) => {
    const question = questions[currentQuestion];
    
    if (question.multiselect) {
      const currentAnswers = responses[question.id] || [];
      const updatedAnswers = currentAnswers.includes(answer)
        ? currentAnswers.filter(a => a !== answer)
        : [...currentAnswers, answer];
      setResponses({ ...responses, [question.id]: updatedAnswers });
    } else {
      setResponses({ ...responses, [question.id]: answer });
      
      if (currentQuestion < questions.length - 1) {
        setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
      } else {
        submitResponses({ ...responses, [question.id]: answer });
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitResponses();
    }
  };

  const handleImageSelection = (type) => {
    setImageType(type);
    setShowImages(true);
  };

  const submitResponses = async (finalResponses = responses) => {
    setLoading(true);
    setError('');
    
    try {
    
      const response = await api.post(`/symptoms/analyze`, { 
        responses: finalResponses 
      });
      setResult(response.data);
    } catch (err) {
      setError('Failed to analyze symptoms. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setResponses({});
    setResult(null);
    setError('');
    setShowImages(false);
    setImageType(null);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <Loader className="spinner" size={48} />
          <p>Analyzing your responses...</p>
          <p style={{ fontSize: '0.875rem', marginTop: '12px', color: '#9ca3af' }}>
            Taking care to provide thoughtful recommendations
          </p>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <ResultsScreen 
        result={result} 
        onRestart={restart}
      />
    );
  }

  if (showImages && imageType) {
    return (
      <div className={styles.container}>
        <button 
          onClick={() => setShowImages(false)}
          className={styles.backButton}
          style={{ position: 'absolute', top: '40px', left: '40px' }}
        >
          <ArrowLeft size={20} />
          Back to Questions
        </button>
        <ReferenceImages 
          type={imageType}
          onBack={() => setShowImages(false)}
        />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <Loader className="spinner" size={48} />
          <p>Loading assessment...</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isMultiselect = question.multiselect;
  const currentAnswers = responses[question.id] || [];
  const canProceed = isMultiselect || responses[question.id] !== undefined;

  return (
    <div className={styles.container}>
      <div className={styles.checker}>
        <div className={styles.header}>
          <h1 className={styles.title}>Sexual Health Assessment</h1>
          <p className={styles.subtitle}>
            Answer a few questions to get personalized health guidance
          </p>
        </div>

        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className={styles.questionCard}>
          <div className={styles.questionNumber}>
            Question {currentQuestion + 1} of {questions.length}
          </div>
          
          <h2 className={styles.question}>{question?.question}</h2>

          <div className={styles.answers}>
            {question?.type === 'yes-no' ? (
              <>
                <button
                  onClick={() => handleAnswer('yes')}
                  className={`${styles.answerButton} ${responses[question.id] === 'yes' ? styles.selected : ''}`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleAnswer('no')}
                  className={`${styles.answerButton} ${responses[question.id] === 'no' ? styles.selected : ''}`}
                >
                  No
                </button>
              </>
            ) : question?.type === 'text' ? (
              <textarea
                placeholder={question.placeholder}
                value={responses[question.id] || ''}
                onChange={(e) => setResponses({ ...responses, [question.id]: e.target.value })}
                className={styles.textInput}
                rows="4"
              />
            ) : (
              question?.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`${styles.answerButton} ${
                    isMultiselect 
                      ? currentAnswers.includes(option) 
                        ? styles.selected 
                        : ''
                      : responses[question.id] === option 
                        ? styles.selected 
                        : ''
                  }`}
                >
                  {option}
                </button>
              ))
            )}
          </div>

          {isMultiselect && (
            <button 
              onClick={handleNext}
              disabled={!canProceed}
              className={styles.continueButton}
              style={{ opacity: canProceed ? 1 : 0.5 }}
            >
              Continue
              <ArrowRight size={20} />
            </button>
          )}

          {currentQuestion > 0 && (
            <button onClick={handleBack} className={styles.backButton}>
              <ArrowLeft size={20} />
              Back
            </button>
          )}
        </div>

        {error && (
          <div className={`${styles.alert} ${styles.alertDanger}`}>
            {error}
          </div>
        )}

        <div className={styles.disclaimer}>
          <AlertCircle size={16} />
          <span>Your responses are completely anonymous and will help provide personalized guidance</span>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
