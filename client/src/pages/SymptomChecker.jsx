import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, ArrowRight, ArrowLeft, Loader, Image as ImageIcon, Sparkles } from 'lucide-react';
import api from '../utils/api';
import styles from './SymptomChecker.module.css';

const SymptomChecker = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [showReferenceImages, setShowReferenceImages] = useState(false);
  const [selectedReferenceImages, setSelectedReferenceImages] = useState([]);
  const [referenceImageData, setReferenceImageData] = useState({});

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
      
      if (!question.multiselect && question.type !== 'text' && currentQuestion < questions.length - 1) {
        setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
      } else if (!question.multiselect && question.type !== 'text' && currentQuestion === questions.length - 1) {
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

  const handleReferenceImageToggle = (imageType) => {
    setSelectedReferenceImages(prev => 
      prev.includes(imageType)
        ? prev.filter(t => t !== imageType)
        : [...prev, imageType]
    );
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
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setResponses({});
    setResult(null);
    setError('');
    setSelectedReferenceImages([]);
    setShowReferenceImages(false);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.aiSpinner}>
            <Sparkles size={48} />
          </div>
          <p>Analyzing your responses with AI...</p>
          <p className={styles.loadingSubtext}>
            Getting personalized insights from our health AI
          </p>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className={styles.container}>
        <div className={styles.result}>
          <div className={styles.resultHeader}>
            <h1 className={styles.resultTitle}>Your Health Assessment Results</h1>
            {result.analyzedByAI && (
              <div className={styles.aiBadge}>
                <Sparkles size={16} />
                AI-Powered Analysis
              </div>
            )}
          </div>

          {result.aiMessage && (
            <div className={styles.aiMessage}>
              <Sparkles size={20} />
              <p>{result.aiMessage}</p>
            </div>
          )}

          <div className={styles.resultSection}>
            <h2 className={styles.resultSectionTitle}>
              <AlertCircle size={24} />
              Conditions to Discuss with Your Doctor
            </h2>
            <div className={styles.conditions}>
              {result.possibleConditions.map((condition, index) => (
                <div key={index} className={styles.conditionCard}>
                  <h3 className={styles.conditionName}>{condition.condition}</h3>
                  <p className={styles.conditionDesc}>{condition.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.resultSection}>
            <h2 className={styles.resultSectionTitle}>
              <CheckCircle size={24} />
              Personalized Recommendations
            </h2>
            <ul className={styles.recommendations}>
              {result.recommendations.map((rec, index) => (
                <li key={index} className={styles.recommendation}>{rec}</li>
              ))}
            </ul>
          </div>

          {selectedReferenceImages.length > 0 && (
            <div className={styles.resultSection}>
              <h3 className={styles.resultSectionTitle}>
                <ImageIcon size={20} />
                Reference Images You Selected
              </h3>
              <div className={styles.selectedImagesDisplay}>
                {selectedReferenceImages.map(imageType => {
                  const imageInfo = referenceImageData[imageType];
                  return imageInfo ? (
                    <div key={imageType} className={styles.selectedImageChip}>
                      <ImageIcon size={16} />
                      {imageInfo.label}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}

          <div className={styles.disclaimer}>
            <strong>Important:</strong> This assessment provides general guidance only and is not a substitute 
            for professional medical advice. Always consult with a qualified healthcare provider for 
            diagnosis and treatment.
          </div>

          <div className={styles.resultActions}>
            <button onClick={restart} className="btn btn-primary">
              Take Another Assessment
            </button>
          </div>
        </div>
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
  const canProceed = isMultiselect || question.type === 'text' || responses[question.id] !== undefined;

  return (
    <div className={styles.container}>
      <div className={styles.checker}>
        <div className={styles.header}>
          <h1 className={styles.title}>Sexual Health Assessment</h1>
          <p className={styles.subtitle}>
            <Sparkles size={18} />
            AI-powered guidance with personalized recommendations
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
          
          {question?.sensitive && (
            <div className={styles.sensitiveAlert}>
              <AlertCircle size={18} />
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
                      ? currentAnswers.includes(option) ? styles.selected : ''
                      : responses[question.id] === option ? styles.selected : ''
                  }`}
                >
                  {option}
                </button>
              ))
            )}
          </div>

          {question?.showReferenceImages && question?.referenceImageTypes && (
            <div className={styles.referenceImagesSection}>
              <button 
                onClick={() => setShowReferenceImages(!showReferenceImages)}
                className={styles.toggleImagesButton}
              >
                <ImageIcon size={20} />
                {showReferenceImages ? 'Hide' : 'View'} Reference Images
                {selectedReferenceImages.length > 0 && (
                  <span className={styles.selectedCount}>
                    ({selectedReferenceImages.length} selected)
                  </span>
                )}
              </button>

              {showReferenceImages && (
                <div className={styles.referenceImagesGrid}>
                  <p className={styles.imagesHelpText}>
                    Select all images that match your symptoms (you can select multiple):
                  </p>
                  {question.referenceImageTypes.map(imageType => {
                    const imageInfo = referenceImageData[imageType];
                    if (!imageInfo) return null;

                    return (
                      <div 
                        key={imageType}
                        className={`${styles.referenceImageCard} ${
                          selectedReferenceImages.includes(imageType) ? styles.selectedImage : ''
                        }`}
                        onClick={() => handleReferenceImageToggle(imageType)}
                      >
                        <div className={styles.imagePlaceholder}>
                          <ImageIcon size={32} />
                        </div>
                        <h4 className={styles.imageLabel}>{imageInfo.label}</h4>
                        <p className={styles.imageDescription}>{imageInfo.description}</p>
                        <ul className={styles.imageDetails}>
                          {imageInfo.details?.slice(0, 2).map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                        {selectedReferenceImages.includes(imageType) && (
                          <div className={styles.selectedIconWrapper}>
                            <CheckCircle className={styles.selectedIcon} size={24} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {(isMultiselect || question?.type === 'text' || question?.type === 'yes-no') && (
            <button 
              onClick={handleNext}
              disabled={!canProceed}
              className={styles.continueButton}
            >
              Continue
              <ArrowRight size={20} />
            </button>
          )}

          <div className={styles.navigationButtons}>
            {currentQuestion > 0 && (
              <button onClick={handleBack} className={styles.backButton}>
                <ArrowLeft size={20} />
                Back
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <div className={styles.disclaimer}>
          <AlertCircle size={16} />
          <span>Your responses are completely anonymous and AI-analyzed for personalized guidance</span>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;