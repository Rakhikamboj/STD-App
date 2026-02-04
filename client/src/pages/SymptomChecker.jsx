import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, ArrowRight, ArrowLeft, Loader, Shield } from 'lucide-react';
import api from '../utils/api';
import ResultsScreen from './ResultsScreen';
import styles from './SymptomChecker.module.css';
import herpes from '../assets/Genetial-herps.png';
import scabies from '../assets/Genital-scabies2.png';
import warts from '../assets/Genital-warts.png';
import ulcer from '../assets/ulcer.png'; 

export const referenceImagesMap ={
  herpes,
  scabies,
  warts,
  ulcer
}

const SymptomChecker = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [selectedReferenceImages, setSelectedReferenceImages] = useState([]);
  const [referenceImageData, setReferenceImageData] = useState({});
  const [showReferenceImagesNotice, setShowReferenceImagesNotice] = useState(false);

  useEffect(() => {
    fetchQuestions();
    fetchReferenceImages();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data } = await api.get('/symptoms/questions');
      setQuestions(data);
    } catch (err) {
      setError('Failed to load questions. Please try again.');
    }
  };

  const fetchReferenceImages = async () => {
    try {
      const { data } = await api.get('/symptoms/reference-images');
      setReferenceImageData(data);
    } catch (err) {
      console.error('Failed to load reference images');
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
      
      // Show reference images notice if user selects "yes" for reference images question
      if (question.id === 'q8_referenceImages' || question.type === 'yes-no' && question.id.includes('referenceImages')) {
        if (answer === 'yes') {
          setShowReferenceImagesNotice(true);
        } else {
          setShowReferenceImagesNotice(false);
        }
      }
      
      // Don't auto-advance for image selection questions
      if (!question.multiselect && question.type !== 'text' && question.type !== 'image-selection' && currentQuestion < questions.length - 1) {
        setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
      } else if (!question.multiselect && question.type !== 'text' && question.type !== 'image-selection' && currentQuestion === questions.length - 1) {
        submitResponses({ ...responses, [question.id]: answer });
      }
    }
  };

  const handleImageSelection = (imageType) => {
    const question = questions[currentQuestion];
    setResponses({ ...responses, [question.id]: imageType });
    
    // Track selected reference images for analysis
    if (!selectedReferenceImages.includes(imageType)) {
      setSelectedReferenceImages([...selectedReferenceImages, imageType]);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitResponses();
    }
  };

  const submitResponses = async (finalResponses = responses) => {
    setLoading(true);
    setError('');
    
    try {
      const enrichedResponses = {
        ...finalResponses,
        selectedReferenceImages
      };
      
      const { data } = await api.post('/symptoms/analyze', { 
        responses: enrichedResponses 
      });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze symptoms');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Reset reference images notice when going back
      const prevQuestion = questions[currentQuestion - 1];
      if (prevQuestion?.id === 'q8_referenceImages') {
        setShowReferenceImagesNotice(responses[prevQuestion.id] === 'yes');
      }
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setResponses({});
    setResult(null);
    setError('');
    setSelectedReferenceImages([]);
    setShowReferenceImagesNotice(false);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <Loader className={styles.spinner} size={48} />
          <p>Analyzing your responses...</p>
          <p className={styles.loadingSubtext}>
            Generating personalized health insights
          </p>
        </div>
      </div>
    );
  }

  if (result) {
    return <ResultsScreen result={result} onRestart={restart} />;
  }

  if (questions.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <Loader className={styles.spinner} size={48} />
          <p>Loading assessment...</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);
  const isMultiselect = question.multiselect;
  const currentAnswers = responses[question.id] || [];
  const canProceed = isMultiselect || question.type === 'text' || question.type === 'image-selection' || responses[question.id] !== undefined;

  return (
    <div className={styles.container}>
      <div className={styles.checker}>
      

        <div className={styles.progressSection}>
          <div className={styles.progressInfo}>
            <span className={styles.progressText}>Question {currentQuestion + 1} of {questions.length}</span>
            <span className={styles.progressPercent}>{progress}% complete</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className={styles.questionCard}>
          {question?.sensitive && (
            <div className={styles.sensitiveAlert}>
              <Shield size={18} />
              <span>{question?.sensitiveMessage}</span>
            </div>
          )}
          
          <h2 className={styles.question}>{question?.question}</h2>

          {question?.helpText && (
            <p className={styles.helpText}>{question.helpText}</p>
          )}

          <div className={styles.answers}>
            {question?.type === 'yes-no' ? (
              <>
                <button
                  onClick={() => handleAnswer('yes')}
                  className={`${styles.answerButton} ${responses[question.id] === 'yes' ? styles.selected : ''}`}
                >
                  Yes, show me reference images
                </button>
                <button
                  onClick={() => handleAnswer('no')}
                  className={`${styles.answerButton} ${responses[question.id] === 'no' ? styles.selected : ''}`}
                >
                  No, I prefer text descriptions only
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
            ) : question?.type === 'image-selection' ? (
  <div className={styles.imageSelectionGrid}>
    {question?.options?.map((option) => {
      const imageSrc = referenceImagesMap[option.imageType];

      return (
        <div
          key={option.value}
          onClick={() => handleImageSelection(option.value)}
          className={`${styles.imageOptionCard} ${
            responses[question.id] === option.value
              ? styles.selectedImageOption
              : ''
          }`}
        >
          <div className={styles.imageWrapper}>
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={option.label}
                className={styles.optionImage}
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                <span>{option.label}</span>
              </div>
            )}
          </div>

          <div className={styles.imageOptionLabel}>
            {option.label}
          </div>

          {responses[question.id] === option.value && (
            <div className={styles.selectedCheckmark}>
              <CheckCircle size={24} />
            </div>
          )}
        </div>
      );
    })}
  </div>


            ) : (
              question?.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`${styles.answerButton} ${
                    isMultiselect 
                      ? currentAnswers.includes(option) ? styles.selected : ''
                      : responses[question.id] === option ? styles.selected : ''
                  }`}
                >
                  {option}
                </button>
              ))
            )}
          </div>

          {/* Show reference images notice after yes selection and on subsequent questions */}
          {(showReferenceImagesNotice || (responses.q8_referenceImages === 'yes' && currentQuestion > 7)) && (
            <div className={styles.referenceImagesNotice}>
              <AlertCircle size={18} className={styles.noticeIcon} />
              <div className={styles.noticeContent}>
                <strong>Reference Images Enabled</strong>
                <p>You'll see medical reference images to help identify symptoms. These are for educational purposes only.</p>
              </div>
            </div>
          )}

          <div className={styles.navigationButtons}>
            <button 
              onClick={handleBack} 
              className={styles.backButton}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft size={20} />
              Back
            </button>
            
            {(isMultiselect || question?.type === 'text' || question?.type === 'image-selection') && (
              <button 
                onClick={handleNext}
                disabled={!canProceed}
                className={styles.continueButton}
              >
                Continue
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className={styles.errorAlert}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <div className={styles.privacyNotice}>
          <Shield size={16} />
          <span>Your responses are anonymous and help us provide better recommendations</span>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;