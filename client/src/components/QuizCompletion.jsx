import React from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './QuizCompletion.module.css';

const QuizCompletion = ({ 
  score, 
  totalQuestions, 
  onContinue,
  quizTitle = "Quiz"
}) => {
  // Calculate percentage
  const percentage = Math.round((score / totalQuestions) * 100);

  // Get dynamic encouragement message based on score
  const getEncouragementMessage = () => {
    if (percentage === 100) {
      return {
        title: "Perfect Score!",
        text: "Amazing! You got everything right! You're a true expert on this topic."
      };
    } else if (percentage >= 70) {
      return {
        title: "Great work!",
        text: "You did really well! Review the explanations to master this topic."
      };
    } else if (percentage >= 50) {
      return {
        title: "Good effort!",
        text: "Nice try! Review the explanations to improve your understanding."
      };
    } else {
      return {
        title: "Keep learning!",
        text: "Thanks for trying! Review the explanations to boost your knowledge."
      };
    }
  };

  const encouragement = getEncouragementMessage();

  return (
    <div className={styles.completionContainer}>
      {/* Trophy Icon */}
      <div className={styles.trophyIcon}>
        <svg width="64" height="64" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M 0 0 C 5.94 0 11.88 0 18 0 C 18.33 0.99 18.66 1.98 19 3 C 21.475 3.495 21.475 3.495 24 4 C 24.3328 7.66075 24.4617 9.39501 22.1875 12.375 C 20 14 20 14 17 14 C 16.67 14.99 16.34 15.98 16 17 C 15.34 17.33 14.68 17.66 14 18 C 14.4333 20.513 14.678 21.7152 16.625 23.4375 C 17.3056 24.2109 17.3056 24.2109 18 25 C 17.67 26.65 17.34 28.3 17 30 C 11.72 30 6.44 30 1 30 C 0.67 28.35 0.34 26.7 0 25 C 1.9375 22.3125 1.9375 22.3125 4 20 C 4 19.34 4 18.68 4 18 C 3.01 17.34 2.02 16.68 1 16 C 1 15.34 1 14.68 1 14 C -0.175625 13.8453 -0.175625 13.8453 -1.375 13.6875 C -4 13 -4 13 -6 10 C -6.125 6.8125 -6.125 6.8125 -6 4 C -4.35 3.67 -2.7 3.34 -1 3 C -0.67 2.01 -0.34 1.02 0 0 Z M 2 3 C 2.0825 4.58813 2.165 6.17625 2.25 7.8125 C 2.29641 8.70582 2.34281 9.59914 2.39063 10.5195 C 2.80139 13.1223 2.80139 13.1223 4.85156 14.8359 C 7.89354 16.4841 9.73944 15.9215 13 15 C 15.4951 12.5049 15.3595 11.3267 15.625 7.875 C 15.7487 6.26625 15.8725 4.6575 16 3 C 11.38 3 6.76 3 2 3 Z M -3 6 C -2.67 7.32 -2.34 8.64 -2 10 C -1.67 8.68 -1.34 7.36 -1 6 C -1.66 6 -2.32 6 -3 6 Z M 19 6 C 19.33 7.32 19.66 8.64 20 10 C 20.33 8.68 20.66 7.36 21 6 C 20.34 6 19.68 6 19 6 Z M 8 19 C 7.67 20.32 7.34 21.64 7 23 C 8.32 22.67 9.64 22.34 11 22 C 10.67 21.01 10.34 20.02 10 19 C 9.34 19 8.68 19 8 19 Z M 3 26 C 3 26.33 3 26.66 3 27 C 6.96 27 10.92 27 15 27 C 15 26.67 15 26.34 15 26 C 11.04 26 7.08 26 3 26 Z" 
            fill="white"
            transform="translate(7, 17) scale(0.75)"
          />
        </svg>
      </div>

      {/* Completion Title */}
      <h2 className={styles.completionTitle}>Quiz Complete!</h2>

      {/* Score Display */}
      <div className={styles.scoreDisplay}>
        <span className={styles.scoreNumber}>{score}/{totalQuestions}</span>
      </div>

      {/* Score Percentage */}
      <p className={styles.scorePercentage}>
        You scored {percentage}%
      </p>

      {/* Encouragement Message */}
      <div className={styles.encouragementBox}>
        <div className={styles.encouragementIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
              fill="#0891b2" 
              stroke="#0891b2" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={styles.encouragementContent}>
          <h3 className={styles.encouragementTitle}>{encouragement.title}</h3>
          <p className={styles.encouragementText}>{encouragement.text}</p>
        </div>
      </div>

      {/* Continue Button */}
      <button onClick={onContinue} className={styles.continueButton}>
        Continue
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default QuizCompletion;