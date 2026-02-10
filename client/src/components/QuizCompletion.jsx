import React from 'react';
import { ArrowRight, Trophy, Sparkles } from 'lucide-react';
import styles from  "./QuizCompletion.module.css"

const QuizCompletion = ({ 
  score = 3, 
  totalQuestions = 3, 
  onContinue,
  onBackToQuizzes
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getEncouragementMessage = () => {
    if (percentage === 100) {
      return {
        title: "Great work!",
        text: "Excellent! You really know your stuff. Keep up the great work!"
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
<div className={styles.quizCompletion}>
      {/* <button className={styles.backButton} onClick={onBackToQuizzes}>
        ← Back to Quizzes
      </button> */}

      <div className={styles.completionContainer}>
        {/* Trophy Icon */}
        <div className={styles.trophyIcon}>
          <Trophy size={38}  />
        </div>

        {/* Completion Title */}
        <h1 className={styles.completionTitle}>Quiz Complete!</h1>

        {/* Score Display */}
        <div className={styles.scoreDisplay}>
          {score}/{totalQuestions}
        </div>

        {/* Score Percentage */}
        <p className={styles.scorePercentage}>
          You scored {percentage}%
        </p>

        {/* Encouragement Message */}
        <div className={styles.encouragementBox}>
          <div className={styles.encouragementIcon}>
            <Sparkles size={20} />
          </div>
          <div className={styles.encouragementContent}>
            <h3 className={styles.encouragementTitle}>{encouragement.title}</h3>
            <p className={styles.encouragementText}>{encouragement.text}</p>
          </div>
        </div>

        {/* Continue Button */}
        <button onClick={onContinue} className={styles.continueButton}>
          Continue
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default QuizCompletion;