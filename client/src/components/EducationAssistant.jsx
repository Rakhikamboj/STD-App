import React, { useState } from 'react';
import styles from './EducationAssistant.module.css';
import { Sparkles, User, Bot, Send} from 'lucide-react';

const EducationAssistant = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi there! I'm here to help answer your questions about sexual health in a judgment-free space. You can ask me anything like:\n\n• What is chlamydia?\n• How often should I get tested?\n• What are the symptoms of common STIs?\n• How can I talk to my partner about testing?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const suggestedQuestions = [
    "What is chlamydia?",
    "How often should I test?",
    "What are common STI symptoms?",
    "How do I talk to my partner?",
    "Where can I get tested?"
  ];

  const handleQuestionClick = (question) => {
    setInputValue(question);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { role: 'user', content: inputValue }]);
      setInputValue('');
      // Here you would add logic to get assistant response
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Education Assistant</h2>
          <button className={styles.modalCloseButton} onClick={onClose}>
            ×
          </button>
        </div>

        {/* Assistant Info */}
        <div className={styles.assistantInfo}>
          <div className={styles.assistantAvatar}>
            <Bot size={28} color='white' />
          </div>
          <div className={styles.assistantDetails}>
            <h3 className={styles.assistantName}>Education Assistant</h3>
            <p className={styles.assistantTagline}>Ask me anything about sexual health</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className={styles.chatMessages}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${message.role === 'user' ? styles.messageUser : styles.messageAssistant}`}
            >
              {message.role === 'assistant' && (
                <div className={styles.messageAvatar}>
                  <Bot size={22} color='white' />
                </div>
              )}
              {message.role === 'user' &&(
                <div className={styles.messageAvatarUser}>
                    <User size={22} color='white' />
                </div>

              )}
              <div className={styles.messageContent}>
                {message.content.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < message.content.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Questions */}
        <div className={styles.suggestedQuestions}>
          <div className={styles.suggestedLabel}>
            <Sparkles />
            <span>Try asking:</span>
          </div>
          <div className={styles.questionButtons}>
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                className={styles.questionButton}
                onClick={() => handleQuestionClick(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className={styles.inputArea}>
          <input
            type="text"
            className={styles.messageInput}
            placeholder="Ask me anything about sexual health..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className={styles.sendButton}>
           <Send size={18} color='white' />
          </button>
        </form>

        {/* Disclaimer */}
        <div className={styles.disclaimer}>
          This chatbot provides educational information only. For medical advice, please consult a healthcare provider.
        </div>
      </div>
    </div>
  );
};

export default EducationAssistant;