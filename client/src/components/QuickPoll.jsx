import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, X, TrendingUp } from 'lucide-react';
import styles from './QuickPoll.module.css';

const QuickPoll = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const pollData = {
    question: "Have you been tested in the last 6 months?",
    options: [
      { id: 1, text: "Yes, recently", votes: 0 },
      { id: 2, text: "No, but I want to", votes: 0 },
      { id: 3, text: "No, not sure where to go", votes: 0 },
      { id: 4, text: "I don't think I need to", votes: 0 }
    ],
    totalResponses: 0
  };

  const handleVote = (optionId) => {
    if (!hasVoted) {
      setSelectedOption(optionId);
      setHasVoted(true);
    }
  };

  const calculatePercentage = (votes) => {
    if (pollData.totalResponses === 0) return 0;
    return Math.round((votes / pollData.totalResponses) * 100);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button className={styles.floatingButton} onClick={() => setIsOpen(true)}>   

          <BarChart3 className={styles.icon}size={20} />
          <span className={styles.text}>
  Quick Poll
</span>

         
        </button>
        
      )}

      {/* Poll Panel */}
      {isOpen && (
        <div className={styles.pollPanel}>
          <div className={styles.pollHeader}>
            <div className={styles.pollHeaderContent}>
              <BarChart3 size={20} className={styles.pollHeaderIcon} />
              <h3 className={styles.pollTitle}>Community Poll</h3>
            </div>
            <button 
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Close poll"
            >
              <X size={20} />
            </button>
          </div>

          <div className={styles.pollBody}>
            <div className={styles.pollQuestion}>
              <div className={styles.responseCount}>
                <TrendingUp size={16} />
                <span>{pollData.totalResponses} responses</span>
              </div>
              <h4>{pollData.question}</h4>
            </div>

            <div className={styles.pollOptions}>
              {pollData.options.map((option) => (
                <button
                  key={option.id}
                  className={`${styles.pollOption} ${
                    selectedOption === option.id ? styles.selected : ''
                  } ${hasVoted ? styles.voted : ''}`}
                  onClick={() => handleVote(option.id)}
                  disabled={hasVoted}
                >
                  <span className={styles.optionText}>{option.text}</span>
                  <span className={styles.optionPercentage}>
                    {calculatePercentage(option.votes)}%
                  </span>
                  <div 
                    className={styles.optionBar}
                    style={{ width: `${calculatePercentage(option.votes)}%` }}
                  />
                </button>
              ))}
            </div>

            <div className={styles.pollFooter}>
              <div className={styles.communityPrompt}>
                <TrendingUp size={16} className={styles.promptIcon} />
                <span>Join others in the community who understand.</span>
              </div>
              <Link to="/community" className={styles.communityButton}>
                Connect with others who understand
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickPoll;